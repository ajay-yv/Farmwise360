'use client';

import React, { useState, useRef } from 'react';
import { User, Store, Receipt, Ticket, ArrowLeft, CheckCircle2, ImagePlus, X, RefreshCw } from 'lucide-react';

interface BusinessFormProps {
  initialRole?: string;
  onBack: () => void;
  onFinish?: (data: BusinessFormData) => void;
}

export interface BusinessFormData {
  ownerType: string;
  businessName: string;
  gstin: string;
  registrationNumber: string;
  imagePreview: string | null;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({
  initialRole = 'Business / Shop Owner',
  onBack,
  onFinish,
}) => {
  const [ownerType, setOwnerType] = useState(
    initialRole === 'shop_owner'
      ? 'Shop Owner'
      : initialRole === 'business'
      ? 'Business'
      : 'Business / Shop Owner'
  );
  const [businessName, setBusinessName] = useState('');
  const [gstin, setGstin] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onFinish) {
        onFinish({
          ownerType,
          businessName,
          gstin,
          registrationNumber,
          imagePreview,
        });
      }
    }, 700);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-[460px] mx-auto p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile Completed!</h2>
        <p className="text-slate-600 text-sm mb-6">
          Your Business / Shop Owner registration has been successfully created.
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left space-y-2.5 border border-slate-100 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Role:</span>
            <span className="text-slate-800 font-semibold">{ownerType}</span>
          </div>
          {businessName && (
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Name:</span>
              <span className="text-slate-800 font-semibold">{businessName}</span>
            </div>
          )}
          {gstin && (
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">GSTIN:</span>
              <span className="text-slate-800 font-semibold">{gstin}</span>
            </div>
          )}
          {registrationNumber && (
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Reg. Number:</span>
              <span className="text-slate-800 font-semibold">{registrationNumber}</span>
            </div>
          )}
          {imagePreview && (
            <div className="pt-2">
              <span className="text-slate-500 font-medium block mb-2">Shop Photo:</span>
              <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-200">
                <img
                  src={imagePreview}
                  alt="Shop Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="w-full py-3.5 px-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md"
        >
          Edit Details
        </button>

        <button
          type="button"
          onClick={onBack}
          className="mt-4 text-sm font-medium text-slate-500 hover:text-emerald-600 inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Role Selection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[460px] mx-auto py-2">
      {/* Top back navigation */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
          Registration
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Field 1: Business / Shop Owner */}
        <div className="relative flex items-center bg-white border border-slate-300 rounded-xl px-4 py-3.5 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all shadow-xs">
          <User className="w-5 h-5 text-slate-600 mr-3.5 shrink-0" strokeWidth={1.8} />
          <input
            type="text"
            value={ownerType}
            onChange={(e) => setOwnerType(e.target.value)}
            placeholder="Business / Shop Owner"
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base font-medium outline-none"
          />
        </div>

        {/* Field 2: Business / Shop Name */}
        <div className="relative flex items-center bg-white border border-slate-300 rounded-xl px-4 py-3.5 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all shadow-xs">
          <Store className="w-5 h-5 text-slate-600 mr-3.5 shrink-0" strokeWidth={1.8} />
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Business / Shop Name"
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base font-medium outline-none"
          />
        </div>

        {/* Field 3: GSTIN */}
        <div className="relative flex items-center bg-white border border-slate-300 rounded-xl px-4 py-3.5 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all shadow-xs">
          <Receipt className="w-5 h-5 text-slate-600 mr-3.5 shrink-0" strokeWidth={1.8} />
          <input
            type="text"
            value={gstin}
            onChange={(e) => setGstin(e.target.value.toUpperCase())}
            placeholder="GSTIN"
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base font-medium uppercase tracking-wider outline-none"
          />
        </div>

        {/* Field 4: Business Registration Number */}
        <div className="relative flex items-center bg-white border border-slate-300 rounded-xl px-4 py-3.5 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all shadow-xs">
          <Ticket className="w-5 h-5 text-slate-600 mr-3.5 shrink-0" strokeWidth={1.8} />
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            placeholder="Business Registration Number"
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base font-medium outline-none"
          />
        </div>

        {/* Field 5: Upload Shop Image Box */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full h-48 bg-white border border-slate-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-slate-50/50 transition-all group overflow-hidden shadow-xs"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {imagePreview ? (
            <div className="relative w-full h-full">
              <img
                src={imagePreview}
                alt="Uploaded shop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" /> Change Photo
                </span>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-transform hover:scale-105"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 mb-3 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-all">
                {/* Camera icon with plus */}
                <svg
                  className="w-8 h-8"
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
              <p className="text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
                Upload shop image
              </p>
            </div>
          )}
        </div>

        {/* Field 6: Finish Button */}
        <div className="pt-3 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-72 py-3.5 px-6 rounded-xl font-bold text-base text-white bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] transition-all shadow-md shadow-green-600/20 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Finish</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
