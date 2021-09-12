import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

export const Home = (props) => {

    return (
        <>
            <AddNote mode={props.mode} />
            <Notes mode={props.mode} />
        </>
    )
}
