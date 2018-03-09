import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
import * as languages from '../resources/language/languages.json'

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
                        <p>{choosenLang['precise']}</p>
                    </div>
                    <div onClick={() => this.clickOnMenu('video')} className="header__menu__video">
                       {/* <svg    version="1.1" 
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
                        </svg>*/}
                        <p>
                            {choosenLang['video']}
                        </p>
                    </div>
                    <div onClick={() => this.clickOnMenu('test')} className="header__menu__test">
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
