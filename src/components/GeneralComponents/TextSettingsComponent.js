import React, { Component } from 'react'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appStateControl from '../../actions/appStateControl'
import PropTypes from 'prop-types'

class TextSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
        this.changeColor = this.changeColor.bind(this)
        this.changeSize = this.changeSize.bind(this)
        this.setBlindMode = this.setBlindMode.bind(this)
    }
    onVisibleChange = (visible) => {
        this.setState({
            visible
        })
    }
    renderTextSize = (props) => {
        return (
            <div className="text-settings__choice">
                <div onClick={() => this.changeSize('3x')} className="text-settings__text-size tooltip-textsize-settings"> 
                    <span>А</span>
                    <span>А</span>
                    <span>+</span>
                    &nbsp;
                    <span>-</span>
                </div>
                <div onClick={() => this.changeSize('2x')} className="text-settings__text-size tooltip-textsize-settings"> 
                    <span>А</span>
                    <span>А</span>
                    <span>+</span>
                    &nbsp;
                    <span>-</span>
                </div>
                <div onClick={() => this.changeSize('1x')} className="text-settings__text-size tooltip-textsize-settings"> 
                    <span>А</span>
                    <span>А</span>
                    <span>+</span>
                    &nbsp;
                    <span>-</span>
                </div>
            </div>
        )
    }
    
    changeColor = (colorStyle) => {
        if (this.props.changeColor !== undefined)
            this.props.changeColor(colorStyle)
    }
    
    changeSize = (size) => {
        if (this.props.changeTextSize !== undefined)
            this.props.changeTextSize(size)
    }
    
    setBlindMode = () => {
        this.props.appStateCtrlActions.changeBlindMode()
    }
    
    render() {
        const {textSize, textColor, blindMode, appStateControl, generalStyle} = this.props
        
        return (
            <div className="text-settings" style={generalStyle}>
                <Tooltip
                  placement="bottom"
                  visible={this.state.visible}
                  animation="zoom"
                  onVisibleChange={this.onVisibleChange}
                  trigger="click"
                  overlay={this.renderTextSize.bind(this)}
                >
                    <div style={textSize} className="text-settings__text-size">	
    	            	<span>А</span>
    	            	<span>А</span>
    	            	<span>+</span>
                        &nbsp;
    	            	<span>-</span>
    	            </div>
                </Tooltip>
	            <div style={textColor} className="text-settings__text-style">
            		<span onClick={() => this.changeColor('a')}>а</span>
            		<span onClick={() => this.changeColor('b')}>а</span>
            		<span onClick={() => this.changeColor('c')}>а</span>
	            </div>
                <div onClick={this.setBlindMode} style={blindMode} className={appStateControl.blindMode ? "text-settings__blind-mode blind-mode-turn-on" : "text-settings__blind-mode"}>
                    <svg    version="1.1" 
                            id="Capa_1" 
                            xmlns="http://www.w3.org/2000/svg" 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            x="0px" 
                            y="0px"
                            width="31.592px" 
                            height="31.592px" 
                            viewBox="0 0 31.592 31.592"
                            style={{enableBackground: 'new 0 0 31.592 31.592'}}
                            xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M14.65,20.391c-0.905-1.318-1.393-2.875-1.393-4.51c0-2.134,0.759-4.216,2.34-5.649c1.532-1.391,3.856-2.219,4.993-2.311
                                        c-2.081-1.415-4.62-2.557-7.396-2.557c-7.153,0-12.727,7.572-12.96,7.893c-0.312,0.431-0.312,1.014,0,1.444
                                        c0.233,0.321,5.807,7.896,12.96,7.896c1.068,0,2.101-0.17,3.083-0.459c-0.235-0.188-0.463-0.389-0.681-0.606
                                        C15.242,21.178,14.928,20.795,14.65,20.391z M12.579,11.38c-0.215,0.027-0.96,0.31-1.44,0.987
                                        c-0.444,0.627-0.548,1.447-0.308,2.437c0.159,0.659-0.244,1.323-0.904,1.484c-0.098,0.024-0.195,0.035-0.29,0.035
                                        c-0.556,0-1.058-0.378-1.194-0.94c-0.549-2.253,0.151-3.766,0.836-4.634c0.937-1.188,2.389-1.829,3.283-1.829h0.002
                                        c0.68,0,1.229,0.553,1.227,1.232C13.79,10.823,13.249,11.372,12.579,11.38z M2.802,13.979C3.9,12.676,6.46,9.946,9.626,8.602
                                        c-1.831,1.146-3.049,3.181-3.049,5.5c0,1.923,0.838,3.65,2.168,4.837C5.988,17.508,3.795,15.16,2.802,13.979z"/>
                                    <path d="M20.861,18.594c-1.756-0.319-2.197-2.016-2.215-2.095c-0.088-0.362-0.448-0.584-0.813-0.501
                                        c-0.364,0.085-0.59,0.449-0.506,0.812c0.025,0.106,0.646,2.635,3.293,3.115c0.041,0.006,0.081,0.01,0.123,0.01
                                        c0.32,0,0.604-0.229,0.665-0.557C21.474,19.014,21.23,18.66,20.861,18.594z"/>
                                    <path d="M31.274,23.037l-2.585-2.585c-0.397-0.396-1.038-0.396-1.437,0v0.002l-0.702-0.703c1.875-2.565,1.653-6.195-0.663-8.512
                                        c-1.238-1.241-2.889-1.924-4.642-1.924c-1.754,0-3.402,0.683-4.643,1.924c-1.241,1.241-1.923,2.889-1.923,4.644
                                        c-0.002,1.754,0.682,3.402,1.923,4.643c1.239,1.24,2.889,1.925,4.643,1.925c1.41,0,2.753-0.442,3.869-1.262l0.701,0.702h-0.001
                                        c-0.396,0.396-0.395,1.039,0.001,1.436l2.584,2.585c0.424,0.423,1.107,0.423,1.531,0l1.342-1.342
                                        C31.697,24.146,31.697,23.461,31.274,23.037z M24.453,19.09c-0.856,0.856-1.994,1.328-3.205,1.328s-2.351-0.473-3.206-1.328
                                        s-1.327-1.996-1.327-3.207c0-0.767,0.189-1.505,0.546-2.16c0.206-0.381,0.469-0.732,0.781-1.046
                                        c0.046-0.046,0.092-0.09,0.139-0.134c0.84-0.771,1.922-1.194,3.067-1.194c1.211,0,2.349,0.472,3.205,1.328
                                        c0.172,0.172,0.328,0.356,0.467,0.547C26.203,14.995,26.049,17.494,24.453,19.09z"/>
                                    <circle cx="18.128" cy="14.628" r="0.664"/>
                                </g>
                            </g>
                    </svg>
                </div>
            </div>
        )
    }
}

TextSettings.propTypes = {
    textSize: PropTypes.object,
    textColor: PropTypes.object,
    blindMode: PropTypes.object,
    generalStyle: PropTypes.object,
    changeTextSize: PropTypes.func,
    changeColor: PropTypes.func
}

const mapStateToProps = state => ({
   appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
   appStateCtrlActions: bindActionCreators(appStateControl, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextSettings)