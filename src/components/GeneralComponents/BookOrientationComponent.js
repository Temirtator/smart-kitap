import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
import * as languages from '../../resources/language/languages.json'

const iconStyle = {
    fontSize: '1.5em', 
    color: '#000',
    float: 'left',
    padding: '5px 10px 0 0'
}

class BookOrientation extends Component {
    
    static propTypes = {
        menuSelected: PropTypes.func,
        isInMainPage: PropTypes.bool
    }
    
    constructor(props) {
        super(props)
        this.state = {
            localStorage: window.localStorage
        }

        this.clickOnMenu = this.clickOnMenu.bind(this)
    }
    
    clickOnMenu(key) {
        if (this.refs.bookOrientation) {
            let { history, menuSelected, isInMainPage, location } = this.props
            let { localStorage } = this.state
            if (isInMainPage) { 
                menuSelected('book/' + key) 
            }
            else { 
                let bookData = { menuSelected: 'book/' + key }
                
                if (key === 'conspect' && location.state) {
                    bookData.img = location.state.img
                    bookData.name = location.state.name
                    bookData.author = location.state.author
                    bookData.book_id = location.state.book_id
                }
                else {
                    
                    let book_id = localStorage.getItem('book_id')
                    let img =  localStorage.getItem('img')
                    let name = localStorage.getItem('name')
                    let author = localStorage.getItem('author')
                    bookData.img = img
                    bookData.name = name
                    bookData.author = author
                    bookData.book_id = book_id
                }
                
                history.push({ 
                    pathname: '/main-personal-page', 
                    state: bookData
                }) 
            }
        }
    }
    
    render() {
        const { goBack } = this.props.history
        let { language } = this.props.appStateControl.user_settings
        let choosenLang = languages[0][language]
        return (
            <div ref="bookOrientation" className="book-orientation-component">
                <Link to="/main-personal-page">
                    <div onClick={goBack} className="content__body__main__header__back">
                        <div style={iconStyle}>
                            <i className="fas fa-long-arrow-alt-left "></i>
                        </div>
                        <p>{choosenLang['back']}</p>
                    </div>
                </Link>
                
                <div className="content__body__main__header__menu">
                    <div onClick={() => this.clickOnMenu('conspect')} className="header__menu__conspect">
                        <svg    version="1.1" 
                                id="Capa_1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                x="0px" 
                                y="0px"
                                width="893.4px" 
                                height="893.4px" 
                                viewBox="0 0 893.4 893.4" 
                                style={{enableBackground: 'new 0 0 893.4 893.4'}} 
                                xmlSpace="preserve"
                            >
                            <g>
                                <polygon points="539.001,137.4 508.901,220.2 569.8,220.2"/>
                                <g>
                                    <path d="M747.3,893.4c13.801,0,25-11.2,25-25V25c0-13.8-11.199-25-25-25H146.101c-13.8,0-25,11.2-25,25v700.5H234
                                        c30.3,0,55,24.7,55,55v112.9H747.3z M426.8,297.2l80-205.5c3.701-9.6,13-15.9,23.301-15.9h19c10.199,0,19.4,6.2,23.199,15.7
                                        l82.4,205.6c3.9,9.9-3.299,20.6-13.9,20.6h-16.398c-10.301,0-19.602-6.4-23.301-16l-14.699-38.2h-93.4L479.3,301.3
                                        c-3.6,9.9-13,16.5-23.5,16.5h-15C430.201,317.7,423,307.1,426.8,297.2z M256.5,381.4h380.401c13.799,0,25,11.199,25,25
                                        c0,13.8-11.201,25-25,25H256.5c-13.8,0-25-11.2-25-25C231.5,392.6,242.701,381.4,256.5,381.4z M256.5,493.5h380.401
                                        c13.799,0,25,11.2,25,25s-11.201,25-25,25H256.5c-13.8,0-25-11.2-25-25S242.701,493.5,256.5,493.5z M256.5,655.6
                                        c-13.8,0-25-11.199-25-25c0-13.8,11.2-25,25-25h380.401c13.799,0,25,11.2,25,25c0,13.801-11.201,25-25,25H256.5z"/>
                                    <path d="M121.101,755.5L259,893.4v-0.7V780.5c0-13.8-11.2-25-25-25H121.101z"/>
                                </g>
                            </g>
                        </svg>

                        <p>{choosenLang['precise']}</p>
                    </div>
                    <div onClick={() => this.clickOnMenu('video')} className="header__menu__video">
                        <svg    version="1.1" 
                                id="Layer_1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                x="0px" 
                                y="0px"
                                viewBox="0 0 310 310" 
                                style={{enableBackground: 'new 0 0 310 310'}} 
                                xmlSpace="preserve">
                                <g id="XMLID_822_">
                                    <path id="XMLID_823_" d="M297.917,64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359,0-61.369,5.776-72.517,19.938
                                        C0,79.663,0,100.008,0,128.166v53.669c0,54.551,12.896,82.248,83.386,82.248h143.226c34.216,0,53.176-4.788,65.442-16.527
                                        C304.633,235.518,310,215.863,310,181.835v-53.669C310,98.471,309.159,78.006,297.917,64.645z M199.021,162.41l-65.038,33.991
                                        c-1.454,0.76-3.044,1.137-4.632,1.137c-1.798,0-3.592-0.484-5.181-1.446c-2.992-1.813-4.819-5.056-4.819-8.554v-67.764
                                        c0-3.492,1.822-6.732,4.808-8.546c2.987-1.814,6.702-1.938,9.801-0.328l65.038,33.772c3.309,1.718,5.387,5.134,5.392,8.861
                                        C204.394,157.263,202.325,160.684,199.021,162.41z"/>
                            </g>
                        </svg>
                        <p>
                            {choosenLang['video']}
                        </p>
                    </div>
                    <div onClick={() => this.clickOnMenu('test')} className="header__menu__test">
                        <svg    version="1.1" 
                                id="Layer_1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                x="0px" 
                                y="0px"
                                viewBox="0 0 502 502" 
                                style={{enableBackground: 'new 0 0 502 502'}} 
                                xmlSpace="preserve">
                                <g>
                                    <g>
                                        <g>
                                            <path d="M431,0H71c-5.522,0-10,4.477-10,10v482c0,5.523,4.478,10,10,10h360c5.522,0,10-4.477,10-10V10C441,4.477,436.522,0,431,0
                                                z M421,482H81V20h340V482z"/>
                                            <path d="M126,165h87c5.522,0,10-4.477,10-10V68c0-5.523-4.478-10-10-10h-87c-5.522,0-10,4.477-10,10v87
                                                C116,160.523,120.478,165,126,165z M136,78h67v67h-67V78z"/>
                                            <path d="M126,306h87c5.522,0,10-4.477,10-10v-19c0-5.523-4.478-10-10-10c-5.522,0-10,4.477-10,10v9h-67v-67h62
                                                c5.522,0,10-4.477,10-10s-4.478-10-10-10h-72c-5.522,0-10,4.477-10,10v87C116,301.523,120.478,306,126,306z"/>
                                            <path d="M126,446h87c5.522,0,10-4.477,10-10v-87c0-5.523-4.478-10-10-10h-87c-5.522,0-10,4.477-10,10v87
                                                C116,441.523,120.478,446,126,446z M136,359h67v67h-67V359z"/>
                                            <path d="M327,99h50c5.522,0,10-4.477,10-10s-4.478-10-10-10h-50c-5.522,0-10,4.477-10,10S321.478,99,327,99z"/>
                                            <path d="M268,99h17c5.522,0,10-4.477,10-10s-4.478-10-10-10h-17c-5.522,0-10,4.477-10,10S262.478,99,268,99z"/>
                                            <path d="M268,140h109c5.522,0,10-4.477,10-10s-4.478-10-10-10H268c-5.522,0-10,4.477-10,10S262.478,140,268,140z"/>
                                            <path d="M377,221h-50c-5.522,0-10,4.477-10,10s4.478,10,10,10h50c5.522,0,10-4.477,10-10S382.522,221,377,221z"/>
                                            <path d="M268,241h17c5.522,0,10-4.477,10-10s-4.478-10-10-10h-17c-5.522,0-10,4.477-10,10S262.478,241,268,241z"/>
                                            <path d="M268,282h109c5.522,0,10-4.477,10-10s-4.478-10-10-10H268c-5.522,0-10,4.477-10,10S262.478,282,268,282z"/>
                                            <path d="M377,360h-50c-5.522,0-10,4.477-10,10s4.478,10,10,10h50c5.522,0,10-4.477,10-10S382.522,360,377,360z"/>
                                            <path d="M268,380h17c5.522,0,10-4.477,10-10s-4.478-10-10-10h-17c-5.522,0-10,4.477-10,10S262.478,380,268,380z"/>
                                            <path d="M268,421h109c5.522,0,10-4.477,10-10s-4.478-10-10-10H268c-5.522,0-10,4.477-10,10S262.478,421,268,421z"/>
                                            <path d="M161.907,236.27c-3.991-3.815-10.323-3.672-14.138,0.321c-3.816,3.993-3.672,10.323,0.321,14.139l25.339,24.341
                                                c1.953,1.953,4.512,2.929,7.071,2.929s5.118-0.976,7.071-2.929l59.5-59.5c3.905-3.905,3.905-10.237,0-14.143
                                                c-3.906-3.905-10.236-3.905-14.143,0l-52.52,52.52L161.907,236.27z"/>
                                        </g>
                                    </g>
                                </g>
                        </svg>
                        <p>{choosenLang['tests']}</p>
                    </div>
                </div>
            </div>    
        )
    }
}

const mapStateToProps = state => ({
   main_book_item: state.main_book_item,
   my_book_item: state.my_book_item,
   appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BookOrientation))
