import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'

import 'bootstrap/fonts/glyphicons-halflings-regular.svg'
import Book from './Book'
import $ from 'jquery'

import * as userProgressRequest from '../../actions/userProgressRequest'
import * as booksRequest from '../../actions/booksRequest'
import * as precis_action from '../../actions/precis'
import * as appStateControlActions from '../../actions/appStateControl'
import * as checkConnectivity from '../../actions/checkConnectivity'
import * as main_actions from '../../actions/'
import ReactGA from 'react-ga'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router'

import BookOrientation from './BookOrientationComponent'
import TextSettings from './TextSettingsComponent'
import Sidebar from './Sidebar'

import ImageZoom from 'react-medium-image-zoom'
import * as languages from '../../resources/language/languages.json'

import Model3d from '../3d-components/Model3d'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'
import ReactSpinner from 'react-spinjs'
import { url as url_api } from '../../path.json'

let book = null, prevTextSize = null, prevStyle = null

//here is some terrible code
const ShowToolTipComponent = (props) => {
    let {rect, onToolTipClick} = props
    if ((typeof rect === 'object') && (rect !== null)) {
        let centralizeLeft = (rect.left + ((rect.width) / 2) + 25),
            centralizeTop = (rect.top - 25)
        return (
            <div    onClick={onToolTipClick}
                    className="quote"
                    id="quote"
                    style={{ top: centralizeTop + 'px' , left: centralizeLeft + 'px' }}>

                <img    src='./image/quote.png'
                        style={{ width: '100%' }} />
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

let textStyle = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: 'calc(50vw + 100px)'
}

let TRange=null

class Content extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageInView: 1,
            pageInViewId: null,
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
            readedPageId: '',
            rect: null,
            selectionText: '',
            quoteExist: false,
            access_token: window.localStorage.getItem('access_token'),
            license_token: window.localStorage.getItem('license_token'),
            book_id: null,
            book_page_id: null,
            name: '',
            author: '',
            img: '',
            content: '',
            timerCount: 0,
            BookLoaded: true,
            prevAllEl: '',
            changingTextSize: false,
            imageOpen: false,
            imageLink: '',
            imgWidth: null,
            imgHeight: null
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
        this.parse3D = this.parse3D.bind(this)
        this.tablesFixer = this.tablesFixer.bind(this)
        this.prevAll_h1 = this.prevAll_h1.bind(this)
        this.onClickHandler = this.onClickHandler.bind(this)

        ReactGA.initialize('UA-66591915-12')
        ReactGA.pageview('/Чтение книги')
    }

    checkAuth() {
        let { access_token } = this.state
        if (!access_token) { // if access token isnt exist
            this.props.history.push('/')
        }
    }

    scrollToElement(e) {
        try {
            let id = e.target.id.substr(0, e.target.id.length-5)
            let element = document.getElementById(id)
            element.scrollIntoView()
        } catch(e) {
            console.log('scrollToElement error', e)
        }
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
        let selection, text, range, rect, parentPos, relativePos
        //let scrollTop = window.pageYOffset || this.refs.statiContent.scrollTop
        let parentEl = null
        parentPos = book.getBoundingClientRect() // book is global variable
        relativePos = {}
        if (window.getSelection && !quoteExist) {
            selection = window.getSelection()

            //checking for rangeCount bug, sometimes it might be equal to 0
            if (selection && selection.rangeCount > 0) {
                text  = selection.toString()
                range = selection.getRangeAt(0)
                rect  = range.getBoundingClientRect()

                parentEl = range.commonAncestorContainer
                if (parentEl.nodeType != 1) {
                    parentEl = parentEl.parentNode
                }
                parentEl = parentEl.closest('.page')
                try{
                    let parentElId = parentEl.id // cannot read property id of null
                    let book_page_id = Number(parentElId.substr(5, parentElId.length-1))
                    
                    relativePos.top = rect.top - parentPos.top,
                    relativePos.right = rect.right - parentPos.right,
                    relativePos.bottom = rect.bottom - parentPos.bottom,
                    relativePos.left = rect.left - parentPos.left,
                    relativePos.width = rect.width,
                    this.validateNewText(text, selectionText, relativePos, book_page_id)
                }
                catch(e) {
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
                    parentEl = parentEl.parentNode
                }
                let parentElId = null, book_page_id = null
                try {
                    parentEl = parentEl.closest('.page')
                    parentElId = parentEl.id // TODO: BUG - ID OF NULL 
                    book_page_id = Number(parentElId.substr(5, parentElId.length - 1))
                } catch (e) {
                    console.log(e)
                }
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
        this.props.checkConnectivity.onlineCheck().then(() => {
            let {new_precises} = this.props.preciStore.precises
            let book_id = Number(this.state.book_id)
            let {selectionText, rect, access_token, book_page_id} = this.state
            let newPrecises, book_position

            for (let i = new_precises.length - 1; i >= 0; i--) {
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
        })
        .catch(() => {
            alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
        })
    }

    increaseProgressBar() {
        if (this.refs.bookReadedLoader) {
            let {pageCount, readedPage} = this.state
            if (pageCount >= readedPage) {
                //readed pages on percent
                let readedPages = Math.ceil((readedPage/pageCount)*100)
                const percent = this.state.progressBarPercent + 5
                if (percent >= readedPages) {
                    this.setState({ progressBarPage: readedPage })
                    clearTimeout(this.tm)
                    return
                }
                this.setState({
                    progressBarPercent: percent,
                    progressBarPage: Math.ceil((percent/100)*pageCount)
                 })
                this.tm = setTimeout(this.increaseProgressBar, 0)
            }
        }
    }

    // search text from book content
    findText(e) {
        if (e.keyCode === 13) {
            let { findTextValue } = this.refs
            let str = findTextValue.value
            if (window.find && window.getSelection) {
                window.find(str)
                let sel = window.getSelection()
                let parentEl = sel.getRangeAt(0).commonAncestorContainer.parentNode
                parentEl.scrollIntoView()
            }
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
        for (let i = 0; i < chapters.length; i++) {
            let isVisible = this.isElementInViewport(chapters, i)
            let { curElement } = this.state

            if (isVisible) { // if header is visible
                if ((curElement !== -1) && (i !== curElement)) { // if there is curElement which already flashing
                    try {
                        sidebarChapters[curElement].classList.remove("flash-on-viewport") // deleting class from current chapter
                        sidebarChapters[i].className += " flash-on-viewport" // here flashing new class
                        this.setState({ curElement: i }) // now i change current element
                    }
                    catch(e) {
                        console.log('Error', e)
                    }
                } else {// there is no curElement which flashing, its not current element
                    let isExistClass = $(sidebarChapters[i]).hasClass("flash-on-viewport") // checking for existence of classes
                    if (!isExistClass) { // if this element is not flashing
                        sidebarChapters[i].className += " flash-on-viewport" // do flash this elem
                        this.setState({ curElement: i }) // so, now our flashing element is curElement
                    }
                }
                break
            }
            else {
                try {
                    if (curElement !== -1) {
                        sidebarChapters[curElement].classList.remove("flash-on-viewport")
                        this.setState({ curElement: -1 })
                    }
                } catch(e) {
                    console.log('error on deleting class from chapter')
                }
            }
        }

        //For subchapters
        for (let j = 0; j < subChapters.length; j++) {
            let isVisible1 = this.isElementInViewport(subChapters, j)
            let { curElementSub } = this.state
            if (isVisible1) {
                if ((curElementSub !== -1) && (j !== curElementSub)) {
                    sidebarSubChapters[curElementSub].classList.remove("flash-on-viewport")
                    sidebarSubChapters[j].className += " flash-on-viewport"
                    this.setState({ curElementSub: j }) // curElementSub is some index j
                } else {
                    let isExistClass1 = $(sidebarSubChapters[j]).hasClass("flash-on-viewport") // check for existing subchapter
                    if (!isExistClass1) {
                        try{
                            sidebarSubChapters[j].className += " flash-on-viewport"
                            this.setState({ curElementSub: j })
                        }
                        catch(e) {
                            console.log('Wrong solution for subchapters in chapterFlashing')
                        }
                    }
                }
                break
            }
            else {
                try {
                    if (curElementSub !== -1) {
                        sidebarSubChapters[curElementSub].classList.remove("flash-on-viewport")
                        this.setState({ curElementSub: -1 })
                    }
                } catch(e) {
                    console.log('error on deleting class from subchapter')
                }
            }
        }
        /* callback(chapters)*/
    }

    // identify 'is element in viewport?'
    isElementInViewport(el, index) {
        let relativeEl = el[index].getBoundingClientRect()
        //let top = el[index].offsetTop
        let top = relativeEl.top + window.scrollY
        let height = el[index].offsetHeight
        while(el.offsetParent) {
            el[index] = el[index].offsetParent
            top += el[index].offsetTop
        }

        let isVisible =
            top < (window.pageYOffset + window.innerHeight) &&
            (top + height) > window.pageYOffset

        return isVisible
    }

    // identify, is book page in viewport?
    pageInViewport() {
        let book = ReactDOM.findDOMNode(this.refs.book)
        let el = book.getElementsByClassName("page") // program can fall in this moment
        for (let i = 0; i < el.length; i++) { // iterate over all pages
            let isVisible = this.isElementInViewport(el, i)

            if(isVisible){
                this.setState({ pageInView: i+1, pageInViewId: el[i].id })
                break
            } else {
                continue
            }
        }
    }

    pointToPixel(value) {
        return (3/4) * value
    }

    settingTextSize(all_el, newTextSize) {
        for (let j = 0; j <= all_el.length - 1; j++) {
            let style = window.getComputedStyle(all_el[j], null).getPropertyValue('font-size')
            let fontSize = parseFloat(style) // get flaot of element in page
            if (prevTextSize === null) { // if first time
                if (newTextSize === '2x') {
                    all_el[j].style.fontSize = (this.pointToPixel(fontSize) + 5) + "pt"
                }
                else if (newTextSize === '3x') {
                    all_el[j].style.fontSize = (this.pointToPixel(fontSize) + 10) + "pt"
                }
            } else {
                if (prevTextSize === '1x') {
                    if (newTextSize === '2x') {
                        all_el[j].style.fontSize = (this.pointToPixel(fontSize) + 5) + "pt"
                    }
                    else if (newTextSize === '3x') {
                        all_el[j].style.fontSize = (this.pointToPixel(fontSize) + 10) + "pt"
                    }
                }
                else if (prevTextSize === '2x') {
                    if (newTextSize === '1x') {
                        all_el[j].style.fontSize = (this.pointToPixel(fontSize) - 5) + "pt"
                    }
                    else if (newTextSize === '3x') {
                        all_el[j].style.fontSize = (this.pointToPixel(fontSize) + 5) + "pt"
                    }
                }
                else if (prevTextSize === '3x') {
                    if (newTextSize === '1x') {
                        all_el[j].style.fontSize = (this.pointToPixel(fontSize) - 10) + "pt"
                    }
                    else if (newTextSize === '2x') {
                        all_el[j].style.fontSize = (this.pointToPixel(fontSize) - 5) + "pt"
                    }
                }
            }
        }
    }

    changeTextSize(newTextSize, callback) {
        this.setState({ changingTextSize: true }, () => {
            let book = ReactDOM.findDOMNode(this.refs.book)
            let pages = book.getElementsByClassName('page')
            let all_el = []
            for (let i = 0; i <= pages.length - 1; i++) {
                let p_el = pages[i].getElementsByTagName('p'),
                    h1_el = pages[i].getElementsByTagName('h1'),
                    h2_el = pages[i].getElementsByTagName('h2'),
                    h3_el = pages[i].getElementsByTagName('h3'),
                    h4_el = pages[i].getElementsByTagName('h4'),
                    h5_el = pages[i].getElementsByTagName('h5'),
                    li_el = pages[i].getElementsByTagName('li'),
                    span_el = pages[i].getElementsByTagName('span'),
                    strong_el = pages[i].getElementsByTagName('strong'),
                    em_el = pages[i].getElementsByTagName('em')

                all_el = [  ...all_el,
                            ...h1_el,
                            ...h2_el,
                            ...h3_el,
                            ...h4_el,
                            ...h5_el,
                            ...li_el,
                            ...span_el,
                            ...p_el,
                            ...strong_el,
                             ] // all elements in page
                this.settingTextSize(all_el, newTextSize)
                all_el = []
            }
            prevTextSize = newTextSize

        })
        callback()
    }

    changeColor(colorStyle) {
        let book = ReactDOM.findDOMNode(this.refs.book)
        let pages = book.getElementsByClassName('page')
        for (let i = pages.length - 1; i >= 0; i--) {
            if (prevStyle !== null)
                pages[i].classList.remove("page-style-" + prevStyle)

            pages[i].className += " page-style-" + colorStyle
        }
        prevStyle = colorStyle
    }

    onClickHandler(e) {
        let img = e.target
        let width = img.clientWidth
        let height = img.clientHeight
        let vW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        let vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        let ratio = 0
        let imgWidth = null, imgHeight = null
        if (width > vW) {
            ratio = vW / width
            imgWidth = vW
            imgHeight = height * ratio
        }

        if (height > vH) {
            ratio = vH / height
            imgHeight = vH
            imgWidth = width * ratio
        }
        this.setState({
            imageOpen: true,
            imageLink: img.src,
            imgWidth: imgWidth,
            imgHeight: imgHeight
        })
    }

    imageZoom() {
        let book = ReactDOM.findDOMNode(this.refs.book)
        let images = book.getElementsByTagName('img')
        for (let i = images.length - 1; i >= 0; i--) {
            images[i].addEventListener('click', (e) => this.onClickHandler(e), false)
        }
        /*for (let i = images.length - 1; i >= 0; i--) {
            let parentNode = images[i].parentNode
            let src = images[i].src //src link of my image
            let newEl = document.createElement('div')
            let srcLink = src //.substr(22, src.length) rectify image link
            parentNode.removeChild(images[i])
            
            const zoomEl = <ImageZoom image={{ src: srcLink, alt: 'image', className: "img-responsive" }} />
            newEl.innerHTML = '<div className="zoom-image"></div>'
            ReactDOM.render(zoomEl, parentNode.insertBefore(newEl, parentNode.firstChild))
        }*/
    }

    tablesFixer() {
        let book = ReactDOM.findDOMNode(this.refs.book)
        let tables = book.getElementsByTagName('table')
        for (let i = tables.length - 1; i >= 0; i--) {
            tables[i].style.width = "100%"
        }
    }

    parse3D() {
        let book = ReactDOM.findDOMNode(this.refs.book)
        let models = book.getElementsByClassName('models_3d')

        for (let i = 0; i <= models.length - 1; i++) {
            let wrapper = models[i].getElementsByClassName('models_3d_textarea')[0].value
            let info3d = JSON.parse(wrapper)
            models[i].innerHTML = ''
            const my_model = <Model3d   obj={ info3d.obj_path }
                                        mtl={ info3d.mtl_path } />
            ReactDOM.render(my_model, models[i]) // replacing operation
        }
    }

    setIdHeader() {
        let book = ReactDOM.findDOMNode(this.refs.book)
        let headers = book.getElementsByTagName('h1')
        let sub_headers = book.getElementsByTagName('h2')
        for (let i = headers.length - 1; i >= 0; i--) {
            headers[i].setAttribute('id', 'header_'+i)
        }

        for (let j = sub_headers.length - 1; j >= 0; j--) {
            sub_headers[j].setAttribute('id', 'sub-header_'+j)
        }
    }

    h1Filter(el) {
        return el.nodeName.toLowerCase() === 'div'
    }

    getPrevSiblings(el, filter) {
        let siblings = []
        while (el = el.previousSibling) {
            if (!filter || filter(el)) {           
                siblings.push(el)
            } 
        }
        return siblings
    }

    prevAll_h1(element) {
        let sub_header = element
        let result = []
        while (element = element.previousElementSibling) {
            if (element.tagName === 'H1'){
                result.push(element)
            }
        }
        if (result.length > 0) {
            return result
        } else {
            let prevLinks = this.getPrevSiblings(sub_header.parentNode, this.h1Filter) // prevPages
            let prevPage = null, headers = null
            for (let i = 0; i <= prevLinks.length - 1; i++) {
                prevPage = prevLinks[i]
                headers = prevPage.getElementsByTagName('H1')
                result = result.concat(Object.values(headers))
            }
            return result
        }
    }

    someFunc(h2El, callback) {
        let el_id, prevTitle1, sub_menu, liEl, element, prevHeader, prevH1, isExistUL
        let result = []
        for (let i = 0; i <= h2El.length - 1; i++) {
            isExistUL = false
            element = h2El[i] // my h2 element - subheader
            prevHeader = this.prevAll_h1(element) // must return header of subheader - value may be {}
            prevH1 = prevHeader[0] // prev h1 element
            if (prevH1 !== undefined) {
                el_id = prevH1.getAttribute('id') + '-menu' // get id of element
                prevTitle1 = document.getElementById(el_id) // get prevTitle1 
                sub_menu = prevTitle1.getElementsByClassName('sub-menu')
                liEl = document.createElement('li')
                liEl.title = element.innerHTML
                liEl.className = 'sub-header'
                liEl.id = element.getAttribute('id') + "-menu"
                liEl.innerHTML = element.textContent.trim()
            }
            if (prevHeader.length === 0) {
                result.push({
                    liEl: liEl,
                    sub_menu: sub_menu
                })
            } else {
                if (prevH1 !== undefined) {
                    isExistUL = (prevTitle1.getElementsByTagName('ul').length === 0) ? false : true
                    if (!isExistUL) {
                        let newUL = document.createElement('ul')
                        newUL.className = 'sub-menu'
                        prevTitle1.appendChild(newUL)
                        result.push({
                            liEl: liEl,
                            sub_menu: sub_menu
                        })
                    } else {
                        result.push({
                            liEl: liEl,
                            sub_menu: sub_menu
                        })
                    }
                }
                this.setState({
                    prevAllEl: prevHeader
                })
            }
        }
        callback(result)
    }

    find_H1(sidebarMainMenu, content, scrollToElement) {
        content.find('h1').each(function() {
            let id = $(this).attr('id') + '-menu' // name of id
            let header = document.createElement("li") // creating li element
            header.setAttribute('class', 'chapter-header') // set class to li
            let header_p = document.createElement("p") // creating p element
            header_p.id = id // set id to paragraph
            header.title = $(this).text().trim() // set title
            header_p.innerHTML = $(this).text().trim() // set text to p element
            header_p.addEventListener('click', scrollToElement, false) // set event listener
            header.append(header_p) // appending li element to p
            sidebarMainMenu.append(header)
        })
    }

    // i want to rewrite this function
    sidebarFunc(scrollToElement) {
        let sidebarMainMenu = $('#sidebar-menu .main-menu')
        let content = $('#static-content')
        this.find_H1(sidebarMainMenu, content, scrollToElement)
        let content1 = ReactDOM.findDOMNode(this.refs.statiContent)
        let sidebarMainMenu1 = ReactDOM.findDOMNode(this.refs.sidebar_place).getElementsByClassName('main-menu')
        let h2El = content1.getElementsByTagName('h2')
        this.someFunc(h2El, (result) => { // callback
            for (let i = 0; i <= result.length - 1; i++) {
                let parentNode = result[i].sub_menu[0]
                let newEl = result[i].liEl
                parentNode.appendChild(newEl)
            }
            this.forceUpdate()
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
            $('<p class="pageNum">стр. ' + pageNum + '</p>').insertAfter(divs[i])
        }
    }

    sortBookPages(objects) { // sort of bookPages by order
        objects.sort((a, b) => {
            let keyA = a.order,
                keyB = b.order

            return keyA - keyB
        })
        return objects
    }

    componentWillMount() {
        this.checkAuth()
        this.startTimer(this)
    }
    
    componentDidMount() {
        this.props.checkConnectivity.onlineCheck().then(() => {
            let { license_token, access_token } = this.state
            this.setState({
                book_id: window.localStorage.getItem('book_id')
            })
            this.props.booksRequestActions.getBookById(license_token, access_token, window.localStorage.getItem('book_id'))
            .then((data) => {

                try {
                    let content = ''
                    let sortedBook = this.sortBookPages(data.book_page)
                    for (let i = 0; i <= sortedBook.length - 1; i++) { //iterate over every page of the book
                        content += sortedBook[i].content
                    }
                    window.localStorage.setItem('img', data.cover)
                    window.localStorage.setItem('author', data.author)
                    window.localStorage.setItem('name', data.name)
                    ReactGA.event({
                        category: 'Книга',
                        action: 'Открыто книга: ' + data.name
                    })
                    let progress = data.progress
                    let last_opened_page_id = progress ? progress.last_opened_page_id : 1
                    this.setState({
                        name: data.name,
                        author: data.author,
                        img: data.cover,
                        content: content,
                        pageCount: data.page_count,
                        readedPage: data.last_opened_page,
                        readedPageId: last_opened_page_id
                    })
                }
                catch(e) {
                    console.log('Error on loading book', e)
                }
                this.setState({ BookLoaded: false })
            })
            .then(() => {
                try {
                    let {statiContent, sidebar_place} = this.refs
                    // here i get an array of elements
                    this.setState({
                        chapters: statiContent.getElementsByTagName('h1'),
                        subChapters: statiContent.getElementsByTagName('h2'),
                        sidebarChapters: sidebar_place.getElementsByClassName('chapter-header'),
                        sidebarSubChapters: sidebar_place.getElementsByClassName('sub-header')
                    })

                    statiContent.addEventListener('scroll', this.pageInViewport)
                    //statiContent.addEventListener('scroll', this.chapterFlashing)
                    book = statiContent.getElementsByClassName('book')[0]
                    book.onmouseup = book.onselectionchange = this.getSelectionText // i delete onmouseup event here
                    //window.oncontextmenu = this.cancelDefaultMenu
                    this.countOfPage()
                    this.setIdHeader()
                    this.increaseProgressBar()
                    this.parse3D()
                    this.imageZoom()
                    this.tablesFixer()
                    this.sidebarFunc(this.scrollToElement)
                    /*to scroll into view*/
                    try {
                        let { book_page_id } = this.props.appStateControl
                        let element = document.getElementById('page_' + book_page_id ) // i used document, because i couldnt find another solution
                        if (element === null) {
                            element = document.getElementById('page_' + this.state.readedPageId )
                        }

                        element.scrollIntoView()
                        this.props.appStateControlActions.setBookScrollPos(0)
                    }
                    catch(e) {
                        console.log('Error on scrolling by precise', e)
                    }
                }
                catch(e) {
                    console.log('Error on loading book too', e)
                }
            })
        })
        .catch(() => {
            alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.pageInViewport)
        //window.removeEventListener('scroll', this.chapterFlashing)
        prevTextSize = '1x'
        this.stopTimer(this)
        
        let {   license_token,
                access_token,
                book_id,
                timerCount,
                pageInView,
                pageInViewId,
                pageCount,
                readedPage} = this.state

        let id = Number(book_id)

        if (timerCount >= 30) { // if spend time in book more than 30 sec
            this.props.userProgressRequestActions.bookIsOpened( license_token,
                                                                access_token,
                                                                book_id) // notify server that book is opened

            this.props.booksRequestActions.sendBookDuration(    license_token,
                                                                access_token,
                                                                id,
                                                                timerCount) // send book reading duration
        }
        if (pageInViewId !== null && pageInView > readedPage){ // if incoming value is not null
            let last_opened_page_id = Number(pageInViewId.substr(5, pageInViewId.length - 1))
            this.props.userProgressRequestActions.setLastOpenedPage(    license_token,
                                                                        access_token,
                                                                        book_id,
                                                                        last_opened_page_id ) // pageInView its my last opened page
        }
        if (pageCount <= pageInView) { // opened last page and book is closed, so book is finished
            this.props.userProgressRequestActions.bookIsReaded( license_token,
                                                                access_token,
                                                                book_id )
        }
    }

    render() {
        let {   pageInView,
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
                img, BookLoaded, show3D, changingTextSize, imageOpen, imageLink, imgWidth, imgHeight } = this.state

        let {   language,
                blindMode,
                user_settings,
                theme_settings,
                opened_book_category } = this.props.appStateControl

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
        let progressStyle = {
          width: progressBarPercent + "%"
        }
        return (
            <div className="content">
            { BookLoaded &&
                <ModalContainer>
                    <div>
                        <ReactSpinner color='#fff' />
                        <p style={textStyle}>Загружается книга...</p>
                    </div>
                </ModalContainer>
            }

            { imageOpen &&
                <ModalContainer>
                    <ModalDialog    onClose={() => this.setState({ imageOpen: false })} 
                                    style={{ width: 'auto', height: 'auto' }}>
                        <img style={{   width: imgWidth, 
                                        height: imgHeight,
                                        maxWidth: '80vw',
                                        maxHeight: '80vh' }} src={imageLink} />
                    </ModalDialog>
                </ModalContainer>
            }

                <div className={headerClass}>
                    <div className="content__header__sub">
                        <div className="content__header__sub__left">
                            <img src={ url_api + img} alt="book image"/>
                        </div>
                        <div className="content__header__sub__right">
                            <div className="content__header__sub__name">
                                <h5>{name}</h5>
                                <p>{author}</p>
                            </div>
                            <div className="content__header__sub__progress-bar">
                                <div ref="bookReadedLoader">
                                    <div className="shell">
                                      <div  className="bar"
                                            style={ progressStyle }>{/*<span>{ progressBarPercent + "%" }</span>*/}</div>
                                    </div>
                                </div>
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
                        <BookOrientation    isInMainPage={false} />
                        <div className="col-sm-4 imaginary_container">
                            <div className="input-group stylish-input-group">
                                <input  onKeyDown={(e) => this.findText(e)}
                                        ref="findTextValue"
                                        type="text"
                                        className="form-control form-control_search"
                                        placeholder={choosenLang['search-word']}></input>
                            </div>
                        </div>
                    </div>
                    <div className="content__body__main__body">
                        <div className="content__body__precises">
                            <TextSettings   textSize={{padding: '4px 0'}}
                                            textColor={{padding:'14px 0px'}}
                                            blindMode={{padding:'12px 0'}}
                                            generalStyle={{height:'55px'}}
                                            changeTextSize={(textSize) => this.changeTextSize(textSize, () => this.setState({ changingTextSize: false }) )}
                                            changeColor={(colorType) => this.changeColor(colorType)} />
                        </div>

                        <div ref="statiContent" id="static-content" className="content__text">
                            <ShowToolTipComponent   onToolTipClick={this.onToolTipClick}
                                                    rect={rect} />
                            <Book ref="book" book={content} />
                        </div>
                    </div>
                </div>
                {/* <p className="fixed-page-show">стр. {pageInView}</p>*/}
            </div>
        )
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
    appStateControlActions: bindActionCreators(appStateControlActions, dispatch),
    checkConnectivity: bindActionCreators(checkConnectivity, dispatch)
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Content))
