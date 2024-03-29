import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../actions/auth'
import { withRouter } from 'react-router'
import * as checkConnectivity from '../../actions/checkConnectivity'

class Login extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			forgotPassword: false,
			emailForgot: ''
		}
		
		this.login = this.login.bind(this)
		this.forgotPassword = this.forgotPassword.bind(this)
		this.renderLoginComponent = this.renderLoginComponent.bind(this)
	}
	
	login() {
		this.props.checkConnectivity.onlineCheck().then(() => {
			let { email, password } = this.state
			this.props.authActions.login(email, password)
			.then((response) => {
				try {
					window.localStorage.setItem('access_token', response.data.token)
					this.props.history.push('/main-personal-page')	
				} catch(e) {
					alert('Почта или пароль являются неверными')
				}
			})
		}).catch((e) => {
			console.log(e)
			alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
		})
	}

	forgotPassword() {
			this.props.checkConnectivity.onlineCheck().then(() => {
				this.props.authActions.forgotPassword(this.state.emailForgot)
				.then(response => {
					if (response.data) {
						alert(response.data.msg)
					}
				})
				this.setState(prev => {
					return {
						forgotPassword: !prev.forgotPassword
					}
				})
			})
			.catch(() => {
				alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
			})
	}
	
	renderLoginComponent() {
		let {forgotPassword, email, password, emailForgot} = this.state
		if (!forgotPassword) {
			return ( <div className="login-component">
		        		<div className="row">
							<div className="col-md-4 email__auth">
								<input type="email" value={email} onChange={(e) => this.setState({email: e.target.value})} className="form-control" placeholder="Почта" />
							</div>
						</div>
						<div className="row">
							<div className="col-md-4 email__auth">
								<input type="password" value={password} onChange={(e) => this.setState({password: e.target.value})} className="form-control" placeholder="Пароль" />
							</div>
						</div>
						<div className="row">
							<div className="form-check forgot-password">
							    <a onClick={() => this.setState({forgotPassword: true})}>забыли пароль?</a>
							</div>
						</div>
						<div className="row" style={{textAlign: 'center'}}>
							<button onClick={this.login} type="submit" className="btn btn-primary">Войти</button>
						</div>
		        	</div>)
		} 
		else {
			return (
				<div className="login-component">
	        		<div className="row">
						<div className="col-md-4 email__auth">
							<input type="email" value={emailForgot} onChange={(e) => this.setState({emailForgot: e.target.value})} className="form-control" placeholder="Почта" />
						</div>
					</div>
					<div className="row" style={{textAlign: 'center'}}>
						<button onClick={this.forgotPassword} type="submit" className="btn btn-primary">Восстановить пароль</button>
					</div>
	        	</div>
			)
				
		}
	}

    render() {
    	return (
        	<div>
       			{this.renderLoginComponent()}
       		</div>
        )
    }
}

const mapStateToProps = state => ({ })

const mapDispatchToProps = dispatch => ({
   authActions: bindActionCreators(authActions, dispatch),
   checkConnectivity: bindActionCreators(checkConnectivity, dispatch)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login))
