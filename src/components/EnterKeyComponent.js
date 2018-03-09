import React, { Component, PropTypes } from 'react'

class EnterKey extends Component {
    static propTypes = {
        
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="enterKey-component">
        		<div className="row">
					<div className="col-md-4 email__auth">
						<input type="text" className="form-control" placeholder="Ключ от программы" />
					</div>
				</div>
				<div className="row" style={{textAlign: 'center'}}>
					<button type="submit" className="btn btn-primary">Ввести ключ</button>
				</div>
        	</div>
        )
    }
}

export default EnterKey
