import React, { useState, setState } from "react";

const Options = (props) => {
  const user = props.user;
  const defaultLocationState = user.display_location;
  const [state, setState] = useState({ user: props.user });
  const locationHelp = 'Shows the "Location" Column in your shopping list to add a department or aisle where the item is location.';
  const isChecked = defaultLocationState ? "checked" : "";
  
  const handleLocationChange = (e) => {
    const newUser = props.user;
    newUser.display_location = !newUser.display_location;
    const data = {};
    fetch("/options/" + user.id + "/update_display_location", {
      method: "POST", 
      body: JSON.stringify(data), 
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": props.csrf,
      }
    }).then(response => setState({ user: newUser }));
  }

  return (
    <React.Fragment>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="locationToggleSwitch" onChange={() => handleLocationChange(this)} checked={!!isChecked}/>
        <label className="form-check-label" htmlFor="locationToggleSwitch"> Show "Location" Column</label>
        <span className="ps-1">
          <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="right" data-bs-trigger="hover focus" data-bs-content={locationHelp}>
            <button className="btn btn-sm btn-secondary" type="button" disabled>?</button>
          </span>
        </span>
      </div>
    </React.Fragment>
  );
};

export default Options;