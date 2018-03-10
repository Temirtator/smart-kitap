import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as licenseRequestActions from '../actions/licenseRequest'

class EnterKey extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: ''
        }
        this.enterKey = this.enterKey.bind(this)
    }

    enterKey() {
        this.props.licenseRequestActions.activation(this.state.key)
        .then(license_token => {
            window.localStorage.setItem('license_token', license_token)
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

const mapStateToProps = state => ({
   
})

const mapDispatchToProps = dispatch => ({
   licenseRequestActions: bindActionCreators(licenseRequestActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterKey)
