import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as licenseRequestActions from '../../actions/licenseRequest'
import * as checkConnectivity from '../../actions/checkConnectivity'
import PropTypes from 'prop-types'

class EnterKey extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: ''
        }
        this.enterKey = this.enterKey.bind(this)
    }

    enterKey() {
        // this.props.licenseRequestActions.activation(this.state.key)
        // .then(response => {
        //     if (response.data.status === 200) {
        //         window.localStorage.setItem('license_token', response.data.data.access_token)
        //         window.localStorage.setItem('new_computer', response.data.data.is_new_computer)
        //         window.localStorage.setItem('license_id', response.data.data.history.id)
        //
        //         this.props.callBackFunc() // i'm unlbock registration and login buttons
        //         // alert(response.data.msg)
        //     }
        //     else {
        //         alert(response.data.msg)
        //     }
        this.props.checkConnectivity.onlineCheck().then(() => {
            this.props.licenseRequestActions.activation(this.state.key)
            .then(response => {
                if (response.data.status === 200) {
                    window.localStorage.setItem('license_token', response.data.data.access_token)
                    window.localStorage.setItem('new_computer', response.data.data.is_new_computer)
                    window.localStorage.setItem('license_id', response.data.data.history.id)

                    this.props.callBackFunc() // i'm unlbock registration and login buttons
                    // alert(response.data.msg)
                }
                else {
                    alert(response.data.msg)
                }
            })  
        })
        .catch(() => {
            alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
        })
    }
    
    render() {
        return (
            <div className="enterKey-component">

        		<div className="row">
					<div className="col-md-4 email__auth">
						<input type="text" value={this.state.key} onChange={(e) => this.setState({key: e.target.value})} className="form-control" placeholder="Ключ от программы" />
					</div>
				</div>
				<div className="row" style={{textAlign: 'center'}}>
					<button type="submit" onClick={this.enterKey} className="btn btn-primary">Ввести ключ</button>
				</div>
        	</div>
        )
    }
}

EnterKey.propTypes = {
    callBackFunc: PropTypes.func
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
   licenseRequestActions: bindActionCreators(licenseRequestActions, dispatch),
   checkConnectivity: bindActionCreators(checkConnectivity, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterKey)
