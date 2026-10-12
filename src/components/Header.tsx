/**
 * Sweden Life Guide - Header Component
 * Theme: Professional Polish (Swedish Blue #006aa7 & Gold #fecc02)
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { User } from '../types';
import { Compass, BookOpen, ShieldCheck, UserCheck, Menu, X, LayoutDashboard, HelpCircle, FileText, Globe } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  currentUser: User;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  currentUser,
  onOpenAuthModal,
  onLogout
}) => {
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Compass },
    { id: 'categories', label: t('navCategories'), icon: BookOpen },
    { id: 'my_questions', label: t('navMyQuestions'), icon: HelpCircle },
    { id: 'qa_matrix', label: t('navQa'), icon: ShieldCheck },
    { id: 'docs', label: t('navDocs'), icon: FileText },
    { id: 'admin', label: t('navAdmin'), icon: LayoutDashboard }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-[#1a2b3c] shadow-xs">
      {/* Top Branding Banner */}
      <div className="bg-slate-100 py-1.5 px-4 text-xs border-b border-slate-200 text-slate-600 flex items-center justify-between">
        <div className="flex items-center space-x-2 space-x-reverse font-semibold text-[#006aa7]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#fecc02] border border-[#006aa7]/20"></span>
          <span>{t('brandBadge')}</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4 space-x-reverse text-slate-500 font-medium">
          <span>المصادر الرسمية الحكومية السويدية (.se)</span>
          <span className="bg-blue-50 text-[#006aa7] border border-blue-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
            {t('demoModeBadge')}
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-right group focus:outline-none focus:ring-2 focus:ring-[#006aa7]/30 rounded-xl p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-[#006aa7] border border-blue-700 flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
            🇸🇪
          </div>
          <div>
            <div className="text-base sm:text-lg font-extrabold text-[#006aa7] tracking-tight flex items-center gap-2">
              <span>{t('appTitle')}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
              {t('appSubTitle')}
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-[#006aa7] text-white shadow-sm'
                    : 'text-slate-700 hover:text-[#006aa7] hover:bg-white/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Language + Auth */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 text-xs shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1.5" />
            {(['ar', 'sv', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 rounded-lg transition-all font-bold ${
                  language === lang
                    ? 'bg-[#006aa7] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-[#006aa7]'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* User Button */}
          {currentUser.email ? (
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[#1a2b3c] max-w-[120px] truncate">
                {currentUser.displayName}
              </span>
              <button
                onClick={onLogout}
                className="text-slate-500 hover:text-red-600 mr-1 text-[11px] font-bold underline"
              >
                {t('logoutBtn')}
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="bg-[#006aa7] hover:bg-[#005587] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 border border-blue-800"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t('loginBtn')}</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  currentTab === item.id
                    ? 'bg-[#006aa7] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-slate-700 font-bold">
              <Globe className="w-4 h-4 text-slate-400" />
              {(['ar', 'sv', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded-lg ${
                    language === lang ? 'bg-[#006aa7] text-white' : 'text-slate-600'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {!currentUser.email && (
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="bg-[#006aa7] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs"
              >
                {t('loginBtn')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
