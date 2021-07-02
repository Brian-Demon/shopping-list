import React from "react"
import ListGroupButtons from "./ListGroupButtons"

const ListEntry = (props) => {
  const list = props.list;
  const activeClass = props.activeClass;
  const csrf = props.csrf;

  const isActive = () => {
    if( activeClass === "active" ){
      return true;
    } else {
      return false;
    }
  }

  return (
    <React.Fragment>
      <a key={list.id} className={"list-group-item list-group-item-action d-flex " + activeClass} id={"list-" + list.id + "-list"} data-bs-toggle="list" href={"#list-" + list.id} role="tab" aria-controls={"list-" + list.id}>
        <span className="p-0 m-0 flex-grow-1 me-auto list-name">{list.name}</span>
        
        <ListGroupButtons key={list.id} list={list} csrf={csrf} setState={props.handleStateChange} isActive={isActive}/>
      </a>
    </React.Fragment>
  )
}

export default ListEntry
