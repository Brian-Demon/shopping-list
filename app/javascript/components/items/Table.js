import React, { useReducer } from "react"
import EditableField from "./EditableField"
import QuantityController from "./QuantityController"

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key, direction) => {
    if (direction !== undefined) {
      setSortConfig({ key, direction });
      return;
    }
    
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    } else {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  return { items, sortedItems, requestSort, sortConfig };
};

const ItemRow = (props) => {
  const display_location = props.display_location;
  const shared = props.shared;
  const item = props.item;
  const bought = item.bought ? "item-bought" : "";
  const checked = item.bought ? "checked" : "";
  const rowClasses = `items-table-item ${bought}`;
  const checkboxId = "item_bought_" + item.id;

  return (
    <tr className={rowClasses}>
      <td><input type="checkbox" value="1" checked={checked} id={checkboxId} onChange={() => props.toggleBought(item)} /></td>
      <td><EditableField id={item.id} field="name" text={item.name} csrf={props.csrf} /></td>
      {shared ? (
        <td><EditableField id={item.id} field="person" text={item.person} csrf={props.csrf} /></td>
      ) : (
        null
      )}
      {display_location ? (
        <td><EditableField id={item.id} field="location" text={item.location} csrf={props.csrf} /></td>
      ) : (
        null
      )}
      <th scope="row"><QuantityController item={item} quantity={item.quantity} csrf={props.csrf} removeItem={props.removeItem}/></th>
    </tr>
  );
};

const Table = (props) => {
  const user = props.user;
  const csrf = props.csrf;
  const list = props.list;
  const { items, sortedItems, requestSort, sortConfig } = useSortableData(props.items, { key: "name", direction: "ascending"});
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const handleSubmit = (e) => {
    const nameField = e.target.closest("tr").querySelector("input[name=itemNameField]");
    const personField = e.target.closest("tr").querySelector("input[name=itemPersonField]");
    const locationField = e.target.closest("tr").querySelector("input[name=itemLocationField]");
    const person = shared ? personField.value : user.first_name;
    const location = list.display_location ? locationField.value : "N/A"
    const data = {
      list_id: props.id,
      name: nameField.value,
      person: person,
      location: location,
      quantity: 1
    };
    fetch("/items/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": props.csrf,
      }
    })
    .then(response => response.json())
    .then(json_response => {
      data.id = json_response.id;
      items.push(data);
      requestSort(sortConfig.key, sortConfig.direction);
      nameField.value = "";
      if( shared ){
        personField.value = "";
      }
      if( list.display_location ){
        locationField.value = "";
      }
    });
  }

  const handleRemoveBought = () => {
    fetch("/lists/" + props.id + "/remove_bought", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": props.csrf,
      }
    }).then(response => {
      for (var idx = items.length - 1; idx >= 0; idx--) {
        if(items[idx].bought) {
          items.splice(items[idx], 1);
        }
      }

      requestSort(sortConfig.key, sortConfig.direction);
    });
    
  }

  const toggleBought = (item) => {
    const toggleItem = items[items.indexOf(item)];
    toggleItem.bought = !toggleItem.bought;
    const data = { bought: toggleItem.bought };
    fetch("/items/" + toggleItem.id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": props.csrf,
      }
    }).then(response => {
      requestSort(sortConfig.key, sortConfig.direction);
    });
  }

  const removeItem = (item) => {
    items.splice(items.indexOf(item), 1);
    fetch("/items/" + item.id + "/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": props.csrf,
      }
    }).then(response => {
      requestSort(sortConfig.key, sortConfig.direction);
    });
  }

  const listPresent = items.length > 0;
  const shared = props.list.is_shared_with_user;
  var personHeader = null;
  var personFooter = null;
  var locationHeader = null;
  var locationFooter = null;
  if (shared) {
    personHeader = 
      <th className="text-col">
        <button
          type="button"
          onClick={() => requestSort("person")}
          className={"btn btn-primary btn-sm " + getClassNamesFor("person")}
        >
          Person
        </button>
      </th>;
    personFooter = 
      <td>
        <input name="itemPersonField" placeholder="Person Name" list="item_person_datalist_options"/>
      </td>;
  }
  if ( list.display_location ){
    locationHeader =
      <th className="text-col">
        <button
          type="button"
          onClick={() => requestSort("location")}
          className={"btn btn-primary btn-sm " + getClassNamesFor("location")}
        >
          Location
        </button>
      </th>;
    locationFooter = 
      <td>
        <input name="itemLocationField" placeholder="Location Name" list="item_location_datalist_options"/>
      </td>;
  }
  return (
    <React.Fragment>
      <table className="table items-table align-middle">
        <thead>
          <tr>
            <th className="bought-col">
              <button
                type="button"
                onClick={() => requestSort("bought")}
                className={"btn btn-primary btn-sm " + getClassNamesFor("bought")}
              >
                Bought
              </button>
            </th>
            <th className="text-col">
              <button
                type="button"
                onClick={() => requestSort("name")}
                className={"btn btn-primary btn-sm " + getClassNamesFor("name")}
              >
                Item
              </button>
            </th>
            { personHeader }
            { locationHeader }
            <th className="quantity-col">
              <button
                type="button"
                onClick={() => requestSort("quantity")}
                className={"btn btn-primary btn-sm " + getClassNamesFor("quantity")}
              >
                Quantity
                </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => ( 
            <ItemRow display_location={list.display_location} shared={shared} key={item.id} item={item} csrf={csrf} toggleBought={toggleBought} removeItem={removeItem} />
          ))}
        </tbody>
        <tfoot>
        <tr className='items-table-item'>
            <td>
              {listPresent ? (
                <button className="btn btn-warning btn-sm" onClick={handleRemoveBought}>Remove Bought</button>
              ) : (
                ""
              )}
            </td>
            <td>
              <input name="itemNameField" placeholder="Item Name" list="item_name_datalist_options"/>
            </td>
            { personFooter }
            { locationFooter }
            <td>
              <button className="btn btn-success btn-sm" onClick={handleSubmit}>Add Item</button>
            </td>
            
          </tr>
        </tfoot>
      </table>
    </React.Fragment>
  );
};

export default Table
