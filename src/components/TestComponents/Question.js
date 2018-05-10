import React, { Component, PropTypes } from 'react'
import { RadioGroup, Radio } from 'react-radio-group'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'


const Images = (props) => {
    const images = props.images
    
    if (images) {
        const elements = images.map((image, key) => 
            <img src={image} alt="questionImage" key={key} />
        )

        return <div className="images">{elements}</div>
    }
    else {
        return <div className="images"></div>;
    }   
}

class Question extends Component {
    static propTypes = {
        objectQuestion: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
        	selectedValue: '',
            rightAnswer: this.props.objectQuestion.variants.filter(object => object.isCorrect === 1)[0].value,

        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        let { objectQuestion, book_test } = this.props
        try {
            let right_answer = objectQuestion.variants.filter(object => object.isCorrect === 1)[0].value
            let isCorrect = objectQuestion.variants.filter(object => object.value === value)[0].isCorrect //is right or no
            let book_exam_question_id = objectQuestion.id // get id for identification, for non-repeating push answers

            let newObject = {
                question_id: book_exam_question_id,
                isCorrect: isCorrect,
                chosen_answer: value,
                right_answer: right_answer
            }
            
            //compare current datas with new datas, to run away from repeating 
            //its important comparing
            let elements = book_test.answers.filter(object => object.question_id !== newObject.question_id) 
            elements.push(newObject)
            
            this.props.actions.setAnswer(elements)
            this.setState({ selectedValue: value })
        }
        catch(e) {
            console.log('Error on handleChange')
        }
    }

    render() {
        let { objectQuestion, index } = this.props
        let { rightAnswer, selectedValue } = this.state 
        let { testIsFinished } = this.props.book_test 
        return (
            <div className="test-question">
    			<h3><div dangerouslySetInnerHTML={{ __html: objectQuestion.text }} /></h3>
                {/*<Images images={objectQuestion.picture_url} />*/}
                <RadioGroup
			        name={"question " + index}
			        selectedValue={ selectedValue }
			        onChange={(value) => this.handleChange(value)}
			        className="test-answers"
                    >
				    { objectQuestion.variants.map((answer, i) =>
				        <label key={i}>
				            <Radio value={answer.value} />
                            <div className={ (answer.isCorrect && testIsFinished) ?
                                            'check right_answer' : ((selectedValue === answer.value) && testIsFinished) ?
                                            'check left_answer' : 'check' }></div> 
                            
                            <p style = { (answer.isCorrect && testIsFinished) ? 
                                            {color:'green'} : ((selectedValue === answer.value) && testIsFinished) ? 
                                            {color:'red'} : {color:'#000'} } dangerouslySetInnerHTML={{ __html: answer.value }} />
				        </label>
			        )}   
			    </RadioGroup>
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
)(Question)



