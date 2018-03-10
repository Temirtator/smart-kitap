import React, { Component } from 'react'
import PieComponent from './PieComponent'
import PieComponentDuration from './PieComponentDuration'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as languages from '../resources/language/languages.json'

class IReadBooks extends Component {
    render() {
    	let { i_read } = this.props.books_progress
        let { language } = this.props.appStateControl.user_settings
    	let choosenLang = languages[0][language]
    	//console.log(i_read, 'i_read')
        return (
        <div>
	        { i_read.map((value, index) =>
	            <div className="readed-books-component" key={index}>
					<div className="readed-books-component__img">
						<img src={value.image} alt='image place' />
					</div>
					<div className="readed-books-component__body">
						<div className="readed-books-component__body__text">	
							<h4>{value.name}</h4>
							<p>{value.author}</p>
						</div>
						<div className="readed-books-component__body__statistics">
							<div className="col-sm-4 readed-books-component__body__development">
								<h4>{choosenLang['familiarization']}</h4>
								<PieComponent itemName={[choosenLang['page']]} chartData={value.statistics[0]} />
							</div>
							<div className="col-sm-4 readed-books-component__body__test">
								<h4>{choosenLang['tests']}</h4>
								<PieComponent itemName={[choosenLang['correct'], choosenLang['incorrect']]} chartData={value.statistics[1]} />
							</div>
							<div className="col-sm-4 readed-books-component__body__duration">
								<h4>{choosenLang['duration']}</h4>
								<PieComponentDuration itemName={[choosenLang['minute']]} chartData={value.statistics[2]} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
        )
    }
}

const mapStateToProps = state => ({
   books_progress: state.books_progress,
   appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
   //actions: bindActionCreators(precis_action, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IReadBooks)
