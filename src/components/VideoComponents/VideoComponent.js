import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import TextSettings from '../GeneralComponents/TextSettingsComponent'
//import BookOrientation from './BookOrientationComponent'
import VideoLecture from './VideoLectureComponent'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as bookVideoRequest from '../../actions/bookVideoRequest'

import ReactGA from 'react-ga';
/*const iconStyle = {
 fontSize: '2em',
 color: '#fff',
 float: 'left',
 padding: '0 10px 0 0'
 }*/

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
            videoSrc: ''
        }

        ReactGA.initialize('UA-66591915-12')
        ReactGA.pageview('/Видеолекция')
        this.loadVideoLectures = this.loadVideoLectures.bind(this)
    }

    componentWillMount() {
        let {license_token, access_token, book_id} = this.state
        this.props.bookVideoRequestActions.getVideoLectures(license_token, access_token, book_id)
            .then(response => {

            })
    }

    loadVideoLectures(title, description, cover, videoSrc) {
        this.setState({
            title, description, cover, videoSrc
        })
        ReactGA.event({
            category: 'Видеолекция',
            action: 'Открыто видео: ' + title
        });
    }

    render() {
        let {bookVideoState} = this.props
        let {title, description, cover, videoSrc} = this.state
        return (
            <div className="video-component">
                <div className="video-body">
                    <div className="video-body__precises">
                        <TextSettings textSize={{padding: '5px 5px'}} textColor={{display: 'none'}}
                                      blindMode={{padding: '13px 0'}}/>
                    </div>
                    <div className="video-body__content">
                        <div className="col-md-8">
                            { bookVideoState.length >= 1 ?
                                <VideoLecture title={title} description={description} cover={cover}
                                              videoSrc={videoSrc}/> : null
                            }
                        </div>
                        <div className="col-md-4 video-body__content__side-video-menu">
                            { bookVideoState.map((value, index) =>
                                <div className="video-body__content__video-element" key={index}>
                                    <p key={index}
                                       onClick={() => this.loadVideoLectures(value.title, value.description, value.cover, value.video_url)}>{value.title}</p>
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
    bookVideoRequestActions: bindActionCreators(bookVideoRequest, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoComponent)