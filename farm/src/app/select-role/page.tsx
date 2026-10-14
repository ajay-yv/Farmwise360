"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Tractor,
  Store,
  Building2,
  Sprout,
  Check,
  ArrowLeft,
  Receipt,
  Ticket,
  CheckCircle2,
  X,
  RefreshCw,
} from "lucide-react";
import styles from "./selectRole.module.css";

export type RoleType = "user" | "farmer" | "shop_owner" | "business" | "nursery";

export interface RoleConfig {
  id: RoleType;
  title: string;
}

export const ROLE_CONFIGS: RoleConfig[] = [
  { id: "user", title: "User" },
  { id: "farmer", title: "Farmer" },
  { id: "shop_owner", title: "Shop Owner" },
  { id: "business", title: "Business" },
  { id: "nursery", title: "Nursery" },
];

export default function SelectRolePage() {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Business form states
  const [ownerType, setOwnerType] = useState("Business / Shop Owner");
  const [businessName, setBusinessName] = useState("");
  const [gstin, setGstin] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isBusinessSubmitted, setIsBusinessSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectRole = (roleId: RoleType) => {
    setSelectedRole(roleId);
    if (roleId === "shop_owner") {
      setOwnerType("Shop Owner");
    } else if (roleId === "business") {
      setOwnerType("Business");
    }
  };

  const handleConfirm = () => {
    if (!selectedRole) return;
    if (selectedRole === "business" || selectedRole === "shop_owner") {
      setShowBusinessForm(true);
    } else {
      setIsConfirmed(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBusinessSubmitted(true);
    }, 700);
  };

  const renderIcon = (roleId: RoleType, isSelected: boolean) => {
    const iconProps = {
      size: 26,
      strokeWidth: 1.75,
    };

    switch (roleId) {
      case "user":
        return <User {...iconProps} />;
      case "farmer":
        return <Tractor {...iconProps} />;
      case "shop_owner":
        return <Store {...iconProps} />;
      case "business":
        return <Building2 {...iconProps} />;
      case "nursery":
        return <Sprout {...iconProps} />;
      default:
        return <User {...iconProps} />;
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        {showBusinessForm ? (
          <div style={{ width: "100%" }}>
            {isBusinessSubmitted ? (
              <div
                style={{
                  width: "100%",
                  padding: "2rem",
                  background: "#ffffff",
                  borderRadius: "1.25rem",
                  textAlign: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  border: "1px solid #E2E8F0",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "#ecfdf5",
                    color: "#059669",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}
                >
                  <CheckCircle2 size={36} strokeWidth={2.2} />
                </div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0F172A", marginBottom: "0.5rem" }}>
                  Profile Completed!
                </h2>
                <p style={{ color: "#64748B", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                  Your {ownerType} profile has been successfully saved.
                </p>

                <div
                  style={{
                    background: "#F8FAFC",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    marginBottom: "1.5rem",
                    textAlign: "left",
                    fontSize: "0.9rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <div>
                    <span style={{ color: "#64748B" }}>Role: </span>
                    <strong style={{ color: "#0F172A" }}>{ownerType}</strong>
                  </div>
                  {businessName && (
                    <div>
                      <span style={{ color: "#64748B" }}>Business Name: </span>
                      <strong style={{ color: "#0F172A" }}>{businessName}</strong>
                    </div>
                  )}
                  {gstin && (
                    <div>
                      <span style={{ color: "#64748B" }}>GSTIN: </span>
                      <strong style={{ color: "#0F172A" }}>{gstin}</strong>
                    </div>
                  )}
                  {registrationNumber && (
                    <div>
                      <span style={{ color: "#64748B" }}>Reg Number: </span>
                      <strong style={{ color: "#0F172A" }}>{registrationNumber}</strong>
                    </div>
                  )}
                  {imagePreview && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <span style={{ color: "#64748B", display: "block", marginBottom: "0.25rem" }}>Shop Image:</span>
                      <img
                        src={imagePreview}
                        alt="Shop Preview"
                        style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "0.5rem" }}
                      />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsBusinessSubmitted(false)}
                  className={`${styles.confirmBtn} ${styles.confirmBtnActive}`}
                  style={{ marginBottom: "0.75rem" }}
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={() => setShowBusinessForm(false)}
                  className={styles.backBtn}
                  style={{ justifyContent: "center", width: "100%" }}
                >
                  <ArrowLeft size={16} />
                  <span>Back to Role Selection</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleBusinessSubmit} className={styles.formWrapper}>
                {/* Top Bar with Back Button */}
                <div className={styles.formTopBar}>
                  <button
                    type="button"
                    onClick={() => setShowBusinessForm(false)}
                    className={styles.backBtn}
                  >
                    <ArrowLeft size={18} />
                    <span>Back</span>
                  </button>
                  <span className={styles.formTag}>Registration</span>
                </div>

                {/* Field 1: Business / Shop Owner */}
                <div className={styles.inputGroup}>
                  <div className={styles.inputIcon}>
                    <User size={20} strokeWidth={1.8} />
                  </div>
                  <input
                    type="text"
                    value={ownerType}
                    onChange={(e) => setOwnerType(e.target.value)}
                    placeholder="Business / Shop Owner"
                    className={styles.textInput}
                  />
                </div>

                {/* Field 2: Business / Shop Name */}
                <div className={styles.inputGroup}>
                  <div className={styles.inputIcon}>
                    <Store size={20} strokeWidth={1.8} />
                  </div>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Business / Shop Name"
                    className={styles.textInput}
                  />
                </div>

                {/* Field 3: GSTIN */}
                <div className={styles.inputGroup}>
                  <div className={styles.inputIcon}>
                    <Receipt size={20} strokeWidth={1.8} />
                  </div>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="GSTIN"
                    className={styles.textInput}
                  />
                </div>

                {/* Field 4: Business Registration Number */}
                <div className={styles.inputGroup}>
                  <div className={styles.inputIcon}>
                    <Ticket size={20} strokeWidth={1.8} />
                  </div>
                  <input
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    placeholder="Business Registration Number"
                    className={styles.textInput}
                  />
                </div>

                {/* Field 5: Upload Shop Image Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.uploadBox}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />

                  {imagePreview ? (
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                      <img
                        src={imagePreview}
                        alt="Uploaded shop"
                        className={styles.uploadPreviewImg}
                      />
                      <div className={styles.previewOverlay}>
                        <span
                          style={{
                            color: "#fff",
                            fontSize: "0.75rem",
                            background: "rgba(0,0,0,0.6)",
                            padding: "0.35rem 0.75rem",
                            borderRadius: "9999px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                          }}
                        >
                          <RefreshCw size={14} /> Change
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          style={{
                            background: "#DC2626",
                            color: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            padding: "0.4rem",
                            cursor: "pointer",
                            display: "flex",
                          }}
                          title="Remove image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <div className={styles.uploadIconCircle}>
                        {/* Camera icon with plus */}
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                          <circle cx="12" cy="13" r="3" />
                          <line x1="19" y1="5" x2="19" y2="9" />
                          <line x1="17" y1="7" x2="21" y2="7" />
                        </svg>
                      </div>
                      <p className={styles.uploadText}>Upload shop image</p>
                    </div>
                  )}
                </div>

                {/* Field 6: Finish Button */}
                <div className={styles.finishBtnWrapper}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.finishBtn}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Finish</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <>
            {/* Brand Icon */}
            <div className={styles.logoWrapper}>
              <Image
                src="/leaf.png"
                alt="FarmWise Leaf Logo"
                width={72}
                height={94}
                className={styles.logoImg}
                priority
              />
            </div>

            {/* Heading & Subtitle */}
            <div className={styles.header}>
              <h1 className={styles.title}>Select Your Role</h1>
              <p className={styles.subtitle}>Personalize your FarmWise360 experience</p>
            </div>

            {/* Success confirmation for other roles */}
            {isConfirmed ? (
              <div
                style={{
                  width: "100%",
                  padding: "2rem",
                  background: "#ffffff",
                  borderRadius: "1rem",
                  textAlign: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  border: "1px solid #E2E8F0",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "#ecfdf5",
                    color: "#059669",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}
                >
                  <Check size={28} strokeWidth={2.5} />
                </div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0F172A", marginBottom: "0.5rem" }}>
                  Role Confirmed: {ROLE_CONFIGS.find((r) => r.id === selectedRole)?.title}
                </h2>
                <p style={{ color: "#64748B", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                  Welcome to FarmWise360! Your workspace is ready.
                </p>
                <button
                  type="button"
                  onClick={() => setIsConfirmed(false)}
                  className={`${styles.confirmBtn} ${styles.confirmBtnActive}`}
                >
                  Change Role
                </button>
              </div>
            ) : (
              <>
                {/* Role Options List */}
                <div className={styles.rolesList}>
                  {ROLE_CONFIGS.map((role) => {
                    const isSelected = selectedRole === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => handleSelectRole(role.id)}
                        className={`${styles.roleCard} ${isSelected ? styles.roleCardSelected : ""}`}
                      >
                        <div className={styles.roleContent}>
                          <div className={`${styles.iconWrapper} ${isSelected ? styles.iconSelected : ""}`}>
                            {renderIcon(role.id, isSelected)}
                          </div>
                          <span className={`${styles.roleTitle} ${isSelected ? styles.roleTitleSelected : ""}`}>
                            {role.title}
                          </span>
                        </div>

                        {isSelected && (
                          <div className={styles.checkBadge}>
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  disabled={!selectedRole}
                  onClick={handleConfirm}
                  className={`${styles.confirmBtn} ${
                    selectedRole ? styles.confirmBtnActive : styles.confirmBtnDisabled
                  }`}
                >
                  {selectedRole === "business" || selectedRole === "shop_owner"
                    ? "Continue to Setup Profile →"
                    : "Confirm & Continue"}
                </button>
              </>
            )}

            {/* Back Link to Sign In */}
            <Link href="/" className={styles.backLink}>
              <ArrowLeft size={16} />
              <span>Back to Sign In</span>
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
