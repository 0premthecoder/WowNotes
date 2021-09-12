import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/notesContext'
import NoteItem from './NoteItem'

export default function Notes(props) {
    const context = useContext(noteContext)
    const { notes, getNotes,  editNote} = context
    const {mode} = props
    const ref = useRef(null)
    const refclose = useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id:currentNote._id  ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({id: "", etitle: "", edescription:"", etag:""})

    const handleClick = (e) => {
        e.preventDefault()
        // console.log("Updating Note Now", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click()
        // addNote(note.title, note.description, note.tag)
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            

            <button type="button" ref={ref} className="btn btn-success" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

            <div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }} className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={2} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription"
                                        className="form-label">Description</label>
                                    <textarea type="text" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }} name="edescription" value={note.edescription} className="form-control" id="edescription" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }} className="form-control" value={note.etag} id="etag" name="etag" aria-describedby="emailHelp" onChange={onChange} minLength={1} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={ note.etitle.length <2 || note.edescription.length<5 || note.etag.length<1} type="button" className="btn btn-outline-primary"  onClick={handleClick}>Update Now</button>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className="container my-3 row" >
                <h2 style={{ color: `${mode === 'light' ? "black" : "white"}` }}>Your Notes</h2>
                {notes.length === 0  && <div className="container">No Notes 😒😒</div> }
                {notes.length > 0  &&  notes.map((note) => {return <NoteItem key={note._id} updateNote={updateNote} note={note} mode={mode}/>})}
            </div>
        </>
    )
}
