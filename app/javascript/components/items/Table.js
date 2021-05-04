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

  return { items: sortedItems, requestSort, sortConfig };
};

const ItemRow = (props) => {
  const item = props.item;
  const bought = item.bought ? "item-bought" : "";
  const selected = item.bought ? "selected" : "";
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
      <td><input type="checkbox" value="1" selected={selected} id={checkboxId} onClick={() => toggleBought(item)} /></td>
    </tr>
  );
};

const Table = (props) => {
  const csrf = props.csrf;
  const { items, requestSort, sortConfig } = useSortableData(props.items);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
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
      </table>
    </React.Fragment>
  );
};

export default Table