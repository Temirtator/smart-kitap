import React, { Component } from 'react'

import Login from './LoginComponent'
import Registration from './RegistrationComponent'
import EnterKey from './EnterKeyComponent'
import UpdateApp from './UpdateAppComponent'

import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as licenseRequestActions from '../actions/licenseRequest'
import * as updateAppActions from '../actions/updateVersion'

import { version } from '../../package.json'

window.onbeforeunload = function () { // i need finish to write this function
    let massive = ['access_token', 'author', 'book_id', 'img', 'name', 'opened_book_menu']
    massive.map((value, index) => {
        window.localStorage.removeItem(value)
    })
    
    return 'Данные авторизации будут удалены, хотите закрыть?'
}

class AuthComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        	enterKey: true,
            registration: false,
            login: false,
            access_token: window.localStorage.getItem('access_token'),
            license_token: window.localStorage.getItem('license_token'),
            enterKeyClass: 'auth-component__header__enter-key',
            registrationClass: 'auth-component__header__registration',
            loginClass: 'auth-component__header__login',
            isLoading: false
        }

        this.checkAuth = this.checkAuth.bind(this)
    }

    checkAuth() {
        if (this.state.access_token) {
            this.props.history.push('/main-personal-page')
        }
    }

    authType(key) {
        let {license_token} = this.state
        switch(key) {
            case 'enter-key':
                this.setState({ enterKey: true, registration: false, login: false })
                break

            case 'registration':
                this.setState({ enterKey: false, registration: true, login: false })
                break

            case 'login':
                this.setState({ enterKey: false, registration: false, login: true })
                break
        }
    }

    componentWillMount() {
        let {license_token} = this.state
        this.props.updateAppActions.checkVersion(version)
        .then(response => {
            if (version !== response.data.version) { // check for new version
                // here we need to start download new version
                this.setState({ isLoading: true })
            }
            else {
                if (license_token !== undefined && license_token !== null) { // if license toke exist
                    this.props.licenseRequestActions.checkActivation(this.state.license_token) // check activation of application
                    .then(response => {
                        if (response.status === 200) { 
                            this.setState(prev => {
                                return {
                                    enterKeyClass: prev.enterKeyClass + ' disableElement',
                                    enter: false,
                                    registration: true
                                }
                            })
                            alert(response.msg)
                            this.checkAuth()
                        }
                    })
                } else {
                    //enterKeyClass += ' disableElement'
                    this.setState(prev => {
                        return {
                            registrationClass: prev.registrationClass + ' disableElement',
                            loginClass: prev.loginClass + ' disableElement'
                        }
                    })
                }               
            }
        })
    }

    render() {
        let { enterKey, registration, login, license_token, enterKeyClass, registrationClass, loginClass, isLoading } = this.state
        let element
        

        if (enterKey) {
            element = <EnterKey callBackFunc={() => this.setState(prev => { return { enterKeyClass: prev.enterKeyClass + ' disableElement',
                                                                                     registrationClass: 'auth-component__header__registration',
                                                                                     loginClass: 'auth-component__header__login',
                                                                                     enterKey: false, registration: true }  })} />
            enterKeyClass += " auth-component--selected"
        } 
        else if (registration) {
            element = <Registration />
            registrationClass += " auth-component--selected"
        }
        else if (Login) {
            element = <Login />
            loginClass += " auth-component--selected"
        }
    	return (
        	<div className="auth-component">
                <UpdateApp isLoading={isLoading} />
        		<div className="auth-component__header">
        			<div className="auth-component__abs">
                        <img src="./image/logo_white.png" alt="logo" />
                    </div>
        		</div>
                
        		<div className="auth-component__content">
        			<div className="auth-component__content__wrap">
        				<div className="row">
                            <div className="auth-component__header__buttons">
                                <div onClick={() => this.authType('enter-key')} className={enterKeyClass}>
                                    <span>Ввести ключ</span>
                                </div>
                                <div onClick={() => this.authType('registration')} className={registrationClass}>
                                    <span>Регистрация</span>
                                </div>
                                <div onClick={() => this.authType('login')} className={loginClass}>
                                    <span>Войти</span>
                                </div>
                            </div>
        				</div>
        				{ element }
        			</div>
        		</div>

                <div className="container av-support auth-av-support">
                    <div className="row">
                        <img src="./image/headphone.svg" alt="headphone"/>&nbsp;&nbsp;<span>Support</span>
                    </div>
                    <div className="row av-site">
                        <span className="av-site">Avsoft.kz</span>
                    </div>
                    <div className="row">
                        <span className="av-number">+7 777 777 77 77</span>
                    </div>
                </div>

        	</div>   
        )
    }
}

const mapStateToProps = state => ({
   
})

const mapDispatchToProps = dispatch => ({
   licenseRequestActions: bindActionCreators(licenseRequestActions, dispatch),
   updateAppActions: bindActionCreators(updateAppActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent)

