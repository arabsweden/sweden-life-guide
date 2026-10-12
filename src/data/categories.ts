/**
 * Sweden Life Guide - Categories Data
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import { CategoryInfo, CategoryDefinition } from '../types';

export type { CategoryDefinition };

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat_migration',
    code: 'migration',
    icon: '🛂',
    iconName: 'Passport',
    title: {
      ar: 'الهجرة والإقامة واللجوء',
      sv: 'Migration, uppehållstillstånd & asyl',
      en: 'Migration, Residence & Asylum'
    },
    description: {
      ar: 'تصاريح الإقامة الدائمة والمؤقتة، إقامات العمل والدراسة، قرارات اللجوء، وتمديد الهويات.',
      sv: 'Permanenta och tidsbegränsade uppehållstillstånd, arbets- och studietillstånd.',
      en: 'Permanent & temporary residence permits, work and study permits, extension rules.'
    },
    authorities: ['Migrationsverket'],
    sampleQuestionsAr: [
      'ما هي شروط تحويل إقامة العمل إلى إقامة دائمة في السويد؟',
      'كم يستغرق معالجة طلب تمديد تصريح الإقامة المؤقتة؟'
    ],
    sampleQuestions: [
      {
        ar: 'ما هي شروط تحويل إقامة العمل إلى إقامة دائمة في السويد؟',
        sv: 'Vilka är kraven för att omvandla arbetstillstånd till permanent uppehållstillstånd?',
        en: 'What are the requirements to convert a work permit to permanent residence in Sweden?'
      }
    ],
    faqs: [
      {
        q: {
          ar: 'هل يمكن العمل أثناء فترة انتظار قرار تمديد الإقامة؟',
          sv: 'Får man arbeta medan man väntar på beslut om förlängning?',
          en: 'Can I work while waiting for a decision on residence permit extension?'
        },
        a: {
          ar: 'نعم، إذا قدمت طلب التمديد قبل انتهاء الإقامة الحالية وكان لديك تصريح عمل سابق.',
          sv: 'Ja, om ansökan lämnats in innan det nuvarande tillståndet gick ut.',
          en: 'Yes, if you applied before your current permit expired and had work rights.'
        }
      }
    ]
  },
  {
    id: 'cat_citizenship',
    code: 'citizenship',
    icon: '🇸🇪',
    iconName: 'Award',
    title: {
      ar: 'الجنسية السويدية',
      sv: 'Svenskt medborgarskap',
      en: 'Swedish Citizenship'
    },
    description: {
      ar: 'شروط التقدم بطلب الحصول على Pass والسفر والجنسية السويدية، اختبارات اللغة والعيش.',
      sv: 'Krav för att ansöka om svenskt medborgarskap och pass.',
      en: 'Requirements for applying for Swedish citizenship and passport.'
    },
    authorities: ['Migrationsverket'],
    sampleQuestionsAr: [
      'كم عدد السنوات المطلوبة للجنسية لحاملي اللجوء السياسي مقابل إقامة العمل؟',
      'هل تؤثر المديونيات لدى الكرونوفوجدن Kronofogden على طلب الجنسية؟'
    ],
    sampleQuestions: [
      {
        ar: 'كم عدد السنوات المطلوبة للجنسية السويدية؟',
        sv: 'Hur många år krävs för svenskt medborgarskap?',
        en: 'How many years are required for Swedish citizenship?'
      }
    ],
    faqs: []
  },
  {
    id: 'cat_family',
    code: 'family',
    icon: '👨‍👩‍👧‍👦',
    iconName: 'Users',
    title: {
      ar: 'لم الشمل والأسرة',
      sv: 'Anhöriginvandring & Familj',
      en: 'Family Reunification'
    },
    description: {
      ar: 'شروط استقدام الزوج/الزوجة والأطفال، متطلبات الإعالة والسكن (Försörjningskrav).',
      sv: 'Regler för anhöriginvandring, försörjningskrav och bostadskrav.',
      en: 'Rules for family reunification, maintenance requirement, and housing requirements.'
    },
    authorities: ['Migrationsverket'],
    sampleQuestionsAr: [
      'ما هو الحد الأدنى لمبلغ الدخل المتبقي (Normalbelopp) للم الشمل؟',
      'هل يجب أن تكون الشقة ملكاً أم يمكن أن تكون عقد إيجار ثنائي للم الشمل؟'
    ],
    sampleQuestions: [],
    faqs: []
  },
  {
    id: 'cat_work',
    code: 'work',
    icon: '💼',
    iconName: 'Briefcase',
    title: {
      ar: 'العمل والبطالة والنقابات',
      sv: 'Arbete, A-kassa & Fackförbund',
      en: 'Work, Unemployment & Unions'
    },
    description: {
      ar: 'عقود العمل، التسجيل في مكتب العمل (Arbetsförmedlingen)، تعويضات البطالة A-kassa والنقابات.',
      sv: 'Arbetsavtal, inskrivning på Arbetsförmedlingen, A-kassa och fackliga rättigheter.',
      en: 'Employment contracts, registration at Arbetsförmedlingen, A-kassa and union rights.'
    },
    authorities: ['Arbetsförmedlingen', 'A-kassa'],
    sampleQuestionsAr: [
      'كيف أحسب قيمة تعويض A-kassa عند فقدان الوظيفة؟',
      'ما هي حقوق الموظف في الإجازة السنوية المدفوعة الأجر حسب القانون؟'
    ],
    sampleQuestions: [],
    faqs: []
  },
  {
    id: 'cat_education',
    code: 'education',
    icon: '🎓',
    iconName: 'GraduationCap',
    title: {
      ar: 'التعليم والشهادات وCSN',
      sv: 'Utbildning, Validering & CSN',
      en: 'Education & Degree Recognition'
    },
    description: {
      ar: 'مراحل تعليم السويدية SFI، تقييم وتعديل الشهادات (UHR)، والقروض والدعم الدراسي CSN.',
      sv: 'SFI, validering av utländska betyg via UHR, och studiemedel från CSN.',
      en: 'SFI courses, validation of foreign degrees via UHR, and CSN student loans.'
    },
    authorities: ['CSN', 'UHR', 'Kommunen'],
    sampleQuestionsAr: [
      'كيف أبدأ دراسة السويدية للمهاجرين SFI وما هي المستويات؟',
      'ما هي شروط التقديم على القرض والدعم الدراسي من CSN؟'
    ],
    sampleQuestions: [],
    faqs: []
  },
  {
    id: 'cat_taxes',
    code: 'taxes',
    icon: '🏛️',
    iconName: 'FileText',
    title: {
      ar: 'الضرائب والسجل السكاني',
      sv: 'Skatt & Folkbokföring',
      en: 'Taxes & Population Register'
    },
    description: {
      ar: 'استخراج الرقم الشخصي Personnummer، نقل العنوان (Flyttanmälan)، والإقرار الضريبي السنوي Deklaration.',
      sv: 'Personnummer, folkbokföring, adressändring och årlig deklaration.',
      en: 'Personnummer application, population registration, address change and tax declaration.'
    },
    authorities: ['Skatteverket'],
    sampleQuestionsAr: [
      'ما هو السجل السكاني Folkbokföring وكيف أغير عنوان سكني؟',
      'كيف أقوم بطلب الإقرار الضريبي السنوي Deklaration؟'
    ],
    sampleQuestions: [],
    faqs: []
  },
  {
    id: 'cat_insurance',
    code: 'insurance',
    icon: '🛡️',
    iconName: 'Shield',
    title: {
      ar: 'التأمينات والمساعدات الاجتماعية',
      sv: 'Försäkringskassan & Bidrag',
      en: 'Social Insurance & Benefits'
    },
    description: {
      ar: 'إجازة الوالدين (Föräldrapenning)، نفقات الأطفال (Barnbidrag)، ودعم السكن (Bostadsbidrag).',
      sv: 'Föräldrapenning, barnbidrag, bostadsbidrag och sjukpenning från Försäkringskassan.',
      en: 'Parental benefit, child allowance, housing benefit from Försäkringskassan.'
    },
    authorities: ['Försäkringskassan'],
    sampleQuestionsAr: [
      'كم عدد أيام إجازة الأمومة والأبوة Föräldrapenning المتاحة للوالدين؟',
      'ما هو تعويض الأطفال Barnbidrag ومتى يتم صرفه شهرياً؟'
    ],
    sampleQuestions: [],
    faqs: []
  },
  {
    id: 'cat_housing',
    code: 'housing',
    icon: '🏠',
    iconName: 'Home',
    title: {
      ar: 'السكن وعقود الإيجار',
      sv: 'Bostad & Hyreskontrakt',
      en: 'Housing & Renting Contracts'
    },
    description: {
      ar: 'العقود الأولية والثانوية (Förstahand / Andrahand)، طوابير السكن، وحقوق المستأجر.',
      sv: 'Förstahandskontrakt, andrahandskontrakt, bostadsköer och hyresgästföreningen.',
      en: 'First-hand and second-hand rental contracts, housing queues, tenant rights.'
    },
    authorities: ['Hyresgästföreningen', 'Hyresnämnden'],
    sampleQuestionsAr: [
      'كيف أحمي نفسي من الاحتيال في عقود الإيجار الثانوية Andrahand؟',
      'ما هي أقصى زيادات مسموحة في قيمة إيجار الشقق المفروشة؟'
    ],
    sampleQuestions: [],
    faqs: []
  },
  {
    id: 'cat_health',
    code: 'health',
    icon: '🏥',
    iconName: 'HeartPulse',
    title: {
      ar: 'الرعاية الصحية والدواء',
      sv: 'Hälso- och sjukvård',
      en: 'Healthcare & 1177'
    },
    description: {
      ar: 'حجز المواعيد في المراكز الصحية (Vårdcentralen)، دليل 1177، وسقف التكاليف الصحية Högkostnadsskydd.',
      sv: 'Boka tid på vårdcentralen, rådgivning via 1177 och högkostnadsskydd.',
      en: 'Booking appointments at health centers, 1177 healthcare guide, high-cost protection.'
    },
    authorities: ['1177 Vårdguiden', 'Regionen'],
    sampleQuestionsAr: [
      'ما هو السقف الأعلى للمصاريف الصحية السنوية Högkostnadsskydd؟',
      'كيف تحصل على مترجم شفهي مجاني أثناء زيارة الطبيب في السويد؟'
    ],
    sampleQuestions: [],
    faqs: []
  },
  {
    id: 'cat_social',
    code: 'social',
    icon: '🤝',
    iconName: 'HeartHandshake',
    title: {
      ar: 'الخدمات الاجتماعية (السوسيال)',
      sv: 'Socialtjänsten',
      en: 'Social Services'
    },
    description: {
      ar: 'المساعدات المالية المعيشية (Försörjningsstöd)، رعاية الأطفال وقانون LVU، ودعم الأسرة.',
      sv: 'Försörjningsstöd, barn- och familjeomsorg samt insatser enligt LVU och SoL.',
      en: 'Financial support, child and family welfare, social services support.'
    },
    authorities: ['Socialstyrelsen', 'Socialtjänsten (Kommunen)'],
    sampleQuestionsAr: [
      'ما هي شروط الحصول على الدعم المالي المعيشي Försörjningsstöd من السوسيال؟',
      'ما هو قانون LVU وما هي حقوق الأسرة عند التواصل مع مكتب السوسيال؟'
    ],
    sampleQuestions: [],
    faqs: []
  },
  {
    id: 'cat_transport',
    code: 'transport',
    icon: '🚗',
    iconName: 'Car',
    title: {
      ar: 'المرور ورخص القيادة',
      sv: 'Trafik & Körkort',
      en: 'Transport & Driving Licenses'
    },
    description: {
      ar: 'خطوات استخراج رخصة القيادة السويدية (Körkort)، امتحانات Trafikverket، واستبدال الرخص.',
      sv: 'Svenskt körkort, teoriprov, uppkörning hos Trafikverket och utbyte av utländska körkort.',
      en: 'Swedish driving license, theory and practical tests at Trafikverket, license exchange.'
    },
    authorities: ['Transportstyrelsen', 'Trafikverket'],
    sampleQuestionsAr: [
      'ما هي شروط استبدال رخصة القيادة الصادرة من دول الاتحاد الأوروبي مقابل الدول الأخرى؟',
      'ما هي دورة المخاطر Riskettan و Risktvåan المطلوبة لرخصة السويد؟'
    ],
    sampleQuestions: [],
    faqs: []
  },
  {
    id: 'cat_business',
    code: 'business',
    icon: '🏢',
    iconName: 'Building2',
    title: {
      ar: 'تأسيس الشركات والعمل الحر',
      sv: 'Starta & Driva Företag',
      en: 'Business & Freelancing'
    },
    description: {
      ar: 'أنواع الشركات (Enskild firma, AB)، التسجيل في Verksamt.se، الحصول على ضريبة F-skatt.',
      sv: 'Enskild näringsverksamhet, aktiebolag, F-skatt och registrering på Verksamt.se.',
      en: 'Sole trader, limited company, F-skatt tax and registration on Verksamt.se.'
    },
    authorities: ['Bolagsverket', 'Skatteverket', 'Verksamt.se'],
    sampleQuestionsAr: [
      'ما هو الفرق بين Enskild firma و Aktiebolag (AB) عند تأسيس شركة؟',
      'كيف يتم التقديم على ضريبة F-skatt عبر منصة Verksamt.se؟'
    ],
    sampleQuestions: [],
    faqs: []
  },
  {
    id: 'cat_daily',
    code: 'daily',
    icon: '📱',
    iconName: 'Smartphone',
    title: {
      ar: 'الحياة اليومية والبنك والخصوصية',
      sv: 'Vardagsliv, Bank & Integritet',
      en: 'Daily Life, Banking & Privacy'
    },
    description: {
      ar: 'فتح حساب بنكي، الهوية الرقمية BankID، وحماية البيانات الشخصية وحقوق الخصوصية IMY.',
      sv: 'Bankkonto, BankID, säkert internetbruk och dataskydd enligt GDPR.',
      en: 'Opening bank accounts, BankID digital ID, data privacy protection.'
    },
    authorities: ['IMY', 'Svenska Banker'],
    sampleQuestionsAr: [
      'كيف تحصل على هوية BankID وكيف تحمي نفسك من عمليات الاحتيال؟',
      'ما هي حقوق حماية البيانات الشخصية GDPR لدى المؤسسات السويدية؟'
    ],
    sampleQuestions: [],
    faqs: []
  }
];
