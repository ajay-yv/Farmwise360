import React, { useState } from "react";
import styles from "./ForgotPasswordModal.module.css";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { UserIcon, CloseIcon, CheckCircleIcon } from "./icons";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (emailOrPhone: string) => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      setError("Please enter your registered email or phone number");
      return;
    }
    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => {
        onSuccess(value);
        setIsSent(false);
        setValue("");
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <CloseIcon size={20} />
        </button>

        {isSent ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <CheckCircleIcon size={36} />
            </div>
            <h3 className={styles.title}>Check Your Inbox</h3>
            <p className={styles.subtitle}>
              Password recovery instructions have been dispatched to <strong>{value}</strong>.
            </p>
          </div>
        ) : (
          <>
            <h3 className={styles.title}>Reset Password</h3>
            <p className={styles.subtitle}>
              Enter your registered email address or phone number and we will send you recovery instructions.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <InputField
                id="reset-email"
                name="reset-email"
                placeholder="Email / Phone Number"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (error) setError("");
                }}
                leftIcon={<UserIcon size={19} />}
                error={error}
                autoFocus
              />

              <div className={styles.actions}>
                <Button type="submit" variant="primary" isLoading={isSubmitting}>
                  Send Recovery Link
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
