import React from "react"
import EditableField from "./EditableField"

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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items, sortedItems, requestSort, sortConfig };
};

const ItemRow = (props) => {
  const [state, setState] = React.useState({ item: props.item });
  const item = state.item;
  const bought = item.bought ? "item-bought" : "";
  const checked = item.bought ? "checked" : "";
  const rowClasses = `items-table-item ${bought}`;
  const checkboxId = "item_bought_" + item.id;

  function toggleBought(item) {
    const toggleItem = item;
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
    }).then(response => setState({ item: toggleItem }));
  };

  return (
    <tr className={rowClasses}>
      <th scope="row">{props.index + 1}</th>
      <td><EditableField id={item.id} field="name" text={item.name} csrf={props.csrf} /></td>
      <td><EditableField id={item.id} field="person" text={item.person} csrf={props.csrf} /></td>
      <td><EditableField id={item.id} field="department" text={item.department} csrf={props.csrf} /></td>
      <td><input type="checkbox" value="1" checked={checked} id={checkboxId} onChange={() => toggleBought(item)} /></td>
    </tr>
  );
};

const Table = (props) => {
  const csrf = props.csrf;
  const { items, requestSort, sortConfig, setSortConfig } = useSortableData(props.items);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const handleSubmit = (e) => {
    console.log(e)
    const nameField = e.target.closest("tr").querySelector("input[name=itemNameField");
    const personField = e.target.closest("tr").querySelector("input[name=itemPersonField");
    const departmentField = e.target.closest("tr").querySelector("input[name=itemDepartmentField");
    const data = {
      list_id: props.id,
      name: nameField.value,
      person: e.target.closest("tr").querySelector("input[name=itemPersonField").value,
      department: e.target.closest("tr").querySelector("input[name=itemDepartmentField").value
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
      requestSort(sortConfig.key);
      nameField.value = "";
      personField.value = "";
      departmentField.value = "";
    });
    
  }

  return (
    <React.Fragment>
      <table className="table items-table">
        <thead>
          <tr>
            <th scope="col">#</th>
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
            <th>
              <button
                type="button"
                onClick={() => requestSort("bought")}
                className={"btn btn-primary btn-sm " + getClassNamesFor("bought")}
              >
                Bought
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <ItemRow key={item.id} item={item} index={index} csrf={csrf} />
          ))}
        </tbody>
        <tfoot>
        <tr className='items-table-item'>
          <th scope="row">New Item</th>
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
              <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Add Item</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </React.Fragment>
  );
};

export default Table
