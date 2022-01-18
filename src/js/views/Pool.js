import React, { useRef, useEffect, useState } from "react"

import useWindowSize from "../hooks/useWindowSize"
import Game from "../components/pool/Game"

const Pool = () => {
    const canvas = useRef()
    const { width, height } = useWindowSize()
    const [game, setGame] = useState()

    useEffect(() => {
        setGame(new Game(canvas.current))
    }, [])

    useEffect(() => {
        game && game.resize(width, height)
    }, [width, height])

    return <div id='canvas' ref={canvas} />
}

export default Pool