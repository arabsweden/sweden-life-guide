/**
 * Sweden Life Guide - Unified Question Box
 * Theme: Professional Polish
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CATEGORIES } from '../../data/categories';
import { processAndExtractFile, transcribeAudioBlob } from '../../services/files/fileExtractor';
import { Attachment } from '../../types';
import { Mic, MicOff, Paperclip, Sparkles, AlertCircle, FileCheck, X, Send } from 'lucide-react';

interface UnifiedQuestionBoxProps {
  onSubmitQuery: (params: {
    questionText: string;
    attachmentText?: string;
    selectedCategoryCode: string;
    attachment?: Attachment;
  }) => void;
  onOpenSensitiveDataModal: (types: string[], redactedText: string, proceedCb: () => void) => void;
}

export const UnifiedQuestionBox: React.FC<UnifiedQuestionBoxProps> = ({
  onSubmitQuery,
  onOpenSensitiveDataModal
}) => {
  const { t, language } = useLanguage();

  const [questionText, setQuestionText] = useState('');
  const [selectedCategoryCode, setSelectedCategoryCode] = useState('auto');
  
  // Voice Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimeSec, setRecordingTimeSec] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  // File Attachment state
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [fileProcessing, setFileProcessing] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Character limit validation
  const MAX_CHARS = 4000;
  const isOverCharLimit = questionText.length > MAX_CHARS;

  // Recording Timer
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setRecordingTimeSec(prev => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setRecordingTimeSec(0);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording]);

  // Handle Mic Record Toggle
  const toggleRecording = async () => {
    if (isRecording) {
      // Stop Recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start Recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunksRef.current = [];
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        recorder.onstop = async () => {
          stream.getTracks().forEach(track => track.stop());
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const transcribedText = await transcribeAudioBlob(audioBlob);
          setQuestionText(prev => (prev ? `${prev}\n[تفريغ التغيير الصوتي]: ${transcribedText}` : transcribedText));
        };

        recorder.start();
        mediaRecorderRef.current = recorder;
        setIsRecording(true);
      } catch (err) {
        alert('تعذر الوصول إلى الميكروفون. نرجو منح صلاحية استخدام الميكروفون في المتصفح.');
      }
    }
  };

  // Handle File Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileProcessing(true);
    setFileError(null);

    const res = await processAndExtractFile(file);
    setFileProcessing(false);

    if (res.success) {
      setAttachment(res.attachment);
    } else {
      setFileError(res.error || 'فشل تحميل الملف');
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Sample Questions Click
  const handleSampleClick = (sample: string) => {
    setQuestionText(sample);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() && !attachment) return;
    if (isOverCharLimit) return;

    onSubmitQuery({
      questionText,
      attachmentText: attachment?.extractedText,
      selectedCategoryCode,
      attachment: attachment || undefined
    });
  };

  const sampleQuestions = [
    'ما هي شروط تمديد تصريح إقامة العمل في السويد والحد الأدنى للراتب؟',
    'كيف أسجل في السجل السكاني وأستخرج الرقم الشخصي Personnummer من Skatteverket؟',
    'ما هي المستندات المطلوبة لم الشمل وما شرط السكن والدخل المالي؟',
    'كيف أسجل في مكتب العمل Arbetsförmedlingen وما هي شروط تعويض A-kassa؟',
    'ما هي خطوات استبدال أو استخراج رخصة القيادة السويدية من Trafikverket؟'
  ];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Top Controls: Category Selector & Recording Indicator */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-600 font-bold shrink-0">القسم المختص:</label>
            <select
              value={selectedCategoryCode}
              onChange={(e) => setSelectedCategoryCode(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-[#1a2b3c] text-xs rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-[#006aa7] focus:outline-none w-full sm:w-auto font-bold"
            >
              <option value="auto">✨ {t('autoDetect')}</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.code} value={cat.code}>
                  {cat.title[language] || cat.title.ar}
                </option>
              ))}
            </select>
          </div>

          {/* Recording Badge */}
          {isRecording && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3.5 py-1.5 rounded-xl text-xs animate-pulse font-mono font-bold">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full"></span>
              <span>{t('recordingMic')} ({recordingTimeSec}s)</span>
            </div>
          )}
        </div>

        {/* Text Area Input Wrapper */}
        <div className="relative bg-[#fcfcfc] border border-slate-300 rounded-2xl p-2 focus-within:border-[#006aa7] focus-within:ring-2 focus-within:ring-[#006aa7]/20 transition-all">
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder={t('inputPlaceholder')}
            rows={4}
            className={`w-full bg-transparent border-0 p-3 text-[#1a2b3c] placeholder-slate-400 text-sm sm:text-base focus:outline-none resize-none leading-relaxed font-sans font-medium ${
              isOverCharLimit ? 'text-red-600 font-bold' : ''
            }`}
          />
          <div className="text-[11px] text-slate-400 font-mono text-left px-3 pb-1">
            <span className={isOverCharLimit ? 'text-red-600 font-bold' : ''}>
              {questionText.length}
            </span>
            /{MAX_CHARS}
          </div>
        </div>

        {/* File Attachment & Error Badges */}
        {attachment && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-3 rounded-xl text-xs text-[#006aa7]">
            <div className="flex items-center gap-2 truncate font-semibold">
              <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{attachment.originalName}</span>
              <span className="text-slate-500 text-[10px]">({(attachment.sizeBytes / 1024).toFixed(0)} KB)</span>
            </div>
            <button
              type="button"
              onClick={() => setAttachment(null)}
              className="p-1 hover:bg-blue-100 rounded-lg text-slate-500 hover:text-[#006aa7]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {fileError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 p-3 rounded-xl text-xs text-red-700 font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{fileError}</span>
          </div>
        )}

        {/* Toolbar & Submit CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* Mic Recorder */}
            <button
              type="button"
              onClick={toggleRecording}
              className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                isRecording
                  ? 'bg-red-600 text-white border-red-700 shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title={isRecording ? t('stopRecording') : 'تسجيل سؤال صوتي'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#006aa7]" />}
              <span className="hidden sm:inline">
                {isRecording ? t('stopRecording') : 'سجل صوتك'}
              </span>
            </button>

            {/* File Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={fileProcessing}
              className="p-2.5 sm:px-4 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Paperclip className="w-4 h-4 text-[#006aa7]" />
              <span className="hidden sm:inline">
                {fileProcessing ? 'جاري الفحص...' : 'إرفاق مستند/صورة'}
              </span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={(!questionText.trim() && !attachment) || isOverCharLimit}
            className="w-full sm:w-auto bg-[#006aa7] hover:bg-[#005587] text-white font-extrabold px-7 py-3 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-800"
          >
            <Sparkles className="w-4 h-4 text-[#fecc02]" />
            <span>{t('submitBtn')}</span>
            <Send className="w-4 h-4 mr-1" />
          </button>
        </div>

        {/* Small Privacy Note */}
        <p className="text-[11px] text-slate-500 font-medium text-center sm:text-right pt-1">
          {t('privacyNoticeShort')}
        </p>
      </form>

      {/* Sample Clickable Questions */}
      <div className="pt-4 border-t border-slate-200 space-y-2.5">
        <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#006aa7]" />
          <span>{t('sampleQuestionsLabel')}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((sample, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSampleClick(sample)}
              className="text-right text-[11px] bg-[#f4f7f6] hover:bg-blue-50 border border-slate-200 hover:border-[#006aa7] text-slate-700 hover:text-[#006aa7] px-3.5 py-2 rounded-xl transition-all font-semibold shadow-2xs"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
