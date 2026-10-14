import React from "react";
import Image from "next/image";
import styles from "./LogoBadge.module.css";

interface LogoBadgeProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export const LogoBadge: React.FC<LogoBadgeProps> = ({
  size = 88,
  className = "",
  priority = true,
}) => {
  return (
    <div
      className={`${styles.logoContainer} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Application Brand Logo"
    >
      <div className={styles.imageWrapper}>
        <Image
          src="/images/logo_clean.png"
          alt="Brand Logo"
          width={size}
          height={size}
          priority={priority}
          className={styles.logoImage}
        />
      </div>
    </div>
  );
};
