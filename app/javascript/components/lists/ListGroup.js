import React, { useState, useEffect } from "react"
import ListEntry from "./ListEntry"
import PreviousDataLists from "../items/PreviousDatalists"
import Table from "../items/Table"

const ListGroup = (props) => {
  const [lists, setLists] = useState(props.lists);

  const csrf = props.csrf;
  const previousItemData = props.previousItemData;
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
        isActive={isActive}
      />
    )
  }

  var displayLists;
  var displayItems;

  const renderLists = () => {
    if( lists.length > 0 ){
      displayLists =
        <div>
          <h3 className="text-center">Lists</h3>
          <div className="list-group">
            {lists.map(displayList)}
          </div>
        </div>
    } else {
      displayLists =
        <div className="text-center">
          <h3>
            Create a list to begin!
          </h3>
        </div>
    }
  }

  const displayItem = (list, index) => {
    let isActive = "";
    if(index == 0){
      isActive = "active";
    }
    let className = "shopping-list tab-pane fade show " + isActive;
    let id = "list-" + list.id;
    return(
      <div key={list.id} className={className} id={id}>
        <Table
          key={list.id}
          id={list.id}
          previousItemData={previousItemData}
          items={list.items}
          csrf={csrf}
        />
      </div>
    )
  }

  const renderItems = () => {
    if( lists.length > 0 ){
      displayItems =
        <div>
          <h3 className="text-center">Items</h3>
          <div className="row mt-4 text-center">
            <div className="tab-content" id="nav-tabContent">
              {lists.map(displayItem)}
            </div>
          </div>
        </div>
    } else {
      displayItems =
        <div className="text-center">
          <h3>
            Create a list to begin!
          </h3>
        </div>
    }
  }
  
  return (
    <React.Fragment>
      <PreviousDataLists key="previousItemData" previousItemData={props.previousItemData} />
      {renderLists()}
      {displayLists}
      {renderItems()}
      {displayItems}
    </React.Fragment>
  );
}

export default ListGroup
