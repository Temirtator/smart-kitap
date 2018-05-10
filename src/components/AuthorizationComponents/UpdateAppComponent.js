import React, { Component } from 'react'
import {ModalContainer} from 'react-modal-dialog'
import ReactSpinner from 'react-spinjs'
import PropTypes from 'prop-types'

let textStyle = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: 'calc(50vw + 100px)'
}

class UpdateApp extends Component {
  render() {
    const { isLoading,progress } = this.props

    return  <ModalContainer>
                {
                  isLoading ?
                  <div ><ReactSpinner color="white" /> <p style={textStyle}>Идет обновление... {progress}%</p></div> :
                  <div></div>
                }
            </ModalContainer>
  }
}
UpdateApp.propTypes = {
  // This view takes a isLoading property
  isLoading: PropTypes.bool,
}
export default UpdateApp