import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
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
		    lightIntesity: 0.6
        }

        //this.handleText = this.handleText.bind(this)
	    //this.handleColor = this.handleColor.bind(this)
	    //this.updateGraveObject = this.updateGraveObject.bind(this)
	    this.renderObjGraveObject = this.renderObjGraveObject.bind(this)
	    this.renderText = this.renderText.bind(this)
	    //this.loadObjGrave = this.loadObjGrave.bind(this)
	    
	    this.groundPosition = new THREE.Vector3(0, -250, 0)
	    this.groundRotation = new THREE.Euler(-Math.PI / 2, 0, 0)
	    this.groundRepeat = new THREE.Vector2(25, 25)
	    this.THREE = THREE
	    this.lightPosition = new THREE.Vector3(5, 2, 2)
	    this.lightTarget = new THREE.Vector3(0, 0, 0)
    }

    /*handleText(event) {
    	console.log('handleText')
	    this.setState({text: event.target.value})
	    this.refs.group2.remove(this.state.updateText)
	    this.renderText()
	}*/

	/*changeTexture(t) {
	    this.setState({texture: t});
	    this.updateGraveObject();
	}*/

	/*updateGraveObject() {
	    const group = this.refs.group
	    const object = this.state.object
	    const loader = new THREE.TextureLoader()
	    const texture = loader.load(this.state.texture)
	    object.traverse( ( child ) => {
		    if ( child instanceof THREE.Mesh ) {
		       	child.material.map = texture
		    }
	    } );
	    group.add(object)
	    this.setState({object})
	}*/

	/*changeGrave(g) {
		console.log('changeGrave')
	    switch (g) {
	      case 'grave.obj':
	        this.setState({
	          mtl: '3dmodels/Grave_3.mtl',
	          mainCameraPosition: new THREE.Vector3(682, -40, 1600),
	          orthographicCameraRotation: new THREE.Euler(0, 3.60, 0),
	          obj: '3dmodels/' + g,
	        })
	        break;
	      case 'grave_1.obj':
	        this.setState({
	          mtl: '3dmodels/grave_1.mtl',
	          mainCameraPosition: new THREE.Vector3(-15, 20, 1270),
	          orthographicCameraRotation: new THREE.Euler(0, 12.2, 0),
	          obj: '3dmodels/' + g,
	        })
	        break;
	      case 'model.obj':
	      default:
	        this.setState({
	          mtl: '3dmodels/model.mtl',
	          graveScale: new THREE.Vector3(500, 500, 500),
	          meshPosition: new THREE.Vector3(0, 550, 0),
	          mainCameraPosition: new THREE.Vector3(530, 100, 150),
	          lightIntesity: 0.25,
	          obj: '3dmodels/' + g,
	        })
	        break
	    }

	    this.refs.group.remove(this.state.object);
	    return this.renderObjGraveObject();
	}*/

	/*loadObjGrave() {
		console.log('loadObjGrave')
	    this.refs.group.remove(this.state.object);
	    this.renderObjGraveObject();
	}*/

	renderObjGraveObject() {
		console.log('renderObjGraveObject')
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
		    };
		    const onError = ( xhr ) => { console.log(xhr) };

		    const group2 = this.refs.group2
		    const fff = new THREE.FontLoader()
		    const materials = [
					new THREE.MeshPhongMaterial( { color: this.state.color, flatShading: true } ), // front
					new THREE.MeshPhongMaterial( { color: this.state.color } ) // side
				]
		}
		catch(e) {
			
		}
		    
	   /* fff.load('./3dmodels/grave/he_le.font.json', (font) => {
	      const geo = new THREE.TextGeometry( this.state.text, {
	    		font: font,
	    		size: 10,
	    		height: 4,
	    		curveSegments: 1,
	    		bevelEnabled: false,
	    		bevelThickness: 1,
	    		bevelSize: 1,
	    		bevelSegments: 2
	    	} )
	      const textMesh1 = new THREE.Mesh( geo, materials )

	      group2.add(textMesh1)
	      this.setState({updateText: textMesh1})
	    }, onProgress, onError)*/
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

	    controls.addEventListener('change', () => {
	      this.setState({
	        mainCameraPosition: this.refs.mainCamera.position,
	      });
	    });

	    this.controls = controls
	    this.renderText()
	    this.renderObjGraveObject()
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

	/*generate2D() {
	    const canvas = document.createElement('canvas')
	    const context = canvas.getContext('2d')

	    context.font = 'Bold 60px David'
	    context.fillStyle = this.state.color
	    context.fillText(this.state.text, 0, 50)
		
	    const texture = new THREE.Texture(canvas, {transparent: true, opacity: 0.9, alpha: true})
	    texture.needsUpdate = true

	    return texture
	}*/

	/*handleColor(c) {
	    this.setState({color: c})
	    this.refs.group2.remove(this.state.updateText)
	    this.renderText()
	}*/

    render() {
    	const width = 500,
    		  height = 300
	    const {
	      meshPosition,
	      childPosition,
	      lightIntesity,
	      orthographicCameraRotation,
	      r
	    } = this.state

	    const aspectRatio = 0.5 * width / height

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
        	<div className="model-3d">
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
			            position={this.state.mainCameraPosition}
			        />
			        <cameraHelper
			            cameraName={this.state.activeCameraName}
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
		            	cameraName={this.state.activeCameraName}
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
			            scale={this.state.graveScale}
			            castShadow
			            receiveShadow
			            rotation={orthographicCameraRotation}
			        />
			        <group
			            ref='group2'
			            position={childPosition}
			            scale={this.state.graveScale}
			            castShadow
			            receiveShadow
			            rotation={this.state.textRotation}
			        />
		    	</scene>
		    </React3>
	    </div>
        )
    }
}

export default Model3d;
