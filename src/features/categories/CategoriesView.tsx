/**
 * Sweden Life Guide - Categories View
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CATEGORIES, CategoryDefinition } from '../../data/categories';
import { getOfficialSourcesByCategory } from '../../services/sources/sourceRegistry';
import { BookOpen, ExternalLink, HelpCircle, Building, ArrowLeft, X } from 'lucide-react';

interface CategoriesViewProps {
  onSelectCategoryForAsk: (categoryCode: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  onSelectCategoryForAsk
}) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryDefinition | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 text-[#1a2b3c]">
      {/* Header Banner */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#006aa7] flex items-center justify-center gap-2.5">
          <BookOpen className="w-8 h-8 text-[#006aa7]" />
          <span>الأقسام ومجالات الحياة الرسمية في السويد</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          تصفح الأقسام الـ 13 المعتمدة للتعرف على الهيئات السويدية المختصة، الشروط التنظيمية، والمصادر الموثقة.
        </p>
      </div>

      {/* Grid of 13 Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((cat) => {
          const title = cat.title[language] || cat.title.ar;
          const desc = cat.description[language] || cat.description.ar;

          return (
            <div
              key={cat.id}
              className="bg-white border border-slate-200 hover:border-[#006aa7] rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl">{cat.icon}</span>
                  <span className="bg-slate-100 border border-slate-200 text-[#006aa7] text-[11px] font-mono font-bold px-3 py-1 rounded-full">
                    {cat.code}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-extrabold text-[#1a2b3c] group-hover:text-[#006aa7] transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                    {desc}
                  </p>
                </div>

                {/* Authorities Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.authorities.map((auth, idx) => (
                    <span
                      key={idx}
                      className="bg-[#f4f7f6] border border-slate-200 text-slate-700 text-[10px] px-2.5 py-1 rounded-lg font-bold"
                    >
                      {auth}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className="text-slate-600 hover:text-[#006aa7] transition-colors flex items-center gap-1.5"
                >
                  <Building className="w-4 h-4 text-amber-600" />
                  <span>تفاصيل القسم</span>
                </button>

                <button
                  onClick={() => onSelectCategoryForAsk(cat.code)}
                  className="bg-[#006aa7] hover:bg-[#005587] text-white px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1 shadow-xs border border-blue-800"
                >
                  <span>اطرح سؤالاً</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-[#1a2b3c] shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <span className="text-4xl">{selectedCategory.icon}</span>
              <div>
                <h3 className="text-xl font-extrabold text-[#006aa7]">
                  {selectedCategory.title[language] || selectedCategory.title.ar}
                </h3>
                <p className="text-xs text-slate-500 font-mono font-semibold">
                  كود القسم: {selectedCategory.code}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#f4f7f6] p-4.5 rounded-2xl border border-slate-200 font-medium">
              {selectedCategory.description[language] || selectedCategory.description.ar}
            </p>

            {/* Authorities */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-4 h-4 text-[#006aa7]" />
                <span>الهيئات والمؤسسات السويدية المعنية:</span>
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {selectedCategory.authorities.map((auth, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 border border-blue-200 text-[#006aa7] px-3 py-1 rounded-xl font-bold"
                  >
                    {auth}
                  </span>
                ))}
              </div>
            </div>

            {/* Official Sources */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-amber-600" />
                <span>المصادر الرسمية المسجلة:</span>
              </h4>
              <div className="space-y-2">
                {getOfficialSourcesByCategory(selectedCategory.id).map((src) => (
                  <a
                    key={src.id}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-[#f4f7f6] hover:bg-blue-50/80 border border-slate-200 rounded-xl text-xs transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#006aa7]">{src.authorityName}</div>
                      <div className="text-[11px] text-slate-600 font-medium">{src.title}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#006aa7] shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Sample Questions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>نماذج أسئلة شائعة في هذا القسم:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 bg-[#f4f7f6] p-4 rounded-2xl border border-slate-200 font-medium">
                {selectedCategory.sampleQuestionsAr.map((sq, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#006aa7] font-bold">•</span>
                    <span>{sq}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  const code = selectedCategory.code;
                  setSelectedCategory(null);
                  onSelectCategoryForAsk(code);
                }}
                className="bg-[#006aa7] hover:bg-[#005587] text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md border border-blue-800"
              >
                <span>طرح سؤال في هذا القسم</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
