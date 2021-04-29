import React from "react"
import PropTypes from "prop-types"

class ItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
    }
  }

  render() {
    const bought = this.state.item.bought ? "item-bought" : "";
    const selected = this.state.item.bought ? "selected" : "";
    const rowClasses = `items-table-item ${bought}`;
    const checkboxId = "item_bought_" + this.state.item.id;
    return (
      <tr className={rowClasses}>
        <th scope="row">{this.props.index + 1}</th> 
        <td>{this.state.item.name}</td>
        <td>{this.state.item.person}</td>
        <td>{this.state.item.department}</td>
        <td><input type="checkbox" value="1" selected={selected} id={checkboxId} onClick={() => this.toggleBought()} /></td>
      </tr>
    );
  }

  toggleBought() {
    const item = this.state.item;
    item.bought = !item.bought;
    const data = { bought: item.bought };
    fetch("/items/"+item.id, { 
      method: "PUT", 
      body: JSON.stringify(data), 
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": this.props.csrf,
      }
    }).then(response => this.setState({ item: item }));
  }
};

class Table extends React.Component {
  render () {
    const csrf = this.props.csrf;
    const listItems = this.props.items.map((item, index) => <ItemRow key={item.id} item={item} index={index} csrf={csrf} />);
    return (
      <React.Fragment>
        <table className="table items-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item</th>
              <th scope="col">Person</th>
              <th scope="col">Department</th>
              <th scope="col">Bought</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Table
