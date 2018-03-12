import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import Dropdown from './DropdownComponent'
import Toggle from 'react-toggle'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as appStateControlAction from '../actions/appStateControl'
import * as authActions from '../actions/auth'
import * as languages from '../resources/language/languages.json'

class PersonSettings extends Component {
	
    constructor(props) {
        super(props)
        let { nameStore, surnameStore, emailStore, passwordStore, repeat_passwordStore, language } = this.props.appStateControl.user_settings
        let { first_name, last_name, email } = this.props.userData
        let { theme, isTurnOn } = this.props.appStateControl.theme_settings
        this.state = {
        	name: first_name,
        	surname: last_name,
        	email: email,
        	password: passwordStore,
        	repeat_password: repeat_passwordStore,
        	themeOn: isTurnOn,
        	app_lang: language,
        	app_theme: theme,
        	access_token: window.localStorage.getItem('access_token'),
        	license_token: '124235asfa1k2431wasda',
        	isPasswRepeated: true
        }
        this.onChangeSettings = this.onChangeSettings.bind(this)
        this.handleThemeChanged = this.handleThemeChanged.bind(this)
        this.handleUserSettingsChange = this.handleUserSettingsChange.bind(this)
        this.checkAuth = this.checkAuth.bind(this)
    }

    checkAuth() {
        if (!this.state.access_token) {
            this.props.history.push('/')
        }
    }

    componentWillMount() {
        this.checkAuth()
    }

    onChangeSettings(e, key) {
    	let value = e.target.value
    	switch (key) {
    		case 'name':
    			this.setState({ name: value })
    			break
    		case 'surname':
    			this.setState({ surname: value })
    			break
    		case 'email':
    			//this.setState({ email: value })
    			break
    		case 'password':
    			this.setState({ password: value })
    			break
    		case 'repeat-password':
    			this.setState({ repeat_password: value })
    			break
    		default:
    			console.log('no such a keys')
    	}
    }
    
    handleThemeChanged() {
    	this.setState({
    		themeOn: !this.state.themeOn 
    	})
    }

    handleUserSettingsChange() {
    	let { name, surname, email, password, repeat_password, themeOn, app_lang, app_theme, access_token, license_token } = this.state
    	
    	if ((password !== repeat_password) && (password.trim() !== '')) {
    		this.setState({ isPasswRepeated: false })
    	}
    	else {
    		this.setState({ isPasswRepeated: true })
    		this.props.authActions.editPassword(license_token, access_token, password)
    		this.props.appStateControlAction.saveUserSettings(name, surname, email, password, repeat_password, app_lang)
    		if (this.props.appStateControl.blindMode === false)	
    			this.props.appStateControlAction.saveAppTheme(themeOn, app_theme)

    		alert('Настройки изменены')
    	}
    }
    
    render() {
    	let { name, surname, email, password, repeat_password, app_lang, app_theme, isPasswRepeated } = this.state
    	let { language } = this.props.appStateControl.user_settings
    	let { blindMode } = this.props.appStateControl
		let choosenLang = languages[0][language]
    	return (
            <div className="person-settings">
	          	<div className="container">	
	            	<div className="col-sm-6">
	            		<Tabs>
							<div className="react__tablist__wrap">
								<TabList>
									<Tab>{choosenLang['my-settings']}</Tab>
								</TabList>
							</div>
							<TabPanel>
								<div className="form-group">
									<h4>{choosenLang['name']}</h4>
									<input type="text" value={name} onChange={(e) => this.onChangeSettings(e, 'name')} className="form-control" />
								</div>
								
								<div className="form-group">
									<h4>{choosenLang['surname']}</h4>
									<input type="text" value={surname} onChange={(e) => this.onChangeSettings(e, 'surname')} className="form-control" />
								</div>
								
								<div className="form-group">
									<h4>{choosenLang['email']}</h4>
									<input type="email" value={email} onChange={(e) => this.onChangeSettings(e, 'email')} className="form-control" />
								</div>
								
								<div className="form-group">
									<h4>{choosenLang['password']}</h4>
									<input type="password" value={password} onChange={(e) => this.onChangeSettings(e, 'password')} className={isPasswRepeated ? "form-control verified" : "form-control not-verified"} />
								</div>
								
								<div className="form-group">
									<h4>{choosenLang['repeat_password']}</h4>
									<input type="password" value={repeat_password} onChange={(e) => this.onChangeSettings(e, 'repeat-password')} className={isPasswRepeated ? "form-control verified" : "form-control not-verified"} />
								</div>
								<div onClick={this.handleUserSettingsChange} className="save-user-settings-button">
									<span>{choosenLang['save']}</span>
								</div>
							</TabPanel>							
						</Tabs>
	            	</div>
	            	<div className="col-sm-6">
	            		<Tabs>
							<div className="react__tablist__wrap">
								<TabList>
									<Tab>{choosenLang['app-settings']}</Tab>
								</TabList>
							</div>
							<TabPanel>
								<div className="form-group">
									<h4>{choosenLang['app-lang']}</h4>
									<Dropdown returnSelect={(value) => this.setState({app_lang: value})} selected={app_lang} selections={[choosenLang['russian'], choosenLang['english'], choosenLang['kazakh']]} />
								</div>
								<div className="form-group">
									<h4>{choosenLang['app-theme']}</h4>
									<Dropdown returnSelect={(value) => this.setState({app_theme: value})} selected={app_theme} selections={[choosenLang['white-theme'], choosenLang['dark-theme']]} />
								</div>
								<div className="form-group">
									<h4>{choosenLang['app-theme']}</h4>
									<label>
										<Toggle
											checked={ blindMode ? true : !this.state.themeOn }
											onChange={ this.handleThemeChanged }
											disabled={ blindMode ? true : false }
											icons={{
												checked: <p>{choosenLang['turn-on']}</p>,
												unchecked: <p>{choosenLang['turn-off']}</p>
											}}
										/>
									</label>
								</div>
								<div className="container av-support">
									<div className="row">
										<img src="./image/headphone.svg" alt="headphone"/>&nbsp;&nbsp;<span>{choosenLang['support']}</span>
									</div>
									<div className="row av-site">
										<span className="av-site">Avsoft.kz</span>
									</div>
									<div className="row">
										<span className="av-number">+7 777 777 77 77</span>
									</div>
								</div>
								
							</TabPanel>							
						</Tabs>
	            	</div>
	            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
   appStateControl: state.appStateControl,
   userData: state.userData
})

const mapDispatchToProps = dispatch => ({
   appStateControlAction: bindActionCreators(appStateControlAction, dispatch),
   authActions: bindActionCreators(authActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonSettings)