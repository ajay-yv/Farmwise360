import React, { useState } from "react";
import styles from "./InputField.module.css";
import { EyeIcon, EyeOffIcon } from "./icons";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label?: string;
  placeholder: string;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  placeholder,
  leftIcon,
  isPassword = false,
  error,
  type = "text",
  className = "",
  value,
  onChange,
  disabled,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`${styles.wrapper} ${className} ${error ? styles.hasError : ""}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div
        className={`${styles.inputContainer} ${isFocused ? styles.focused : ""} ${
          error ? styles.containerError : ""
        } ${disabled ? styles.disabled : ""}`}
      >
        {leftIcon && <div className={styles.leftIconWrapper}>{leftIcon}</div>}

        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${styles.input} ${leftIcon ? styles.hasLeftIcon : ""} ${
            isPassword ? styles.hasRightIcon : ""
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete={isPassword ? "current-password" : "username"}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            id={`${id}-toggle-visibility`}
            className={styles.toggleButton}
            onClick={() => setShowPassword((prev) => !prev)}
            onMouseDown={(e) => e.preventDefault()}
            tabIndex={0}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className={styles.errorMessage} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
