/**
 * Sweden Life Guide - Processing Modal Component
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { PipelineProgressStage } from '../../services/ai/pipeline';
import { Loader2, CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';

interface ProcessingModalProps {
  stages: PipelineProgressStage[];
  errorMessage?: string;
  onRetry?: () => void;
}

export const ProcessingModal: React.FC<ProcessingModalProps> = ({
  stages,
  errorMessage,
  onRetry
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-[#1a2b3c] shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#006aa7] flex items-center justify-center mx-auto mb-2 shadow-2xs">
            <Loader2 className="w-6 h-6 animate-spin text-[#006aa7]" />
          </div>
          <h3 className="text-lg font-extrabold text-[#1a2b3c]">
            {t('processingTitle')}
          </h3>
          <p className="text-xs text-slate-500 font-bold">
            RAED SHIHAB — Arab Sweden Since 2007
          </p>
        </div>

        {/* 5 Progress Stages */}
        <div className="space-y-3 bg-[#f4f7f6] p-4.5 rounded-2xl border border-slate-200">
          {stages.map((stage) => {
            const label =
              language === 'sv'
                ? stage.labelSv
                : language === 'en'
                ? stage.labelEn
                : stage.labelAr;

            return (
              <div key={stage.id} className="flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-3">
                  {stage.status === 'completed' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {stage.status === 'in_progress' && (
                    <Loader2 className="w-4 h-4 text-[#006aa7] animate-spin shrink-0" />
                  )}
                  {stage.status === 'pending' && (
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  {stage.status === 'failed' && (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span
                    className={
                      stage.status === 'completed'
                        ? 'text-slate-800 font-bold'
                        : stage.status === 'in_progress'
                        ? 'text-[#006aa7] font-extrabold'
                        : stage.status === 'failed'
                        ? 'text-red-700 font-bold'
                        : 'text-slate-500'
                    }
                  >
                    {label}
                  </span>
                </div>

                <span className="text-[11px] font-mono uppercase font-bold text-slate-500 shrink-0">
                  {stage.status === 'completed' && 'تم'}
                  {stage.status === 'in_progress' && 'جاري...'}
                  {stage.status === 'pending' && 'معلق'}
                  {stage.status === 'failed' && 'فشل'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Error Retry Option */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-2xl space-y-3">
            <div className="flex items-start gap-3 text-xs text-red-900 font-medium">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t('retryBtn')}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
