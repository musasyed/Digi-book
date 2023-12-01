import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../../context/notes/NoteContext";
import Noteitem from "../Noteitem";
import AddNote from "../AddNote";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const Notes = () => {


const navigate=useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate("/login")
    }
    
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
 
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id:currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };


  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag);
   setShow(true)
    console.log("Updating the note...", note);
    // e.preventDefault();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };



  return (
    <div className="container row">
      <AddNote />
      <Button
      ref={ref}
        className="col-md-2 mt-2 my-5 d-none"
        variant="primary"
        onClick={handleShow}
      >
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="etitle"
                name="etitle"
                value={note.etitle}
                aria-describedby="emailHelp"
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="edescription"
                name="edescription"
                value={note.edescription}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="etag"
                name="etag"
                value={note.etag}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              onClick={handleClick}
              type="button"
              className="btn btn-primary"
              disabled={note.etitle.length<5 || note.edescription.length<5}
            >
              Update Note
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <h2>Notes</h2>
      <div className="container">
      {notes.length===0 && "No Notes to Display"}
      </div>
      {notes.map((note) => {
        return (
          <>
            <Noteitem key={note._id} note={note} updateNote={updateNote} />
          </>
        );
      })}
    </div>
  );
};

export default Notes;
