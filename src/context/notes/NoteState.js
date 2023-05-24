import React from "react";
import NoteContext from './noteContext';


const NoteState = (props) =>{
    const notes =[
        {
          "_id": "646dd8c1ce213f7dae99db09",
          "user": "64636291a85801b4cfa160df",
          "title": "Note 1",
          "description": "Description",
          "tag": "general",
          "date": "2023-05-24T09:28:33.618Z",
          "__v": 0
        },
        {
          "_id": "646dd8d0ce213f7dae99db0c",
          "user": "64636291a85801b4cfa160df",
          "title": "Note 2",
          "description": "Description note 2",
          "tag": "general",
          "date": "2023-05-24T09:28:48.926Z",
          "__v": 0
        }
      ];

    return (
        <NoteContext.Provider value={{notes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;