import React from "react"
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
  const item = props.item;
  const bought = item.bought ? "item-bought" : "";
  const checked = item.bought ? "checked" : "";
  const rowClasses = `items-table-item ${bought}`;
  const checkboxId = "item_bought_" + item.id;

  return (
    <tr className={rowClasses}>
      <td><input type="checkbox" value="1" checked={checked} id={checkboxId} onChange={() => props.toggleBought(item)} /></td>
      <td><EditableField id={item.id} field="name" text={item.name} csrf={props.csrf} /></td>
      <td><EditableField id={item.id} field="person" text={item.person} csrf={props.csrf} /></td>
      <td><EditableField id={item.id} field="department" text={item.department} csrf={props.csrf} /></td>
      <th scope="row"><QuantityController item={item} quantity={item.quantity} csrf={props.csrf}/></th>
    </tr>
  );
};

const Table = (props) => {
  const csrf = props.csrf;
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
    const departmentField = e.target.closest("tr").querySelector("input[name=itemDepartmentField]");
    const data = {
      list_id: props.id,
      name: nameField.value,
      person: e.target.closest("tr").querySelector("input[name=itemPersonField").value,
      department: e.target.closest("tr").querySelector("input[name=itemDepartmentField").value,
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
      personField.value = "";
      departmentField.value = "";
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
    items.splice(items.indexOf(item), 1)
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

  return (
    <React.Fragment>
      <table className="table items-table">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("bought")}
                className={"btn btn-primary btn-sm " + getClassNamesFor("bought")}
              >
                Bought
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("quantity")}
                className={"btn btn-primary btn-sm " + getClassNamesFor("quantity")}
              >
                Quantity
                </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("name")}
                className={"btn btn-primary btn-sm " + getClassNamesFor("name")}
              >
                Item
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("person")}
                className={"btn btn-primary btn-sm " + getClassNamesFor("person")}
              >
                Person
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("department")}
                className={"btn btn-primary btn-sm " + getClassNamesFor("department")}
              >
                Department
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => ( 
            <ItemRow key={item.id} item={item} csrf={csrf} toggleBought={toggleBought} removeItem={removeItem} />
          ))}
        </tbody>
        <tfoot>
        <tr className='items-table-item'>
            <td>
              <button className="btn btn-warning btn-sm" onClick={handleRemoveBought}>Remove Bought</button>
            </td>
            <td>
              <input name="itemNameField" placeholder="Item Name" list="item_name_datalist_options"/>
            </td>
            <td>
              <input name="itemPersonField" placeholder="Person Name" list="item_person_datalist_options"/>
            </td>
            <td>
              <input name="itemDepartmentField" placeholder="Department Name" list="item_department_datalist_options"/>
            </td>
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
