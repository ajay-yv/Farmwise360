'use client';

import { useState } from 'react';
import {
  User,
  Lock,
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import { LeafLogo } from './components/LeafLogo';
import { RoleCard, ROLE_CONFIGS, RoleType } from './components/RoleCard';
import { BusinessForm } from './components/BusinessForm';

type ViewMode = 'login' | 'roles' | 'business_form';

export default function Home() {
  const [view, setView] = useState<ViewMode>('login');
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Login form state
  const [emailOrPhone, setEmailOrPhone] = useState('ajayyv576@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginSuccessToast, setLoginSuccessToast] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setLoginError('Please enter your email or phone number');
      return;
    }
    if (!password) {
      setLoginError('Please enter your password');
      return;
    }

    setLoginError('');
    setLoginLoading(true);

    setTimeout(() => {
      setLoginLoading(false);
      setLoginSuccessToast(true);
      setTimeout(() => {
        setLoginSuccessToast(false);
        setView('roles');
      }, 700);
    }, 600);
  };

  const handleSelectRole = (roleId: RoleType) => {
    setSelectedRole(roleId);
  };

  const handleConfirmRole = () => {
    if (!selectedRole) return;
    if (selectedRole === 'business' || selectedRole === 'shop_owner') {
      setView('business_form');
    } else {
      setIsConfirmed(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFC] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans antialiased text-slate-900">
      <div className="w-full max-w-[460px] mx-auto flex flex-col items-center">
        
        {/* ================= STEP 1: LOGIN ================= */}
        {view === 'login' && (
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 animate-in fade-in duration-200">
            {/* Brand Logo */}
            <div className="mb-4 flex justify-center">
              <LeafLogo className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>

            {/* Header Text */}
            <div className="text-center mb-6 space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base text-[#64748B] font-medium">
                Sign in to continue
              </p>
            </div>

            {/* Success Toast */}
            {loginSuccessToast && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Authentication Successful! Opening Role Selection...</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email / Phone Field */}
              <div>
                <div className="relative flex items-center bg-white border border-slate-300 rounded-xl px-4 py-3.5 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                  <User className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => {
                      setEmailOrPhone(e.target.value);
                      if (loginError) setLoginError('');
                    }}
                    placeholder="Email / Phone Number"
                    className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-base font-medium outline-none"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="relative flex items-center bg-white border border-slate-300 rounded-xl px-4 py-3.5 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                  <Lock className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (loginError) setLoginError('');
                    }}
                    placeholder="Password"
                    className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-base font-medium outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 transition-colors ml-2"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to your registered email.')}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {loginError && (
                <p className="text-red-600 text-xs font-medium">{loginError}</p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-base text-white bg-[#059669] hover:bg-[#047857] active:scale-[0.99] transition-all shadow-md shadow-emerald-600/20 disabled:opacity-60 cursor-pointer"
              >
                {loginLoading ? 'Signing in...' : 'Login'}
              </button>

              {/* Divider */}
              <div className="flex items-center my-3">
                <div className="flex-1 border-t border-slate-200" />
                <span className="px-3 text-xs text-slate-400 uppercase tracking-wider font-semibold">or</span>
                <div className="flex-1 border-t border-slate-200" />
              </div>

              {/* Register Button */}
              <a
                href="http://localhost:3001/register"
                className="w-full py-3 px-6 rounded-xl font-bold text-sm text-slate-700 hover:text-emerald-700 bg-white border border-slate-300 hover:border-emerald-500 transition-all flex items-center justify-center"
              >
                Register
              </a>
            </form>
          </div>
        )}

        {/* ================= STEP 2: SELECT YOUR ROLE ================= */}
        {view === 'roles' && (
          <div className="w-full animate-in fade-in duration-200 flex flex-col items-center">
            {/* Brand Icon */}
            <div className="mb-6 flex justify-center">
              <LeafLogo className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>

            {/* Heading & Subtitle */}
            <div className="text-center mb-8 space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                Select Your Role
              </h1>
              <p className="text-base sm:text-lg text-[#64748B] font-medium">
                Personalize your FarmWise360 experience
              </p>
            </div>

            {isConfirmed ? (
              <div className="w-full p-8 bg-white rounded-2xl shadow-sm border border-slate-200 text-center animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Role Confirmed: {ROLE_CONFIGS.find((r) => r.id === selectedRole)?.title}
                </h2>
                <p className="text-slate-600 text-sm mb-6">
                  Welcome to FarmWise360! Your personalized workspace has been prepared.
                </p>
                <button
                  type="button"
                  onClick={() => setIsConfirmed(false)}
                  className="w-full py-3.5 px-6 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  Change Role
                </button>
              </div>
            ) : (
              <>
                {/* Role Options List */}
                <div className="w-full space-y-3.5 mb-8">
                  {ROLE_CONFIGS.map((role) => (
                    <RoleCard
                      key={role.id}
                      role={role}
                      isSelected={selectedRole === role.id}
                      onSelect={handleSelectRole}
                    />
                  ))}
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  disabled={!selectedRole}
                  onClick={handleConfirmRole}
                  className={`w-full py-4 px-6 rounded-2xl text-base font-bold transition-all duration-200 shadow-sm ${
                    selectedRole
                      ? 'bg-[#059669] hover:bg-[#047857] text-white shadow-emerald-600/25 shadow-lg cursor-pointer active:scale-[0.99]'
                      : 'bg-[#E2E8F0] text-white/90 cursor-not-allowed border border-transparent'
                  }`}
                >
                  {selectedRole === 'business' || selectedRole === 'shop_owner'
                    ? 'Continue to Setup Profile →'
                    : 'Confirm & Continue'}
                </button>
              </>
            )}

            {/* Back Link to Sign In */}
            <button
              type="button"
              onClick={() => setView('login')}
              className="mt-6 text-sm font-medium text-slate-500 hover:text-emerald-600 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </button>
          </div>
        )}

        {/* ================= STEP 3: BUSINESS / SHOP OWNER FORM ================= */}
        {view === 'business_form' && (
          <div className="w-full animate-in fade-in duration-200">
            <BusinessForm
              initialRole={selectedRole || 'Business / Shop Owner'}
              onBack={() => setView('roles')}
            />
          </div>
        )}

      </div>
    </main>
  );
}
