import React from "react";
import InputStyle from "./Input.module.css";
import { FiSearch } from "react-icons/fi";
export interface IInputProps {
  value: string;
  onChange: () => void;
  placeholder: string;
  searchIcon?: boolean;
}

export const Input: React.FC<IInputProps> = ({
  value,
  onChange,
  placeholder,
  searchIcon,
}) => {
  return (
    <div className={InputStyle.InputWrapper}>
      {searchIcon && <FiSearch />}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        className={InputStyle.Input}
      />
    </div>
  );
};
