import { useReducer } from "react"
import * as THREE from "three"

import Plane from "../components/basic/Plane"

const defaultState = {
    scene: null,
    renderer: null,
    camera: null,
    localPlayer: null
}

const START = "START"
const STOP = "STOP"
const SET_LOCAL_PLAYER = "SET_LOCAL_PLAYER"

const reducer = (state, action) => {
    let newState
    switch (action.type) {
        case START:
            newState = {
                ...state,
                ...action.payload
            }
            break
        case STOP:
            newState = defaultState
            break
        case SET_LOCAL_PLAYER:
            newState = {
                ...state,
                localPlayer: action.payload
            }
            break
        default: newState = state
    }
    console.log(state, action, newState)
    return newState
}

// TODO: Wrap this in a custom hook, to avoid having to define this outside...
let state, dispatch

const useThreeBasic = (initialState = defaultState) => {
    [state, dispatch] = useReducer(reducer, initialState)

    const start = (canvas, width, height) => {
        // Camera
        const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 100 )
        camera.position.set( -4.37, 0, -4.75 )
        camera.lookAt(0, 0, 6)

        // Camera controller
        const cameraController = new THREE.Object3D()
        cameraController.add(camera)

        // Lights
        const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.5)
        const light = new THREE.DirectionalLight(0xffffff, 1.5)

        // Scene
        const scene = new THREE.Scene()
        scene.add(cameraController)
        scene.add(ambient)
        scene.add(light)

        // Load skybox
        scene.background = new THREE.CubeTextureLoader()
            .setPath("../../../assets/plane/paintedsky/")
            .load( [
                'px.jpg',
                'nx.jpg',
                'py.jpg',
                'ny.jpg',
                'pz.jpg',
                'nz.jpg'
            ], () => {
                // this.renderer.setAnimationLoop(this.render.bind(this));
                console.log("SKY LOADED")
            } )

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio( window.devicePixelRatio )
        renderer.setSize( width, height )
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.physicallyCorrectLights = true

        renderer.setAnimationLoop( animation )

        // Add to canvas
        canvas.appendChild( renderer.domElement )

        const payload = { camera, scene, renderer }
        dispatch({type: START, payload})
    }

    const stop = () => {
        const { renderer } = state
        renderer.setAnimationLoop( null )
        dispatch({type: STOP})
    }

    const loadPlane = () => {
        const callback = gltf => {
            const { scene } = state
            scene.add(gltf.scene)
            dispatch({type: SET_LOCAL_PLAYER, payload: gltf})
        }
        new Plane(callback)
    }

    const resize = (width, height) => {
        const { renderer, camera } = state
        if (renderer) {
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize( width, height )
        }
    }

    // Private
    const animation = time => {
        const { scene, renderer, camera, localPlayer } = state
        
        console.log(time)

        // Update local player
        localPlayer && localPlayer.update(time)

        renderer && renderer.render(scene, camera)
    }

    const actions = {
        start, stop, 
        loadPlane,
        resize
    }

    return {state, actions}
}

export default useThreeBasic