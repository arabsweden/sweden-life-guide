/**
 * Sweden Life Guide - Sensitive Data Warning Modal
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';

interface SensitiveDataWarningModalProps {
  typesDetected: string[];
  redactedText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SensitiveDataWarningModal: React.FC<SensitiveDataWarningModalProps> = ({
  typesDetected,
  redactedText,
  onConfirm,
  onCancel
}) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-amber-300 rounded-3xl max-w-lg w-full p-6 text-[#1a2b3c] shadow-2xl relative space-y-5">
        <button
          onClick={onCancel}
          className="absolute top-4 left-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-2xl shrink-0">
            <ShieldAlert className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-amber-900">
              {t('sensitiveDataTitle')}
            </h3>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
              {t('sensitiveDataMsg')}
            </p>
          </div>
        </div>

        {/* Detected Types Badges */}
        <div className="bg-[#f4f7f6] p-3.5 rounded-2xl border border-slate-200 space-y-2 text-xs">
          <div className="text-slate-600 font-bold">البيانات الحساسة المكتشفة:</div>
          <div className="flex flex-wrap gap-2">
            {typesDetected.map((type, idx) => (
              <span
                key={idx}
                className="bg-amber-100 border border-amber-300 text-amber-900 px-2.5 py-1 rounded-lg text-[11px] font-extrabold"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Preview Redacted Text */}
        <div className="space-y-1 text-xs">
          <label className="text-slate-600 font-bold">المعاينة بعد الإخفاء والتشفير الآمن:</label>
          <div className="bg-[#f4f7f6] border border-slate-200 rounded-xl p-3 max-h-28 overflow-y-auto text-slate-800 font-mono text-[11px] leading-relaxed font-medium">
            {redactedText}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl text-xs font-extrabold bg-[#fecc02] text-[#1a2b3c] border border-amber-300 hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('confirmProceed')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
