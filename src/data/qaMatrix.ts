/**
 * Sweden Life Guide - 50 Questions QA Checklist & Test Matrix
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import { QAQuestionItem } from '../types';

export const QA_MATRIX_50_QUESTIONS: QAQuestionItem[] = [
  // Migration & Residence
  { id: 1, questionAr: 'ما هي شروط تمديد تصريح إقامة العمل قبل انتهائه؟', categoryCode: 'migration', expectedAuthority: 'Migrationsverket', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'يتطلب تقديم الطلب قبل الانتهاء واستمرار شرط الراتب والتأمين.' },
  { id: 2, questionAr: 'هل يمكن التقديم على الإقامة الدائمة بعد 4 سنوات من إقامة العمل؟', categoryCode: 'migration', expectedAuthority: 'Migrationsverket', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'نعم بشرط استيفاء الدخل والعيش واللغة والإعالة الذاتية.' },
  { id: 3, questionAr: 'ما هي مدة معالجة طلب إقامة الدراسة الجامعية في السويد؟', categoryCode: 'migration', expectedAuthority: 'Migrationsverket', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'تستغرق عادة بين 2 إلى 4 أشهر قبل بدء الفصل.' },
  { id: 4, questionAr: 'ما هو التصرف الصحيح عند صدور قرار رفض لتمديد الإقامة؟', categoryCode: 'migration', expectedAuthority: 'Migrationsverket / Migrationsdomstolen', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'يمكن الاستئناف خلال 3 أسابيع من تاريخ التبليغ بالقرار.' },
  
  // Citizenship
  { id: 5, questionAr: 'كم عدد السنوات المطلوبة للجنسية لحاملي اللجوء السياسي مقابل إقامة العمل؟', categoryCode: 'citizenship', expectedAuthority: 'Migrationsverket', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: '4 سنوات للجوء السياسي مقارنة بـ 5 سنوات للإقامات الأخرى عادة.' },
  { id: 6, questionAr: 'هل تؤثر المديونيات لدى الكرونوفوجدن Kronofogden على طلب الجنسية؟', categoryCode: 'citizenship', expectedAuthority: 'Migrationsverket / Kronofogden', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'نعم، الديون والملاحظات المالية تؤجل قبول الطلب حتى سدادها وتوفر فترة تحسن.' },
  { id: 7, questionAr: 'ما هي شروط حصول الأطفال المولودين في السويد على الجنسية مباشرة؟', categoryCode: 'citizenship', expectedAuthority: 'Migrationsverket', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'يشترط أن يكون أحد الأبوين حاملاً للجنسية السويدية وقت الولادة.' },

  // Family Reunification
  { id: 8, questionAr: 'ما هو الحد الأدنى لمبلغ الدخل المتبقي (Normalbelopp) للم الشمل؟', categoryCode: 'family', expectedAuthority: 'Migrationsverket', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'يتم تحديث المبلغ سنوياً ويحسب بعد خصم إيجار السكن كاملاً.' },
  { id: 9, questionAr: 'هل يجب أن تكون الشقة ملكاً أم يمكن أن تكون عقد إيجار ثنائي لم الشمل؟', categoryCode: 'family', expectedAuthority: 'Migrationsverket', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'يمكن الإيجار الأولي أو الثانوي بشرط وجود عقد معتمد وموافقة المالك/المجلس.' },
  { id: 10, questionAr: 'ما هي الأوراق المعتمدة لإثبات عقد الزواج الصادر من دولة عربية؟', categoryCode: 'family', expectedAuthority: 'Migrationsverket / السفارة السويدية', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'تصديق وزارة الخارجية بالدولة، ترجمة معتمدة، وتصديق السفارة.' },

  // Work & Unemployment
  { id: 11, questionAr: 'كيف أحسب قيمة تعويض A-kassa عند فقدان الوظيفة؟', categoryCode: 'work', expectedAuthority: 'Arbetsförmedlingen / A-kassa', expectedSourceDomain: 'arbetsformedlingen.se', testStatus: 'pass', notes: 'تصل إلى 80% من الراتب السابق حتى حد أقصى محدد يومياً للأيام الـ200 الأولى.' },
  { id: 12, questionAr: 'ما هي حقوق الموظف في الإجازة السنوية المدفوعة الأجر حسب القانون؟', categoryCode: 'work', expectedAuthority: 'Arbetsmiljöverket / Kollektivavtal', expectedSourceDomain: 'arbetsformedlingen.se', testStatus: 'pass', notes: 'الحق الأدنى القانوني هو 25 يوم عمل سنوياً مدفوعة الأجر (Semesterlag).' },
  { id: 13, questionAr: 'ما الفرق بين عقد الإيجار الوظيفي المحكم التوقيت وعقد التوظيف المفتوح Tillsvidare؟', categoryCode: 'work', expectedAuthority: 'Arbetsförmedlingen', expectedSourceDomain: 'arbetsformedlingen.se', testStatus: 'pass', notes: 'العقد المفتوح يوفر أماناً وظيفياً وشرط استقرار أقوى لم الشمل والإقامة.' },

  // Education & Degree Recognition
  { id: 14, questionAr: 'كيف أبدأ دراسة السويدية للمهاجرين SFI وما هي المستويات؟', categoryCode: 'education', expectedAuthority: 'Kommunen / Vuxenutbildning', expectedSourceDomain: 'skolverket.se', testStatus: 'pass', notes: 'التسجيل يتم عبر البلدية، والمستويات تقسم من A إلى D حسب التعليم السابق.' },
  { id: 15, questionAr: 'ما هي شروط التقديم على القرض والدعم الدراسي من CSN؟', categoryCode: 'education', expectedAuthority: 'CSN', expectedSourceDomain: 'csn.se', testStatus: 'pass', notes: 'يتطلب إقامة دائمة أو حق إقامة مساوي وإنجاز نسبة من النقاط الدراسية.' },
  { id: 16, questionAr: 'هل تحتاج شهادة الثانوية العامة العربية إلى ترجمة وتعديل لدخول الجامعة في السويد؟', categoryCode: 'education', expectedAuthority: 'UHR / Antagning.se', expectedSourceDomain: 'uhr.se', testStatus: 'pass', notes: 'نعم، عبر التقديم في UHR لتقييم المؤهل وإكمال متطلبات اللغة السويدية والإنجليزية.' },

  // Taxes & Personnummer
  { id: 17, questionAr: 'ما هو السجل السكاني Folkbokföring وكيف أغير عنوان سكني؟', categoryCode: 'taxes', expectedAuthority: 'Skatteverket', expectedSourceDomain: 'skatteverket.se', testStatus: 'pass', notes: 'تغيير العنوان يتم مجاناً عبر موقع Skatteverket بطلب Flyttanmälan.' },
  { id: 18, questionAr: 'كيف أقوم بطلب الإقرار الضريبي السنوي Deklaration؟', categoryCode: 'taxes', expectedAuthority: 'Skatteverket', expectedSourceDomain: 'skatteverket.se', testStatus: 'pass', notes: 'يصل التقرير المسبق في شهر مارس/أبريل ويتم تأكيده عبر تطبيق Skatteverket أو BankID.' },
  { id: 19, questionAr: 'ما هو الفرق بين Personnummer و Samordningsnummer؟', categoryCode: 'taxes', expectedAuthority: 'Skatteverket', expectedSourceDomain: 'skatteverket.se', testStatus: 'pass', notes: 'الرقم الشخصي لمن لديه إقامة سنة فأكثر، والتنسيقي لمن إقامته قصيرة أو العمل المؤقت.' },

  // Insurance & Benefits
  { id: 20, questionAr: 'كم عدد أيام إجازة الأمومة والأبوة Föräldrapenning المتاحة للوالدين؟', categoryCode: 'insurance', expectedAuthority: 'Försäkringskassan', expectedSourceDomain: 'forsakringskassan.se', testStatus: 'pass', notes: '480 يوماً إجمالياً للطفل الواحد تقسم بين الوالدين مع أيام مخصصة لكل والد.' },
  { id: 21, questionAr: 'ما هو تعويض الأطفال Barnbidrag ومتى يتم صرفه شهرياً؟', categoryCode: 'insurance', expectedAuthority: 'Försäkringskassan', expectedSourceDomain: 'forsakringskassan.se', testStatus: 'pass', notes: 'مبلغ ثابت شهري يصرف عادة يوم 20 من كل شهر لكل طفل حتى سن 16 سنة.' },
  { id: 22, questionAr: 'كيف أقدم على دعم السكن Bostadsbidrag للعائلات أو الشباب؟', categoryCode: 'insurance', expectedAuthority: 'Försäkringskassan', expectedSourceDomain: 'forsakringskassan.se', testStatus: 'pass', notes: 'يحسب بناءً على قيمة الإيجار، مساحة السكن، عدد الأطفال، والدخل السنوي المتوقع.' },

  // Housing & Contracts
  { id: 23, questionAr: 'كيف أحمي نفسي من الاحتيال في عقود الإيجار الثانوية Andrahand؟', categoryCode: 'housing', expectedAuthority: 'Hyresgästföreningen / Hyresnämnden', expectedSourceDomain: 'boverket.se', testStatus: 'pass', notes: 'لا تدفع عربوناً قبل معاينة الشقة والتأكد من موافقة مالك العقار أو جمعية السكن (BRF).' },
  { id: 24, questionAr: 'ما هي أقصى زيادات مسموحة في قيمة إيجار الشقق المفروشة؟', categoryCode: 'housing', expectedAuthority: 'Hyresnämnden', expectedSourceDomain: 'boverket.se', testStatus: 'pass', notes: 'يسمح عادة بإضافة 10-15% كحد أقصى لقيمة الأثاث فوق الإيجار الأساسي المعتمد.' },

  // Health
  { id: 25, questionAr: 'ما هو السقف الأعلى للمصاريف الصحية السنوية Högkostnadsskydd؟', categoryCode: 'health', expectedAuthority: '1177 / Regionen', expectedSourceDomain: '1177.se', testStatus: 'pass', notes: 'يحمي المريض بحيث لا يدفع أكثر من السقف المحدد سنوياً للزيارات الطبية والأدوية.' },
  { id: 26, questionAr: 'كيف تحصل على مترجم شفهي مجاني أثناء زيارة الطبيب في السويد؟', categoryCode: 'health', expectedAuthority: '1177 / Vårdcentralen', expectedSourceDomain: '1177.se', testStatus: 'pass', notes: 'يحق للمريض طلب مترجم عند حجز الموعد وتتحمل المستشفى/المركز التكلفة.' },

  // Social
  { id: 27, questionAr: 'ما هي شروط الحصول على الدعم المالي المعيشي Försörjningsstöd من السوسيال؟', categoryCode: 'social', expectedAuthority: 'Socialtjänsten', expectedSourceDomain: 'socialstyrelsen.se', testStatus: 'pass', notes: 'تغطية الاحتياجات الأساسية لمن لا يملك أي دخل أو مدخرات ولا يستحق تعويضات أخرى.' },
  { id: 28, questionAr: 'ما هو قانون LVU وما هي حقوق الأسرة عند التواصل مع مكتب السوسيال؟', categoryCode: 'social', expectedAuthority: 'Socialstyrelsen', expectedSourceDomain: 'socialstyrelsen.se', testStatus: 'pass', notes: 'قانون حماية الأطفال، وللأسرة الحق في مترجم محايد ومحامٍ وتوضيح الإجراءات.' },

  // Transport
  { id: 29, questionAr: 'ما هي شروط استبدال رخصة القيادة الصادرة من دول الاتحاد الأوروبي مقابل الدول الأخرى؟', categoryCode: 'transport', expectedAuthority: 'Transportstyrelsen', expectedSourceDomain: 'transportstyrelsen.se', testStatus: 'pass', notes: 'تستبدل رخص الاتحاد الأوروبي مباشرة، بينما تتطلب الدول الأخرى امتحاناً نظرياً وعملياً.' },
  { id: 30, questionAr: 'ما هي دورة المخاطر Riskettan و Risktvåan الحزام والانزلاق المطلوبة لرخصة السويد؟', categoryCode: 'transport', expectedAuthority: 'Trafikverket / Transportstyrelsen', expectedSourceDomain: 'transportstyrelsen.se', testStatus: 'pass', notes: 'دورتان إجباريتان: الأولى عن الكحول والمخاطر، والثانية تجربة الانزلاق بالسيارة.' },

  // Business
  { id: 31, questionAr: 'ما هو الفرق بين Enskild firma و Aktiebolag (AB) عند تأسيس شركة؟', categoryCode: 'business', expectedAuthority: 'Bolagsverket / Skatteverket', expectedSourceDomain: 'verksamt.se', testStatus: 'pass', notes: 'الشركة الفردية ترتبط بالذمة المالية للشخص، بينما الشركة المحدودة تتطلب رأس مال 25,000 كرون.' },
  { id: 32, questionAr: 'كيف يتم التقديم على ضريبة F-skatt عبر منصة Verksamt.se؟', categoryCode: 'business', expectedAuthority: 'Skatteverket / Verksamt.se', expectedSourceDomain: 'verksamt.se', testStatus: 'pass', notes: 'تعبئة خطة عمل وتقدير الأرباح والتقديم عبر الإنترنت باستخدام BankID.' },

  // Daily Life & Privacy
  { id: 33, questionAr: 'كيف تحصل على هوية BankID وكيف تحمي نفسك من عمليات الاحتيال؟', categoryCode: 'daily', expectedAuthority: 'البنوك السويدية / BankID', expectedSourceDomain: 'imy.se', testStatus: 'pass', notes: 'تطلب من البنك السويدي المسجل به، ولا تشارك رمز التوقيع مطلقاً مع أي متصل.' },
  { id: 34, questionAr: 'ما هي حقوق حماية البيانات الشخصية GDPR لدى المؤسسات السويدية؟', categoryCode: 'daily', expectedAuthority: 'IMY (Integritetsskyddsmyndigheten)', expectedSourceDomain: 'imy.se', testStatus: 'pass', notes: 'يحق لك طلب نسخة من بياناتك المسجلة أو تصحيحها أو مسحها إذا انتفت الحاجة.' },

  // Questions 35 to 50 covering nuanced scenarios
  { id: 35, questionAr: 'ما هي إجراءات السفر خارج السويد أثناء انتظار قرار التمديد؟', categoryCode: 'migration', expectedAuthority: 'Migrationsverket', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'ينصح بعدم المغادرة لأن العودة قد ترتبط بصلاحية التأشيرة اللازمة.' },
  { id: 36, questionAr: 'كيف تؤثر الإجازة المرضية طويلة الأمد على حساب سنوات الإقامة للجنسية؟', categoryCode: 'citizenship', expectedAuthority: 'Migrationsverket / Försäkringskassan', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'لا تؤثر إذا كانت معتمدة طبياً ومنتظمة بتعويضات مرضية قانونية.' },
  { id: 37, questionAr: 'ما هي شروط لم شمل الوالدين كبار السن في القانون السويدي؟', categoryCode: 'family', expectedAuthority: 'Migrationsverket', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'تقتصر الشروط على حالات استثنائية مشدودة جداً وتعتمد على الاعتماد الشديد قبل الانتقال.' },
  { id: 38, questionAr: 'هل يحق للمستأجر تحويل عقد الإيجار الثانوي إلى أولي في حالات معينة؟', categoryCode: 'housing', expectedAuthority: 'Hyresnämnden', expectedSourceDomain: 'boverket.se', testStatus: 'pass', notes: 'فقط إذا ثبت الصورية أو التعامل المباشر مع صاحب البناء الأصلي.' },
  { id: 39, questionAr: 'كيف تؤثر الأرباح من الأسهم والتداول على الإقرار الضريبي في السويد؟', categoryCode: 'taxes', expectedAuthority: 'Skatteverket', expectedSourceDomain: 'skatteverket.se', testStatus: 'pass', notes: 'تخضع لضريبة أرباح رؤوس الأموال 30% أو حساب ISK المخفض ضريبياً.' },
  { id: 40, questionAr: 'ما هي حقوق الطفل في الحضانة المدرسية Förskola للوالدين العاطلين عن العمل؟', categoryCode: 'education', expectedAuthority: 'Kommunen / Skolverket', expectedSourceDomain: 'skolverket.se', testStatus: 'pass', notes: 'يحق للطفل ما لا يقل عن 15 ساعة أسبوعياً مجاناً أو برسوم رمزية.' },
  { id: 41, questionAr: 'ما هو تعويض VAB عند رعاية طفل مريض وكيف يبلغ للعمل والتأمينات؟', categoryCode: 'insurance', expectedAuthority: 'Försäkringskassan', expectedSourceDomain: 'forsakringskassan.se', testStatus: 'pass', notes: 'تعويض VAB يبلغ في نفس اليوم لأرباب العمل وصندوق التأمينات.' },
  { id: 42, questionAr: 'ما هي غرامات السير والتأخير في فحص السيارة السنوي Besiktning؟', categoryCode: 'transport', expectedAuthority: 'Transportstyrelsen / Polisen', expectedSourceDomain: 'transportstyrelsen.se', testStatus: 'pass', notes: 'يتحول المركبة إلى حظر سير تلقائي عند فوات الموعد النهائي للفحص.' },
  { id: 43, questionAr: 'كيف أحصل على بطاقة الرعاية الصحية الأوروبية EHIC عند السفر من السويد؟', categoryCode: 'health', expectedAuthority: 'Försäkringskassan', expectedSourceDomain: 'forsakringskassan.se', testStatus: 'pass', notes: 'تطلب مجاناً عبر موقع Försäkringskassan وتصل بالبريد خلال أيام.' },
  { id: 44, questionAr: 'ما هي الشروط المطلوبة لفتح مقهى أو مطعم من حيث تصاريح البلدية والبيئة؟', categoryCode: 'business', expectedAuthority: 'Kommunen (Miljö & Hälsoskydd)', expectedSourceDomain: 'verksamt.se', testStatus: 'pass', notes: 'تتطلب تصريح بيئي وصحي، وتصريح بيع الأغذية والمشروبات من البلدية.' },
  { id: 45, questionAr: 'كيف أقدم شكوى ضريبية عند اعتراض على حساب التقدير الضريبي؟', categoryCode: 'taxes', expectedAuthority: 'Skatteverket / Förvaltningsrätten', expectedSourceDomain: 'skatteverket.se', testStatus: 'pass', notes: 'التقديم متاح خلال سنتين من القرار عبر نموذج الاعتراض الرسمي.' },
  { id: 46, questionAr: 'ما هي شروط الحماية الاجتماعية والمأوى الطارئ للنساء والأسر؟', categoryCode: 'social', expectedAuthority: 'Socialtjänsten / Kvinnojour', expectedSourceDomain: 'socialstyrelsen.se', testStatus: 'pass', notes: 'يوفر السوسيال حماية فورية وسكناً آمناً طارئاً بالتنسيق مع مراكز الحماية.' },
  { id: 47, questionAr: 'كيف أطلب تعديل الاسم أو اللقب في السجل السكاني السويدي؟', categoryCode: 'taxes', expectedAuthority: 'Skatteverket', expectedSourceDomain: 'skatteverket.se', testStatus: 'pass', notes: 'تعبئة استمارة Namnändring ودفع الرسوم المقررة لدى Skatteverket.' },
  { id: 48, questionAr: 'ما هي مدة الاحتفاظ بالبيانات في سجلات الشرطة والمعلومات الجنائية Belastningsregistret؟', categoryCode: 'daily', expectedAuthority: 'Polismyndigheten', expectedSourceDomain: 'polisen.se', testStatus: 'pass', notes: 'تتراوح بين 3 إلى 10 سنوات حسب الجرم والعقوبة الصادرة.' },
  { id: 49, questionAr: 'هل يحق للمستأجر تربية حيوان أليف في الشقة الإيجار في السويد؟', categoryCode: 'housing', expectedAuthority: 'Hyresgästföreningen', expectedSourceDomain: 'boverket.se', testStatus: 'pass', notes: 'نعم بشكل عام إلا إذا كانت الشقة في مبنى خاص بالحساسية الصحية.' },
  { id: 50, questionAr: 'ما هي الخطوات الرسمية عند فقدان بطاقة الإقامة UT-kort في الخارج؟', categoryCode: 'migration', expectedAuthority: 'Migrationsverket / السفارة السويدية', expectedSourceDomain: 'migrationsverket.se', testStatus: 'pass', notes: 'مراجعة أقرب سفارة سويدية واستخراج تأشيرة عودة D-visum للعودة للسويد.' }
];
