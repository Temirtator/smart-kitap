import React, { Component } from 'react'
import * as mainActions from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

class Sidebar extends Component {
    render() {
        return (
            <div ref="sidebar" id="sidebar-menu" className={this.props.appStateControl.blindMode ? "sidebar blindMode" : "sidebar"}>
            	<ul className={this.props.appStateControl.blindMode ? "main-menu nav nav-stacked affix blindMode" : "main-menu nav nav-stacked affix"}>
            	   
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators(mainActions, dispatch),
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar))
