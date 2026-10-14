import React from "react";
import styles from "./Toast.module.css";
import { CheckCircleIcon, CloseIcon } from "./icons";

export interface ToastMessage {
  id: string;
  type: "success" | "info" | "warning";
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <div className={`${styles.toastContainer} ${styles[toast.type]}`} role="status">
      <div className={styles.icon}>
        <CheckCircleIcon size={20} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{toast.title}</div>
        {toast.description && <div className={styles.description}>{toast.description}</div>}
      </div>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Close notification"
      >
        <CloseIcon size={16} />
      </button>
    </div>
  );
};
