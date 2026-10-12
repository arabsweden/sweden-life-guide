/**
 * Sweden Life Guide - Footer Component
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ShieldCheck, ExternalLink, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const officialAgencies = [
    { name: 'Migrationsverket', url: 'https://www.migrationsverket.se' },
    { name: 'Skatteverket', url: 'https://www.skatteverket.se' },
    { name: 'Försäkringskassan', url: 'https://www.forsakringskassan.se' },
    { name: 'Arbetsförmedlingen', url: 'https://arbetsformedlingen.se' },
    { name: 'Socialstyrelsen', url: 'https://www.socialstyrelsen.se' },
    { name: '1177 Vårdguiden', url: 'https://www.1177.se' },
    { name: 'CSN', url: 'https://www.csn.se' },
    { name: 'Transportstyrelsen', url: 'https://www.transportstyrelsen.se' }
  ];

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 text-xs py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Official Sources Notice */}
        <div className="bg-[#f4f7f6] border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-[#006aa7] text-white rounded-xl shrink-0 mt-0.5 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a2b3c]">
                منصة إرشادية تعتمد على المصادر الرسمية الحكومية السويدية (.se)
              </h4>
              <p className="text-slate-600 mt-0.5 leading-relaxed font-normal">
                {t('officialSourcesNotice')}
              </p>
            </div>
          </div>
          <div className="text-[11px] text-[#006aa7] font-bold bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-xl shrink-0">
            تنبيه: لا تدّعي المنصة أنها جهة حكومية أو مكتب محاماة.
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="text-base font-extrabold text-[#006aa7] flex items-center gap-2">
              🇸🇪 <span>{t('appTitle')}</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {t('tagline')}
            </p>
            <div className="text-[#006aa7] font-bold text-[11px] uppercase tracking-wider">
              {t('brandBadge')}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2">
            <h5 className="font-bold text-[#1a2b3c] uppercase tracking-wider text-[11px]">
              روابط التنقل السريع
            </h5>
            <ul className="space-y-1.5 text-slate-600 font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#006aa7] transition-colors">
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-[#006aa7] transition-colors">
                  {t('navCategories')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('my_questions')} className="hover:text-[#006aa7] transition-colors">
                  {t('navMyQuestions')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qa_matrix')} className="hover:text-[#006aa7] transition-colors">
                  {t('navQa')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('docs')} className="hover:text-[#006aa7] transition-colors">
                  {t('navDocs')}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Swedish Portals */}
          <div className="space-y-2 col-span-1 md:col-span-2">
            <h5 className="font-bold text-[#1a2b3c] uppercase tracking-wider text-[11px]">
              البوابات الحكومية السويدية الرسمية المعتمدة (.se)
            </h5>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {officialAgencies.map((agency) => (
                <a
                  key={agency.name}
                  href={agency.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-[#006aa7] transition-colors bg-[#f4f7f6] hover:bg-blue-50/80 p-2 rounded-xl border border-slate-200 font-semibold"
                >
                  <Globe className="w-3.5 h-3.5 text-[#006aa7] shrink-0" />
                  <span className="truncate">{agency.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 mr-auto" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-medium gap-3">
          <p>{t('allRightsReserved')}</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('docs')} className="hover:text-[#006aa7]">
              {t('privacyPolicy')}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('docs')} className="hover:text-[#006aa7]">
              {t('termsOfService')}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('docs')} className="hover:text-[#006aa7]">
              {t('sourcePolicy')}
            </button>
          </div>
        </div>

        {/* Developer Credit & AI Disclaimer */}
        <div className="pt-4 border-t border-slate-200 text-center space-y-1.5 bg-[#f4f7f6] p-4 rounded-2xl border border-slate-200">
          <p className="text-xs font-black text-[#006aa7] flex items-center justify-center gap-1.5">
            <span>الاسم والإشراف:</span>
            <span className="font-extrabold text-[#1a2b3c] bg-[#fecc02] px-3 py-0.5 rounded-lg border border-amber-300 shadow-2xs">RAED SHIHAB</span>
          </p>
          <p className="text-[11px] font-bold text-slate-600">
            تم بناء وتشغيل التطبيق بالذكاء الاصطناعي، ولا نتحمل أي مسؤولية عن الاستخدام.
          </p>
        </div>
      </div>
    </footer>
  );
};
