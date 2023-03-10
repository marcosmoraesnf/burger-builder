import React from "react";
import classes from "./Input.css";

const Input = (props) => {
  let inputElement = null;

  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      const options = props.elementConfig.options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        );
      });

      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {options}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }

  return (
    <div
      style={{
        width: "100%",
        padding: "10px",
        boxSizing: "border-box",
        margin: "auto",
      }}
    >
      <label className={classes.Label}>{props.label}</label>

      {inputElement}
    </div>
  );
};

export default Input;
