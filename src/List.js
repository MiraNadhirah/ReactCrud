import React from "react";
import {Button} from '@material-ui/core';


export default function List({ data, handleEdit, handleDelete }) {
  return (
    <div className="list-group">
      {data.map((contact, index) => {
        return (
          <div key={index} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{contact.name}</h5>
              <p className="mb-1">{contact.telp}</p>
              
              <div>
                <Button
                  onClick={() => handleEdit(contact.id)}
                  className="btn btn-sm btn-link"
                  color = "primary" variant = "contained"
                >
                  Edit
                </Button>
                &nbsp;&nbsp;
                <Button
                  onClick={() => handleDelete(contact.id)}
                  className="btn btn-sm btn-link"
                  color = "secondary" variant = "contained"
                >
                  Delete
                </Button>
              </div>
            </div>
            
          </div>
        );
      })}
    </div>
  );
}