import React, { useState, useEffect } from "react"
import ListEntry from "./ListEntry"

const ListGroup = (props) => {
  const [lists, setLists] = useState(props.lists);

  const csrf = props.csrf;

  const handleStateChange = ( listId, isActive ) => {

    var newLists = [...lists];

    newLists.map((list, index) =>{
      let id = list.id;
      if( id === listId ){
        newLists.splice(index, 1);
        setLists(newLists);
      }
    })
  }

  const displayList = (list, index) => {
    let activeClass = "";
    if(index == 0){
      activeClass = "active";
    }
    return(
      <ListEntry key={list.id} list={list} csrf={csrf} handleStateChange={handleStateChange} activeClass={activeClass}/>
    )
  }

  return (
    <React.Fragment>
      <h3 className="text-center">Lists</h3>
      <div className="list-group">
        {lists.map(displayList)}
      </div>
      <h3 className="text-center">Items</h3>
    </React.Fragment>
  );
}

export default ListGroup
