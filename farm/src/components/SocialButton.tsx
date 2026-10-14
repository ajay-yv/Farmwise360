import React, { useState } from "react";
import styles from "./SocialButton.module.css";
import { GoogleIcon, FacebookIcon, SpinnerIcon } from "./icons";
import Image from "next/image";

export type SocialProvider = "google" | "facebook";

interface SocialButtonProps {
  provider: SocialProvider;
  onClick?: (provider: SocialProvider) => void;
  isLoading?: boolean;
  disabled?: boolean;
  useRasterIcon?: boolean; // Option to render the cropped PNG from image 3
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onClick,
  isLoading = false,
  disabled = false,
  useRasterIcon = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const providerConfig = {
    google: {
      name: "Google",
      ariaLabel: "Sign in with Google",
      imageSrc: "/images/google-circle.png",
      svgIcon: <GoogleIcon size={24} />,
    },
    facebook: {
      name: "Facebook",
      ariaLabel: "Sign in with Facebook",
      imageSrc: "/images/facebook-circle.png",
      svgIcon: <FacebookIcon size={28} />,
    },
  }[provider];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled || isLoading) return;
    onClick?.(provider);
  };

  return (
    <button
      type="button"
      id={`social-auth-btn-${provider}`}
      className={`${styles.socialButton} ${styles[provider]} ${isPressed ? styles.pressed : ""}`}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled || isLoading}
      aria-label={providerConfig.ariaLabel}
      title={providerConfig.ariaLabel}
    >
      {isLoading ? (
        <SpinnerIcon size={20} className={styles.spinner} />
      ) : useRasterIcon ? (
        <div className={styles.rasterWrapper}>
          <Image
            src={providerConfig.imageSrc}
            alt={providerConfig.name}
            width={34}
            height={34}
            className={styles.rasterImg}
          />
        </div>
      ) : (
        <div className={styles.iconWrapper}>{providerConfig.svgIcon}</div>
      )}
    </button>
  );
};
