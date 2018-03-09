import React, { Component } from 'react'
import Login from './LoginComponent'
import Registration from './RegistrationComponent'
import EnterKey from './EnterKeyComponent'
import { withRouter } from 'react-router'

class AuthComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        	enterKey: true,
            registration: false,
            login: false,
            access_token: window.localStorage.getItem('access_token')
        }
        this.checkAuth = this.checkAuth.bind(this)
    }

    checkAuth() {
        if (this.state.access_token) {
            this.props.history.push('/main-personal-page')
        }
    }

    componentWillMount() {
        this.checkAuth()
    }
    
    authType(key) {
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
        let { enterKey, registration, login } = this.state
        let element, 
            enterKeyClass = 'auth-component__header__enter-key', 
            registrationClass = 'auth-component__header__registration', 
            loginClass = 'auth-component__header__login'

        if (enterKey) {
            element = <EnterKey />
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

export default withRouter(AuthComponent)
