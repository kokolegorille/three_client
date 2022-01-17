import React, { useRef, useEffect, useState } from "react"

import ThirdPersonCameraDemo from "../components/ThirdPersonCameraDemo"

const Zombie = () => {
    const canvas = useRef()
    const [_app, setApp] = useState()

    useEffect(() => {
        setApp(new ThirdPersonCameraDemo(canvas.current))
    }, [])

    return <div id='canvas' ref={canvas} />
}

export default Zombie
