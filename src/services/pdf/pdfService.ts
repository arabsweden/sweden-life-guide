/**
 * Sweden Life Guide - PDF Export Service
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AnswerResult } from '../../types';

export interface PDFGenerationOptions {
  answer: AnswerResult;
  questionText: string;
}

export async function generateAnswerPDF(options: PDFGenerationOptions): Promise<Blob> {
  const { answer, questionText } = options;

  // Create temporary container element formatted for PDF rendering
  const container = document.createElement('div');
  container.id = 'pdf_render_container';
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '800px';
  container.style.padding = '40px';
  container.style.backgroundColor = '#FFFFFF';
  container.style.color = '#0F172A';
  container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  container.style.direction = answer.language === 'ar' ? 'rtl' : 'ltr';

  container.innerHTML = `
    <div style="border-bottom: 2px solid #005293; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 style="color: #005293; font-size: 22px; font-weight: bold; margin: 0;">دليل الحياة في السويد | Sweden Life Guide</h1>
        <p style="color: #64748B; font-size: 11px; margin: 4px 0 0 0;">RAED SHIHAB — Arab Sweden Since 2007</p>
      </div>
      <div style="text-align: left; font-size: 10px; color: #64748B;">
        <p style="margin: 0;">رقم المرجع: SWD-${answer.questionId.substring(0, 8)}</p>
        <p style="margin: 2px 0 0 0;">تاريخ التقرير: ${new Date(answer.createdAt).toLocaleDateString(answer.language === 'ar' ? 'ar-EG' : 'sv-SE')}</p>
      </div>
    </div>

    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
      <h3 style="color: #1E293B; font-size: 13px; margin: 0 0 8px 0; font-weight: bold;">السؤال المطلوب:</h3>
      <p style="color: #334155; font-size: 13px; margin: 0; line-height: 1.5;">${escapeHtml(questionText)}</p>
    </div>

    <div style="background-color: #EFF6FF; border-right: 4px solid #005293; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
      <h3 style="color: #005293; font-size: 14px; margin: 0 0 8px 0; font-weight: bold;">الخلاصة المباشرة:</h3>
      <p style="color: #1E3A8A; font-size: 13px; margin: 0; line-height: 1.6;">${escapeHtml(answer.summary)}</p>
    </div>

    ${answer.actionSteps.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #0F172A; font-size: 14px; margin: 0 0 12px 0; font-weight: bold; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px;">الخطوات العملية القابلة للتنفيذ:</h3>
        <ol style="margin: 0; padding-right: 20px; padding-left: 20px;">
          ${answer.actionSteps.map(step => `
            <li style="margin-bottom: 10px; color: #334155; font-size: 12px; line-height: 1.5;">
              <strong style="color: #0F172A;">${escapeHtml(step.title)}:</strong> ${escapeHtml(step.description)}
              ${step.authority ? `<span style="display: inline-block; background-color: #E2E8F0; color: #334155; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-right: 6px;">${escapeHtml(step.authority)}</span>` : ''}
            </li>
          `).join('')}
        </ol>
      </div>
    ` : ''}

    ${answer.requiredDocuments.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #0F172A; font-size: 14px; margin: 0 0 12px 0; font-weight: bold; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px;">قائمة الوثائق والمستندات المطلوبة:</h3>
        <ul style="margin: 0; padding-right: 20px; padding-left: 20px; list-style-type: square;">
          ${answer.requiredDocuments.map(doc => `
            <li style="margin-bottom: 6px; color: #334155; font-size: 12px;">
              <strong>${escapeHtml(doc.name)}</strong> ${doc.required ? '<span style="color: #DC2626; font-size: 10px;">(إجباري)</span>' : ''}
              ${doc.note ? `<br/><span style="color: #64748B; font-size: 11px;">${escapeHtml(doc.note)}</span>` : ''}
            </li>
          `).join('')}
        </ul>
      </div>
    ` : ''}

    <div style="margin-bottom: 20px;">
      <h3 style="color: #0F172A; font-size: 14px; margin: 0 0 10px 0; font-weight: bold; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px;">الجهة السويدية المختصة والمصادر الرسمية:</h3>
      <p style="color: #1E293B; font-size: 12px; margin: 0 0 8px 0;"><strong>الجهة المختصة:</strong> ${escapeHtml(answer.responsibleAuthorities.join('، '))}</p>
      <ul style="margin: 0; padding-right: 20px; padding-left: 20px; color: #2563EB; font-size: 11px;">
        ${answer.sources.map(src => `
          <li style="margin-bottom: 4px;">
            ${escapeHtml(src.authorityName)} — ${escapeHtml(src.title)} (${escapeHtml(src.url)})
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="margin-top: 30px; border-top: 1px solid #CBD5E1; padding-top: 12px; text-align: center; font-size: 10px; color: #64748B; line-height: 1.4;">
      <p style="margin: 0;">تم إنشاء هذا التقرير آلياً عبر تطبيق دليل الحياة في السويد. تحقّق من الجهة الرسمية قبل اتخاذ قرار نهائي.</p>
      <p style="margin: 4px 0 0 0;">علامة جودة المعلومات: RAED SHIHAB — Arab Sweden Since 2007</p>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    const pdfBlob = pdf.output('blob');

    document.body.removeChild(container);
    return pdfBlob;
  } catch (err) {
    document.body.removeChild(container);
    // Return empty fallback blob
    return new Blob(['PDF Generation Error'], { type: 'application/pdf' });
  }
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
