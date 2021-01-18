import React from "react";
import classnames from "classnames";
import "./TextField.css";
const Select = ({
  name,
  placeholder,
  value,
  error,
  label,
  onChange,
  disabled,
  opts,
}) => {
  let options = opts.map((item, index) => {
    return (
      <option key={index} value={item.value}>
        {item.text}
      </option>
    );
  });

  return (
    <tr>
      <td>
        <label htmlFor={name}>{label}</label>
      </td>
      <td>
        <select
          onChange={onChange}
          value={value}
          name={name}
          className={classnames("input ", {
            "is-invalid": error,
          })}
          disabled={disabled}
        >
          <option defaultValue>{placeholder}</option>
          {options}
        </select>
        {error && (
          <div className="invalid-feedback" style={{ marginLeft: "1vw" }}>
            {error}
          </div>
        )}
      </td>
    </tr>
  );
};
Select.defaultProps = {
  type: "text",
};
export default Select;
