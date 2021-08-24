import React from "react";
import ListGroupButtons from "./ListGroupButtons";

const ListEntry = (props) => {
  const list = props.list;
  const csrf = props.csrf;
  let activeClass = props.isActive ? " active" : "";
  const className =
    "list-group-item list-group-item-action d-flex" + activeClass;
  const ariaControls = "list-" + list.id;
  const id = ariaControls + "-list";
  const href = "#list-" + list.id;
  const badgeItemCount = list.unbought + "/" + list.item_count;
  const sharedName = list.is_shared_with_user ? ` (Owner: ${list.shared_list_owner})` : "";
  const numberSharedWith = list.number_shared_with;
  const sharingText = (numberSharedWith > 0 && list.shared_list_owner == (props.user.first_name + " " + props.user.last_name)) ? ` (Shares: ${numberSharedWith})` : "";
  const listName = list.name + sharedName + sharingText;

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
        <span className="p-0 m-0 flex-grow-1 me-auto list-name">
          {listName}
        </span>
        <span className="badge bg-primary rounded-pill item-count">
          <span className="align-middle">{badgeItemCount}</span>
        </span>
        <ListGroupButtons
          key={list.id}
          list={list}
          csrf={csrf}
          setState={props.handleStateChange}
        />
      </a>
    </React.Fragment>
  );
};

export default ListEntry;
