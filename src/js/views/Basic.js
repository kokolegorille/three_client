import React, { useRef, useEffect } from "react"

import useWindowSize from "../hooks/useWindowSize"
import useThreeBasic from "../hooks/useThreeBasic"

const Basic = () => {
    const canvas = useRef()
    const { width, height } = useWindowSize()
    const { state, actions } = useThreeBasic()

    console.log(state)

    useEffect(() => {
        // Start the game
        actions.start(canvas.current, width, height)
        actions.loadPlane()

        // Cleanup
        return () => { actions.stop() }
    }, [])

    useEffect(() => {
        // Resize the scene when dimensions change
        actions.resize(width, height)

        // Cleanup
        // return () => {}
    }, [width, height])

    return (
        <div id='canvas' ref={canvas} />
    )
}

export default Basic

// import React, { useEffect, useRef } from "react"
// import * as THREE from "three"
// // import OrbitControls from "three-orbitcontrols"
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

// import useWindowSize from "../hooks/useWindowSize"

// const Basic = () => {
//     const canvas = useRef()
//     const {width, height} = useWindowSize()

//     console.log(width, height)

//     let camera, scene, renderer
//     let geometry, material, mesh
//     let plane, cameraController

//     const margin = 5

//     const loadGLTF = (file, scene) => {
//         const loader = new GLTFLoader().setPath("../../../assets/")
//         loader.load(
//             file,
//             gltf => {
//                 console.log(gltf)
//                 scene.add(gltf.scene)
//                 plane = gltf
//             },
//             xhr => {
//                 const progress = xhr.loaded / xhr.total
//                 console.log(xhr.loaded, xhr.total)
//                 console.log(progress)
//             },
//             err => {
//                 console.log(err)
//             }
//         )
//     }

//     useEffect(() => {
//         console.log("Mounted")

//         // Create the camera
//         camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 100 )
//         // camera.position.z = 1
//         // camera.position.set( 0, 0, 5 );
//         camera.position.set( -4.37, 0, -4.75 )
//         camera.lookAt(0, 0, 6)

//         cameraController = new THREE.Object3D()
//         cameraController.add(camera)

//         // Create the scene
//         scene = new THREE.Scene()
//         scene.background = new THREE.Color(0xaaaaaa)
//         scene.add(cameraController)

//         // Lights
//         const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.5)
//         scene.add(ambient)

//         const light = new THREE.DirectionalLight(0xffffff, 1.5)
//         light.position.set(0.2, 1, 1)
//         scene.add(light)

//         // Load GLTF
//         loadGLTF("plane/microplane.glb", scene)

//         // Create a mesh
//         geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )
//         material = new THREE.MeshNormalMaterial()
//         mesh = new THREE.Mesh( geometry, material )

//         // Add the mesh to the scene
//         scene.add( mesh )

//         // Create the renderer
//         renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
//         renderer.setPixelRatio( window.devicePixelRatio )
//         renderer.setSize( width - margin, height - margin )
//         renderer.outputEncoding = THREE.sRGBEncoding
//         renderer.physicallyCorrectLights = true
//         renderer.setAnimationLoop( animation )

//         // // Controls
//         // const controls = new OrbitControls(camera, renderer.domElement)
//         // controls.enableDamping = true
//         // controls.dampingFactor = 0.25
//         // controls.enableToom = false

//         // render into the #canvas element
//         canvas.current.appendChild( renderer.domElement )

//         return () => {
//             console.log("Unmounted")
//         }
//     }, [])

//     useEffect(() => {
//         console.log("Plane has updated")
//         console.log(plane)
//     }, [plane])

//     // useEffect(() => {
//     //     console.log(renderer)

//     //     // Renderer is undefined here!
//     //     if (renderer) {
//     //         camera.aspect = width / height
//     //         camera.updateProjectionMatrix()
//     //         renderer.setSize( width - margin, height - margin )
//     //     }
//     // }, [width, height])

//     // Animation loop
//     const animation = (time) => {
//         mesh.rotation.x = time / 2000
// 	    mesh.rotation.y = time / 1000

// 	    renderer.render( scene, camera )
//     }

//     return (
//         <div id='canvas' ref={canvas} />
//     )
// }

// export default Basic