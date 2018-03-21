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
        	isPasswRepeated: true
        }
        this.registration = this.registration.bind(this)
    }
    
    registration() {
        this.props.checkConnectivity.onlineCheck().then(() => {
            let { name, surname, email, password, repeat_password } = this.state
            let access_token = '124235asfa1k2431wasda'
            if ((password !== repeat_password) && (password.trim() !== '')) {
                this.setState({ isPasswRepeated: false })
            }
            else {
                this.setState({ isPasswRepeated: true })
                this.props.authActions.registration(name, surname, email, password, access_token)
                .then(response => {
                    alert(response.data.msg)
                })
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

const mapStateToProps = state => ({
   
})

const mapDispatchToProps = dispatch => ({
   authActions: bindActionCreators(authActions, dispatch),
   checkConnectivity: bindActionCreators(checkConnectivity, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration)

