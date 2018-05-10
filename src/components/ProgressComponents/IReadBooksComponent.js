import React, { Component } from 'react'
import PieItemProgress from './PieItemProgressComponent'
import PieItemDuration from './PieItemDurationComponent'
import { connect } from 'react-redux'
import * as languages from '../../resources/language/languages.json'

class IReadBooks extends Component {
    render() {
    	let { i_read } = this.props.books_progress
        let { language } = this.props.appStateControl.user_settings
    	let choosenLang = languages[0][language]
    	
        return (
        <div>
	        { i_read.map((value, index) =>
	            <div className="readed-books-component" key={index}>
					<div className="readed-books-component__img">
						<img src={value.image} alt='place' />
					</div>
					<div className="readed-books-component__body">
						<div className="readed-books-component__body__text">	
							<h4>{value.name}</h4>
							<p>{value.author}</p>
						</div>
						<div className="readed-books-component__body__statistics">
							<div className="col-sm-4 readed-books-component__body__development">
								<h4>{choosenLang['familiarization']}</h4>
								<PieItemProgress itemName={[choosenLang['all_pages'], choosenLang['readed_pages']]} chartData={value.statistics[0]} />
							</div>
							<div className="col-sm-4 readed-books-component__body__test">
								<h4>{choosenLang['tests']}</h4>
								<PieItemProgress itemName={[choosenLang['correct'], choosenLang['incorrect']]} chartData={value.statistics[1]} />
							</div>
							<div className="col-sm-4 readed-books-component__body__duration">
								<h4>{choosenLang['duration']}</h4>
								<PieItemDuration itemName={[choosenLang['minute']]} chartData={value.statistics[2]} />
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
