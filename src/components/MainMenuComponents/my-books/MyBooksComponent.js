import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import HumanitarianBooks from '../main-books/HumanitarianBooksComponent'
import TechnicalBooks from '../main-books/TechnicalBooksComponent'
import MedicalBooks from '../main-books/MedicalBooksComponent'
import AllBooks from '../main-books/AllBooks'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as languages from '../../../resources/language/languages.json'
import * as appStateControlActions from '../../../actions/appStateControl'
import * as booksRequest from '../../../actions/booksRequest'
import * as checkConnectivity from '../../../actions/checkConnectivity'

class MyBooks extends Component {
	constructor(props) {
		super(props)
		this.state = {
			access_token: window.localStorage.getItem('access_token'),
			license_token: window.localStorage.getItem('license_token')
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
			let { access_token, license_token } = this.state
			this.checkAuth()
			this.props.booksRequest.getAllMyBooks(license_token, access_token)
			this.props.appStateControlActions.setBookMenu('my_books')
			let localStorage = window.localStorage
			localStorage.setItem('opened_book_menu', 'my_books')
		})
		.catch(() => {
			alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
		})
	}
	
	render() {
       	let { language } = this.props.appStateControl.user_settings
		let choosenLang = languages[0][language]
    	let { all_books, humanitarian_books, technical_books, medical_books } = this.props.my_book_item
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
					<AllBooks all_books={all_books} isMyBook={true} />
				</TabPanel>
				
				<TabPanel>
					<HumanitarianBooks humanitarian_books={humanitarian_books} isMyBook={true} />
				</TabPanel>		
				
				<TabPanel>
					<TechnicalBooks technical_books={technical_books} isMyBook={true} />
				</TabPanel>
				
				<TabPanel>
					<MedicalBooks medical_books={medical_books} isMyBook={true} />
				</TabPanel>
			</Tabs>
        )
    }
}

const mapStateToProps = state => ({
	my_book_item: state.my_book_item,
   	appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
	appStateControlActions: bindActionCreators(appStateControlActions, dispatch),
	booksRequest: bindActionCreators(booksRequest, dispatch),
	checkConnectivity: bindActionCreators(checkConnectivity, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyBooks)

