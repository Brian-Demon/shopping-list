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
  const badgeItemCount = (list.unbought_count) + "/" + (list.item_count);

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
        <span className="badge bg-primary rounded-pill item-count">
          <span className="align-middle">{badgeItemCount}</span>
        </span>
        <ListGroupButtons key={list.id} list={list} csrf={csrf} setState={props.handleStateChange} />
      </a>
    </React.Fragment>
  )
}

export default ListEntry
