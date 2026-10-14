"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthCard.module.css";
import { LogoBadge } from "./LogoBadge";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { SocialButton, SocialProvider } from "./SocialButton";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { Toast, ToastMessage } from "./Toast";
import { UserIcon, LockIcon, ArrowLeftIcon } from "./icons";

interface AuthCardProps {
  onBackClick?: () => void;
  useRasterSocialIcons?: boolean;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  onBackClick,
  useRasterSocialIcons = false,
}) => {
  const router = useRouter();
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSocialLoading, setActiveSocialLoading] = useState<SocialProvider | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const showToast = (title: string, description?: string, type: "success" | "info" = "success") => {
    setToast({
      id: String(Date.now()),
      type,
      title,
      description,
    });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Check if returning from Farmwise360 registration page
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("identifier");
      if (id) {
        const decoded = decodeURIComponent(id);
        setLoginIdentifier(decoded);
        showToast(
          "Account Created Successfully",
          `Welcome to Farmwise360! Please enter your password to sign in with ${decoded}.`,
          "success"
        );
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!loginIdentifier.trim()) {
      newErrors.identifier = "Please enter your email or phone number";
    }
    if (!loginPassword) {
      newErrors.password = "Please enter your password";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showToast("Authentication Successful", `Welcome back! Opening role selection...`);
      setTimeout(() => {
        window.location.href = "/select-role";
      }, 400);
    }, 600);
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    setActiveSocialLoading(provider);
    const providerName = provider === "google" ? "Google" : "Facebook";

    setTimeout(() => {
      setActiveSocialLoading(null);
      showToast(
        `${providerName} Authentication`,
        `Successfully connected via ${providerName}. Opening role selection...`
      );
      setTimeout(() => {
        window.location.href = "/select-role";
      }, 400);
    }, 600);
  };

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      showToast("Farmwise360 Portal", "You are at the main sign-in portal.", "info");
    }
  };

  return (
    <>
      <main className={styles.cardContainer}>
        {/* Top Header / Back Navigation */}
        <div className={styles.topBar}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
            aria-label="Go back"
            title="Go back"
          >
            <ArrowLeftIcon size={24} />
          </button>
        </div>

        {/* Auth Card Box */}
        <div className={styles.card}>
          {/* Logo Section */}
          <div className={styles.logoSection}>
            <LogoBadge size={86} priority />
          </div>

          {/* Heading & Subtitle */}
          <div className={styles.headerText}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Sign in to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} action="#" method="post" className={styles.form} noValidate>
            <InputField
              id="login-identifier"
              name="identifier"
              placeholder="Email / Phone Number"
              value={loginIdentifier}
              onChange={(e) => {
                setLoginIdentifier(e.target.value);
                if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: "" }));
              }}
              leftIcon={<UserIcon size={19} />}
              error={errors.identifier}
              disabled={isLoading}
            />

            <div className={styles.passwordFieldWrapper}>
              <InputField
                id="login-password"
                name="password"
                placeholder="Password"
                isPassword
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                }}
                leftIcon={<LockIcon size={19} />}
                error={errors.password}
                disabled={isLoading}
              />

              <div className={styles.forgotWrapper}>
                <button
                  type="button"
                  className={styles.forgotButton}
                  onClick={() => setIsForgotModalOpen(true)}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonsGroup}>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                id="btn-login-submit"
              >
                Login
              </Button>

              {/* Divider: "or" */}
              <div className={styles.divider}>
                <div className={styles.dividerLine} />
                <span className={styles.dividerText}>or</span>
                <div className={styles.dividerLine} />
              </div>

              {/* Register Outline Button - Opens Farmwise360 Create Account Page */}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  window.location.href = "/register";
                }}
                id="btn-register-toggle"
              >
                Register
              </Button>
            </div>
          </form>

          {/* Social Login Section */}
          <div className={styles.socialSection}>
            <p className={styles.socialLabel}>Continue with</p>
            <div className={styles.socialButtonsContainer}>
              <SocialButton
                provider="google"
                onClick={handleSocialLogin}
                isLoading={activeSocialLoading === "google"}
                disabled={isLoading || (activeSocialLoading !== null && activeSocialLoading !== "google")}
                useRasterIcon={useRasterSocialIcons}
              />
              <SocialButton
                provider="facebook"
                onClick={handleSocialLogin}
                isLoading={activeSocialLoading === "facebook"}
                disabled={isLoading || (activeSocialLoading !== null && activeSocialLoading !== "facebook")}
                useRasterIcon={useRasterSocialIcons}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        onSuccess={(email) => {
          showToast("Recovery Link Dispatched", `A reset email was sent to ${email}`);
        }}
      />

      {/* Notification Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
};
