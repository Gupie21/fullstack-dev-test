import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const StyledTextField = styled(TextField)`
height: 68px;
  p {
    margin-left: 0px;
  }
`;

const MaterialFormInputGroup = ({
  handleChange,
  size,
  value,
  name,
  onKeyUp,
  disabled,
  errorText,
  type,
  helperText,
  variant,
  error,
}) => (
  <StyledTextField
    label={name}
    variant={variant}
    size={size}
    id={`${name}TextField`}
    value={value}
    type={type}
    disabled={disabled}
    onKeyUp={onKeyUp}
    onChange={handleChange}
    error={error}
    helperText={errorText ? errorText : helperText ? helperText : ""}
  />
);

MaterialFormInputGroup.propTypes = {
  onKeyUp: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "password"]),
  variant: PropTypes.oneOf(["filled", "outlined", "standard"]),
};

MaterialFormInputGroup.defaultProps = {
  handleChange: () => console.log("MaterialFormInputGroup has no prop of handleChange"),
  name: "name_of_input",
  disabled: false,
  value: null,
  size: "small",
  error: false,
  errorText: "",
  helperText: "",
  type: "text",
  variant: "standard",
};

export default MaterialFormInputGroup;
