import React, { useRef, useState } from "react"
import Editable from "./Editable"

function EditableField(props) {
  const inputRef = useRef();
  const [fieldValue, setFieldValue] = useState(props.text);

  const persistField = () => {
    const data = {};
    data[props.field] = fieldValue;
    fetch("/items/"+props.id, {
      method: "PUT", 
      body: JSON.stringify(data), 
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": props.csrf,
      }
    })
  };

  return (
    <React.Fragment>
      <Editable text={fieldValue} childRef={inputRef} handleFinishEditing={() => persistField()}>
        <input ref={inputRef} type="text" name={props.field} value={fieldValue} onChange={e => setFieldValue(e.target.value)} />
      </Editable>
    </React.Fragment>
  );
}

export default EditableField
