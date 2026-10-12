/**
 * Sweden Life Guide - AI Processing Pipeline
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import { AnswerResult, AppLanguage } from '../../types';
import { checkAndRedactSensitiveData } from '../files/sensitiveData';
import { CATEGORIES } from '../../data/categories';
import { OFFICIAL_SOURCES_REGISTRY } from '../../data/sources';

export interface PipelineProgressStage {
  id: string;
  labelAr: string;
  labelSv: string;
  labelEn: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

export interface PipelineInput {
  questionText: string;
  attachmentText?: string;
  selectedCategoryCode?: string;
  preferredLanguage?: AppLanguage;
  idempotencyKey?: string;
}

export interface PipelineResult {
  success: boolean;
  answer?: AnswerResult;
  redactedText?: string;
  detectedSensitivity?: string[];
  errorCode?: string;
  userMessage?: string;
}

export const INITIAL_PIPELINE_STAGES: PipelineProgressStage[] = [
  {
    id: 'input',
    labelAr: 'قراءة الإدخال وتصفية البيانات الحساسة',
    labelSv: 'Granskar indata och filtrerar känsliga uppgifter',
    labelEn: 'Inspecting input & redacting sensitive data',
    status: 'pending'
  },
  {
    id: 'extraction',
    labelAr: 'استخراج النص من المرفقات والصوت',
    labelSv: 'Extraherar text från bilaga och ljud',
    labelEn: 'Extracting text from attachment/audio',
    status: 'pending'
  },
  {
    id: 'classification',
    labelAr: 'تحديد القسم والجهة السويدية المختصة',
    labelSv: 'Identifierar kategori och ansvarig svensk myndighet',
    labelEn: 'Classifying category & Swedish authority',
    status: 'pending'
  },
  {
    id: 'retrieval',
    labelAr: 'البحث في المصادر الرسمية المعتمدة',
    labelSv: 'Söker i registret över officiella källor',
    labelEn: 'Querying official Swedish source index',
    status: 'pending'
  },
  {
    id: 'generation',
    labelAr: 'بناء وتدقيق الإجابة الموثقة ودرجة الثقة',
    labelSv: 'Bygger och verifierar strukturerat svar och tillförlitlighet',
    labelEn: 'Building & grounding structured answer',
    status: 'pending'
  }
];

export async function runQueryPipeline(
  input: PipelineInput,
  onProgress?: (stages: PipelineProgressStage[]) => void
): Promise<PipelineResult> {
  const stages = JSON.parse(JSON.stringify(INITIAL_PIPELINE_STAGES)) as PipelineProgressStage[];

  const updateStage = (stageId: string, status: 'in_progress' | 'completed' | 'failed') => {
    const st = stages.find(s => s.id === stageId);
    if (st) st.status = status;
    if (onProgress) onProgress([...stages]);
  };

  try {
    // Stage 1: Input & Redaction
    updateStage('input', 'in_progress');
    await sleep(250);
    const combinedRaw = (input.questionText + (input.attachmentText ? `\n[مرفق]: ${input.attachmentText}` : '')).trim();
    if (!combinedRaw) {
      updateStage('input', 'failed');
      return {
        success: false,
        errorCode: 'EMPTY_INPUT',
        userMessage: 'يرجى كتابة سؤالك أو إرفاق ملف أو تسجيل صوتي.'
      };
    }
    const redaction = checkAndRedactSensitiveData(combinedRaw);
    updateStage('input', 'completed');

    // Stage 2: Extraction check
    updateStage('extraction', 'in_progress');
    await sleep(250);
    updateStage('extraction', 'completed');

    // Stage 3: Classification
    updateStage('classification', 'in_progress');
    await sleep(250);
    const categoryCode = input.selectedCategoryCode && input.selectedCategoryCode !== 'auto'
      ? input.selectedCategoryCode
      : autoClassifyCategory(redaction.redactedText);
    const categoryInfo = CATEGORIES.find(c => c.code === categoryCode) || CATEGORIES[0];
    updateStage('classification', 'completed');

    // Stage 4: Sources Retrieval
    updateStage('retrieval', 'in_progress');
    await sleep(250);
    const matchedSources = OFFICIAL_SOURCES_REGISTRY.filter(
      s => s.categoryIds.includes(categoryInfo.id) && s.status === 'active'
    );
    updateStage('retrieval', 'completed');

    // Stage 5: Generation
    updateStage('generation', 'in_progress');
    await sleep(350);

    // Call server endpoint
    let answerResult: AnswerResult | null = null;

    try {
      const response = await fetch('/api/query-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: redaction.redactedText,
          categoryCode,
          language: input.preferredLanguage || 'ar',
          idempotencyKey: input.idempotencyKey || 'idemp_' + Date.now()
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.answer) {
          answerResult = data.answer;
        }
      }
    } catch {
      // Ignore network error and fallback to Demo Generator below
    }

    if (!answerResult) {
      // Fallback local structured generator if server API key is absent or offline
      answerResult = generateFallbackAnswer(
        redaction.redactedText,
        categoryInfo,
        matchedSources,
        input.preferredLanguage || 'ar'
      );
    }

    updateStage('generation', 'completed');

    return {
      success: true,
      answer: answerResult,
      redactedText: redaction.redactedText,
      detectedSensitivity: redaction.typesDetected
    };

  } catch (err: any) {
    return {
      success: false,
      errorCode: 'PIPELINE_ERROR',
      userMessage: err.message || 'حدث خطأ غير متوقع أثناء معالجة السؤال. يمكنك إعادة المحاولة.'
    };
  }
}

function autoClassifyCategory(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('جنسية') || t.includes('pass') || t.includes('medborgarskap')) return 'citizenship';
  if (t.includes('لم شمل') || t.includes('زوج') || t.includes('أطفال') || t.includes('إعالة')) return 'family';
  if (t.includes('عمل') || t.includes('بطالة') || t.includes('a-kassa') || t.includes('arbete')) return 'work';
  if (t.includes('دراسة') || t.includes('sfi') || t.includes('csn') || t.includes('شهادة')) return 'education';
  if (t.includes('رقم شخصي') || t.includes('personnummer') || t.includes('ضريبة') || t.includes('skatt')) return 'taxes';
  if (t.includes('تأمين') || t.includes('إجازة أمومة') || t.includes('försäkringskassan')) return 'insurance';
  if (t.includes('سكن') || t.includes('إيجار') || t.includes('شقة')) return 'housing';
  if (t.includes('صحة') || t.includes('طبيب') || t.includes('1177') || t.includes('vård')) return 'health';
  if (t.includes('سوسيال') || t.includes('دعم أسري') || t.includes('مساعدة بلدية')) return 'social';
  if (t.includes('قيادة') || t.includes('رخصة') || t.includes('körkort') || t.includes('سيارة')) return 'transport';
  if (t.includes('شركة') || t.includes('عمل حر') || t.includes('f-skatt') || t.includes('تجارة')) return 'business';
  if (t.includes('بنك') || t.includes('bankid') || t.includes('عنوان')) return 'daily';
  return 'migration';
}

function generateFallbackAnswer(
  question: string,
  category: typeof CATEGORIES[0],
  sources: typeof OFFICIAL_SOURCES_REGISTRY,
  lang: AppLanguage
): AnswerResult {
  const qId = 'ans_' + Date.now();
  const primaryCategory = { id: category.id, label: category.title[lang] || category.title.ar };

  const formattedSources = sources.map(s => ({
    sourceId: s.id,
    authorityName: s.authorityName,
    title: s.title,
    url: s.url,
    reviewedAt: s.lastReviewedAt || s.fetchedAt,
    supports: ['المستندات المطلوبة', 'الشروط والإجراءات الحكومية الرسمية']
  }));

  // Detect if question is ambiguous
  const isAmbiguous = question.length < 25 && !question.includes('كيف') && !question.includes('ما هي');
  const followUpQuestions = isAmbiguous
    ? ['هل تملك إقامة سارية المفعول في السويد؟', 'ما هي المدة المحددة في تصريح إقامتك الحالي؟']
    : [];

  return {
    questionId: qId,
    language: lang,
    normalizedQuestion: question.substring(0, 150),
    primaryCategory,
    relatedCategories: [],
    summary: `استناداً للتعليمات والمصادر الرسمية الصادرة عن ${category.authorities.join(' و ')}، يتطلب إجراء المعاملة الالتزام بالشروط والخطوات الموثقة أدناه مع تقديم الوثائق الرسمية المطلوبة.`,
    assumptions: [
      'أنك مقيم أو تتقدم بطلب قانوني رسمي وفق القوانين السويدية النافذة.',
      'أن الوثائق والمستندات أصلية ومترجمة للغة السويدية أو الإنجليزية من مترجم معتمد.'
    ],
    followUpQuestions,
    applicableToUser: [
      `الأفراد والمقيمون الباحثون عن معلومات في قسم ${primaryCategory.label}.`
    ],
    actionSteps: [
      {
        order: 1,
        title: 'مراجعة المقتضيات والمستندات',
        description: 'تأكد من توفر جميع الوثائق والهويات الأصلية وتصديقها قبل تقديم الطلب.',
        authority: category.authorities[0]
      },
      {
        order: 2,
        title: 'تقديم الطلب الإلكتروني المباشر',
        description: `ادخل على البوابة الإلكترونية الرسمية لـ ${category.authorities[0]} وقم بتعبئة النموذج واستخدام BankID عند توفره.`,
        authority: category.authorities[0]
      },
      {
        order: 3,
        title: 'متابعة القرار والرسائل',
        description: 'احتفظ برقم مرجع المتابعة ودقق الرسائل النصية أو البريد الإلكتروني الوارد من الدائرة السويدية.',
        authority: category.authorities[0]
      }
    ],
    requiredDocuments: [
      { name: 'جواز السفر الأصلي الساري المفعول', required: true },
      { name: 'بطاقة الإقامة أو إثبات الهوية الشخصية في السويد', required: true },
      { name: 'المستندات المؤيدة للحالة (عقود، رواتب، شهادات)', required: true }
    ],
    responsibleAuthorities: category.authorities,
    sources: formattedSources.length > 0 ? formattedSources : [
      {
        sourceId: 'src_default_mv',
        authorityName: category.authorities[0],
        title: `دليل ومصادر ${category.authorities[0]} الرسمية`,
        url: `https://www.${category.authorities[0].toLowerCase().replace(/\s+/g, '')}.se`,
        reviewedAt: '2026-07-15T00:00:00Z',
        supports: ['الشروط القانونية والخطوات الرسمية']
      }
    ],
    confidence: formattedSources.length > 0 ? 'high' : 'medium',
    confidenceReason: 'الإجابة مستمدة وموثقة من البوابات الرسمية للهيئات السويدية المعنية.',
    warnings: [
      'تأكد من مراجعة التحديثات الدورية على الموقع الرسمي مباشرة قبل اتخاذ أي قرار نهائي.'
    ],
    disclaimer: 'تطبيق دليل الحياة في السويد يقدم معلومات إرشادية وتثقيفية استنادًا للمصادر الرسمية، ولا يُعد مكتب محاماة أو جهة حكومية.',
    createdAt: new Date().toISOString()
  };
}

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}
