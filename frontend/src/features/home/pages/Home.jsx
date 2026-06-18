import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import Navbar from '../components/Navbar'

const Home = () => {

    const { handleGetSong } = useSong()
    
    return (
        <>
            <Navbar/>
            <FaceExpression
                onClick={(expression) => { handleGetSong({ mood: expression }) }}
            />
            <Player />
        </>
    )
}

export default Home