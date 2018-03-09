import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import HumanitarianBooks from './HumanitarianBooksComponent'
import TechnicalBooks from './TechnicalBooksComponent'
import MedicalBooks from './MedicalBooksComponent'
import AllBooks from './AllBooks'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as languages from '../resources/language/languages.json'
import * as booksRequest from '../actions/booksRequest'
import * as appStateControlActions from '../actions/appStateControl'

class MainBooks extends Component {
	constructor(props) {
		super(props)

		this.state = {
			access_token: window.localStorage.getItem('access_token'),
			license_token: '124235asfa1k2431wasda'
		}

		this.checkAuth = this.checkAuth.bind(this)
	}

	checkAuth() {
        if (!this.state.access_token) {
            this.props.history.push('/')
        }
    }
    
	componentWillMount() {
		let { license_token, access_token } = this.state
		this.checkAuth()
		this.props.booksRequest.getAllBooks(license_token, access_token)
		this.props.appStateControlActions.setBookMenu('main_books')
		let localStorage = window.localStorage
		localStorage.setItem('opened_book_menu', 'main_books')
	}
	
	render() {
       	let { language } = this.props.appStateControl.user_settings
		let choosenLang = languages[0][language]
    	let { all_books, humanitarian_books, technical_books, medical_books } = this.props.main_book_item
        return (
            <Tabs>
				<div className="react__tablist__wrap">
					<TabList>
						<Tab>{choosenLang['all_books']}</Tab>
						<Tab>{choosenLang['humanitarian']}</Tab>
						<Tab>{choosenLang['technical']}</Tab>
						<Tab>{choosenLang['medical']}</Tab>
					</TabList>
				</div>

				<TabPanel>
					<AllBooks all_books={all_books} isMyBook={false} />
				</TabPanel>
				
				<TabPanel>
					<HumanitarianBooks humanitarian_books={humanitarian_books} isMyBook={false}  />
				</TabPanel>
				
				<TabPanel>
					<TechnicalBooks technical_books={technical_books} isMyBook={false} />
				</TabPanel>
				
				<TabPanel>
					<MedicalBooks medical_books={medical_books} isMyBook={false} />
				</TabPanel>
			</Tabs>
        )
    }
}

const mapStateToProps = state => ({
	main_book_item: state.main_book_item,
	appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
	booksRequest: bindActionCreators(booksRequest, dispatch),
	appStateControlActions: bindActionCreators(appStateControlActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainBooks)

