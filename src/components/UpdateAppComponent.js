import React, { Component, PropTypes } from 'react'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'
import ReactSpinner from 'react-spinjs'

let textStyle = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -51%)',
    left: '56%'
}



class UpdateApp extends Component {
  static propTypes = {
    // This view takes a isLoading property
    isLoading: PropTypes.bool,
  }
  


  render() {
    const { isLoading } = this.props

    return  <div>
              <div>
                {
                  isLoading ?
                  <div><ReactSpinner color="white" /> <p style={textStyle}>Идет обновление...</p></div> :
                  <div></div>
                }
              </div>
            </div>
  }
}

export default UpdateApp