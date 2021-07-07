import React from "react"
import ListGroupButtons from "./ListGroupButtons"

const ListEntry = (props) => {
  const list = props.list;
  const csrf = props.csrf;
  let activeClass = (props.isActive) ? " active" : "";
  const className = "list-group-item list-group-item-action d-flex" + activeClass;
  const ariaControls = "list-" + list.id;
  const id = ariaControls + "-list";
  const href = "#list-" + list.id;

  return (
    <React.Fragment>
      <a 
        key={list.id}
        className={className}
        id={id}
        data-bs-toggle="list"
        href={href}
        role="tab"
        aria-controls={ariaControls}
        >
        <span className="p-0 m-0 flex-grow-1 me-auto list-name">{list.name}</span>
        <ListGroupButtons key={list.id} list={list} csrf={csrf} handleStateChange={props.handleStateChange} setState={props.setState} />
      </a>
    </React.Fragment>
  )
}

export default ListEntry
