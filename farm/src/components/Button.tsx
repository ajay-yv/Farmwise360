import React from "react";
import styles from "./Button.module.css";
import { SpinnerIcon } from "./icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  fullWidth = true,
  children,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${
        fullWidth ? styles.fullWidth : ""
      } ${isLoading ? styles.loading : ""} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className={styles.loadingWrapper}>
          <SpinnerIcon size={18} />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
