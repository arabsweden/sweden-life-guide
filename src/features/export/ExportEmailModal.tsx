/**
 * Sweden Life Guide - Email Export Modal
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { AnswerResult } from '../../types';
import { dispatchAnswerEmail } from '../../services/email/emailService';
import { Mail, CheckCircle2, Loader2, X } from 'lucide-react';

interface ExportEmailModalProps {
  answer: AnswerResult;
  questionText: string;
  onClose: () => void;
}

export const ExportEmailModal: React.FC<ExportEmailModalProps> = ({
  answer,
  questionText,
  onClose
}) => {
  const { t } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [userConsent, setUserConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [resultMsg, setResultMsg] = useState<{ isDemo: boolean; text: string } | null>(null);

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !userConsent) return;

    setSending(true);
    const res = await dispatchAnswerEmail({
      recipientEmail: emailInput,
      answerId: answer.questionId,
      questionText,
      summary: answer.summary,
      userConsent
    });
    setSending(false);

    setResultMsg({
      isDemo: res.isDemo,
      text: res.message
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-[#1a2b3c] shadow-2xl space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-[#006aa7] border border-blue-200 rounded-2xl shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#1a2b3c]">
              إرسال ملخص الإجابة بالبريد الإلكتروني
            </h3>
            <p className="text-xs text-slate-500 font-bold">
              RAED SHIHAB — Arab Sweden Since 2007
            </p>
          </div>
        </div>

        {resultMsg ? (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-900">تم معالجة الطلب بنجاح</h4>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">{resultMsg.text}</p>
            {resultMsg.isDemo && (
              <span className="inline-block bg-amber-50 border border-amber-200 text-amber-900 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                وضع تجريبي محاكى (Demo Mode Simulation)
              </span>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmitEmail} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                عنوان البريد الإلكتروني المستهدف:
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#fcfcfc] border border-slate-300 rounded-xl px-4 py-2.5 text-[#1a2b3c] placeholder-slate-400 focus:outline-none focus:border-[#006aa7] font-medium"
                required
              />
            </div>

            {/* Privacy Consent Checkbox */}
            <div className="bg-[#f4f7f6] p-3 rounded-xl border border-slate-200">
              <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 leading-relaxed font-medium">
                <input
                  type="checkbox"
                  checked={userConsent}
                  onChange={(e) => setUserConsent(e.target.checked)}
                  className="mt-0.5 rounded bg-white border-slate-300 text-[#006aa7] focus:ring-[#006aa7]"
                  required
                />
                <span className="text-[11px]">
                  أوافق صراحةً على إرسال ملخص الاستفسار والنتيجة إلى عنوان البريد الإلكتروني المدخل واستخدامه لأغراض التوثيق الشخصي فقط.
                </span>
              </label>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                disabled={!emailInput || !userConsent || sending}
                className="px-5 py-2 bg-[#006aa7] hover:bg-[#005587] text-white font-bold rounded-xl shadow-xs flex items-center gap-2 disabled:opacity-50 border border-blue-800"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                <span>{sending ? 'جاري المعالجة...' : 'إرسال الملخص الآن'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
