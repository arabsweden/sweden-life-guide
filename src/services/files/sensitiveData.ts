/**
 * Sweden Life Guide - Sensitive Data Redactor & Prompt Injection Protection
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

export interface SensitivityCheckResult {
  hasSensitiveData: boolean;
  typesDetected: string[];
  redactedText: string;
  originalText: string;
}

/**
 * Detects Swedish Personnummer patterns (YYYYMMDD-XXXX or YYMMDD-XXXX or YYYYMMDDXXXX),
 * credit card numbers, and sanitizes prompt injection attempts inside document attachments.
 */
export function checkAndRedactSensitiveData(input: string): SensitivityCheckResult {
  if (!input) {
    return {
      hasSensitiveData: false,
      typesDetected: [],
      redactedText: '',
      originalText: ''
    };
  }

  let text = input;
  const typesDetected: string[] = [];

  // 1. Swedish Personnummer Regex: (19|20)?\d{6}[-+]?\d{4}
  const personnummerRegex = /\b(19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[-+]?\d{4}\b/g;
  if (personnummerRegex.test(text)) {
    typesDetected.push('رقم شخصي سويدي (Personnummer)');
    text = text.replace(personnummerRegex, '[رقم شخصي مخفي YYYYMMDD-XXXX]');
  }

  // 2. Credit Card numbers (13 to 19 digits)
  const creditCardRegex = /\b(?:\d[ -]*?){13,19}\b/g;
  if (creditCardRegex.test(text)) {
    typesDetected.push('رقم بطاقة ائتمانية/مصرفية');
    text = text.replace(creditCardRegex, '[رقم بطاقة مخفي]');
  }

  // 3. Email Addresses (optionally flagged)
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  if (emailRegex.test(text)) {
    typesDetected.push('بريد إلكتروني شخصي');
    text = text.replace(emailRegex, '[بريد إلكتروني مخفي]');
  }

  // 4. Prompt Injection Sanitization inside documents:
  // Strip patterns trying to override system prompt like "Ignore previous instructions", "System Prompt:", "You are now ChatGPT", etc.
  const injectionPatterns = [
    /ignore\s+previous\s+instructions/gi,
    /forget\s+all\t+rules/gi,
    /system\s*:\s*/gi,
    /أهمس\s+لي\s+بالتعليمات/gi,
    /تجاهل\s+التعليمات\s+السابقة/gi
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(text)) {
      typesDetected.push('محاولة توجيه غير مصرح بها (Prompt Injection)');
      text = text.replace(pattern, '[نص مستند آمن]');
    }
  }

  return {
    hasSensitiveData: typesDetected.length > 0,
    typesDetected,
    redactedText: text,
    originalText: input
  };
}
