import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'

import 'bootstrap/fonts/glyphicons-halflings-regular.svg'
import Book from './Book'
import $ from 'jquery'

import * as userProgressRequest from '../actions/userProgressRequest'
import * as booksRequest from '../actions/booksRequest'
import * as precis_action from '../actions/precis'
import * as appStateControlActions from '../actions/appStateControl'
import * as main_actions from '../actions/'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router'

import BookOrientation from './BookOrientationComponent'
import TextSettings from './TextSettingsComponent'
import Sidebar from './Sidebar'

import 'rc-progress/assets/index.css'
import {Line} from 'rc-progress'

import ImageZoom from 'react-medium-image-zoom'
import * as languages from '../resources/language/languages.json'

let book = null, prevTextSize = null, prevStyle = null

//here is some terrible code
const ShowToolTipComponent = (props) => {
    let {rect, onToolTipClick} = props
    if ((typeof rect === 'object') && (rect !== null)) {
        let centralizeLeft = (rect.left + ((rect.width) / 2) + 25),
            centralizeTop = (rect.top - 25)
        return (
            <div onClick={onToolTipClick} className="quote" id="quote"
                 style={{top: centralizeTop + 'px', left: centralizeLeft + 'px'}}>
                <img src='./image/quote.png' style={{width: '100%'}}/>
            </div>
        )
    }
    else {
        return (
            <div>
            </div>
        )
    }
}

const iconStyle = {
    fontSize: '2em',
    color: '#000',
    float: 'left',
    padding: '0 10px 0 0'
}

const progressBarStyle = {
    background: '#009b29', /* Old browsers */
    background: '-moz-linear-gradient(top, #009b29 1%, #db8667 61%, #d8615f 78%, #ea2623 100%)', /* FF3.6-15 */
    background: '-webkit-linear-gradient(top, #009b29 1%,#db8667 61%,#d8615f 78%,#ea2623 100%)', /* Chrome10-25,Safari5.1-6 */
    background: 'linear-gradient(to bottom, #009b29 1%,#db8667 61%,#d8615f 78%,#ea2623 100%)', /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#009b29", endColorstr="#ea2623",GradientType=0 )' /* IE6-9 */
}

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageInView: 1,
            curElement: -1,
            curElementSub: -1,
            chapters: null,
            subChapters: null,
            sidebarChapters: null,
            sidebarSubChapters: null,
            progressBarPercent: 1,
            progressBarPage: 1,
            color: '#3FC7FA',
            pageCount: 0,
            readedPage: 0,
            rect: null,
            selectionText: '',
            quoteExist: false,
            access_token: window.localStorage.getItem('access_token'),
            license_token: '124235asfa1k2431wasda',
            book_id: null,
            book_page_id: 'null',
            name: '',
            author: '',
            img: '',
            content: '',
            timerCount: 0
        }

        this.pageInViewport = this.pageInViewport.bind(this)
        this.chapterFlashing = this.chapterFlashing.bind(this)
        this.isElementInViewport = this.isElementInViewport.bind(this)
        this.cancelDefaultMenu = this.cancelDefaultMenu.bind(this)
        this.findText = this.findText.bind(this)
        this.increaseProgressBar = this.increaseProgressBar.bind(this)
        this.onToolTipClick = this.onToolTipClick.bind(this)
        this.showToolTip = this.showToolTip.bind(this)
        this.validateNewText = this.validateNewText.bind(this)
        this.getSelectionText = this.getSelectionText.bind(this)
        this.changeTextSize = this.changeTextSize.bind(this)
        this.changeColor = this.changeColor.bind(this)
        this.imageZoom = this.imageZoom.bind(this)
        this.sidebarFunc = this.sidebarFunc.bind(this)
        this.scrollToElement = this.scrollToElement.bind(this)
        this.countOfPage = this.countOfPage.bind(this)
        this.setIdHeader = this.setIdHeader.bind(this)
    }

    checkAuth() {
        let {access_token} = this.state
        if (!access_token) { // if access token isnt exist
            this.props.history.push('/')
        }
    }

    scrollToElement(e) {
        let id = e.target.id.substr(0, e.target.id.length - 5)
        //let book = ReactDOM.findDOMNode(this.refs.book)
        let element = document.getElementById(id)
        element.scrollIntoView()
    }

    validateNewText(newText, oldText, rectanglePos, book_page_id) {
        if (newText !== oldText) {
            if (newText.trim() === '') {
                this.setState({
                    selectionText: '',
                    quoteExist: false,
                    rect: null,
                    book_page_id: null
                })
            } else {
                // Show tooltip when selection text 
                this.showToolTip()
                this.setState({
                    selectionText: newText,
                    book_page_id: book_page_id,
                    rect: rectanglePos
                })
            }
        }
    }

    // firing when text selected on book content 
    getSelectionText() {
        let {quoteExist, selectionText} = this.state
        let selection, text, range, rect, parentPos, relativePos;
        //let scrollTop = window.pageYOffset || this.refs.statiContent.scrollTop
        let parentEl = null
        parentPos = book.getBoundingClientRect() // book is global variable
        relativePos = {}
        if (window.getSelection && !quoteExist) {
            selection = window.getSelection()

            //checking for rangeCount bug, sometimes it might be equal to 0
            if (selection && selection.rangeCount > 0) {
                text = selection.toString()
                range = selection.getRangeAt(0)
                rect = range.getBoundingClientRect()

                parentEl = range.commonAncestorContainer
                if (parentEl.nodeType != 1) {
                    parentEl = parentEl.parentNode;
                }
                console.log('parentEl', parentEl)
                parentEl = parentEl.closest('.page')
                try {
                    let parentElId = parentEl.id // cannot read property id of null
                    let book_page_id = Number(parentElId.substr(5, parentElId.length - 1))
                    console.log('book_page_id', book_page_id)

                    relativePos.top = rect.top - parentPos.top,
                        relativePos.right = rect.right - parentPos.right,
                        relativePos.bottom = rect.bottom - parentPos.bottom,
                        relativePos.left = rect.left - parentPos.left,
                        relativePos.width = rect.width,
                        this.validateNewText(text, selectionText, relativePos, book_page_id)
                }
                catch (e) {
                    console.log('Some error on parentElId', e)
                }
            }

        } else if (window.getSelection && quoteExist) {
            selection = window.getSelection()
            if (selection && selection.rangeCount > 0) {
                text = selection.toString()
                range = selection.getRangeAt(0)
                rect = range.getBoundingClientRect()

                parentEl = range.commonAncestorContainer
                if (parentEl.nodeType != 1) {
                    parentEl = parentEl.parentNode;
                }
                parentEl = parentEl.closest('.page')
                let parentElId = parentEl.id
                let book_page_id = Number(parentElId.substr(5, parentElId.length - 1))
                console.log('book_page_id', book_page_id)

                relativePos.top = rect.top - parentPos.top,
                    relativePos.right = rect.right - parentPos.right,
                    relativePos.bottom = rect.bottom - parentPos.bottom,
                    relativePos.left = rect.left - parentPos.left,
                    relativePos.width = rect.width,
                    this.validateNewText(text, selectionText, relativePos, book_page_id)
            }
        }

    }

    // on call show tooltip by some rect position
    showToolTip() {
        if (this.state.rect !== null) {
            this.setState({
                quoteExist: false,
                rect: null
            })
        }
        this.setState({
            quoteExist: true
        })
    }

    // take click action on tooltip
    onToolTipClick(e) {
        let {new_precises} = this.props.preciStore.precises
        let book_id = Number(this.state.book_id)
        let {selectionText, rect, access_token, book_page_id} = this.state
        let newPrecises, book_position

        for (var i = new_precises.length - 1; i >= 0; i--) {
            //console.log(new_precises[i].book_id, '===', book_id)
            if (Number(new_precises[i].book_id) === book_id) {
                newPrecises = new_precises[i].precise //array of objects
                book_position = i
                break
            }
        }
        let newObject = {
            precis: selectionText,
            yPos: rect.top
        }
        this.props.precisActions.addBookPrecis(access_token, book_id, book_page_id, selectionText)
        // it means there is no any precises for this book
        if (newPrecises === undefined) {
            newPrecises = { // creating empty new precise
                book_id: book_id,
                precise: []
            }

            newPrecises.precise.push(newObject)
            this.props.precisActions.setNewBookPrecis(newPrecises) // adding new precise
            book_position = new_precises.length - 1
        }
        else {
            newPrecises.push(newObject)
            this.props.precisActions.changeNewPrecis(book_position, newPrecises)
        }

        if (this.state.rect !== null) {
            this.setState({
                quoteExist: false,
                rect: null
            })
        }
    }

    increaseProgressBar() {
        if (this.refs.bookReadedLoader) {
            let {pageCount, readedPage} = this.state
            //readed pages on percent
            let readedPages = Math.ceil((readedPage / pageCount) * 100)
            const percent = this.state.progressBarPercent + 1
            if (percent >= readedPages) {
                this.setState({progressBarPage: readedPage})
                clearTimeout(this.tm)
                return;
            }
            this.setState({
                progressBarPercent: percent,
                progressBarPage: Math.ceil((percent / 100) * pageCount)
            })
            this.tm = setTimeout(this.increaseProgressBar, 0)
        }
    }

    // search text from book content
    findText(e) {
        if (e.keyCode === 13) {
            let {findTextValue, book} = this.refs
            if (window.find)
                window.find(findTextValue.value)
            else
                alert('Your application does not support window.find() function')
        }
    }

    //this function cancel default menu on right click
    cancelDefaultMenu() {
        return false
    }

    // sidebar chapters flashing
    // firing when scroll event happen
    chapterFlashing() {
        let {chapters, subChapters, sidebarChapters, sidebarSubChapters} = this.state
        for (var i = 0; i < chapters.length; i++) {
            var isVisible = this.isElementInViewport(chapters, i)
            let {curElement} = this.state

            if (isVisible) {
                if ((curElement !== -1) && (i !== curElement)) {
                    try {
                        sidebarChapters[curElement].classList.remove("flash-on-viewport")
                        sidebarChapters[i].className += " flash-on-viewport"
                        this.setState({curElement: i})
                    }
                    catch (e) {
                        console.log('Error', e)
                    }
                } else {
                    let isExistClass = $(sidebarChapters[i]).hasClass("flash-on-viewport")
                    if (!isExistClass) {
                        // if not exist this class
                        sidebarChapters[i].className += " flash-on-viewport"
                        this.setState({curElement: i})
                    }
                }
                break
            }
        }

        //For subchapters
        for (var j = 0; j < subChapters.length; j++) {
            var isVisible1 = this.isElementInViewport(subChapters, j)
            let {curElementSub} = this.state

            if (isVisible1) {
                if ((curElementSub !== -1) && (j !== curElementSub)) {
                    sidebarSubChapters[curElementSub].classList.remove("flash-on-viewport")
                    sidebarSubChapters[j].className += " flash-on-viewport"
                    this.setState({curElementSub: j})
                } else {
                    let isExistClass = $(sidebarSubChapters[j]).hasClass("flash-on-viewport")
                    if (!isExistClass) {
                        sidebarSubChapters[j].className += " flash-on-viewport"
                        this.setState({curElementSub: j})
                    }
                }
                break
            }
        }
        /* callback(chapters)*/
    }

    // identify 'is element in viewport?'
    isElementInViewport(el, index) {
        var top = el[index].offsetTop
        var height = el[index].offsetHeight
        while (el.offsetParent) {
            el[index] = el[index].offsetParent
            top += el[index].offsetTop
        }

        let isVisible =
            top < (window.pageYOffset + window.innerHeight) &&
            (top + height) > window.pageYOffset

        //console.log('isVisible', isVisible, 'index', index, el[index] )

        return isVisible
    }

    // identify, is book page in viewport?
    pageInViewport() {
        let book = ReactDOM.findDOMNode(this.refs.book)
        var el = book.getElementsByClassName("page")
        //console.log('pageInViewport', el.length)
        for (var i = 0; i < el.length; i++) { // iterate over all pages
            var isVisible = this.isElementInViewport(el, i)

            if (isVisible) {
                this.setState({pageInView: i + 1})
                break
            } else {
                continue
            }
        }
    }

    changeTextSize(newTextSize) {
        let book = ReactDOM.findDOMNode(this.refs.book)
        let pages = book.getElementsByClassName('page')
        for (var i = pages.length - 1; i >= 0; i--) {
            // if text size settings, first time
            if (prevTextSize !== null)
                pages[i].classList.remove("page-" + prevTextSize)

            pages[i].className += " page-" + newTextSize
        }
        prevTextSize = newTextSize
    }

    changeColor(colorStyle) {
        let book = ReactDOM.findDOMNode(this.refs.book)
        let pages = book.getElementsByClassName('page')
        for (var i = pages.length - 1; i >= 0; i--) {
            if (prevStyle !== null)
                pages[i].classList.remove("page-style-" + prevStyle)

            pages[i].className += " page-style-" + colorStyle
        }
        prevStyle = colorStyle
    }

    imageZoom() {
        let book = ReactDOM.findDOMNode(this.refs.book)
        var images = book.getElementsByTagName('img')
        // for (var i = images.length - 1; i >= 0; i--) {
        //     let parentNode = images[i].parentNode
        //     let src = images[i].src //src link of my image
        //     let newEl = document.createElement('div')
        //     let srcLink = src //.substr(22, src.length) rectify image link
        //     parentNode.removeChild(images[i])
        //
        //     console.log('zoom',images[i].width+'px');
        //     const zoomEl = <ImageZoom image={{ src: srcLink, alt: 'image' }} />
        //     newEl.innerHTML = '<div className="zoom-image"></div>'
        //     ReactDOM.render(zoomEl, parentNode.insertBefore(newEl, parentNode.firstChild))
        // }
    }

    setIdHeader() {
        let book = ReactDOM.findDOMNode(this.refs.book)
        let headers = book.getElementsByTagName('h1')
        let sub_headers = book.getElementsByTagName('h2')
        for (var i = headers.length - 1; i >= 0; i--) {
            headers[i].setAttribute('id', 'header_' + i)
        }

        for (var j = sub_headers.length - 1; j >= 0; j--) {
            sub_headers[j].setAttribute('id', 'sub-header_' + j)
        }
    }

    sidebarFunc(scrollToElement) {
        var sidebarMainMenu = $('#sidebar-menu .main-menu')
        var content = $('#static-content')
        content.find('h1').each(function (e) {

            let id = $(this).attr('id') + '-menu'
            //console.log($(this).attr('id'), 'fwefwefewfewfwef')
            let header = document.createElement("li")
            header.id = id
            header.setAttribute('class', 'chapter-header')
            header.innerHTML = $(this).text()
            header.title = $(this).text()
            //console.log('scrollToElement', scrollToElement)
            header.addEventListener('click', scrollToElement, false)
            sidebarMainMenu.append(header)
        })

        content.find('h2').each(function () {
            //console.log('content find header 4')
            var prevTitle = sidebarMainMenu.find('#' + $(this).prevAll('h1').first().attr('id') + '-menu')
            prevTitle.not(":has(ul)").append('<ul class="sub-menu"></ul>')
            prevTitle.find('.sub-menu').append('<li title="' + $(this).text() + '" class="sub-header" id="' + $(this).attr('id') + '-menu">' + $(this).text() + '</li>')
        })
    }

    tick() {
        this.setState({timerCount: (this.state.timerCount + 1)})
    }

    startTimer() {
        clearInterval(this.timer)
        this.timer = setInterval(this.tick.bind(this), 1000)
    }

    stopTimer() {
        clearInterval(this.timer)
    }

    countOfPage() {
        let divs = document.getElementsByClassName("page")
        for (let i = 0; i < divs.length; i++) {
            //divs[i].setAttribute('id', 'menu_' + i)
            let pageNum = i + 1
            $('<p class="pageNum">стр. ' + pageNum + '</p>').insertAfter(divs[i]);
        }
    }

    componentWillMount() {
        this.checkAuth()
        this.startTimer(this)
    }

    componentDidMount() {
        this.setState({
            book_id: window.localStorage.getItem('book_id')
        })
        this.props.booksRequestActions.getBookById(this.state.access_token, window.localStorage.getItem('book_id'))
            .then((data) => {
                try {
                    let content = ''
                    for (let i = 0; i <= data.book_page.length - 1; i++) { //iterate over every page of the book
                        content += data.book_page[i].content
                    }
                    window.localStorage.setItem('img', data.cover)
                    window.localStorage.setItem('author', data.author)
                    window.localStorage.setItem('name', data.name)

                    this.setState({
                        name: data.name,
                        author: data.author,
                        img: data.cover,
                        content: content,
                        pageCount: data.page_count,
                        readedPage: data.progress.last_opened_page_id
                    })
                }
                catch (e) {
                    console.log('Error on loading book')
                }

            })
            .then(() => {
                try {
                    let {statiContent, sidebar_place} = this.refs
                    console.log('sidebar_place', sidebar_place)
                    // here i get an array of elements
                    this.setState({
                        chapters: statiContent.getElementsByTagName('h1'),
                        subChapters: statiContent.getElementsByTagName('h2'),
                        sidebarChapters: sidebar_place.getElementsByClassName('chapter-header'),
                        sidebarSubChapters: sidebar_place.getElementsByClassName('sub-header')
                    })

                    statiContent.addEventListener('scroll', this.pageInViewport)
                    statiContent.addEventListener('scroll', this.chapterFlashing)
                    book = statiContent.getElementsByClassName('book')[0]
                    book.onmouseup = book.onselectionchange = this.getSelectionText // i delete onmouseup event here
                    //window.oncontextmenu = this.cancelDefaultMenu
                    this.countOfPage()
                    this.setIdHeader()
                    this.increaseProgressBar()
                    this.imageZoom()
                    this.sidebarFunc(this.scrollToElement)
                    /*to scroll into view*/
                    try {
                        let {book_page_id} = this.props.appStateControl
                        let element = document.getElementById('page_' + book_page_id) // i used document, because i couldnt find another solution
                        element.scrollIntoView()
                        this.props.appStateControlActions.setBookScrollPos(0)
                    }
                    catch (e) {
                        console.log('Error on scrolling by precise', e)
                    }
                }
                catch (e) {
                    console.log('Error on loading book too')
                }
            })

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.pageInViewport)
        window.removeEventListener('scroll', this.chapterFlashing)
        //window.oncontextmenu = this.cancelDefaultMenu
        this.stopTimer(this)
        let {license_token, access_token, book_id, timerCount} = this.state
        let id = Number(book_id)
        if (timerCount >= 30) { // if spend time in book more than 30 sec
            this.props.userProgressRequestActions.bookIsOpened(license_token, access_token, book_id)
            this.props.booksRequestActions.sendBookDuration(license_token, access_token, id, timerCount) // send book reading duration
        }
    }

    render() {
        let {
            pageInView,
            rect,
            readedPage,
            pageCount,
            progressBarPercent,
            progressBarPage,
            color,
            book_id,
            localStorage,
            content,
            name,
            author,
            img
        } = this.state
        let {language, blindMode, user_settings, theme_settings, opened_book_category} = this.props.appStateControl
        let choosenLang = languages[0][user_settings.language]
        let headerClass = "content__header"
        let bodyClass = "content__body"
        // i need this because, desktop app have blindMode and blackMode
        if (blindMode) {
            headerClass += " blindMode"
            bodyClass += " blindMode"
        }
        else if (theme_settings.isTurnOn && (theme_settings.theme === 1)) {
            headerClass += " blackMode"
            bodyClass += " blackMode"
        }
        return (
            <div className="content">
                <div className={headerClass}>
                    <div className="content__header__sub">
                        <div className="content__header__sub__left">
                            <img src={'http://smartkitap.avsoft.kz' + img} alt="book image"/>
                        </div>
                        <div className="content__header__sub__right">
                            <div className="content__header__sub__name">
                                <h5>{name}</h5>
                                <p>{author}</p>
                            </div>
                            <div className="content__header__sub__progress-bar">
                                <Line ref="bookReadedLoader"
                                      percent={progressBarPercent}
                                      strokeWidth="4"
                                      strokeColor={color}
                                      strokeLinecap='butt'
                                />
                                <p>{progressBarPage} / {pageCount}</p>
                            </div>
                        </div>
                    </div>
                    <div ref="sidebar_place" className="content__header__sub1">
                        <Sidebar />
                    </div>
                </div>

                <div className={bodyClass}>
                    <div className="content__body__main__header">
                        <BookOrientation isInMainPage={false}/>
                        <div className="col-sm-4 imaginary_container">
                            <div className="input-group stylish-input-group">
                                <input onKeyDown={(e) => this.findText(e)} ref="findTextValue" type="text"
                                       className="form-control form-control_search"
                                       placeholder={choosenLang['search-word']}></input>
                            </div>
                        </div>
                    </div>
                    <div className="content__body__main__body">
                        <div className="content__body__precises">
                            <TextSettings textSize={{padding: '4px 0'}}
                                          textColor={{padding: '14px 0px'}}
                                          blindMode={{padding: '12px 0'}}
                                          generalStyle={{height: '55px'}}
                                          changeTextSize={(textSize) => this.changeTextSize(textSize)}
                                          changeColor={(colorType) => this.changeColor(colorType)}/>
                        </div>

                        <div ref="statiContent" id="static-content" className="content__text">
                            <ShowToolTipComponent onToolTipClick={this.onToolTipClick} rect={rect}/>
                            <Book ref="book" book={content}/>
                        </div>
                    </div>
                </div>
                {/* <p className="fixed-page-show">стр. {pageInView}</p>*/}

            </div>
        );
    }
}

const mapStateToProps = state => ({
    main_book_item: state.main_book_item,
    my_book_item: state.my_book_item,
    appStateControl: state.appStateControl,
    preciStore: state.precis
})

const mapDispatchToProps = dispatch => ({
    userProgressRequestActions: bindActionCreators(userProgressRequest, dispatch),
    precisActions: bindActionCreators(precis_action, dispatch),
    booksRequestActions: bindActionCreators(booksRequest, dispatch),
    main_actions: bindActionCreators(main_actions, dispatch),
    appStateControlActions: bindActionCreators(appStateControlActions, dispatch)
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Content))


//background: -webkit-linear-gradient(top, #009b29 1%,#db8667 61%,#d8615f 78%,#ea2623 100%); /* Chrome10-25,Safari5.1-6 */
//background: linear-gradient(to bottom, #009b29 1%,#db8667 61%,#d8615f 78%,#ea2623 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
