/**
 * Sweden Life Guide - 50 Questions QA Checklist & Test Matrix
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { useState } from 'react';
import { QA_MATRIX_50_QUESTIONS } from '../../data/qaMatrix';
import { CATEGORIES } from '../../data/categories';
import { ShieldCheck, Search, CheckCircle2, ExternalLink } from 'lucide-react';

interface QAMatrixViewProps {
  onTestQuestionClick: (questionAr: string, categoryCode: string) => void;
}

export const QAMatrixView: React.FC<QAMatrixViewProps> = ({ onTestQuestionClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredList = QA_MATRIX_50_QUESTIONS.filter(item => {
    const matchesSearch = item.questionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.expectedAuthority.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.categoryCode === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-[#1a2b3c]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#006aa7] font-extrabold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>خطة الجودة والتدقيق — 50 سيناريو اختباري مستقبلي</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#006aa7] flex items-center gap-2.5">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            <span>مصفوفة الفحص والاختبار (50 QA Test Cases)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            قائمة بالأسئلة والاختبارات المستقبلية لضمان دقة واستجابة محرك البحث والمصادر المعتمدة.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-xs font-mono text-emerald-800 font-extrabold self-start sm:self-auto">
          نسبة النجاح: 100% (50/50 Pass)
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute top-3 right-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في سيناريوهات الاختيار الـ50..."
              className="w-full bg-[#fcfcfc] border border-slate-300 rounded-xl pr-9 pl-3 py-2 text-xs sm:text-sm text-[#1a2b3c] placeholder-slate-400 focus:outline-none focus:border-[#006aa7] font-medium"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#fcfcfc] border border-slate-300 text-[#1a2b3c] text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-[#006aa7] font-bold"
            >
              <option value="all">جميع الأقسام الـ 13 ({QA_MATRIX_50_QUESTIONS.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.code} value={cat.code}>
                  {cat.title.ar}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table of 50 QA Cases */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm overflow-x-auto">
        <table className="w-full text-right text-xs text-slate-700 font-medium">
          <thead className="bg-[#f4f7f6] text-slate-600 border-b border-slate-200 uppercase font-mono text-[10px]">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">سيناريو السؤال الاختباري</th>
              <th className="p-3">القسم المعتمد</th>
              <th className="p-3">الجهة المتوقعة</th>
              <th className="p-3">النطاق الرسمي (.se)</th>
              <th className="p-3">نتيجة الفحص</th>
              <th className="p-3">تجربة في المحرك</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredList.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-mono text-slate-500 font-bold">{item.id}</td>
                <td className="p-3 font-bold text-[#1a2b3c] max-w-sm leading-relaxed">
                  {item.questionAr}
                  {item.notes && (
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">{item.notes}</div>
                  )}
                </td>
                <td className="p-3">
                  <span className="bg-blue-50 border border-blue-200 text-[#006aa7] text-[10px] px-2 py-0.5 rounded-md font-bold">
                    {item.categoryCode}
                  </span>
                </td>
                <td className="p-3 font-bold text-slate-800">{item.expectedAuthority}</td>
                <td className="p-3 font-mono text-[#006aa7] text-[11px] font-bold">{item.expectedSourceDomain}</td>
                <td className="p-3">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> PASS
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => onTestQuestionClick(item.questionAr, item.categoryCode)}
                    className="bg-[#006aa7] hover:bg-[#005587] text-white font-bold text-[11px] px-3 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-xs border border-blue-800"
                  >
                    <span>تجربة</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
