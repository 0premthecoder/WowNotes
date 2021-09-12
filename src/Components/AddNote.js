import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/notesContext'


export default function AddNote(props) {
    const context = useContext(noteContext)
    const { addNote } = context
    const {mode} = props
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault()
        if (localStorage.getItem("token") === null) {
            alert("Please Login or Create Your Account ")
            
        }
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
    }
    const onChange = async (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div style={{ color: `${mode === 'light' ? "black" : "white"}` }}>
                <h1>Add a Note</h1>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }}   className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description"
                            className="form-label">Description</label>
                        <textarea type="text" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }}  name="description" className="form-control" value={note.description} id="description" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }}  className="form-control" id="tag" name="tag" value={note.tag} aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <button disabled={note.title.length < 2 || note.description.length < 5 || note.tag.length < 1} type="submit" className={`btn ${mode === 'light' ? "btn-outline-success" : "btn-outline-light"}`}  onClick={handleClick}>Add Note</button>
                </form>

            </div>
        </>
    )
}
