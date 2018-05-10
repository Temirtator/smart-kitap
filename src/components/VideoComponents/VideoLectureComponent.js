import React, {Component } from 'react'
import 'video-react/dist/video-react.css'
import {Player} from 'video-react'
import { url as url_api } from '../../path.json'
import PropTypes from 'prop-types'

class VideoLecture extends Component {
    render() {
        let {title, description, cover, videoSrc} = this.props
        if (!videoSrc.startsWith('http')) {
            videoSrc = url_api + videoSrc
        }
        return (
            <div>
                <div className="video-body__content__player">
                    <Player
                        playsInline
                        poster={ url_api + cover}
                        src={videoSrc}
                        className="video-player-style"
                    />
                </div>
                <div className="video-body__description">
                    <h2>{title}</h2>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        )
    }
}

VideoLecture.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    cover: PropTypes.string,
    videoSrc: PropTypes.string
}

export default VideoLecture
