import React, { useState, useEffect } from "react"
import ListGroupButtons from "./ListGroupButtons"

const ListGroup = (props) => {
  const [lists, setLists] = useState(props.lists);

  // var lists = props.lists;
  const csrf = props.csrf;

  const handleStateChange = ( listId ) => {
    var newLists = [...lists];

    newLists.map((list, index) =>{
      let id = list.id;
      if( id === listId ){
        newLists.splice(index, 1);
        setLists(newLists);
        console.log("List: \"" + list.name + "\" removed");
      }
    })
  }

  const displayList = (list, index) => {
    let activeClass = "";
    if(index == 0){
      activeClass = "active";
    }
    return(
      <a className={"list-group-item list-group-item-action d-flex " + activeClass} id={"list-" + list.id + "-list"} data-bs-toggle="list" href={"#list-" + list.id} role="tab" aria-controls={"list-" + list.id}>
        <span className="p-0 m-0 flex-grow-1 me-auto list-name">{list.name}</span>
        <ListGroupButtons key={list.id} list={list} csrf={csrf} setState={handleStateChange}/>
      </a>
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
