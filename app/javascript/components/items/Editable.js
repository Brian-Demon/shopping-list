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
  const { handleFinishEditing, ...rest } = props;

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const onBlur = () => {
    setEditing(false);
    handleFinishEditing();
  }

  return (
    <section {...rest}>
      {isEditing ? (
        <div onBlur={onBlur} >
          {children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)} >
          <span>
            {text || "[ Missing Info ]"}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;