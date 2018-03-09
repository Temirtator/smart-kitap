import React, { Component } from 'react'
import MyBooksProgress from './MyBooksProgressComponent'
import NavigationHeader from './NavigationHeaderComponent'

import TextSettings from './TextSettingsComponent'
import BookOrientation from './BookOrientationComponent'

import MainBooks from './MainBooksComponent'
import MyBooks from './MyBooksComponent'
import VideoComponent from './VideoComponent'
import TestComponent from './TestComponent'
import PrecisComponent from './PrecisComponent'
import About from './AboutComponent'
import PersonSettings from './PersonSettingsComponent'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//import { bindActionCreators } from 'redux'
import * as languages from '../resources/language/languages.json'
import * as userDataRequest from '../actions/userDataRequest'
import * as appStateActions from '../actions/appStateControl'

const MyElement = (props) => {
    let menuItem = props.menuItem
    
    switch (menuItem) {
        case 'main':
            return <MainBooks />
            break
        case 'mybooks':
            return <MyBooks />
            break
        case 'book/video':
            return <VideoComponent />
            break
        case 'book/conspect':
            return <PrecisComponent />
            break
        case 'book/test':
            return <TestComponent />
            break
        case 'myprogress':
            return <MyBooksProgress />
            break
        case 'about':
            return <About />
            break 
        case 'settings':
            return <PersonSettings />
            break
        default:
            break
    }
}

class PersonalHomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menuSelected: 'main',
            isBookOrientation: false,
            access_token: window.localStorage.getItem('access_token')
        }
        this.switchFunction = this.switchFunction.bind(this)
        this.findBook = this.findBook.bind(this)
        this.isBookOrientation = this.isBookOrientation.bind(this)
        this.checkAuth = this.checkAuth.bind(this)
    }

    checkAuth() {
        let { access_token } = this.state
        if (!access_token) { // if access token isnt exist
            this.props.history.push('/')
        }
        else {
            this.props.userDataRequest.getUserInfo(access_token)
        }
    }

    componentWillMount() {
        this.checkAuth()
    }

    isBookOrientation(key) {
        var components = [
            'book/video',
            'book/conspect',
            'book/test'
        ]
        for (var i = components.length - 1; i >= 0; i--) {
            if ( components[i] === key ) {
                this.setState({ isBookOrientation: true })
                break
            }
        }
        //this.setState({ isBookOrientation: false })
    }

    switchFunction(key) {
        if (key == 'quit') {
            window.localStorage.clear()
            this.props.history.push('/')
        }

        var components = [
            'main', 
            'mybooks', 
            'book/video',
            'book/conspect',
            'book/test', 
            'myprogress', 
            'about', 
            'settings'
        ]
        // if key will be equal on of the components then open component
        for (var i = components.length - 1; i >= 0; i--) {
            if (components[i] === key) {
                this.setState({ menuSelected: key, isBookOrientation: false })
            }
        }
    }
    
    componentDidMount() {
        //try catch, i need to go away from undefined value 
        try {
            let { menuSelected } = this.props.location.state
            if (menuSelected !== undefined) {
                this.setState({
                    menuSelected: menuSelected
                })
                // this function is need to change navigation headers
                this.isBookOrientation(menuSelected)
            }
        } catch(e) {
            console.log("Cannot read property 'menuSelected' of undefined")
        }
    }

    // search text from book content
    findBook(e) {
        this.props.appStateActions.setSearchBook(e.target.value)
    }
    
    render() {
        let { icons, menuSelected, isBookOrientation } = this.state
        let { language } = this.props.appStateControl.user_settings
        let { blindMode } = this.props.appStateControl 
        let { isTurnOn, theme } = this.props.appStateControl.theme_settings
        let bodyClass = "personal-home-page__body"
        let bodyMainClass = "personal-home-page__body__main"
        if (blindMode) {
            bodyClass += " blindMode"
            bodyMainClass += " blindMode"
        }
        else if (isTurnOn && (theme === 1)) {
            bodyClass += " blackMode"
            bodyMainClass += " blackMode"
        }

        return (
            <div className="personal-home-page">
            	<NavigationHeader switchFunction={this.switchFunction} />
            	<div className={bodyClass}>
                    <div className="personal-home-page__body__header">
                        { isBookOrientation ? <BookOrientation isInMainPage={true} menuSelected={(menuSelected) => this.setState({menuSelected})} /> : <TextSettings textColor={{display: 'none'}} /> }
                        <div className="col-sm-4 imaginary_container">
                            <div className="input-group stylish-input-group">
                                <input onChange={(e) => this.findBook(e)} ref="findTextValue" type="text" className="form-control form-control_search" placeholder={languages[0][language]['search-book']}></input>
                            </div>
                        </div>
                    </div>

            		<div className={bodyMainClass}>
						<MyElement menuItem={this.state.menuSelected} />
					</div>
            	</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
   appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
    userDataRequest: bindActionCreators(userDataRequest, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalHomePage))
