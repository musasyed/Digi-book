import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDe } from '@fortawesome/free-brands-svg-icons';
import { faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons'
import React, { useContext,useState } from 'react'
import NoteContext from "../../context/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote}=context


   const {note,updateNote}=props;

  return (
    <div className='col-md-3'>
        <div class="card my-3">
  <div class="card-body">
    <div className="d-flex align-items-center">
    <h5 class="card-title"> {note.title}</h5>
    <FontAwesomeIcon onClick={()=>{deleteNote(note._id)}} className='mx-2'  icon={faTrash}  />
   <FontAwesomeIcon className='mx-2' icon={faEdit}  onClick={()=>{updateNote(note)}}/>
    </div>

    <p class="card-text">  {note.description}</p>


    
  </div>
</div>
    </div>
  )
}

export default Noteitem