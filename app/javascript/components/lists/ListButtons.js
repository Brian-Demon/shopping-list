import React, { useState} from "react"

const ListButtons = (props) => {
  const [showEditButton, setShowEditButton] = React.useState(0)

  const csrf = props.csrf;
  const list = props.list;

  let buttonGroup;
  if( showEditButton == 0 ){
    buttonGroup = 
    <React.Fragment>
      <div className="btn-group" role="group">
        <button className="btn btn-warning shadow-none list-edit-button" onClick={() => setShowEditButton(1)}>Edit</button>
      </div>
      
    </React.Fragment>;
  } else if( showEditButton == 1 ) {
    buttonGroup = 
    <React.Fragment>
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-success shadow-none" onClick={() => shareButtonClicked()}>Share</button>
        <button type="button" className="btn btn-secondary shadow-none" onClick={() => setShowEditButton(0)}>Cancel</button>
        <button type="button" className="btn btn-danger shadow-none" onClick={() => setShowEditButton(3)}>Delete</button>
      </div>
    </React.Fragment>;
  } else if( showEditButton == 3 ){
    buttonGroup = 
    <React.Fragment>
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-success shadow-none" onClick={() => confirmDeleteList()}>YES</button>
        <button type="button" disabled className="btn btn-secondary shadow-none">Delete?</button>
        <button type="button" className="btn btn-danger shadow-none" onClick={() => setShowEditButton(1)}>NO</button>
      </div>
    </React.Fragment>
  } else {
    <h5>ERROR</h5>
  }

  const shareButtonClicked = () => {
    console.log("Share Pressed");
  }

  const confirmDeleteList = () => {
    const data = { list_id: list.id };
    fetch("/lists/" + list.id, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": csrf,
      }
    }).then(response => setShowEditButton(0));
  }

  return (
    <React.Fragment>
      {buttonGroup}
    </React.Fragment>
  );
}

export default ListButtons
