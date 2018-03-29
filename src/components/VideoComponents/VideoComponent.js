import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import TextSettings from '../GeneralComponents/TextSettingsComponent'
//import BookOrientation from './BookOrientationComponent'
import VideoLecture from './VideoLectureComponent'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as bookVideoRequest from '../../actions/bookVideoRequest'
import * as checkConnectivity from '../../actions/checkConnectivity'

import Model3d from '../3d-components/Model3d'
import {ModalContainer} from 'react-modal-dialog'
import ReactSpinner from 'react-spinjs'


import ReactGA from 'react-ga'

let textStyle = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: 'calc(50vw + 100px)'
}

class VideoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            license_token: window.localStorage.getItem('license_token'),
            access_token: window.localStorage.getItem('access_token'),
            book_id: window.localStorage.getItem('book_id'),
            title: '',
            description: '',
            cover: '',
            videoSrc: '',
            lectureLoaded: true
        }

        ReactGA.initialize('UA-66591915-12')
        ReactGA.pageview('/Видеолекция')
        this.loadVideoLectures = this.loadVideoLectures.bind(this)
    }

    componentWillMount() {
        this.props.checkConnectivity.onlineCheck().then(() => {
            let {license_token, access_token, book_id} = this.state
            this.props.bookVideoRequestActions.getVideoLectures(license_token, access_token, book_id)
            .then(response => {
                let data = response.data
                if (data.length >= 1) {
                    this.setState({ // loading forst video
                        title: data[0].title, 
                        description: data[0].description, 
                        cover: data[0].cover, 
                        videoSrc: data[0].video_url
                    })
                }
                this.setState({
                    lectureLoaded: false
                })
            })  
        })
        .catch(() => {
            alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
        })
    }

    loadVideoLectures(title, description, cover, videoSrc) {
        this.setState({
            title, description, cover, videoSrc, lectureLoaded: true
        }, () => {
            this.setState({ lectureLoaded: false })
        })
        ReactGA.event({
            category: 'Видеолекция',
            action: 'Открыто видео: ' + title
        })
    }

    render() {
        let {bookVideoState} = this.props
        let {title, description, cover, videoSrc, lectureLoaded} = this.state
        return (
            <div className="video-component">
                { lectureLoaded &&
                    <ModalContainer>
                        <div>
                            <ReactSpinner color='#fff' />
                            <p style={textStyle}>Загружаются лекции...</p>
                        </div>
                    </ModalContainer>
                }
                <div className="video-body">
                    <div className="video-body__precises">
                        <TextSettings   textSize={{padding: '5px 5px', display: 'none'}} 
                                        textColor={{display: 'none'}}
                                        blindMode={{padding: '13px 0'}}/>
                    </div>
                    <div className="video-body__content">
                        {
                        (bookVideoState.length < 1) ? <p className="no-data-message">Нет видеолекции</p> : null
                        }
                        <div className="col-sm-8">
                            { (bookVideoState.length >= 1) &&
                                <VideoLecture   title={title} 
                                                description={description} 
                                                cover={cover}
                                                videoSrc={videoSrc}/>
                            }
                        </div>
                        <div className="col-sm-4 video-body__content__side-video-menu">
                            { bookVideoState.map((value, index) =>
                                <div className="video-body__content__video-element" key={index}>
                                    <p key={index}
                                       onClick={() => this.loadVideoLectures(   value.title, 
                                                                                value.description, 
                                                                                value.cover, 
                                                                                value.video_url)}> {value.title} </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    bookVideoState: state.book_video
})

const mapDispatchToProps = dispatch => ({
    bookVideoRequestActions: bindActionCreators(bookVideoRequest, dispatch),
    checkConnectivity: bindActionCreators(checkConnectivity, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoComponent)
