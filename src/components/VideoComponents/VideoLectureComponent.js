import React, {Component, PropTypes} from 'react'
import 'video-react/dist/video-react.css'
import {Player} from 'video-react'

class VideoLecture extends Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        cover: PropTypes.string,
        videoSrc: PropTypes.string
    }

    render() {
        let {title, description, cover, videoSrc} = this.props
        if (!videoSrc.startsWith('http')) {
            videoSrc = 'http://smartkitap.avsoft.kz' + videoSrc
        }
        return (
            <div>
                <div className="video-body__content__player">
                    <Player
                        playsInline
                        poster={'http://smartkitap.avsoft.kz' + cover}
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

export default VideoLecture
