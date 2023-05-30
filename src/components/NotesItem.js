import React from 'react'

export const NotesItem = (props) => {
    const {note} = props;
  return (
    <div className="col-md-3">
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
    </div>
  )
}


export default NotesItem;