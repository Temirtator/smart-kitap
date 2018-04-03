import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import * as checkConnectivity from '../../actions/checkConnectivity'
import { bindActionCreators } from 'redux'
import Question from './Question'
import TextSettings from '../GeneralComponents/TextSettingsComponent'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'
import ReactSpinner from 'react-spinjs'

import { Link } from 'react-router-dom'

import 'bootstrap/fonts/glyphicons-halflings-regular.svg'

let textStyle = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: 'calc(50vw + 125px)'
}

class TestComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          access_token: window.localStorage.getItem('access_token'),
          license_token: window.localStorage.getItem('license_token'),
          book_id: window.localStorage.getItem('book_id'),
          exam_id: null,
          tests: [],
          test_state: false,
          isShowingModal: false,
          examLoaded: true,
          testFlashing: [],
          prevIndex: 0
        }
        this.openTest = this.openTest.bind(this)
        this.sendTestResults =  this.sendTestResults.bind(this)
    }
    
    openTest(exam_id, index) {
      this.props.checkConnectivity.onlineCheck().then(() => {
        this.setState(prev => {
          prev.testFlashing[index] = true // javascript magic
          prev.testFlashing[prev.prevIndex] = false
          return {
            testFlashing: prev.testFlashing,
            prevIndex: index
          }
        })
        this.props.actions.setTestStarted()
        let {license_token, access_token, book_id} = this.state
        this.props.actions.getTestQuestions(license_token, access_token, book_id, exam_id)
        .then(response => {
            this.setState({
              test_state: true, 
              exam_id: exam_id,
              examLoaded: false
            })
        }) 
      })
      .catch(() => {
        alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
      })
    }
    
    sendTestResults() {
      this.props.checkConnectivity.onlineCheck().then(() => {
        let { book_test } = this.props
        if (book_test.questions.length === book_test.answers.length){
          let { access_token, license_token, book_id, exam_id } = this.state
          let correct_answers = book_test.answers.filter(object => object.isCorrect === 1).length
          let incorrect_answers = Math.abs(book_test.answers.length - correct_answers)
          this.setState({
            isShowingModal: true,
            correct: correct_answers,
            incorrect: incorrect_answers
          })
          this.props.actions.setTestFinished()
          this.props.actions.setTestResults(  license_token, 
                                              access_token, 
                                              Number(book_id), 
                                              exam_id, 
                                              correct_answers, 
                                              incorrect_answers)
        }
        else {
          alert('Вам необходимо ответить на все вопросы')
        }
      })
      .catch(() => {
        alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
      })
    }

    handleClose = () => this.setState({isShowingModal: false})

    componentWillMount() {
      this.props.checkConnectivity.onlineCheck().then(() => {
        let {access_token, license_token, book_id} = this.state
        this.props.actions.getAllExamByBookId(license_token, access_token, book_id)
        .then(data => {
          this.setState({
            tests: data
          })
          if (data.length >= 1) {
            this.openTest(data[0].id) // open first test by setting exam id
          }
        })
      })
      .catch(() => {
        alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
      })
    }

    render() {
        let { questions } = this.props.book_test
        let { tests, test_state, correct, incorrect, examLoaded, testFlashing } = this.state
        return (
            <div className="test-component">
                { examLoaded ? 
                    <ModalContainer>
                        <div>
                            <ReactSpinner color='#fff' />
                            <p style={textStyle}>Загружаются тесты...</p>
                        </div>
                    </ModalContainer> : null
                }

                <div className="test-component__header">
                    <TextSettings   textSize={{padding:'5px 5px', display: 'none'}} 
                                    textColor={{display: 'none'}} 
                                    blindMode={{padding: '13px 0'}} />
                </div>
                <div className="test-component__body">
                  {
                    (tests.length < 1) ? <p className="no-data-message">Нет тестов</p> : null
                  }
                  { this.state.isShowingModal &&
                      <ModalContainer>
                        <ModalDialog onClose={this.handleClose}>
                          <h1>Результаты теста</h1>
                          <p>Правильных: {correct}</p>
                          <p>Неправильных: {incorrect}</p>
                        </ModalDialog>
                      </ModalContainer> }
                  <div className="col-sm-8">
                    { (test_state && questions.length > 0) ? questions.map((object, index) =>
                         <Question  objectQuestion={object} 
                                    key={index} 
                                    index={index} />
                    ) : null}
                    { (test_state && questions.length > 0) ? 
                      <button 
                          onClick={this.sendTestResults} 
                          type="submit"                                                                                                     
                          className="btn btn-primary">Завершить тест</button> : null}
                  </div>

                  <div className="col-sm-4 side-test-menu">
                    { tests.map((value, index) => 
                      <div  className={testFlashing[index] ? "test-component__body__test-menu test-menu--selected" : 'test-component__body__test-menu'}
                            onClick={() => this.openTest(value.id, index)}
                            key={index}>
                        <p>{value.title}</p>
                      </div>  
                    )}
                  </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
   book_test: state.book_test
})

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators(Actions, dispatch),
   checkConnectivity: bindActionCreators(checkConnectivity, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent)

