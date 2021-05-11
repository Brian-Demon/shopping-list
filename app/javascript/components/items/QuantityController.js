import React from "react"

const QuantityController = (props) => {
  const [state, setState] = React.useState({ item: props.item });
  const selectedItem = props.item;
  const updateQuantity = (amount) => {
    const newQuantity = selectedItem.quantity + amount;
    if (newQuantity == 0) return;
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

  return (
    <React.Fragment>
      <div className="btn-group" role="group" aria-label="Item Quantity">
        <button type="button" className="btn btn-danger btn-sm" onClick={() => updateQuantity(-1)}>-</button>
        <button type="button" className="btn btn-dark btn-sm">{selectedItem.quantity}</button>
        <button type="button" className="btn btn-success btn-sm" onClick={() => updateQuantity(1)}>+</button>
      </div>
    </React.Fragment>
  );
}

export default QuantityController
