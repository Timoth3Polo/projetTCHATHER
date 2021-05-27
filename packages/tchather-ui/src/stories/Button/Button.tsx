import React from "react";
import ButtonStyle from "./Button.module.css";
import { IconType } from "react-icons";
export interface IButtonProps {
  onClick?: () => void;
  type?: "primary" | "secondary" | "success" | "warning";
  icon?: IconType;
  customClass?: any;
}

const buttonStyles = {
  primary: ButtonStyle.Button_Primary,
  secondary: ButtonStyle.Button_Secondary,
  success: ButtonStyle.Button_Success,
  warning: ButtonStyle.Button_Warning,
};
export const Button: React.FC<IButtonProps> = ({
  onClick,
  type,
  icon,
  children,
  customClass,
}) => {
  return (
    <button
      onClick={onClick}
      className={` ${customClass} ${ButtonStyle.Button} ${
        buttonStyles[type ?? "primary"]
      }`}
    >
      {children}
    </button>
  );
};
