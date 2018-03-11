import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as languages from '../resources/language/languages.json'

class NavigationHeader extends Component {

	static propType = {
		switchFunction: PropTypes.func.isRequired
	}
    
    render() {
    	let { switchFunction, appStateControl, userData } = this.props
    	let { language } = this.props.appStateControl.user_settings
        let { isTurnOn, theme } = this.props.appStateControl.theme_settings
        let choosenLang = languages[0][language]
        let mainClass = "personal-home-page__header"
        
        if (appStateControl.blindMode) {
            mainClass += " blindMode"
        }
        else if (isTurnOn && (theme === 1)) {
            mainClass += " blackMode"
        }
        let fl_name, fl_surname
        try {
            fl_name = userData.first_name.charAt(0)
            fl_surname = userData.last_name.charAt(0)
        } catch(e) {
            console.log('get charAt from string is return null, this is try catch handler')
        }
        return (
            <div className={mainClass}>
        		<div className="personal-home-page__header__first-lvl">
        			<div className="first-lvl__logo">
        				<img src='./image/logo_icon.png' alt="logo" />
                        <h3>SmartKitap</h3>
        			</div>
                    <div className="first-lvl__avatar">
                        <div className="first-lvl__avatar__initial"><p>{fl_name} {fl_surname}</p></div>
                        <h4>{userData.first_name} {userData.last_name}</h4>
                    </div>
        		</div>
        		<div className="second-lvl__menu">
                    <span onClick={() => switchFunction('main')}>
                        <i className="fas fa-home"></i>&nbsp;&nbsp;&nbsp;&nbsp;<p>{choosenLang['main']}</p>
                    </span>
                    <span onClick={() => switchFunction('mybooks')}>
                        <svg    version="1.1" 
                                id="Capa_1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                x="0px" 
                                y="0px"
                                width="97.391px" 
                                height="97.391px" 
                                viewBox="0 0 97.391 97.391" 
                                style={{enableBackground: 'new 0 0 97.391 97.391'}}
                                xmlSpace="preserve">
                        <g>
                            <path fill="#ffffff" d="M0,7.573h17.5v8.75H0V7.573z M0,19.823h17.5v59.501H0V19.823z M3.208,68.312c0,3.021,2.447,5.47,5.469,5.47
                                c3.021,0,5.469-2.447,5.469-5.47s-2.448-5.47-5.469-5.47C5.655,62.843,3.208,65.293,3.208,68.312z M0,89.824h17.5v-7H0V89.824z
                                 M21,81.6v1.225v7h22.75v-8.268c-0.929-0.664-3.815-2.232-10.5-2.232C26.913,79.324,22.866,80.744,21,81.6z M21,31.257
                                c1.866,0.854,5.913,2.276,12.25,2.276c6.643-0.001,9.536-1.55,10.5-2.245v-6.215H21V31.257z M21,35.046V77.81
                                c2.534-0.948,6.592-1.985,12.25-1.985c5.105,0,8.417,0.854,10.5,1.767V35.268c-2.083,0.91-5.395,1.765-10.5,1.765
                                C27.592,37.031,23.534,35.994,21,35.046z M80.859,7.18l-12,2.462l1.76,8.571l12-2.462L80.859,7.18z M95.279,77.469l-11.998,2.463
                                L71.32,21.643l12-2.462L95.279,77.469z M91.116,67.08c-0.607-2.957-2.972-4.971-5.275-4.498c-2.307,0.475-3.688,3.258-3.077,6.215
                                c0.606,2.957,2.969,4.973,5.274,4.498C90.346,72.822,91.725,70.041,91.116,67.08z M95.984,80.893l-12.002,2.464l1.408,6.854
                                l12-2.463L95.984,80.893z M49,16.323h17.5v-8.75H49V16.323z M49,89.824h17.5v-7H49V89.824z M49,70.574h17.5V28.573H49V70.574z
                                 M49,79.324h17.5v-5.25H49V79.324z M49,25.073h17.5v-5.25H49V25.073z"/>
                        </g>
                        
                        </svg>
                        &nbsp;&nbsp;&nbsp;&nbsp;<p>{choosenLang['my-books']}</p>
                    </span>
                    <span onClick={() => switchFunction('myprogress')}>
                        <svg    version="1.1" 
                                id="Capa_1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                x="0px" 
                                y="0px"
                                viewBox="0 0 470.1 470.1" 
                                style={{enableBackground: 'new 0 0 470.1 470.1'}} 
                                xmlSpace="preserve">
                        <g>
                            <path fill="#fff" d="M429.457,20.321h-12.461c-4.487,0-8.129,3.633-8.129,8.129s3.642,8.129,8.129,8.129h12.461v58.518
                                h-12.461c-4.487,0-8.129,3.633-8.129,8.129c0,4.495,3.642,8.129,8.129,8.129h12.461v58.526h-12.461
                                c-4.487,0-8.129,3.633-8.129,8.129s3.642,8.129,8.129,8.129h12.461v58.526h-12.461c-4.487,0-8.129,3.633-8.129,8.129
                                c0,4.495,3.642,8.129,8.129,8.129h12.461v58.526h-12.461c-4.487,0-8.129,3.633-8.129,8.129c0,4.495,3.642,8.129,8.129,8.129h12.461
                                v93.755h-93.893v-11.721c0-4.495-3.642-8.129-8.129-8.129c-4.487,0-8.129,3.633-8.129,8.129v11.721h-57.81v-11.721
                                c0-4.495-3.642-8.129-8.129-8.129s-8.129,3.633-8.129,8.129v11.721h-57.81v-11.721c0-4.495-3.642-8.129-8.129-8.129
                                s-8.129,3.633-8.129,8.129v11.721h-57.81v-11.721c0-4.495-3.642-8.129-8.129-8.129c-4.487,0-8.129,3.633-8.129,8.129v11.721H39.285
                                v-11.721c0-4.495-3.642-8.129-8.129-8.129s-8.129,3.633-8.129,8.129v11.721H0V470.1h470.1V0h-40.643V20.321z"/>
                            <path fill="#fff" d="M6.771,369.85c0,4.487,3.642,8.129,8.129,8.129h354.804c4.487,0,8.129-3.642,8.129-8.129V12.193
                                c0-4.487-1.504-4.812-3.365-0.732l-47.503,104.403c-1.861,4.089-6.958,6.812-11.388,6.088l-49.609-8.112
                                c-4.43-0.723-9.844,1.837-12.095,5.723l-87.033,150.362c-2.252,3.885-7.673,6.487-12.112,5.812l-51.438-7.852
                                c-4.438-0.675-10.844,1.089-14.314,3.934l-75.929,62.46c-3.463,2.853-6.275,8.803-6.275,13.29V369.85z"/>
                            <path fill="#fff" d="M17.655,205.255l24.508,24.508c6.771,6.771,17.737,6.771,24.508,0l117.23-117.23l18.119,18.119
                                c6.771,6.771,12.25,4.495,12.25-5.072V50.47c0-9.567-7.755-17.33-17.33-17.33h-75.092c-9.567,0-11.843,5.487-5.072,12.25
                                l18.119,18.119L17.655,180.747C10.892,187.51,10.892,198.484,17.655,205.255z"/>
                        </g>

                </svg>

                        &nbsp;&nbsp;&nbsp;&nbsp;<p>{choosenLang['my-progress']}</p>
                    </span>
                    <span onClick={() => switchFunction('about')}>
                        <svg    version="1.1" 
                                id="Capa_1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                x="0px" 
                                y="0px"
                                viewBox="0 0 23.625 23.625" 
                                style={{enableBackground: 'new 0 0 23.625 23.625'}} 
                                xmlSpace="preserve">
                        <g>
                            <path fill="#fff" d="M11.812,0C5.289,0,0,5.289,0,11.812s5.289,11.813,11.812,11.813s11.813-5.29,11.813-11.813
                                S18.335,0,11.812,0z M14.271,18.307c-0.608,0.24-1.092,0.422-1.455,0.548c-0.362,0.126-0.783,0.189-1.262,0.189
                                c-0.736,0-1.309-0.18-1.717-0.539s-0.611-0.814-0.611-1.367c0-0.215,0.015-0.435,0.045-0.659c0.031-0.224,0.08-0.476,0.147-0.759
                                l0.761-2.688c0.067-0.258,0.125-0.503,0.171-0.731c0.046-0.23,0.068-0.441,0.068-0.633c0-0.342-0.071-0.582-0.212-0.717
                                c-0.143-0.135-0.412-0.201-0.813-0.201c-0.196,0-0.398,0.029-0.605,0.09c-0.205,0.063-0.383,0.12-0.529,0.176l0.201-0.828
                                c0.498-0.203,0.975-0.377,1.43-0.521c0.455-0.146,0.885-0.218,1.29-0.218c0.731,0,1.295,0.178,1.692,0.53
                                c0.395,0.353,0.594,0.812,0.594,1.376c0,0.117-0.014,0.323-0.041,0.617c-0.027,0.295-0.078,0.564-0.152,0.811l-0.757,2.68
                                c-0.062,0.215-0.117,0.461-0.167,0.736c-0.049,0.275-0.073,0.485-0.073,0.626c0,0.356,0.079,0.599,0.239,0.728
                                c0.158,0.129,0.435,0.194,0.827,0.194c0.185,0,0.392-0.033,0.626-0.097c0.232-0.064,0.4-0.121,0.506-0.17L14.271,18.307z
                                 M14.137,7.429c-0.353,0.328-0.778,0.492-1.275,0.492c-0.496,0-0.924-0.164-1.28-0.492c-0.354-0.328-0.533-0.727-0.533-1.193
                                c0-0.465,0.18-0.865,0.533-1.196c0.356-0.332,0.784-0.497,1.28-0.497c0.497,0,0.923,0.165,1.275,0.497
                                c0.353,0.331,0.53,0.731,0.53,1.196C14.667,6.703,14.49,7.101,14.137,7.429z"/>
                        </g>
                        </svg>
                        &nbsp;&nbsp;&nbsp;&nbsp;<p>{choosenLang['about-program']}</p>
                    </span>
                    <div className="">
                        <span onClick={() => switchFunction('settings')}>
                            <i className="fas fa-cog"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                            <p>{choosenLang['settings']}</p>
                        </span>
                        <span onClick={() => switchFunction('quit')}>
                            <i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                            <p>{choosenLang['quit']}</p>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
   appStateControl: state.appStateControl,
   userData: state.userData
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationHeader)

