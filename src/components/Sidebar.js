import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SidebarAddittional from './SidebarAddittional'

import * as mainActions from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

const sidebarScrollStyle = {
    overflowY:'scroll',
    height: '100%',
    paddingBottom: '30px'
}

class Sidebar extends Component {
    
    render() {
        return (
            <div ref="sidebar" id="sidebar-menu" className={this.props.appStateControl.blindMode ? "sidebar blindMode" : "sidebar"}>
            	{/*<div className="sidebar__header">
                <p>Главы</p>
              </div>*/}
              <ul className={this.props.appStateControl.blindMode ? "main-menu nav nav-stacked affix blindMode" : "main-menu nav nav-stacked affix"}>
            	 
              </ul>
                {/*<SidebarAddittional />*/}
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
