/**
 * Sweden Life Guide - Personal Data Management
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { QuestionRecord } from '../../types';
import { Database, Download, Trash2, ShieldCheck } from 'lucide-react';

interface DataManagementViewProps {
  questions: QuestionRecord[];
  onClearAll: () => void;
}

export const DataManagementView: React.FC<DataManagementViewProps> = ({
  questions,
  onClearAll
}) => {
  const { t } = useLanguage();

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sweden_guide_my_data_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 text-[#1a2b3c]">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-extrabold text-[#006aa7] flex items-center gap-2.5">
          <Database className="w-7 h-7 text-[#006aa7]" />
          <span>إدارة وحماية البيانات الشخصية السويدية</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          حقوق الوصول، التنزيل الكامل، وحذف السجلات المحفوظة محلياً وفق معايير GDPR السويدية.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="bg-[#f4f7f6] p-4.5 rounded-2xl border border-slate-200 flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <h4 className="font-extrabold text-[#1a2b3c]">البيانات المخزنة حالياً في متصفحك:</h4>
            <p className="text-slate-600 font-medium">
              عدد الاستفسارات والأسئلة المحفوظة: <strong className="text-[#006aa7] font-mono text-base">{questions.length}</strong> استفساراً.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-[#f4f7f6] p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1a2b3c]">
              <Download className="w-4 h-4 text-[#006aa7]" />
              <span>تنزيل كافة سجلاتك (Export)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              تصدير ملف JSON رسمي يتضمن كافة أسئلتك والنتائج الموثقة والتواريخ لاستخدامك الشخصي.
            </p>
            <button
              onClick={handleExportJSON}
              disabled={questions.length === 0}
              className="w-full py-2.5 bg-[#006aa7] hover:bg-[#005587] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-xs border border-blue-800"
            >
              <Download className="w-4 h-4" />
              <span>تنزيل ملف JSON</span>
            </button>
          </div>

          <div className="bg-[#f4f7f6] p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1a2b3c]">
              <Trash2 className="w-4 h-4 text-red-600" />
              <span>مسح وحذف البيانات (Purge)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              حذف نهائي لكافة الأسئلة والنتائج المسجلة محلياً بدون إمكانية لاسترجاعها.
            </p>
            <button
              onClick={() => {
                if (confirm('هل أنت متأكد من رغبتك في حذف كافة السجلات المحفوظة نهائياً؟')) {
                  onClearAll();
                }
              }}
              disabled={questions.length === 0}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-xs"
            >
              <Trash2 className="w-4 h-4" />
              <span>مسح كافة السجلات الآن</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
