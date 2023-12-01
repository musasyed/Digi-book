import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState=(props)=>{
    const host = "http://localhost:3000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)




  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')

      }})
      const json = await response.json()
      console.log(json)
      setNotes(json)
      console.log(notes)
    
    }


// Add a Note
const addNote = async (title, description, tag) => {
  // TODO: API Call
  // API Call 
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({title, description, tag})
  });

  // const json=await response.json();
  // console.log(json)

  console.log("Adding a new note")
const note = await response.json()
  setNotes(notes.concat(note))
}





// Edit a Note
const editNote = async (id, title, description, tag) => {
  // API Call 
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({title, description, tag})
  });
  const json =await response.json();
  console.log(json)

  // Logic to edit in client
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }
    setNotes(notes)
  }
}



const deleteNote = async (id) => {
  // API Call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    }
  });
  const json = response.json();
  console.log(json)

  console.log("Deleting the note with id" + id);
  const newNotes = notes.filter((note) => { return note._id !== id })
  setNotes(newNotes)
}


    return(
    <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>
        {props.children}    
    </NoteContext.Provider>


    )


}


export default NoteState;


// Thanks for watching ;-)