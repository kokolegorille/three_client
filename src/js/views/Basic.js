import React, { useEffect, useRef } from "react"
import * as THREE from "three"

import useWindowSize from "../hooks/useWindowSize"

const Basic = () => {
    const canvas = useRef()
    const {width, height} = useWindowSize()

    console.log(width, height)

    let camera, scene, renderer
    let geometry, material, mesh

    useEffect(() => {
        console.log("Mounted")

        // Create the camera
        camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
        camera.position.z = 1;

        // Create the scene
        scene = new THREE.Scene();

        // Create a mesh
        geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        material = new THREE.MeshNormalMaterial();
        mesh = new THREE.Mesh( geometry, material );

        // Add the mesh to the scene
        scene.add( mesh );

        // Create the renderer
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( width, height );
        renderer.setAnimationLoop( animation );

        // render into the #canvas element
        canvas.current.appendChild( renderer.domElement );

        return () => {
            console.log("Unmounted")
        }
    }, [])

    // useEffect(() => {
    //     renderer && renderer.setSize( width, height );
    // }, [width, height])

    // Animation loop
    const animation = (time) => {
        mesh.rotation.x = time / 2000
	    mesh.rotation.y = time / 1000

	    renderer.render( scene, camera )
    }

    return (
        <div>
            <h2>Basic</h2>
            <div id='canvas' ref={canvas} />
        </div>
    );
}

export default Basic