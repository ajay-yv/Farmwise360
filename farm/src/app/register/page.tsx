"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  IdCard,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import styles from "./register.module.css";

export default function RegisterPage() {
  const router = useRouter();

  // Form input states
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  // UI / Interaction states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast notifications
  const [toast, setToast] = useState<{
    type: "success" | "error" | "info";
    message: string;
    action?: { label: string; onClick: () => void };
  } | null>(null);

  // Field validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // OTP Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  // Handle phone input formatting (digits only, max 10)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(val);
    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: "" }));
    }
  };

  // Handle OTP input (digits only, max 6)
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(val);
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }
  };

  // Send OTP action
  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "Please enter a valid 10-digit phone number first",
      }));
      setToast({
        type: "error",
        message: "Please enter a valid 10-digit phone number.",
      });
      return;
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setIsOtpSent(true);
    setOtpCountdown(30);

    setToast({
      type: "success",
      message: `OTP sent successfully: ${randomOtp}`,
      action: {
        label: "Auto-fill",
        onClick: () => {
          setOtp(randomOtp);
          setToast({ type: "info", message: "OTP auto-filled!" });
        },
      },
    });
  };

  // Form submission & validation
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!phoneNumber || phoneNumber.length !== 10)
      newErrors.phoneNumber = "Valid 10-digit phone number is required";
    if (!otp) newErrors.otp = "Enter OTP received on phone";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Valid email is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setToast({
        type: "error",
        message: "Please fill in all required fields properly.",
      });
      return;
    }

    setIsSubmitting(true);
    setToast({
      type: "success",
      message: "Account created successfully! Returning to Sign In...",
    });

    // Navigate back to the first page (/) with the identifier prefilled
    setTimeout(() => {
      const identifierParam = encodeURIComponent(email || phoneNumber);
      window.location.href = `/?identifier=${identifierParam}&registered=true`;
    }, 900);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bokehOverlay} />

      {/* Floating Interactive Toast Alert */}
      {toast && (
        <div className={styles.toastWrapper}>
          <div
            className={`${styles.toast} ${
              toast.type === "success"
                ? styles.toastSuccess
                : toast.type === "error"
                ? styles.toastError
                : styles.toastInfo
            }`}
          >
            <div className={styles.toastBody}>
              {toast.type === "success" && (
                <CheckCircle2 style={{ width: 17, height: 17, color: "#34d399", flexShrink: 0 }} />
              )}
              {toast.type === "error" && (
                <AlertCircle style={{ width: 17, height: 17, color: "#fb7185", flexShrink: 0 }} />
              )}
              {toast.type === "info" && (
                <Sparkles style={{ width: 17, height: 17, color: "#34d399", flexShrink: 0 }} />
              )}
              <span>{toast.message}</span>
            </div>

            <div className={styles.toastActions}>
              {toast.action && (
                <button
                  type="button"
                  onClick={toast.action.onClick}
                  className={styles.toastBtn}
                >
                  {toast.action.label}
                </button>
              )}
              <button
                type="button"
                onClick={() => setToast(null)}
                className={styles.toastClose}
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Centered Registration Card */}
      <div className={styles.card}>
        {/* Navigation link back to First Page */}
        <div className={styles.topBar}>
          <Link href="/" className={styles.backLink} title="Back to Sign In (First Page)">
            <ArrowLeft style={{ width: 14, height: 14 }} />
            <span>Back to Sign In</span>
          </Link>
          <span className={styles.brandTag}>Farmwise360</span>
        </div>

        {/* Top Green Gradient Avatar Icon */}
        <div className={styles.avatarSection}>
          <svg
            viewBox="0 0 54 44"
            style={{ width: "48px", height: "38px" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="userGreenGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#84ea69" />
                <stop offset="100%" stopColor="#159f4b" />
              </linearGradient>
            </defs>
            {/* Head */}
            <circle cx="25" cy="11.5" r="8.5" fill="url(#userGreenGradient)" />
            {/* Body */}
            <path
              d="M10.5 37.5C10.5 27.5 17.2 23 25 23C32.8 23 39.5 27.5 39.5 37.5C39.5 38.3 38.8 39 38 39H12C11.2 39 10.5 38.3 10.5 37.5Z"
              fill="url(#userGreenGradient)"
            />
            {/* Plus Icon at top right */}
            <path
              d="M44 8V18M39 13H49"
              stroke="url(#userGreenGradient)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Heading & Subtitle */}
        <div className={styles.headerText}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Sign up to get started</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className={styles.form} noValidate>
          {/* Field 1: Full Name */}
          <div className={styles.fieldGroup}>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} strokeWidth={1.75} />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName)
                    setErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                className={`${styles.input} ${errors.fullName ? styles.inputError : ""}`}
                disabled={isSubmitting}
              />
            </div>
            {errors.fullName && <p className={styles.errorText}>{errors.fullName}</p>}
          </div>

          {/* Field 2: Phone Number (10 digits) */}
          <div className={styles.fieldGroup}>
            <div className={styles.inputWrapper}>
              <Phone className={styles.inputIcon} strokeWidth={1.75} />
              <input
                type="tel"
                maxLength={10}
                placeholder="Phone Number (10 digits)"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className={`${styles.input} ${errors.phoneNumber ? styles.inputError : ""}`}
                disabled={isSubmitting}
              />
            </div>
            {errors.phoneNumber && <p className={styles.errorText}>{errors.phoneNumber}</p>}
          </div>

          {/* Row 3: Send OTP + Enter OTP */}
          <div className={styles.fieldGroup}>
            <div className={styles.otpRow}>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpCountdown > 0 || isSubmitting}
                className={styles.sendOtpBtn}
              >
                {otpCountdown > 0 ? `Resend (${otpCountdown}s)` : "Send OTP"}
              </button>

              <div className={styles.otpInputWrapper}>
                <MessageSquare className={styles.inputIcon} strokeWidth={1.75} />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  className={`${styles.input} ${errors.otp ? styles.inputError : ""}`}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            {errors.otp && <p className={styles.errorText}>{errors.otp}</p>}
          </div>

          {/* Field 4: Email */}
          <div className={styles.fieldGroup}>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} strokeWidth={1.75} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: "" }));
                }}
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          {/* Field 5: Address */}
          <div className={styles.fieldGroup}>
            <div className={styles.inputWrapper}>
              <MapPin className={styles.inputIcon} strokeWidth={1.75} />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address)
                    setErrors((prev) => ({ ...prev, address: "" }));
                }}
                className={`${styles.input} ${errors.address ? styles.inputError : ""}`}
                disabled={isSubmitting}
              />
            </div>
            {errors.address && <p className={styles.errorText}>{errors.address}</p>}
          </div>

          {/* Field 6: Password */}
          <div className={styles.fieldGroup}>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} strokeWidth={1.75} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((prev) => ({ ...prev, password: "" }));
                }}
                className={`${styles.input} ${styles.inputWithToggle} ${
                  errors.password ? styles.inputError : ""
                }`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.toggleBtn}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye style={{ width: 16, height: 16 }} strokeWidth={1.75} />
                ) : (
                  <EyeOff style={{ width: 16, height: 16 }} strokeWidth={1.75} />
                )}
              </button>
            </div>
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>

          {/* Field 7: Confirm Password */}
          <div className={styles.fieldGroup}>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} strokeWidth={1.75} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                className={`${styles.input} ${styles.inputWithToggle} ${
                  errors.confirmPassword ? styles.inputError : ""
                }`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.toggleBtn}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? (
                  <Eye style={{ width: 16, height: 16 }} strokeWidth={1.75} />
                ) : (
                  <EyeOff style={{ width: 16, height: 16 }} strokeWidth={1.75} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className={styles.errorText}>{errors.confirmPassword}</p>
            )}
          </div>

          {/* Field 8: Reference Code (Optional) */}
          <div className={styles.fieldGroup}>
            <div className={styles.inputWrapper}>
              <IdCard className={styles.inputIcon} strokeWidth={1.75} />
              <input
                type="text"
                placeholder="Reference Code (Optional)"
                value={referenceCode}
                onChange={(e) => setReferenceCode(e.target.value)}
                className={styles.input}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Button 9: Register */}
          <div className={styles.submitBtnWrapper}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
              id="btn-register-submit"
            >
              {isSubmitting ? (
                <div className={styles.spinner} />
              ) : (
                <span>Register</span>
              )}
            </button>
          </div>
        </form>

        {/* Footer: Sign In Link */}
        <div className={styles.footer}>
          <span>Already have an account?</span>
          <Link href="/" className={styles.footerLink}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
