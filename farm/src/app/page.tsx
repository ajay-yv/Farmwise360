"use client";

import React from "react";
import styles from "./page.module.css";
import { AuthCard } from "@/components/AuthCard";

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      {/* Subtle ambient light glow */}
      <div className={styles.ambientGlow} />

      {/* Main Authentication Card */}
      <AuthCard />
    </div>
  );
}
