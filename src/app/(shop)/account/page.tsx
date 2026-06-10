'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Package, LogOut, Loader2, Save } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export default function AccountPage() {
  const router = useRouter();
  const { user, token, setUser, logout } = useAuthStore();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-md px-4 pt-32 pb-16 sm:px-6">
          <div className="text-center">
            <User className="mx-auto mb-6 h-12 w-12 text-white/10" />
            <h1 className="font-heading text-3xl font-black uppercase tracking-[-0.03em] mb-4">
              Sign In Required
            </h1>
            <p className="text-sm text-white/40 mb-8">
              Please sign in to access your account.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_8px_30px_-5px_rgba(212,165,32,0.5)] transition-all hover:shadow-[0_12px_40px_-5px_rgba(212,165,32,0.6)]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-2xl px-4 pt-32 pb-16 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-accent/60">
            Account
          </p>
          <h1 className="font-heading text-4xl font-black uppercase tracking-[-0.03em]">
            My Account
          </h1>
        </div>

        {/* Quick Links */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <Link
            href="/orders"
            className="flex items-center gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-4 hover:border-white/[0.08] transition-colors"
          >
            <Package className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-bold text-white/80">Orders</p>
              <p className="text-[10px] text-white/30">View order history</p>
            </div>
          </Link>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-4 hover:border-white/[0.08] transition-colors text-left"
          >
            <LogOut className="h-5 w-5 text-red-400" />
            <div>
              <p className="text-sm font-bold text-white/80">Sign Out</p>
              <p className="text-[10px] text-white/30">Log out of account</p>
            </div>
          </button>
        </div>

        {/* Profile */}
        <div className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6 mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-6">
            Profile
          </h2>

          {message.type && (
            <div
              className={`mb-4 rounded-xl border p-3 text-xs ${
                message.type === 'success'
                  ? 'border-green-500/20 bg-green-500/5 text-green-400'
                  : 'border-red-500/20 bg-red-500/5 text-red-400'
              }`}
            >
              {message.text}
            </div>
          )}

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              setMessage({ type: '', text: '' });

              try {
                const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ firstName, lastName, email }),
                });

                const data = await response.json();

                if (!response.ok) {
                  throw new Error(data.error || 'Update failed');
                }

                setUser(data.user);
                setMessage({ type: 'success', text: 'Profile updated successfully' });
              } catch (err: any) {
                setMessage({ type: 'error', text: err.message });
              } finally {
                setSaving(false);
              }
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 px-4 text-sm text-white placeholder:text-white/20 focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:shadow-[0_8px_20px_-5px_rgba(212,165,32,0.4)] disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Save Changes
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-6">
            Change Password
          </h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              setMessage({ type: '', text: '' });

              try {
                const response = await fetch(`${API_BASE_URL}/api/auth/password`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ currentPassword, newPassword }),
                });

                const data = await response.json();

                if (!response.ok) {
                  throw new Error(data.error || 'Password update failed');
                }

                setCurrentPassword('');
                setNewPassword('');
                setMessage({ type: 'success', text: 'Password updated successfully' });
              } catch (err: any) {
                setMessage({ type: 'error', text: err.message });
              } finally {
                setSaving(false);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white/80 transition-all hover:bg-white/15 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Lock className="h-3.5 w-3.5" />
              )}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
