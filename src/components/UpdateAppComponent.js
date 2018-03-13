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

let backgroundStyle = {
  opacity: '0.3',
  backgroundColor: '#000',
  width: '100%',
  height: '100%'
}

class UpdateApp extends Component {
  static propTypes = {
    // This view takes a isLoading property
    isLoading: PropTypes.bool,
  }
  
  render() {
    const { isLoading } = this.props

    return  <ModalContainer>
                {
                  isLoading ?
                  <div ><ReactSpinner color="white" /> <p style={textStyle}>Идет обновление...</p></div> :
                  <div></div>
                }
            </ModalContainer>
  }
}

export default UpdateApp