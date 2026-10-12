/**
 * Sweden Life Guide - Documentation View Component
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { useState } from 'react';
import { FileText, BookOpen, ShieldCheck, Cpu, Lock, CheckSquare } from 'lucide-react';

export const DocumentationView: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<'readme' | 'architecture' | 'privacy' | 'sources' | 'testplan'>('readme');

  const docsMap = {
    readme: {
      title: 'دليل الاستخدام والتطوير (README.md)',
      icon: BookOpen,
      content: `
# دليل الحياة في السويد | Sweden Life Guide
Brand: RAED SHIHAB — Arab Sweden Since 2007

منصة إرشادية عربية متكاملة وموثوقة لمساعدة المقيمين والقادمين الجدد في السويد على الحصول على إجابات معتمدة، خطوات عمل موثقة، وقوائم وثائق رسمية مستندة حصرياً لمصادر الجهات الحكومية السويدية.

## المميزات الأساسية
- إدخال متعدد الوسائط (نص، صوت، صورة/مستند).
- فحص تلقائي وتشفير للبيانات الحساسة (Personnummer).
- الاعتماد حصراً على النطاقات الحكومية السويدية الرسمية (.se).
- تصدير تقارير PDF وإرسال إيميل تجريبي.
- مصفوفة جودة تتضمن 50 سيناريو فحص واختبار مستقبلي.

## الانتقال من وضع المعاينة (Demo) إلى الإنتاج الكامل (Production)
1. ربط مشروعي Firebase Auth وCloud Firestore للحفظ الموثوق.
2. إعادة تفعيل مفتاح GEMINI_API_KEY في الخادم باستخدام موديل gemini-3.6-flash.
3. تطبيق سياسات الحذف التلقائي للمرفقات (Retention Policy).
`
    },
    architecture: {
      title: 'الهيكلية الفنية والتصميم (ARCHITECTURE.md)',
      icon: Cpu,
      content: `
# ARCHITECTURE.md — Sweden Life Guide
Brand: RAED SHIHAB — Arab Sweden Since 2007

## Architecture Diagram
- Client: React 19 + TypeScript + Vite + Tailwind CSS.
- Server: Express Node.js (server.ts) running on Port 3000.
- Engine: Gemini API Client (@google/genai) calling model gemini-3.6-flash with JSON Schema output.
- Security: Sensitive Data Redactor for Personnummer and Prompt Injection.
`
    },
    privacy: {
      title: 'ملاحظات وسياسة الخصوصية (PRIVACY_NOTES.md)',
      icon: Lock,
      content: `
# PRIVACY_NOTES.md — Sweden Life Guide
Brand: RAED SHIHAB — Arab Sweden Since 2007

1. حماية الرقم الشخصي (Personnummer): تصفية وتشفير آلي للرقم الشخصي السويدي قبل أي معالجة ذكية.
2. عدم الاحتفاظ بالمرفقات: حظر حفظ الصور أو الملفات الصوتية بدون إذن، وحذفها تلقائياً بعد استخراج النص.
3. الموافقة الصريحة: إرسال البريد الإلكتروني أو حفظ التاريخ يتطلب موافقة المستخدم المباشرة.
`
    },
    sources: {
      title: 'سياسة الاعتماد والمصادر الرسمية (SOURCE_POLICY.md)',
      icon: ShieldCheck,
      content: `
# SOURCE_POLICY.md — Sweden Life Guide
Brand: RAED SHIHAB — Arab Sweden Since 2007

تشترط المنصة الاعتماد حصراً على النطاقات الحكومية السويدية (.se):
- Migrationsverket (migrationsverket.se)
- Skatteverket (skatteverket.se)
- Försäkringskassan (forsakringskassan.se)
- Arbetsformedlingen (arbetsformedlingen.se)
- Socialstyrelsen (socialstyrelsen.se)
- 1177 Vårdguiden (1177.se)
- CSN (csn.se)
`
    },
    testplan: {
      title: 'خطة الاختبار والتأكد من الجودة (TEST_PLAN.md)',
      icon: CheckSquare,
      content: `
# TEST_PLAN.md — Sweden Life Guide
Brand: RAED SHIHAB — Arab Sweden Since 2007

1. اختبار مراحل المعالجة الـ 5 (Pipeline): التأكد من ظهور المؤشرات وعمليات الإدخال الصوتية والنصية.
2. اختبار المصادر الرسمية: التحقق من أن جميع الروابط تتبع للنطاقات الحكومية .se.
3. اختبار مصفوفة الـ 50 سيناريو: مراجعة شاملة لجميع الحالات عبر كافة الأقسام الـ 13.
`
    }
  };

  const activeDoc = docsMap[selectedDoc];
  const Icon = activeDoc.icon;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-[#1a2b3c]">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-extrabold text-[#006aa7] flex items-center gap-2.5">
          <FileText className="w-7 h-7 text-[#006aa7]" />
          <span>الوثائق الفنية ودليل المشروع</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          عرض التوثيق التقني، خطة الإنتاج، وسياسات المصادر والخصوصية والملاحة.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 text-xs font-bold">
        {(Object.keys(docsMap) as Array<keyof typeof docsMap>).map((docKey) => {
          const doc = docsMap[docKey];
          const DocIcon = doc.icon;
          const isSelected = selectedDoc === docKey;

          return (
            <button
              key={docKey}
              onClick={() => setSelectedDoc(docKey)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                isSelected
                  ? 'bg-[#006aa7] text-white shadow-xs font-extrabold border border-blue-800'
                  : 'bg-[#f4f7f6] text-slate-700 hover:text-[#006aa7] hover:bg-blue-50 border border-slate-200'
              }`}
            >
              <DocIcon className="w-4 h-4" />
              <span>{doc.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Doc Viewer */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#006aa7] border-b border-slate-200 pb-3">
          <Icon className="w-5 h-5 text-amber-600" />
          <span>{activeDoc.title}</span>
        </div>

        <div className="prose max-w-none text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-wrap text-slate-800 bg-[#f4f7f6] p-5 rounded-2xl border border-slate-200 font-medium">
          {activeDoc.content}
        </div>
      </div>
    </div>
  );
};
