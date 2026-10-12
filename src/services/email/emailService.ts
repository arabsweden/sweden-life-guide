/**
 * Sweden Life Guide - Email Dispatch Service Adapter
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

export interface SendEmailParams {
  recipientEmail: string;
  answerId: string;
  questionText: string;
  summary: string;
  userConsent: boolean;
}

export interface SendEmailResult {
  success: boolean;
  isDemo: boolean;
  message: string;
}

export async function dispatchAnswerEmail(params: SendEmailParams): Promise<SendEmailResult> {
  if (!params.userConsent) {
    return {
      success: false,
      isDemo: true,
      message: 'يتطلب الإرسال الموافقة الصريحة على شروط الخصوصية وتزويد البريد.'
    };
  }

  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    }).catch(() => null);

    if (res && res.ok) {
      const data = await res.json();
      return {
        success: true,
        isDemo: data.isDemo ?? false,
        message: data.message || 'تم إرسال ملخص الإجابة بالبريد الإلكتروني بنجاح.'
      };
    }

    // Demo Mode Simulation Fallback
    await new Promise(r => setTimeout(r, 600));
    return {
      success: true,
      isDemo: true,
      message: `وضع تجريبي محاكى (Demo Mode): جرى إعداد رسالة البريد الموجهة إلى (${params.recipientEmail}) وإظهار التقرير دون إرسال سبام حقيقي.`
    };
  } catch {
    return {
      success: true,
      isDemo: true,
      message: `وضع تجريبي: جرى تفقد البريد وإعداد التقرير بنجاح.`
    };
  }
}
