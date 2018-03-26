import React, { Component } from 'react'
import Model3d from './Model3d'

class Model3dExp extends Component {
    render() {
        return (
    		<div style={{border: '1px solid'}}>
    			<Model3d 
    				obj='./assets/models3d/bb8/bb8.obj' 
    				mtl='./assets/models3d/bb8/bb8.mtl' />
    		</div>        
        )
    }
}

export default Model3dExp
