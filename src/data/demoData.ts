/**
 * Sweden Life Guide - Realistic Demo Questions & Answers
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import { QuestionRecord, AnswerResult } from '../types';

export const DEMO_PRELOADED_QUESTIONS: QuestionRecord[] = [
  {
    id: 'demo_q_reunification',
    userId: 'guest_demo',
    questionText: 'أريد إحصار زوجتي وأولادي إلى السويد، أنا لدي إقامة مؤقتة وعقد عمل. ما هي شروط الدخل والسكن المطلوبة للمّ الشمل؟',
    originalText: 'أريد إحصار زوجتي وأولادي إلى السويد، أنا لدي إقامة مؤقتة وعقد عمل. ما هي شروط الدخل والسكن المطلوبة للمّ الشمل؟',
    normalizedText: 'شروط لم الشمل في السويد والدخل وسعة السكن الإقامة المؤقتة',
    categoryCode: 'family',
    language: 'ar',
    categoryIds: ['cat_family'],
    status: 'completed',
    createdAt: '2026-07-20T10:15:00Z',
    isFavorite: true,
    answerResult: {
      questionId: 'demo_q_reunification',
      language: 'ar',
      normalizedQuestion: 'ما هي شروط الإعالة والسكن لمّ شمل الأسرة في السويد للزوجة والأطفال؟',
      primaryCategory: { id: 'cat_family', label: 'لمّ الشمل والزواج' },
      relatedCategories: [{ id: 'cat_migration', label: 'الهجرة والإقامة واللجوء' }],
      summary: 'يشترط لمّ شمل الزوجة والأطفال إثبات دخل ثابت وكافٍ من عمل قانوني أو مشروع، بالإضافة إلى مسكن بأسرة وسعة كافية (غرفة نوم للزوجين وغرفة للأطفال حسب العدد) وموثق بعقد إيجار معتمد.',
      assumptions: [
        'أن مقدم الطلب مقيم في السويد بتصريح إقامة معتمد يسمح بلمّ الشمل.',
        'أن العلاقة الزوجية موثقة بعقد رسمية مبرم ومترجم ومصدق.',
        'ألا يكون مقدم الطلب معفيًا استثنائياً من شرط الإعالة (مثل حاملي صفة اللجوء بطلبات مبكرة).'
      ],
      followUpQuestions: [
        'هل عقد العمل المبرم غير محدد المدة Tillsvidare أم محدد بفترة؟',
        'كم عدد الغرف الموجودة في عقد السكن الحالي؟'
      ],
      applicableToUser: [
        'المقيمون بتصاريح عمل أو إقامات مؤقتة بالسويد الراغبون بالاستقدام.'
      ],
      actionSteps: [
        {
          order: 1,
          title: 'تأكد من استيفاء شرط السكن (Bostadskrav)',
          description: 'يجب أن يكون المسكن بحد أدنى غرفتي نوم وصالة أو حيز سكن معتمد بعقد إيجار أول أو ثاني موثق رسميًا.',
          authority: 'Migrationsverket'
        },
        {
          order: 2,
          title: 'تأكد من استيفاء شرط الدخل والإعالة (Försörjningskrav)',
          description: 'يجب أن يتوفر دخل صافي متبقٍ بعد دفع إيجار السكن كاملاً يغطي الحد الأدنى القانوني المحدد سنوياً.',
          authority: 'Migrationsverket'
        },
        {
          order: 3,
          title: 'تقديم الطلب الإلكتروني عبر موقع دائرة الهجرة',
          description: 'يقوم المقيم بالسويد بتعبئة الطلب الإلكتروني وإرفاق عقود العمل ورواتب آخر 3 أشهر وعقد السكن.',
          authority: 'Migrationsverket'
        }
      ],
      requiredDocuments: [
        { name: 'عقد العمل المبرم وكشوف الرواتب لآخر 3 أشهر', required: true },
        { name: 'عقد إيجار السكن الرسمي مع بيان مساحة وسعة الغرف', required: true },
        { name: 'عقد الزواج الأصلي المترجم والمصدق من وزارة الخارجية', required: true },
        { name: 'شهادات ميلاد الأطفال المترجمة والمصدقة', required: true },
        { name: 'نسخ جوازات السفر السارية لكافة أفراد الأسرة', required: true }
      ],
      responsibleAuthorities: ['Migrationsverket (دائرة الهجرة السويدية)'],
      sources: [
        {
          sourceId: 'src_mv_reunification',
          authorityName: 'Migrationsverket',
          title: 'شروط الإعالة والسكن للم شمل الأسرة في السويد',
          url: 'https://www.migrationsverket.se/privatpersoner/flytta-till-nagon-i-sverige/gifta-sambo-eller-partner.html',
          reviewedAt: '2026-07-15T10:00:00Z',
          supports: ['شرط السكن المستقل وسعة الغرف', 'شرط الدخل الصافي المتبقي بعد الإيجار']
        }
      ],
      confidence: 'high',
      confidenceReason: 'الإجابة مستندة للتعليمات الصريحة المنشورة على البوابة الرسمية لمصلحة الهجرة السويدية.',
      warnings: [
        'عقود العمل المؤقتة القصيرة التي تبقت منها فترة بسيطة قد لا تُقبل كدخل ثابت كافٍ.',
        'تأكد من موافقة مالك المبنى الأصلي على عقد الإيجار الثانوي لتفادي الرفض.'
      ],
      disclaimer: 'تطبيق دليل الحياة في السويد يقدم معلومات إرشادية وتثقيفية استنادًا للمصادر الرسمية، ولا يُعد مكتب محاماة أو جهة حكومية.',
      createdAt: '2026-07-20T10:15:30Z'
    }
  },
  {
    id: 'demo_q_personnummer',
    userId: 'guest_demo',
    questionText: 'وصلت إلى السويد بعقد عمل لمدة سنتين، كيف أحصل على الرقم الشخصي Personnummer وبطاقة الهوية ID-kort من Skatteverket؟',
    originalText: 'وصلت إلى السويد بعقد عمل لمدة سنتين، كيف أحصل على الرقم الشخصي Personnummer وبطاقة الهوية ID-kort من Skatteverket؟',
    normalizedText: 'استخراج الرقم الشخصي Personnummer والهوية السويدية من Skatteverket',
    categoryCode: 'taxes',
    language: 'ar',
    categoryIds: ['cat_taxes'],
    status: 'completed',
    createdAt: '2026-07-19T14:20:00Z',
    isFavorite: false,
    answerResult: {
      questionId: 'demo_q_personnummer',
      language: 'ar',
      normalizedQuestion: 'ما هي خطوات استخراج الرقم الشخصي والبطاقة الشخصية السويدية من Skatteverket؟',
      primaryCategory: { id: 'cat_taxes', label: 'الضرائب والسجل السكاني والرقم الشخصي' },
      relatedCategories: [{ id: 'cat_migration', label: 'الهجرة والإقامة واللجوء' }],
      summary: 'للحصول على الرقم الشخصي (Personnummer)، يجب التسجيل في السجل السكاني لدى مصلحة الضرائب Skatteverket فور وصولك إذا كانت إقامتك سنة أو أكثر، ثم حجز موعد لالتقاط صورة هويّة ID-kort.',
      assumptions: [
        'أن لديك تصريح إقامة ساري المفعول لمدة سنة على الأقل في السويد.',
        'أنك متواجد في السويد وتملك عنوان سكن محدد وثابت.'
      ],
      followUpQuestions: [],
      applicableToUser: [
        'القادمون الجدد بتصاريح إقامة للعمل أو لمّ الشمل أو الدراسة التي تتجاوز سنة.'
      ],
      actionSteps: [
        {
          order: 1,
          title: 'تعبئة خدمة Moving to Sweden الإلكترونية',
          description: 'ادخل لموقع Skatteverket وقم بتعبئة استمارة التسجيل السكاني الإلكترونية وتجهيز رقم المرجع.',
          authority: 'Skatteverket'
        },
        {
          order: 2,
          title: 'زيارة مكتب مصلحة الضرائب والتأكد من الهوية',
          description: 'احجز موعداً في مكتب Skatteverket وأحضر معك جواز السفر الأصلي وتصريح الإقامة وعقد العمل.',
          authority: 'Skatteverket'
        },
        {
          order: 3,
          title: 'التقدم بطلب بطاقة الهوية ID-kort',
          description: 'بعد صدور الرقم الشخصي، ادفع رسوم بطاقة الهوية (400 كرون عادة) واحجز موعد تصوير في Skatteverket.',
          authority: 'Skatteverket'
        }
      ],
      requiredDocuments: [
        { name: 'جواز السفر الأصلي الأصيل', required: true },
        { name: 'بطاقة الإقامة (UT-kort) الصادرة عن دائرة الهجرة', required: true },
        { name: 'عقد العمل المبرم ومكتوب به مدة التوظيف', required: true },
        { name: 'عقد إيجار السكن أو إثبات العنوان في السويد', required: true },
        { name: 'وثائق الحالة الاجتماعية (عقد الزواج/شهادات ميلاد الأطفال)', required: false, note: 'إذا كنت تنتقل مع العائلة' }
      ],
      responsibleAuthorities: ['Skatteverket (مصلحة الضرائب السويدية)'],
      sources: [
        {
          sourceId: 'src_skat_personnummer',
          authorityName: 'Skatteverket',
          title: 'التسجيل في السجل السكاني والحصول على الرقم الشخصي Personnummer',
          url: 'https://www.skatteverket.se/privat/folkbokforing/flyttatillsverige.4.18e1b10334ebe8bc8000411.html',
          reviewedAt: '2026-07-12T16:00:00Z',
          supports: ['شرط الإقامة لمدة 12 شهراً على الأقل', 'المستندات المطلوبة للهوية']
        }
      ],
      confidence: 'high',
      confidenceReason: 'مطابق للقواعد المعتمدة في قانون السجل السكاني وموقع Skatteverket.',
      warnings: [
        'الإقامات التي تقل مدتها المحددة عن سنة واحدة تُمنح رقماً مؤقتاً Samordningsnummer بدلاً من Personnummer.'
      ],
      disclaimer: 'تطبيق دليل الحياة في السويد يقدم معلومات إرشادية وتثقيفية استنادًا للمصادر الرسمية، ولا يُعد مكتب محاماة أو جهة حكومية.',
      createdAt: '2026-07-19T14:20:45Z'
    }
  },
  {
    id: 'demo_q_ambiguous',
    userId: 'guest_demo',
    questionText: 'عندي سؤال عن المساعدة والدعم المالي في السويد، كيف أحصل عليها؟',
    originalText: 'عندي سؤال عن المساعدة والدعم المالي في السويد، كيف أحصل عليها؟',
    normalizedText: 'المساعدات والدعم المالي في السويد',
    categoryCode: 'insurance',
    language: 'ar',
    categoryIds: ['cat_insurance', 'cat_social'],
    status: 'completed',
    createdAt: '2026-07-18T11:00:00Z',
    isFavorite: false,
    answerResult: {
      questionId: 'demo_q_ambiguous',
      language: 'ar',
      normalizedQuestion: 'أنواع المساعدات المالية في السويد بين التأمينات والبلدية ومكتب العمل',
      primaryCategory: { id: 'cat_insurance', label: 'التأمينات والمساعدات والمعاشات' },
      relatedCategories: [{ id: 'cat_social', label: 'السوسيال والأسرة وحماية الطفل' }, { id: 'cat_work', label: 'العمل والبطالة' }],
      summary: 'تختلف المساعدات المالية في السويد باختلاف وضعك: هل تبحث عن تعويض بطالة (A-kassa/Ersättning)، أم مساعدة أسرية وأطفال (Försäkringskassan)، أم مساعدة معيشية بلدية من السوسيال (Försörjningsstöd)؟',
      assumptions: ['أنك تحتاج لتحديد نوع الدعم والجهة المختصة بحسب وضعك الوظيفي والعائلي.'],
      followUpQuestions: [
        'هل تملك رقم شخصي وقيد سكاني مسجل في السويد؟',
        'هل سبب طلب المساعدة هو فقدان العمل أم إجازة رعاية طفل أم عدم كفاية الدخل المعيشي؟'
      ],
      applicableToUser: ['المقيمون المسجلون في السويد بحسب نوع الحاجة والجهة المسؤولية.'],
      actionSteps: [
        { order: 1, title: 'تحديد نوع الدعم المناسب', description: 'إذا كان بطالة فتجه إلى مكتب العمل وA-kassa. إذا كان أسري فتجه إلى Försäkringskassan. إذا كان عجز شديد فتجه للسوسيال.', authority: 'الجهات المختصة' }
      ],
      requiredDocuments: [
        { name: 'الهوية السويدية أو الرقم الشخصي', required: true },
        { name: 'كشف حساب بنكي لآخر 3 أشهر', required: true, note: 'عند طلب مساعدة البلدية' }
      ],
      responsibleAuthorities: ['Försäkringskassan', 'Socialtjänsten', 'Arbetsförmedlingen'],
      sources: [
        {
          sourceId: 'src_fk_parental',
          authorityName: 'Försäkringskassan',
          title: 'دليل التعويضات والمساعدات الحكومية',
          url: 'https://www.forsakringskassan.se',
          reviewedAt: '2026-07-14T11:00:00Z',
          supports: ['مساعدات التأمينات والمساعدات الأسرية']
        }
      ],
      confidence: 'medium',
      confidenceReason: 'السؤال عام جداً وتم تقديم توجيه أولي بناءً على التصنيفات العامة.',
      warnings: ['تطلب المساعدات المعيشية من السوسيال استنفاد كافة الأصول المالية والمدخرات أولاً.'],
      disclaimer: 'تطبيق دليل الحياة في السويد يقدم معلومات إرشادية وتثقيفية استنادًا للمصادر الرسمية، ولا يُعد مكتب محاماة أو جهة حكومية.',
      createdAt: '2026-07-18T11:05:00Z'
    }
  },
  {
    id: 'demo_q_needs_review',
    userId: 'guest_demo',
    questionText: 'ما هي رسوم استخراج قرار استثنائي من منظمة خارجية غير سويدية للعمل في السويد؟',
    originalText: 'ما هي رسوم استخراج قرار استثنائي من منظمة خارجية غير سويدية للعمل في السويد؟',
    normalizedText: 'رسوم قرارات استثنائية من جهات خارجية غير سويدية',
    categoryCode: 'work',
    language: 'ar',
    categoryIds: ['cat_work'],
    status: 'needs_review',
    createdAt: '2026-07-17T09:30:00Z',
    isFavorite: false,
    answerResult: {
      questionId: 'demo_q_needs_review',
      language: 'ar',
      normalizedQuestion: 'استفسار عن رسوم منظمة غير سويدية استثنائية للعمل',
      primaryCategory: { id: 'cat_work', label: 'العمل والبطالة وحقوق الموظف' },
      relatedCategories: [],
      summary: 'لم نجد أي مصدر حكومي سويدي رسمي يعترف بوجود منظمات خارجية تتقاضى رسوماً لإصدار قرارات استثنائية للعمل في السويد. التعاملات الرسمية تتم حصراً عبر Migrationsverket وArbetsförmedlingen.',
      assumptions: ['أن المعاملات تدار عبر جهة غير معتمدة رسمياً.'],
      followUpQuestions: [
        'ما اسم المسمى الوظيفي أو الجهة التي طلبت هذه الرسوم؟'
      ],
      applicableToUser: ['الحذر من الاحتيال والإعلانات غير الرسمية.'],
      actionSteps: [
        { order: 1, title: 'التحقق من موقع دائرة الهجرة الرسمية', description: 'تأكد من عدم دفع أي مبالغ لوساطات غير مرخصة، وراجع موقع Migrationsverket مباشرة.', authority: 'Migrationsverket' }
      ],
      requiredDocuments: [],
      responsibleAuthorities: ['Migrationsverket', 'Polismyndigheten (الشرطة السويدية)'],
      sources: [],
      confidence: 'needs_review',
      confidenceReason: 'لا يوجد أي نص في القوانين السويدية يدعم هذا الادعاء. يجب التحقق المباشر والحذر.',
      warnings: [
        'تنبيه مهم: دائرة الهجرة والجهات السويدية لا تطلب رسوماً تحول لجهات خارجية غير معروفة.'
      ],
      disclaimer: 'تطبيق دليل الحياة في السويد يقدم معلومات إرشادية وتثقيفية استنادًا للمصادر الرسمية، ولا يُعد مكتب محاماة أو جهة حكومية.',
      createdAt: '2026-07-17T09:35:00Z'
    }
  }
];
