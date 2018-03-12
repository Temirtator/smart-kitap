import React, { Component } from 'react'
import Login from './LoginComponent'
import Registration from './RegistrationComponent'
import EnterKey from './EnterKeyComponent'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as licenseRequestActions from '../actions/licenseRequest'

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
            loginClass: 'auth-component__header__login'
        }
        this.checkAuth = this.checkAuth.bind(this)
        //this.clearData = this.clearData.bind(this)
    }

    checkAuth() {
        if (this.state.access_token) {
            this.props.history.push('/main-personal-page')
        }
    }

    componentWillMount() {
        let {license_token} = this.state
        if (license_token !== undefined && license_token !== null) { // if license toke exist
            this.props.licenseRequestActions.checkActivation(this.state.license_token) // check activation of application
            .then(response => {
                if (response.status === 200) { 
                    this.setState(prev => {
                        return {
                            enterKeyClass: prev.enterKeyClass + ' disableElement'
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
    
    render() {
        let { enterKey, registration, login, license_token, enterKeyClass, registrationClass, loginClass } = this.state
        let element
        

        if (enterKey) {
            element = <EnterKey callBackFunc={() => this.setState(prev => { return { enterKeyClass: prev.enterKeyClass + ' disableElement',
                                                                                     registrationClass: 'auth-component__header__registration',
                                                                                     loginClass: 'auth-component__header__login' }  })} />
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
   licenseRequestActions: bindActionCreators(licenseRequestActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent)

