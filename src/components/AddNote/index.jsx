import React, { useContext,useState } from 'react'
import NoteContext from "../../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote} = context;

  const [note, setNote] = useState({title:"",description:"",tag:""})

const handleClick=(e)=>{
  // e.prevent used to remove the page reload
  e.preventDefault();
 addNote(note.title,note.description,note.tag);
 setNote({title:"",description:"",tag:""})
}

const onChange=(e)=>{
setNote({...note,[e.target.name]:e.target.value})
console.log(e.target.value)
}



  return (
    <div className="container mt-5">
    <h1>Add a Note</h1>
    <form>
      <div class="mb-3">
        <label htmlFor="title" class="form-label">
          Title
        </label>
        <input
          type="text"
          class="form-control"
          id="title"
          name='title'
          aria-describedby="emailHelp"
          onChange={onChange}
          minLength={5}
          required
          value={note.title}
        />

      </div>
      <div class="mb-3">
        <label htmlFor="title" class="form-label">
          Tag
        </label>
        <input
          type="text"
          class="form-control"
          id="tag"
          name='tag'
          aria-describedby="emailHelp"
          onChange={onChange}
          minLength={5}
          required
          value={note.tag}
        />

      </div>
      <div class="mb-3">
        <label htmlFor="description" class="form-label">
          Description
        </label>
        <input
          type="text"
          class="form-control"
          id="description"
          name='description'
          onChange={onChange}
          minLength={5}
          required
          value={note.description}
        />
      </div>
      <button  disabled={note.title.length<5 || note.description.length<5} type="submit" class="btn btn-primary" onClick={handleClick}>
        Submit
      </button>
    </form>
  </div>
  )
}

export default AddNote