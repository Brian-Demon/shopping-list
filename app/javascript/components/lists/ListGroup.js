import React, { useState, useEffect } from "react"
import ListEntry from "./ListEntry"

const ListGroup = (props) => {
  const [lists, setLists] = useState(props.lists);

  const csrf = props.csrf;
  const inputRef = React.useRef(null);

  const handleStateChange = ( listId ) => {

    var newLists = [...lists];

    newLists.map((list, index) =>{
      let id = list.id;
      if( id === listId ){
        newLists.splice(index, 1);
        setLists(newLists);
      }

      if( newLists.length > 0 ){
        let id = ("list-" + newLists[0].id + "-list");
        document.getElementById(id).click();
      } else {
        window.location.reload();
      }
    })
  }

  const setState = () => {
    console.log("State Set");
    // window.location.reload();
  }

  const displayList = (list, index) => {
    let isActive = false;
    if(index == 0){
      isActive = true;
    }
    return(
      <ListEntry 
        key={list.id}
        list={list}
        csrf={csrf}
        handleStateChange={handleStateChange}
        setState={setState}
        isActive={isActive}
      />
    )
  }

  var display;

  const renderDisplay = () => {
    if( lists.length > 0 ){
      display =
        <div>
          <h3 className="text-center">Lists</h3>
          <div className="list-group">
            {lists.map(displayList)}
          </div>
          <h3 className="text-center">Items</h3>
        </div>
    } else {
      display =
        <div className="text-center">
          <h3>
            Create a list to begin!
          </h3>
        </div>
    }
  }

  
  return (
    <React.Fragment>
      {renderDisplay()}
      {display}
    </React.Fragment>
  );
}

export default ListGroup
