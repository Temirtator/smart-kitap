import React, {Component} from 'react'

import Login from './LoginComponent'
import Registration from './RegistrationComponent'
import EnterKey from './EnterKeyComponent'
import UpdateApp from './UpdateAppComponent'
import {withRouter} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as licenseRequestActions from '../actions/licenseRequest'
import * as updateAppActions from '../actions/updateVersion'
import ReactGA from 'react-ga';
import {version} from '../../package.json'

/*window.onbeforeunload = function () { // i need finish to write this function
 let massive = ['access_token', 'author', 'book_id', 'img', 'name', 'opened_book_menu']
 massive.map((value, index) => {
 window.localStorage.removeItem(value)
 })

 return 'Данные авторизации будут удалены, хотите закрыть?'
 }*/


const versionStyle = {
    position: 'absolute',
    zIndex: '5000',
    color: 'white',
    padding: '15px 15px'
}
class AuthComponent extends Component {

    constructor(props) {
        super(props)
        let license_token = window.localStorage.getItem('license_token')
        let enterKeyClass = 'auth-component__header__enter-key',
            registrationClass = 'auth-component__header__registration',
            loginClass = 'auth-component__header__login'
        this.state = {
            enterKey: license_token ? false : true,
            registration: false,
            login: license_token ? true : false,
            access_token: window.localStorage.getItem('access_token'),
            license_token: license_token,
            enterKeyClass: license_token ? enterKeyClass + ' disableElement' : enterKeyClass,
            registrationClass: license_token ? registrationClass : registrationClass + ' disableElement',
            loginClass: license_token ? loginClass : loginClass + ' disableElement',
            isLoading: false,
            progress: 0
        }
        this.checkAuth = this.checkAuth.bind(this)
        ReactGA.initialize('UA-66591915-12');
        ReactGA.pageview('/Авторизация');
    }

    checkAuth() {
        if (this.state.access_token) {
            this.props.history.push('/main-personal-page')
        }
    }

    authType(key) {
        let {license_token} = this.state
        switch (key) {
            case 'enter-key':
                this.setState({enterKey: true, registration: false, login: false})
                break

            case 'registration':
                this.setState({enterKey: false, registration: true, login: false})
                break

            case 'login':
                this.setState({enterKey: false, registration: false, login: true})
                break
        }
    }

    componentWillMount() {
        let {license_token} = this.state
        try {
            if (window.getMacAddress !== undefined) {
                window.getMacAddress()
            }
        } catch (e) {
            console.log("IS NOT NW JS");
        }
        this.props.updateAppActions.checkVersion(version)
            .then(response => {
                if (version !== response.data.version) { // check for new version
                    // here we need to start download new version
                    console.log("Checkin version", version, response.data.version)
                    if (window.isReactJS()) {
                        console.log('Is not NW.JS project')
                    } else {
                        console.log("It's NW.JS Project")
                        window.loadUpdateFromURL("http://smartkitap.avsoft.kz/" + response.data.path_file, (data) => {
                            //Сохраняет

                            if (data.status === 200) {
                                ReactGA.event({
                                    category: 'Приложение',
                                    action: 'Установление обновление'+response.data.version
                                });
                                this.setState({isLoading: false})
                                window.runUpdate()
                                // this.setState({progress: 0, fileStatus: data.status === 200 ? 'waitReboot' : 'error'})
                            } else if (data.status === 201) {//Загружается
                                this.setState({progress: data.progress})

                                // $('.ui.progress').progress({total: 100, percent: data.progress});
                            }
                            console.log(data, data.status === 200)
                            //Выключается приложение
                            //быстро заменяется файл и включает приложение
                        })
                    }
                } else {
                    this.setState({isLoading: false})
                }
            })
            .then(() => {
                if (license_token !== undefined && license_token !== null) { // if license toke exist
                    this.props.licenseRequestActions.checkActivation(this.state.license_token) // check activation of application
                        .then(response => {
                            if (response.status === 200) {
                                this.checkAuth()
                            }
                        })
                }
            })
    }

    render() {
        let {enterKey, registration, progress, login, license_token, enterKeyClass, registrationClass, loginClass, isLoading} = this.state
        let element


        if (enterKey) {
            element = <EnterKey callBackFunc={() => this.setState(prev => {
                return {
                    enterKeyClass: prev.enterKeyClass + ' disableElement',
                    registrationClass: 'auth-component__header__registration',
                    loginClass: 'auth-component__header__login',
                    enterKey: false, registration: true
                }
            })}/>
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
                <p style={ versionStyle }>Applicaiton Version {version}</p>
                {isLoading ? <UpdateApp progress={progress} isLoading={isLoading}/> : null}
                <div className="auth-component__header">
                    <div className="auth-component__abs">
                        <img src="./image/logo_white.png" alt="logo"/>
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

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    licenseRequestActions: bindActionCreators(licenseRequestActions, dispatch),
    updateAppActions: bindActionCreators(updateAppActions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthComponent)

