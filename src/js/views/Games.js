import React from "react"
import {
    Routes,
    Route,
    Link
} from "react-router-dom"

import Lobby from "./Lobby"
import Basic from "./Basic"
import Shooters from "./Shooters"
import Pool from "./Pool"

const Games = () => {
    return(
        <>
            <nav>
                <Link to="">Lobby</Link> | {" "}
                <Link to="basic">Basic</Link> | {" "}
                <Link to="shooters">Shooters</Link> | {" "}
                <Link to="pool">Pool</Link>
            </nav>
            <Routes>
                <Route exact path="/" element={<Lobby />} />
                <Route path="/basic" element={<Basic />} />
                <Route path="/shooters" element={<Shooters />} />
                <Route path="/pool" element={<Pool />} />
            </Routes>
        </>
    )
}

export default Games