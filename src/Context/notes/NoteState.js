import { useState } from "react";
import NoteContext from "./notesContext";


const NoteState = (props) => {
    const host = `http://localhost:5000/api`
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)
    const getNotes = async () => {
        // API call
        const response = await fetch(`${host}/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json)
    }

    // Adding Note
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const json = await response.json()
        
        
        
        // let note = {
        //     "_id": "6137444ef5f74f834498669f",
        //     "user": "61371c22f5af87bf6fa1381e",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2021-09-07T10:51:58.494Z",
        //     "__v": 0
        // }
        // setNotes(notes)
        await getNotes()
    }

    // Deleting a Note
    const deleteNote = async (id) => {
        // API call
        const response = await fetch(`${host}/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const json = await response.json()
        
        // console.log(json)
        await getNotes()
    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const json = await response.json()
        
        // console.log(json)

        await getNotes()
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;