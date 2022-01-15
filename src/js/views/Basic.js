import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import OrbitControls from "three-orbitcontrols"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import useWindowSize from "../hooks/useWindowSize"

const Basic = () => {
    const canvas = useRef()
    const {width, height} = useWindowSize()

    console.log(width, height)

    let camera, scene, renderer
    let geometry, material, mesh

    const margin = 10

    const loadGLTF = (file) => {
        const loader = new GLTFLoader().setPath("../../../assets/plane/")
        loader.load(
            file,
            gltf => {
                console.log(gltf)
            },
            xhr => {

            },
            err => {

            }
        )
    }

    useEffect(() => {
        console.log("Mounted")

        // Create the camera
        camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 )
        camera.position.z = 1

        // Create the scene
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0xaaaaaa)

        // Lights
        const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.5)
        scene.add(ambient)

        const light = new THREE.DirectionalLight(0xffffff, 1.5)
        light.position.set(0.2, 1, 1)
        scene.add(light)

        // Load GLTF
        loadGLTF("microplane.glb")
        
        // Create a mesh
        geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )
        material = new THREE.MeshNormalMaterial()
        mesh = new THREE.Mesh( geometry, material )

        // Add the mesh to the scene
        scene.add( mesh )

        // Create the renderer
        renderer = new THREE.WebGLRenderer( { antialias: true } )
        renderer.setSize( width - margin, height - margin )
        renderer.setAnimationLoop( animation )

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.25
        controls.enableToom = false

        // render into the #canvas element
        canvas.current.appendChild( renderer.domElement )

        return () => {
            console.log("Unmounted")
        }
    }, [])

    // useEffect(() => {
    //     console.log(renderer)

    //     // Renderer is undefined here!
    //     if (renderer) {
    //         camera.aspect = width / height
    //         camera.updateProjectionMatrix()
    //         renderer.setSize( width - margin, height - margin )
    //     }
    // }, [width, height])

    // Animation loop
    const animation = (time) => {
        mesh.rotation.x = time / 2000
	    mesh.rotation.y = time / 1000

	    renderer.render( scene, camera )
    }

    return (
        <div id='canvas' ref={canvas} />
    )
}

export default Basic