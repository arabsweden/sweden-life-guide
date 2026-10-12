/**
 * Sweden Life Guide - My Questions & History View
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { QuestionRecord } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { Search, Bookmark, Trash2, ExternalLink, Calendar, HelpCircle, FileDown, ShieldCheck } from 'lucide-react';

interface MyQuestionsViewProps {
  questions: QuestionRecord[];
  onSelectQuestion: (question: QuestionRecord) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteQuestion: (id: string) => void;
  onClearAll: () => void;
  onOpenPdfModalForAnswer: (question: QuestionRecord) => void;
}

export const MyQuestionsView: React.FC<MyQuestionsViewProps> = ({
  questions,
  onSelectQuestion,
  onToggleFavorite,
  onDeleteQuestion,
  onClearAll,
  onOpenPdfModalForAnswer
}) => {
  const { t, language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.answerResult?.summary || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || q.categoryCode === selectedCategory;

    const matchesFavorite = !onlyFavorites || q.isFavorite;

    return matchesSearch && matchesCategory && matchesFavorite;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-[#1a2b3c]">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#006aa7] flex items-center gap-2.5">
            <HelpCircle className="w-7 h-7 text-[#006aa7]" />
            <span>{t('myQuestionsTitle')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            سجل الاستفسارات المحفوظة والنتائج الموثقة الخاصة بك
          </p>
        </div>

        {questions.length > 0 && (
          <button
            onClick={() => {
              if (confirm('هل أنت تأكد من رغبتك في مسح كافة سجل الأسئلة المحفوظة؟')) {
                onClearAll();
              }
            }}
            className="text-xs text-red-600 hover:text-red-700 font-bold border border-red-200 bg-red-50 px-3.5 py-2 rounded-xl hover:bg-red-100 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>مسح كافة السجلات</span>
          </button>
        )}
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute top-3 right-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الكلمات أو العناوين..."
              className="w-full bg-[#fcfcfc] border border-slate-300 rounded-xl pr-9 pl-3 py-2 text-xs sm:text-sm text-[#1a2b3c] placeholder-slate-400 focus:outline-none focus:border-[#006aa7] focus:ring-2 focus:ring-[#006aa7]/20 font-medium"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#fcfcfc] border border-slate-300 text-[#1a2b3c] text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-[#006aa7] focus:ring-2 focus:ring-[#006aa7]/20 font-bold"
            >
              <option value="all">جميع الأقسام ({questions.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.code} value={cat.code}>
                  {cat.title[language] || cat.title.ar}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Favorites Toggle Checkbox */}
        <div className="flex items-center gap-2 pt-1 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-bold">
            <input
              type="checkbox"
              checked={onlyFavorites}
              onChange={(e) => setOnlyFavorites(e.target.checked)}
              className="rounded bg-white border-slate-300 text-amber-600 focus:ring-amber-500"
            />
            <Bookmark className="w-4 h-4 text-amber-600" />
            <span>إظهار الأسئلة المفضلة فقط</span>
          </label>
        </div>
      </div>

      {/* Questions List Grid */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <p className="text-slate-600 text-sm font-semibold">
            لا توجد استفسارات محفوظة تطابق الخيارات المحددة.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const cat = CATEGORIES.find((c) => c.code === q.categoryCode);
            const categoryLabel = cat?.title[language] || cat?.title.ar || q.categoryCode;

            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 hover:border-[#006aa7] rounded-3xl p-5 sm:p-6 shadow-sm transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-50 border border-blue-200 text-[#006aa7] text-[11px] font-bold px-3 py-0.5 rounded-full">
                      {categoryLabel}
                    </span>
                    <span className="text-slate-300 text-xs">•</span>
                    <span className="text-slate-500 text-[11px] font-mono font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(q.createdAt).toLocaleDateString('ar-EG')}
                    </span>
                  </div>

                  {/* Top Right Badges */}
                  <div className="flex items-center gap-2">
                    {q.answerResult?.confidence === 'high' && (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] px-2.5 py-0.5 rounded-full font-extrabold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        موثق رسمياً
                      </span>
                    )}

                    <button
                      onClick={() => onToggleFavorite(q.id)}
                      className={`p-1.5 rounded-xl border transition-colors ${
                        q.isFavorite
                          ? 'bg-[#fecc02] text-[#1a2b3c] border-amber-300 font-extrabold'
                          : 'bg-slate-100 text-slate-500 border-slate-300 hover:text-[#1a2b3c]'
                      }`}
                      title={q.isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Body */}
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-extrabold text-[#1a2b3c] leading-relaxed">
                    {q.questionText}
                  </h4>
                  {q.answerResult?.summary && (
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-medium">
                      {q.answerResult.summary}
                    </p>
                  )}
                </div>

                {/* Action Buttons Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <button
                    onClick={() => onSelectQuestion(q)}
                    className="text-xs font-extrabold text-[#006aa7] hover:underline flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>عرض التفاصيل والإجابة</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {q.answerResult && (
                      <button
                        onClick={() => onOpenPdfModalForAnswer(q)}
                        className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                      >
                        <FileDown className="w-3.5 h-3.5 text-red-600" />
                        <span>PDF</span>
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteQuestion(q.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="حذف الاستفسار"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
