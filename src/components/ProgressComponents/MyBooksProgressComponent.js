import React, { Component } from 'react'
import PieComponent from './PieComponent'
import PieComponentDuration from './PieComponentDuration'
import TestTab from '../TestComponents/TestsTabComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as languages from '../../resources/language/languages.json'

import * as userProgressRequestActions from '../../actions/userProgressRequest'
import * as checkConnectivity from '../../actions/checkConnectivity'

class MyBooksProgress extends Component {
	constructor(props) {
		super(props)
        
		this.state = {
			access_token: window.localStorage.getItem('access_token'),
			license_token: window.localStorage.getItem('license_token'),
			books_progress: []
		}
        
		this.checkAuth = this.checkAuth.bind(this)
	}
    
	checkAuth() {
        if (!this.state.access_token) {
            this.props.history.push('/')
        }
    }
    
    componentWillMount() {
        this.props.checkConnectivity.onlineCheck().then(() => {
            let {license_token, access_token} = this.state
            this.checkAuth()
            try {
                this.props.userProgressRequestActions.getAllUserProgress(license_token, access_token)
                .then(general_progress => {
                    //console.log('Return from promise', general_progress)
                    this.setState({
                        books_progress: general_progress
                    })
                })
            }
            catch(e) {
                console.log(e, 'error on getAllUserProgress')
            }  
        })
        .catch(() => {
            alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
        })
    }
    
    render() {
    	let { books_progress } = this.state /* books_progress variable may sometimes undefined or null, this is bug*/
        //TODO: need debugging here
    	//console.log('Render method books_progress', books_progress)
    	let { language } = this.props.appStateControl.user_settings
    	let choosenLang = languages[0][language]
        
    	return (
    		<div style={{margin:'0 auto', width: 'inherit'}}>
    		{books_progress.length > 0 ? <div className="my-books">
            	<div className="my-books__statistics">
	            	<div className="col-sm-4 my-books__development">
	            		<h4>{choosenLang['familiarization']}</h4>
	            		<PieComponent itemName={[choosenLang['all_pages'], choosenLang['readed_pages']]} chartData={books_progress[0]} />
	            	</div>
	            	<div className="col-sm-4 my-books__test">
	            		<h4>{choosenLang['tests']}</h4>
	            		<PieComponent itemName={[choosenLang['correct'], choosenLang['incorrect']]} chartData={books_progress[1]} />
	            	</div>
	            	<div className="col-sm-4 my-books__duration">
	            		<h4>{choosenLang['duration']}</h4>
	            		<PieComponentDuration itemName={[choosenLang['minute']]} chartData={books_progress[2]} />
	            	</div>
	            </div>
	            
	            <div className="my-books__test-by-books">
		            <h2>{choosenLang['progress-by-books']}</h2>
		            <TestTab />
	            </div>
	            
            </div> : null}
           </div>
            
        )
    }
}

const mapStateToProps = state => ({
   books_progress: state.books_progress,
   appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
   userProgressRequestActions: bindActionCreators(userProgressRequestActions, dispatch),
   checkConnectivity: bindActionCreators(checkConnectivity, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyBooksProgress)

