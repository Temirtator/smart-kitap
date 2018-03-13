import React, { Component, PropTypes } from 'react'
import { RadioGroup, Radio } from 'react-radio-group'
import { connect } from 'react-redux'
import * as Actions from '../actions'
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
        let right_answer = objectQuestion.variants.filter(object => object.isCorrect === 1)[0].value
        let isCorrect = objectQuestion.variants.filter(object => object.value === value)[0].isCorrect //is right or no
        
        let newObject = {
            order: objectQuestion.order,
            isCorrect: isCorrect,
            chosen_answer: value,
            right_answer: right_answer
        }
        
        //checking for current values
        let elements = book_test.answers.filter(object => object.order !== newObject.order) // here i get array of objects where is no current answer
        elements.push(newObject)
        
        this.props.actions.setAnswer(elements)
        this.setState({ selectedValue: value })
    }

    render() {
        let { objectQuestion, index } = this.props
        let { rightAnswer, selectedValue } = this.state 
        let { testIsFinished } = this.props.book_test 
        return (
            <div className="test-question">
    			<h3>{objectQuestion.text}</h3>
                <Images images={objectQuestion.picture_url} />
                <RadioGroup
			        name={"question " + index}
			        selectedValue={ ((testIsFinished) && (rightAnswer === selectedValue)) ? rightAnswer : ((testIsFinished) ? '' : selectedValue)}
			        onChange={(value) => this.handleChange(value)}
			        className="test-answers"
                    >
				    { objectQuestion.variants.map((answer, i) =>
				        <label key={i}>
				          <Radio value={answer.value} />
                          <div className="check"></div> 
				          <p style = {(!answer.isCorrect && (testIsFinished)) ? {color: 'red'} : (testIsFinished ? {color: 'green'} : {}) }>{answer.value}</p>
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



