import React from "react"

const QuantityController = (props) => {
  const [state, setState] = React.useState({ item: props.item });
  const selectedItem = props.item;
  const updateQuantity = (amount) => {
    const newQuantity = selectedItem.quantity + amount;
    if (newQuantity == -1) return;
    selectedItem.quantity = newQuantity;
    const data = { quantity: selectedItem.quantity };
    fetch("/items/" + props.item.id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": props.csrf,
      }
    }).then(response => setState({ item: selectedItem }));
  }

  let buttonGroup;
  if (selectedItem.quantity > 0) { 
      buttonGroup = <React.Fragment>
            <button type="button" className="btn btn-danger btn-sm shadow-none" onClick={() => updateQuantity(-1)}>- </button>
            <button type="button" disabled className="btn btn-dark btn-sm shadow-none">{selectedItem.quantity}</button>
            <button type="button" className="btn btn-success btn-sm shadow-none" onClick={() => updateQuantity(1)}>+</button>
          </React.Fragment>;
  } else {
      buttonGroup = <React.Fragment>
            <button type="button" className="btn btn-danger btn-sm shadow-none" onClick={() => props.removeItem(props.item)}>Remove</button>
            <button type="button" className="btn btn-secondary btn-sm shadow-none" onClick={() => updateQuantity(1)}>Cancel</button>
          </React.Fragment>;
  }
  return (
    <React.Fragment>
      <div className="btn-group shadow-none" role="group" aria-label="Item Quantity">
        {buttonGroup}
      </div>
    </React.Fragment>
  );
}

export default QuantityController
