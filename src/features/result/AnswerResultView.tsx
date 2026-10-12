/**
 * Sweden Life Guide - Answer Result View
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { AnswerResult } from '../../types';
import {
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  FileDown,
  Mail,
  Edit3,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Building,
  CheckSquare,
  ListOrdered,
  Info,
  Calendar,
  Send
} from 'lucide-react';

interface AnswerResultViewProps {
  answer: AnswerResult;
  originalQuestionText: string;
  isSaved: boolean;
  onToggleSave: () => void;
  onEditQuestion: () => void;
  onOpenPdfModal: () => void;
  onOpenEmailModal: () => void;
  onAskFollowUp: (followUpText: string) => void;
}

export const AnswerResultView: React.FC<AnswerResultViewProps> = ({
  answer,
  originalQuestionText,
  isSaved,
  onToggleSave,
  onEditQuestion,
  onOpenPdfModal,
  onOpenEmailModal,
  onAskFollowUp
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [followUpInput, setFollowUpInput] = useState('');

  const handleCopy = () => {
    const textToCopy = `🇸🇪 ${t('appTitle')} | RAED SHIHAB
-------------------------------------
السؤال: ${originalQuestionText}

الخلاصة:
${answer.summary}

الخطوات العملية:
${answer.actionSteps.map(s => `${s.order}. ${s.title}: ${s.description}`).join('\n')}

المصادر الرسمية:
${answer.sources.map(s => `- ${s.authorityName}: ${s.url}`).join('\n')}
-------------------------------------
تطبيق إرشادي يعتمد على المصادر الرسمية السويدية.`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpInput.trim()) return;
    onAskFollowUp(followUpInput);
    setFollowUpInput('');
  };

  // Confidence color & badge
  const getConfidenceBadge = () => {
    if (answer.confidence === 'high') {
      return {
        label: t('confHigh'),
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        icon: ShieldCheck
      };
    }
    if (answer.confidence === 'medium') {
      return {
        label: t('confMedium'),
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        icon: AlertTriangle
      };
    }
    return {
      label: t('confNeedsReview'),
      bg: 'bg-red-50 text-red-800 border-red-200',
      icon: ShieldAlert
    };
  };

  const confBadge = getConfidenceBadge();
  const ConfIcon = confBadge.icon;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-[#1a2b3c]">
      {/* Top Action Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-blue-50 border border-blue-200 text-[#006aa7] px-3 py-1 rounded-xl">
            {answer.primaryCategory.label}
          </span>
          <span className="text-slate-300 text-xs hidden sm:inline">•</span>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            SWD-{answer.questionId.substring(0, 8)}
          </span>
        </div>

        {/* Buttons Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Save Button */}
          <button
            onClick={onToggleSave}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isSaved
                ? 'bg-[#fecc02] text-[#1a2b3c] shadow-xs font-extrabold border border-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? t('btnSaved') : t('btnSave')}</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t('btnCopied') : t('btnCopy')}</span>
          </button>

          {/* Edit Question */}
          <button
            onClick={onEditQuestion}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-4 h-4 text-[#006aa7]" />
            <span>{t('btnEdit')}</span>
          </button>

          {/* PDF Export */}
          <button
            onClick={onOpenPdfModal}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <FileDown className="w-4 h-4 text-red-600" />
            <span>{t('btnPdf')}</span>
          </button>

          {/* Email Dispatch */}
          <button
            onClick={onOpenEmailModal}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Mail className="w-4 h-4 text-amber-600" />
            <span>{t('btnEmail')}</span>
          </button>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Original Question Header */}
        <div className="bg-[#f4f7f6] p-4.5 rounded-2xl border border-slate-200 space-y-1">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#006aa7]" />
            <span>{t('originalQuestion')}</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-[#1a2b3c] leading-relaxed">
            {originalQuestionText}
          </p>
        </div>

        {/* Confidence Level Badge & Reason */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${confBadge.bg}`}>
          <div className="flex items-center gap-2.5 font-extrabold text-sm">
            <ConfIcon className="w-5 h-5 shrink-0" />
            <span>{t('confidenceLabel')} {confBadge.label}</span>
          </div>
          <div className="text-xs font-bold opacity-90">
            {answer.confidenceReason}
          </div>
        </div>

        {/* Direct Summary Card */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 sm:p-6 space-y-2 shadow-2xs">
          <h3 className="text-base font-extrabold text-[#006aa7] flex items-center gap-2">
            <Info className="w-5 h-5 text-[#006aa7]" />
            <span>{t('summaryTitle')}</span>
          </h3>
          <p className="text-sm sm:text-base text-[#1a2b3c] leading-relaxed font-semibold">
            {answer.summary}
          </p>
        </div>

        {/* Assumptions & Applicable Conditions */}
        {answer.assumptions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#1a2b3c] flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-amber-600" />
              <span>{t('assumptionsTitle')}</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 bg-[#f4f7f6] p-4 rounded-2xl border border-slate-200">
              {answer.assumptions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Steps */}
        {answer.actionSteps.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#1a2b3c] flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-[#006aa7]" />
              <span>{t('actionStepsTitle')}</span>
            </h4>
            <div className="space-y-3">
              {answer.actionSteps.map((step) => (
                <div
                  key={step.order}
                  className="bg-[#f4f7f6] border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2 hover:border-[#006aa7] transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base text-[#006aa7]">
                      <span className="w-7 h-7 rounded-xl bg-[#006aa7] text-white flex items-center justify-center text-xs font-mono font-bold shadow-xs">
                        {step.order}
                      </span>
                      <span>{step.title}</span>
                    </div>
                    {step.authority && (
                      <span className="bg-white text-slate-700 border border-slate-200 text-[11px] px-3 py-1 rounded-full font-bold shadow-2xs">
                        {step.authority}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pr-9">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Required Documents Checklist */}
        {answer.requiredDocuments.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#1a2b3c] flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>{t('requiredDocsTitle')}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {answer.requiredDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-[#f4f7f6] border border-slate-200 p-3.5 rounded-2xl flex items-start gap-3 text-xs sm:text-sm"
                >
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 shrink-0 mt-0.5">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a2b3c]">
                      {doc.name}
                      {doc.required && (
                        <span className="text-red-600 text-[10px] font-extrabold mr-1.5">
                          (إجباري)
                        </span>
                      )}
                    </div>
                    {doc.note && (
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{doc.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Responsible Authorities & Official Sources */}
        <div className="space-y-4 pt-3 border-t border-slate-200">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-[#006aa7]" />
              <span>{t('authoritiesTitle')}</span>
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {answer.responsibleAuthorities.map((auth, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-xl font-bold"
                >
                  {auth}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4 text-amber-600" />
              <span>{t('sourcesTitle')}</span>
            </h4>
            <div className="space-y-2">
              {answer.sources.map((src) => (
                <a
                  key={src.sourceId}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 bg-[#f4f7f6] hover:bg-blue-50/80 border border-slate-200 hover:border-[#006aa7] rounded-2xl text-xs transition-colors group shadow-2xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-extrabold text-[#006aa7] group-hover:underline flex items-center gap-1.5 text-sm">
                      <span>{src.authorityName}</span>
                      <span>—</span>
                      <span className="text-[#1a2b3c]">{src.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono truncate max-w-lg">
                      {src.url}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 shrink-0 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>مراجعة: {new Date(src.reviewedAt).toLocaleDateString('ar-EG')}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Important Warnings */}
        {answer.warnings.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2 text-xs text-amber-900 font-medium">
            <h5 className="font-bold flex items-center gap-2 text-amber-800 text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t('warningsTitle')}</span>
            </h5>
            <ul className="list-disc list-inside space-y-1 leading-relaxed">
              {answer.warnings.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer Footer */}
        <div className="text-[11px] text-slate-500 text-center border-t border-slate-200 pt-4 leading-relaxed font-medium">
          <p><strong>{t('disclaimerTitle')}</strong> {t('disclaimerBody')}</p>
        </div>
      </div>

      {/* Follow-up Questions Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
        <h4 className="text-sm font-bold text-[#1a2b3c] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#006aa7]" />
          <span>{t('followUpTitle')}</span>
        </h4>

        {answer.followUpQuestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {answer.followUpQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setFollowUpInput(q)}
                className="text-right text-xs bg-[#f4f7f6] hover:bg-blue-50 border border-slate-200 hover:border-[#006aa7] text-slate-700 hover:text-[#006aa7] px-3.5 py-2 rounded-xl transition-all font-semibold shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleFollowUpSubmit} className="flex gap-2">
          <input
            type="text"
            value={followUpInput}
            onChange={(e) => setFollowUpInput(e.target.value)}
            placeholder={t('askFollowUpPlaceholder')}
            className="flex-1 bg-[#fcfcfc] border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1a2b3c] placeholder-slate-400 focus:outline-none focus:border-[#006aa7] focus:ring-2 focus:ring-[#006aa7]/20 font-medium"
          />
          <button
            type="submit"
            disabled={!followUpInput.trim()}
            className="bg-[#006aa7] hover:bg-[#005587] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-xs border border-blue-800"
          >
            <Send className="w-4 h-4" />
            <span>إرسال</span>
          </button>
        </form>
      </div>
    </div>
  );
};
