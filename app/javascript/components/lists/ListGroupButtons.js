import React from "react"

const ListGroupButtons = (props) => {
  const [showButtonGroup, setShowButtonGroup] = React.useState(0);

  const list = props.list;
  const csrf = props.csrf;
  const isActive = props.isActive(props.activeClass);

  let buttonGroup;

  if( showButtonGroup == 0 ){
    buttonGroup =
      <div className="btn-group btn-group-sm" role="group">
        <button type="button" className="btn btn-success" onClick={() => setShowButtonGroup(1)}>Share</button>
        <button type="button" className="btn btn-danger" onClick={() => setShowButtonGroup(2)}>Delete</button>
      </div>;
  } else if( showButtonGroup == 1 ){
    buttonGroup =
    <form>
      <input className="" placeholder="Share with... (email)" id="email" type="text" onSubmit={() => shareClicked(list.id, this.value)}/>
      <div className="btn-group btn-group-sm" role="group">
        <button type="submit" className="btn btn-success" onClick={() => shareClicked()}>Share</button>
        <button type="button" className="btn btn-secondary" onClick={() => setShowButtonGroup(0)}>Cancel</button>
      </div>
    </form>;
  } else if( showButtonGroup == 2 ){
    buttonGroup =
    <div className="btn-group btn-group-sm" role="group">
      <button type="button" className="btn btn-danger" onClick={() => confirmDelete()}>DELETE</button>
      <button type="button" className="btn btn-secondary" onClick={() => setShowButtonGroup(0)}>Cancel</button>
    </div>;
  } else {
    buttonGroup =
      <h4>ERROR</h4>
  }

  const shareClicked = () => {
    console.log("List: " + list.name + " shared with " + document.getElementById("email").value);
  }

  const confirmDelete = () => {
    const data = { list_id: list.id };
    fetch("/lists/" + list.id, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": csrf,
      }
    }).then(response => props.setState(list.id, isActive));
  }

  return (
    <React.Fragment>
      {buttonGroup}
    </React.Fragment>
  );
}

export default ListGroupButtons
