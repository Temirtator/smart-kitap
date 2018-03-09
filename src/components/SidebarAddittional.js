import React, { Component } from 'react'
import {
    Link
} from 'react-router-dom'
import { connect } from 'react-redux'
//import * as precis_action from '../actions/precis'
//import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'



class SidebarAddittional extends Component {
    constructor(props){
        super(props);
            this.state={
                images:[
                    {link:"/video",img:"image/lecture.svg",classes:"video-sidebar"},
                    {link:"/test",img:"image/test.png",classes:"test-sidebar"},
                    {link:"/instruments",img:"image/tools.svg",classes:"instruments-sidebar"},
                    {link:"/precis",img:"image/pencil.svg",classes:"instruments-sidebar"}
                ]
            }
    }
    render() {
        return (
            <div className="sidebar-additional">
            {this.state.images.map((item,index)=> 
                    <Link key={index} className="video-sidebar" to={item.link}>
                        <img src={item.img} width="100%" height="100%" alt="img" />
                    </Link>
            )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
   //precises: state.precises
})

const mapDispatchToProps = dispatch => ({
   //actions: bindActionCreators(precis_action, dispatch),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarAddittional))
