import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'
import React3 from 'react-three-renderer'
import * as THREE from 'three'
import TrackballControls from './3d-modules/TrackballControls'
import MTLLoader from './3d-modules/MTLLoader'
import OBJLoader from './3d-modules/OBJLoader'
MTLLoader(THREE)
OBJLoader(THREE)
THREE.ImageUtils.crossOrigin = ""

const perspectiveCameraName = 'perspectiveCamera'
const orthographicCameraName = 'orthographicCamera'
const mainCameraName = 'mainCamera'

const perspectiveCameraRotation = new THREE.Euler(0, Math.PI, 0)
//const textRotation = new THREE.Euler(0, 2, 0)

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
		    text: '1931-2017',
		    color: 'black',
		    //texture: './3dmodels/alien_car/aliens.jpg',
		    obj: obj,
		    mtl: mtl,
		    graveScale: new THREE.Vector3(5, 5, 5),
		    lightIntesity: 0.6,
		    show3D: false
        }

        this.loadAndRenderObject = this.loadAndRenderObject.bind(this)
	    this.renderText = this.renderText.bind(this)
	    
	    this.groundPosition = new THREE.Vector3(0, -250, 0)
	    this.groundRotation = new THREE.Euler(-Math.PI / 2, 0, 0)
	    this.groundRepeat = new THREE.Vector2(25, 25)
	    this.THREE = THREE
	    this.lightPosition = new THREE.Vector3(5, 2, 2)
	    this.lightTarget = new THREE.Vector3(0, 0, 0)

	    this.render3DModel = this.render3DModel.bind(this)
	    this.show3DModal = this.show3DModal.bind(this)
	    this._onAnimate = this._onAnimate.bind(this)
    }

    
	loadAndRenderObject() {
		console.log('loadAndRenderObject')
	    try{
		    const onProgress = ( xhr ) => {
		    	if ( xhr.lengthComputable ) {
		    		var percentComplete = xhr.loaded / xhr.total * 100
		    		console.log( Math.round(percentComplete, 2) + '% downloaded' )
		    	}
		    }
		    const onError = ( xhr ) => { console.log(xhr) }
		    const group = this.refs.group
		    const mtlLoader = new this.THREE.MTLLoader()
		    mtlLoader.crossOrigin = ''
		    return (
		      mtlLoader.load(this.state.mtl, materials => {
		        materials.preload()
		        const objLoader = new this.THREE.OBJLoader()
		        objLoader.setMaterials(materials)
		        objLoader.crossOrigin = 'anonymous'
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

	renderText() {
		console.log('renderText')
		try {
			const onProgress = ( xhr ) => {
		    	if ( xhr.lengthComputable ) {
		    		var percentComplete = xhr.loaded / xhr.total * 100;
		    		console.log( Math.round(percentComplete, 2) + '% font' )
		    	}
		    }
		    const onError = ( xhr ) => { console.log(xhr) };

		    const group2 = this.refs.group2
		    const fff = new THREE.FontLoader()
		    const materials = [
					new THREE.MeshPhongMaterial( { color: this.state.color, flatShading: true } ), // front
					new THREE.MeshPhongMaterial( { color: this.state.color } ) // side
				]
		}
		catch(e) {
			console.log('Error log on renderText nethod', e)
		}
	}

	componentDidMount() {
	    try {
	    	const controls = new TrackballControls(this.refs.mainCamera,
	      	ReactDOM.findDOMNode(this.refs.react3))

		    controls.rotateSpeed = 1.0
		    controls.zoomSpeed = 1.2
		    controls.panSpeed = 0.8

		    controls.noZoom = false
		    controls.noPan = false

		    controls.staticMoving = true
		    controls.dynamicDampingFactor = 0.3

		    controls.addEventListener('change', () => {
		      this.setState({
		        mainCameraPosition: this.refs.mainCamera.position,
		      })
		    })

		    this.controls = controls
		    this.renderText()
		    this.loadAndRenderObject()
	    }
	    catch(e) {
	    	console.log('Error on 3d models didMount')
	    }
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

	close3DModal = () => {
		this.setState({show3D: false})
	}

	show3DModal = () => {
		this.setState({ show3D: true }, () => {
			let modal_dialog = document.getElementsByClassName('narcissus_17w311v')[0]
			let model_3d = ReactDOM.findDOMNode(this.refs.react3)
			modal_dialog.style.left = '50%'
			modal_dialog.style.top = '50%'
			console.log('modal_dialog', modal_dialog)
			modal_dialog.appendChild(model_3d)
		})
	}

	render3DModel() {
		const width = 500,
    		  height = 300
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
		        clearColor={'rgba(0, 0, 0, .55)'}
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
			            aspect={aspectRatio}
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
		            	color={'white'}
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
	        <div  onClick={this.show3DModal} className="model-3d">
	    		{ this.state.show3D &&
	                <ModalContainer>
	                    <ModalDialog onClose={this.close3DModal}>
	                    	
	                    </ModalDialog>
	                </ModalContainer>
	            }
	            { this.render3DModel() }
	    	</div>
        )
    }
}

export default Model3d;
