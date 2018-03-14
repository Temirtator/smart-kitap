import React, { Component, PropTypes } from 'react'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'

class SelectorBooks extends Component {
    static propTypes = {
        className: PropTypes.string,
    }

    constructor(props) {
        super(props)
    }

    render() {
    	let a = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
        return (
            <ModalContainer>
            	<div className="container books-selector">
            		<button type="button" className="btn btn-default">Сохранить отмеченные книги</button>
            		<div className="books">
	            	
	            	{
	            		a.map((value, index) => 
	            			<div className="col-sm-4 books__book" key={index}>
								<img src={'http://smartkitap.avsoft.kz/u/cover/123as.jpg'} alt="book image" />
								<div className="books__book__wrap">
									<div className="books__book__wrap__text col-md-10">
										<p title="name" className="books__book__name">"name"</p>
										<p title="author" className="books__book__author">"author"</p>
									</div>
									<input className="simple-checkbox" type="checkbox" title="bookmark page"  />
								</div>
							</div>
						)
	            	}

					</div>
            	</div>
            </ModalContainer>
        )
    }
}

export default SelectorBooks
