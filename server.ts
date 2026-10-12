/**
 * Sweden Life Guide - Express Backend Entry Point
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// System instruction for Gemini model
const SYSTEM_INSTRUCTION = `أنت مساعد معلومات متخصص في الحياة في السويد. مهمتك تقديم معلومات عملية وبسيطة وموثقة من المصادر الرسمية التي يزودك بها النظام.

قواعد إلزامية:
1. أجب بلغة المستخدم، والعربية هي الافتراضية.
2. لا تخترع قانونًا أو شرطًا أو مبلغًا أو مدة أو رابطًا أو تاريخًا.
3. استخدم فقط المقاطع والمصادر الرسمية المسترجعة في السياق.
4. اربط كل ادعاء حساس بمصدر رسمي ذي صلة.
5. إذا كانت معلومات الحالة غير كافية، اطرح سؤال متابعة قصيرًا بدل إعطاء نتيجة قطعية.
6. إذا لم يوجد مصدر كافٍ، قل بوضوح إن الإجابة تحتاج تحققًا مباشرًا من الجهة المختصة.
7. فرّق بين المعلومة العامة والقرار الفردي؛ لا تتنبأ بنتيجة طلب إقامة أو جنسية أو مساعدة.
8. لا تقدم تشخيصًا طبيًا أو استشارة قانونية مخصصة.
9. لا تطلب الرقم الشخصي الكامل أو بيانات طفل أو معلومات صحية تفصيلية إلا إذا كان ذلك ضروريًا، ويفضل توجيه المستخدم لإخفائها.
10. اجعل الخلاصة قصيرة، ثم قدم الخطوات والوثائق والجهة والمصادر.
11. لا تقل «تم الإرسال» أو «تم الحفظ» أو «تم إنشاء PDF» إلا بعد أن يعيد التطبيق نتيجة نجاح فعلية من الوظيفة المسؤولة.
12. أعد النتيجة وفق JSON Schema المحدد فقط، دون نص خارج البنية.`;

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Sweden Life Guide Engine',
    hasApiKey: Boolean(aiClient),
    timestamp: new Date().toISOString()
  });
});

app.post('/api/query-guide', async (req, res) => {
  try {
    const { questionText, categoryCode, language } = req.body;

    if (!questionText) {
      return res.status(400).json({ error: 'questionText is required' });
    }

    if (!aiClient) {
      // Fallback demo response if no Gemini API key set
      return res.json({
        isDemoFallback: true,
        answer: null
      });
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `السؤال حول الحياة في السويد (القسم المختار: ${categoryCode || 'تحديد تلقائي'}):
${questionText}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questionId: { type: Type.STRING },
            language: { type: Type.STRING },
            normalizedQuestion: { type: Type.STRING },
            primaryCategory: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                label: { type: Type.STRING }
              },
              required: ['id', 'label']
            },
            relatedCategories: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  label: { type: Type.STRING }
                }
              }
            },
            summary: { type: Type.STRING },
            assumptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            followUpQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            applicableToUser: { type: Type.ARRAY, items: { type: Type.STRING } },
            actionSteps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  order: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  authority: { type: Type.STRING }
                },
                required: ['order', 'title', 'description']
              }
            },
            requiredDocuments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  required: { type: Type.BOOLEAN },
                  note: { type: Type.STRING }
                },
                required: ['name', 'required']
              }
            },
            responsibleAuthorities: { type: Type.ARRAY, items: { type: Type.STRING } },
            sources: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sourceId: { type: Type.STRING },
                  authorityName: { type: Type.STRING },
                  title: { type: Type.STRING },
                  url: { type: Type.STRING },
                  reviewedAt: { type: Type.STRING },
                  supports: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['sourceId', 'authorityName', 'title', 'url']
              }
            },
            confidence: { type: Type.STRING },
            confidenceReason: { type: Type.STRING },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            disclaimer: { type: Type.STRING },
            createdAt: { type: Type.STRING }
          },
          required: [
            'normalizedQuestion',
            'primaryCategory',
            'summary',
            'actionSteps',
            'requiredDocuments',
            'responsibleAuthorities',
            'sources',
            'confidence',
            'disclaimer'
          ]
        }
      }
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      parsed.questionId = 'ans_' + Date.now();
      parsed.createdAt = new Date().toISOString();
      return res.json({ answer: parsed });
    }

    res.json({ isDemoFallback: true, answer: null });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal AI Server Error' });
  }
});

app.post('/api/transcribe-audio', (req, res) => {
  res.json({
    text: 'سؤال صوتي: أريد استخراج بطاقة الهوية السويدية ID-kort من مصلحة الضرائب Skatteverket بعد الحصول على الإقامة.'
  });
});

app.post('/api/extract-file', (req, res) => {
  res.json({
    text: 'محتوى مستند رسمي يتضمن شروط وأحكام الإقامة والعمل في السويد.'
  });
});

app.post('/api/send-email', (req, res) => {
  res.json({
    success: true,
    isDemo: true,
    message: 'وضع تجريبي محاكى (Demo Mode): تم تجهيز تقرير البريد بنجاح.'
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sweden Life Guide server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
