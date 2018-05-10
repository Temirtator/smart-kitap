import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../actions/auth'
import * as checkConnectivity from '../../actions/checkConnectivity'

class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
        	name: '',
        	surname: '',
        	email: '',
        	password: '',
        	repeat_password: '',
        	isPasswRepeated: true,
            license_token: window.localStorage.getItem('license_token')
        }
        this.registration = this.registration.bind(this)
    }
    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase());
    }
    validateNameSurname(name, surname) {
        if (name.length >= 2 && surname.length >= 2) {
            return true
        }
        return false
    }
    registration() {
        this.props.checkConnectivity.onlineCheck().then(() => {
            let { name, surname, email, password, repeat_password, license_token } = this.state
            if (this.validateNameSurname(name, surname)) { // validate name surname
                if (this.validateEmail(email)) { // validation of email
                    if ((password !== repeat_password) && (password.trim() !== '')) { // validate password
                        this.setState({ isPasswRepeated: false })
                    }
                    else {
                        this.setState({ isPasswRepeated: true })
                        this.props.authActions.registration(name, surname, email, password, license_token)
                        .then(response => {
                            alert(response.data.msg)
                        })
                    }
                } else {
                    alert('Пожалуйста, напишите валидный email')
                }
            } else {
                alert('Пожалуйста, заполните поля имени и фамилии')
            }
        })
        .catch(() => {
            alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
        }) 
    }
    render() {
    	let { name, surname, email, password, repeat_password, isPasswRepeated } = this.state
        return (
            <div className="registration-component">
        		<div className="row">
					<div className="col-md-4 email__auth">
						<input type="text" value={name} onChange={(e) => this.setState({ name: e.target.value })} className="form-control" placeholder="Имя" />
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 email__auth">
						<input type="text" value={surname} onChange={(e) => this.setState({ surname: e.target.value })} className="form-control" placeholder="Фамилия" />
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 email__auth">
						<input type="email" value={email} onChange={(e) => this.setState({ email: e.target.value })} className="form-control" placeholder="Почта" />
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 email__auth">
						<input type="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} className={isPasswRepeated ? "form-control verified" : "form-control not-verified"} placeholder="Пароль" />
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 email__auth">
						<input type="password" value={repeat_password} onChange={(e) => this.setState({ repeat_password: e.target.value })} className={isPasswRepeated ? "form-control verified" : "form-control not-verified"} placeholder="Повторить пароль" />
					</div>
				</div>
				<div className="row" style={{textAlign: 'center'}}>
					<button type="submit" onClick={this.registration} className="btn btn-primary">Регистрация</button>
				</div>
        	</div>
        )
    }
}
const mapStateToProps = state => ({ })
const mapDispatchToProps = dispatch => ({
   authActions: bindActionCreators(authActions, dispatch),
   checkConnectivity: bindActionCreators(checkConnectivity, dispatch),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration)

