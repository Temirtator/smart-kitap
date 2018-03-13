import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux'
import Question from './Question'
import TextSettings from './TextSettingsComponent'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'

import { Link } from 'react-router-dom'

import 'bootstrap/fonts/glyphicons-halflings-regular.svg'

class TestComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          access_token: window.localStorage.getItem('access_token'),
          license_token: '124235asfa1k2431wasda',
          book_id: window.localStorage.getItem('book_id'),
          exam_id: null,
          tests: [],
          test_state: false,
          isShowingModal: false
        }
        this.openTest = this.openTest.bind(this)
        this.sendTestResults =  this.sendTestResults.bind(this)
    }
    
    openTest(exam_id) {
      this.props.actions.setTestStarted()
      let {license_token, access_token, book_id} = this.state
      this.props.actions.getTestQuestions(license_token, access_token, book_id, exam_id)
      .then(response => {
          this.setState({test_state: true, exam_id: exam_id})
      })
    }
    
    sendTestResults() {
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
          this.props.actions.setTestResults(license_token, access_token, Number(book_id), exam_id, correct_answers, incorrect_answers)
        /*this.setState({
          test_state: false
        })*/
      }
      else {
        alert('Вам необходимо ответить на все вопросы')
      }
    }

    handleClose = () => this.setState({isShowingModal: false})

    componentWillMount() {
      let {access_token, license_token, book_id} = this.state
      this.props.actions.getAllExamByBookId(license_token, access_token, book_id)
      .then(data => {
        this.setState({
          tests: data
        })
      })
    }

    render() {
        let { questions } = this.props.book_test
        let { tests, test_state, correct, incorrect } = this.state
        return (
            <div className="test-component">
                <div className="test-component__header">
                    <TextSettings   textSize={{padding:'5px 5px'}} 
                                    textColor={{display: 'none'}} 
                                    blindMode={{padding: '13px 0'}} />
                </div>
                <div className="test-component__body">
                  { this.state.isShowingModal &&
                                  <ModalContainer>
                                    <ModalDialog onClose={this.handleClose}>
                                      <h1>Результаты теста</h1>
                                      <p>Правильных: {correct}</p>
                                      <p>Неправильных: {incorrect}</p>
                                    </ModalDialog>
                                  </ModalContainer> }
                  <div className="col-md-8">
                    { (test_state && questions.length > 0) ? questions.map((object, index) =>
                         <Question objectQuestion={object} key={index} index={index} />
                    ) : null}                  
                    { (test_state && questions.length > 0) ? <button onClick={this.sendTestResults} type="submit" 
                                                                                                    className="btn btn-primary">Завершить тест</button> : null}
                  </div>

                  <div className="col-md-4 side-test-menu">
                    { tests.map((value, index) => 
                      <div className="test-component__body__test-menu" key={index}>
                        <p onClick={() => this.openTest(value.id)}>{value.title}</p>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent)

