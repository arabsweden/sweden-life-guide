/**
 * Sweden Life Guide - PDF Export Modal
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { AnswerResult } from '../../types';
import { generateAnswerPDF } from '../../services/pdf/pdfService';
import { FileDown, CheckCircle2, Loader2, X, ShieldCheck } from 'lucide-react';

interface ExportPdfModalProps {
  answer: AnswerResult;
  questionText: string;
  onClose: () => void;
}

export const ExportPdfModal: React.FC<ExportPdfModalProps> = ({
  answer,
  questionText,
  onClose
}) => {
  const { t } = useLanguage();
  const [generating, setGenerating] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      const pdfBlob = await generateAnswerPDF({ answer, questionText });
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Sweden-Life-Guide-Report-${answer.questionId.substring(0, 8)}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setCompleted(true);
    } catch (err) {
      alert('حدث خطأ أثناء إنشاء ملف PDF');
    } finally {
      setGenerating(false);
    }
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
          <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-2xl shrink-0">
            <FileDown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#1a2b3c]">
              تنزيل تقرير PDF الرسمي
            </h3>
            <p className="text-xs text-slate-500 font-bold">
              RAED SHIHAB — Arab Sweden Since 2007
            </p>
          </div>
        </div>

        {/* PDF Features Card */}
        <div className="bg-[#f4f7f6] border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
          <div className="text-[#1a2b3c] font-extrabold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>مميزات تقرير التوثيق الصادر:</span>
          </div>
          <ul className="space-y-1 text-slate-700 pr-5 list-disc font-medium">
            <li>يتضمن رقم المرجع المعتمد وسجل التاريخ.</li>
            <li>تنسيق عربي RTL عالي الجودة متوافق مع كافة الأجهزة.</li>
            <li>قائمة الوثائق المطلوبة والخطوات العملية والجهة المختصة.</li>
            <li>روابط المصادر الحكومية الرسمية المعتمدة (.se).</li>
          </ul>
        </div>

        {completed ? (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-900">
              تم إنشاء وتنزيل ملف PDF بنجاح!
            </h4>
            <p className="text-xs text-emerald-800 font-medium">
              تفقد مجلد التنزيلات بحاسوبك أو هاتفك.
            </p>
          </div>
        ) : (
          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={generating}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
              <span>{generating ? 'جاري إنشاء الملف...' : 'تنزيل PDF الآن'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
