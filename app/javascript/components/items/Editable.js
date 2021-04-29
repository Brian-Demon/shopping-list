import React, { useState, useEffect } from "react";

const Editable = ({
  childRef,
  text,
  type,
  placeholder,
  children,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const onBlur = () => {
    setEditing(false);
    props.onFinishEditing();
  }

  return (
    <section {...props}>
      {isEditing ? (
        <div onBlur={onBlur} >
          {children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)} >
          <span>
            {text || "Editable content"}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;