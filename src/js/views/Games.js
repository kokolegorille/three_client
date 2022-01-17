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
import Zombie from "./Zombie"

const Games = () => {
    return(
        <>
            <nav>
                <Link to="">Lobby</Link> | {" "}
                <Link to="basic">Basic</Link> | {" "}
                <Link to="shooters">Shooters</Link> | {" "}
                <Link to="pool">Pool</Link> | {" "}
                <Link to="zombie">Zombie</Link>
            </nav>
            <Routes>
                <Route exact path="/" element={<Lobby />} />
                <Route path="/basic" element={<Basic />} />
                <Route path="/shooters" element={<Shooters />} />
                <Route path="/pool" element={<Pool />} />
                <Route path="/zombie" element={<Zombie />} />
            </Routes>
        </>
    )
}

export default Games