import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import React3 from 'react-three-renderer'
import * as THREE from 'three'
import TrackballControls from '../3d-modules/TrackballControls'
import MTLLoader from '../3d-modules/MTLLoader'
import OBJLoader from '../3d-modules/OBJLoader'
import DDSLoader from '../3d-modules/DDSLoader'
MTLLoader(THREE)
OBJLoader(THREE)
DDSLoader(THREE)
THREE.ImageUtils.crossOrigin = "*"

const perspectiveCameraName = 'perspectiveCamera'
const orthographicCameraName = 'orthographicCamera'
const mainCameraName = 'mainCamera'

const perspectiveCameraRotation = new THREE.Euler(0, Math.PI, 0)

class Model3d extends Component {
	static propTypes = {
		obj: PropTypes.string.isRequired,
		mtl: PropTypes.string.isRequired
	}
	
    constructor(props, context) {
        super(props, context)
        let { obj, mtl } = props
        this.state = {
        	meshPosition: new THREE.Vector3(0, -220, 0),
		    childPosition: new THREE.Vector3(-150, 50, -360),
		    activeCameraName: perspectiveCameraName,
		    mainCameraPosition: new THREE.Vector3(-15, 20, 1270),
		    orthographicCameraRotation: new THREE.Euler(0, 12.55, 0),
		    paused: true,
		    color: 'black',
		    obj: obj,
		    mtl: mtl,
		    graveScale: new THREE.Vector3(5, 5, 5),
		    lightIntesity: 0.6,
		    show3D: false,
		    downloaded: 0
        }
        console.log(obj, mtl)
        this.loadAndRenderObject = this.loadAndRenderObject.bind(this)
        
	    this.groundPosition = new THREE.Vector3(0, -250, 0)
	    this.groundRotation = new THREE.Euler(-Math.PI / 2, 0, 0)
	    this.groundRepeat = new THREE.Vector2(25, 25)
	    this.THREE = THREE
	    this.lightPosition = new THREE.Vector3(5, 2, 2)
	    this.lightTarget = new THREE.Vector3(0, 0, 0)

	    this.render3DModel = this.render3DModel.bind(this)
	    this.show3DModal = this.show3DModal.bind(this)
	    this.hide3DModal = this.hide3DModal.bind(this)
	    this._onAnimate = this._onAnimate.bind(this)
    }
    
	loadAndRenderObject() {
		try{
		    const onProgress = ( xhr ) => {
		    	if ( xhr.lengthComputable ) {
		    		var percentComplete = xhr.loaded / xhr.total * 100
		    		//console.log( Math.round(percentComplete, 2) + '% downloaded' )
		    		this.setState({
		    			downloaded: Math.round(percentComplete, 2) 
		    		})
		    	}
		    }
		    const onError = ( xhr ) => { console.log(xhr) }
		    const group = this.refs.group
		    const mtlLoader = new this.THREE.MTLLoader()
		    mtlLoader.crossOrigin = '*'
		    THREE.Loader.Handlers.add( /\.dds$/i, new this.THREE.DDSLoader() );
		    return (
		      mtlLoader.load(this.state.mtl, materials => {
		      	materials.preload()
		        const objLoader = new this.THREE.OBJLoader()
		        objLoader.setMaterials(materials)
		        objLoader.crossOrigin = '*'
		        objLoader.load(this.state.obj, object => {
			        group.add(object)
			        this.setState({object})
		        }, onProgress, onError)
		      })
		    )
		} catch(e) {
			console.log('error on loading 3d model')
		}
	}
	
	componentDidMount() {
    	const controls = new TrackballControls(this.refs.mainCamera,
      	ReactDOM.findDOMNode(this.refs.react3))
    	
	    controls.rotateSpeed = 1.0
	    controls.zoomSpeed = 1.2
	    controls.panSpeed = 0.8
	    
	    controls.noZoom = false
	    controls.noPan = false
	    
	    controls.staticMoving = true
	    controls.dynamicDampingFactor = 0.3
	    
	    this.controls = controls
        this.loadAndRenderObject()
        
        controls.addEventListener('change', () => {
            if (this.refs.mainCamera !== undefined){
                this.setState({
                    mainCameraPosition: this.refs.mainCamera.position,
                })
            }
        })
	}
	
	componentWillUnmount() {
	    this.refs.group.remove(this.state.object)
	    this.refs.group2.remove(this.state.geo)

	    this.controls.dispose();
	    delete this.controls;
	}
	
	_onAnimate = () => {
	    this.controls.update()
	}
	
	render3DModel() {
		const width = 500,
    		  height = 500
	    const {
	      meshPosition,
	      childPosition,
	      lightIntesity,
	      orthographicCameraRotation,
	      r,
	      activeCameraName,
	      mainCameraPosition,
	      graveScale,
	      textRotation
	    } = this.state

	    const aspectRatio = 0.5 * width / height
	    return (
			<React3
		        ref="react3"
		        width={width}
		        height={height}
		        antialias
		        clearColor={'rgba(53, 54, 56, .55)'}
		        alpha={true}
		        onAnimate={this._onAnimate}
		    >
		        <viewport
		          x={0}
		          y={0}
		          width={width}
		          height={height}
		          cameraName={mainCameraName}
		        />
        		<scene>
			        <perspectiveCamera
			            ref="mainCamera"
			            name={mainCameraName}
			            fov={50}
			            near={1}
			            far={10000}
			            position={mainCameraPosition}
			        />
			        <cameraHelper
			            cameraName={activeCameraName}
			        />
		          	<object3D
		            	lookAt={meshPosition}
		          	>
			            <perspectiveCamera
			              name={perspectiveCameraName}
			              fov={35 + 30 * Math.sin(0.5 * r)}
			              aspect={aspectRatio}
			              near={150}
			              far={500}
			              rotation={perspectiveCameraRotation}
			            />
			            <orthographicCamera
			              name={orthographicCameraName}
			              left={0.5 * width / -2}
			              right={0.5 * width / 2}
			              top={height / 2}
			              bottom={height / -2}
			              near={150}
			              far={500}
			              rotation={orthographicCameraRotation}
			            />
	          		</object3D>
		          	<cameraHelper
		            	cameraName={activeCameraName}
		          	/>
		          	<ambientLight
		            	color={'0xcccccc'}
		          	/>
			        <directionalLight
			            color={'#f3f0ea'}
			            intensity={lightIntesity}
			            
			            castShadow
			            
			            shadowMapWidth={1024}
			            shadowMapHeight={1024}
			            
			            shadowCameraLeft={120}
			            shadowCameraRight={-20}
			            shadowCameraTop={120}
			            shadowCameraBottom={-20}
			            
			            shadowCameraFar={3 * 20}
			            shadowCameraNear={20}
			            
			            position={this.lightPosition}
			            lookAt={this.lightTarget}
			        />
			        <group
			            ref='group'
			            position={meshPosition}
			            scale={graveScale}
			            castShadow
			            receiveShadow
			            rotation={orthographicCameraRotation}
			        />
			        <group
			            ref='group2'
			            position={childPosition}
			            scale={graveScale}
			            castShadow
			            receiveShadow
			            rotation={textRotation}
			        />
		    	</scene>
		    </React3>
		)
	}

	show3DModal(e) {
		this.setState({ show3D: true })
	}

	hide3DModal(e) {
		e.persist()
		e.cancelBubble = true
		e.stopPropagation()
		this.setState({ show3D: false })
	}

    render() {
	    const divStyle = {
	      position: 'absolute',
	      right: '20px',
	      top: '20px',
	    }

	    const inputStyle = {
	      width: '500px',
	      height: '40px',
	      fontSize: '30px',
	    }

        return (
        	<div className="zoom_wrap">
		        <div  	ref="modelwrap"
		        		onClick={this.show3DModal}
		        		className={this.state.show3D ? "model-3d zoom" : "model-3d"}>
		        		<div onClick={this.hide3DModal}>
		        			<i className="fas fa-times" />
		        		</div>
		        		<span style={{color: '#6d6666', position: 'absolute', marginLeft: '10px'}}>
		        			Загружена {this.state.downloaded} %
		        		</span>
		        		{ this.render3DModel() }
		    	</div>
		    </div>
        )
    }
}

export default Model3d
