/**
 * Sweden Life Guide | دليل الحياة في السويد
 * Theme: Professional Polish (Swedish Blue #006aa7 & Gold #fecc02)
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SensitiveDataWarningModal } from './components/SensitiveDataWarningModal';

import { UnifiedQuestionBox } from './features/ask/UnifiedQuestionBox';
import { ProcessingModal } from './features/ask/ProcessingModal';
import { AnswerResultView } from './features/result/AnswerResultView';
import { MyQuestionsView } from './features/history/MyQuestionsView';
import { CategoriesView } from './features/categories/CategoriesView';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { QAMatrixView } from './features/qa/QAMatrixView';
import { DocumentationView } from './features/docs/DocumentationView';

import { ExportPdfModal } from './features/export/ExportPdfModal';
import { ExportEmailModal } from './features/export/ExportEmailModal';

import {
  runQueryPipeline,
  PipelineProgressStage,
  INITIAL_PIPELINE_STAGES
} from './services/ai/pipeline';

import {
  getSavedQuestions,
  saveQuestionRecord,
  toggleFavoriteQuestion,
  deleteQuestionRecord,
  clearAllQuestionData
} from './services/storage/storageAdapter';

import {
  getCurrentUser,
  loginWithEmailDemo,
  loginWithGoogleDemo,
  logoutUser
} from './services/auth/authAdapter';

import { trackAnonymousEvent } from './services/analytics/analyticsAdapter';

import { QuestionRecord, User, AnswerResult, Attachment } from './types';
import { Sparkles, ShieldCheck, Compass, CheckCircle2, UserCheck, X } from 'lucide-react';

export function AppContent() {
  const [currentTab, setCurrentTab] = useState('home');
  const [currentUser, setCurrentUser] = useState<User>(getCurrentUser());
  const [savedQuestions, setSavedQuestions] = useState<QuestionRecord[]>([]);

  // Active answer view state
  const [activeQuestion, setActiveQuestion] = useState<QuestionRecord | null>(null);

  // Pipeline Processing Modal state
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStages, setPipelineStages] = useState<PipelineProgressStage[]>(INITIAL_PIPELINE_STAGES);
  const [pipelineError, setPipelineError] = useState<string | undefined>(undefined);

  // Sensitive Data Warning Modal state
  const [sensitiveTypes, setSensitiveTypes] = useState<string[] | null>(null);
  const [sensitiveRedactedText, setSensitiveRedactedText] = useState<string>('');
  const [pendingProceedCallback, setPendingProceedCallback] = useState<(() => void) | null>(null);

  // Export Modals state
  const [activePdfModalAnswer, setActivePdfModalAnswer] = useState<{
    answer: AnswerResult;
    questionText: string;
  } | null>(null);

  const [activeEmailModalAnswer, setActiveEmailModalAnswer] = useState<{
    answer: AnswerResult;
    questionText: string;
  } | null>(null);

  // Auth Modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmailInput, setAuthEmailInput] = useState('');

  useEffect(() => {
    setSavedQuestions(getSavedQuestions());
  }, []);

  // Handle Query Submission from Unified Question Box
  const handleQuerySubmit = async (params: {
    questionText: string;
    attachmentText?: string;
    selectedCategoryCode: string;
    attachment?: Attachment;
  }) => {
    setIsProcessing(true);
    setPipelineStages(JSON.parse(JSON.stringify(INITIAL_PIPELINE_STAGES)));
    setPipelineError(undefined);

    const res = await runQueryPipeline(
      {
        questionText: params.questionText,
        attachmentText: params.attachmentText,
        selectedCategoryCode: params.selectedCategoryCode,
        preferredLanguage: 'ar'
      },
      (stages) => {
        setPipelineStages(stages);
      }
    );

    setIsProcessing(false);

    if (res.success && res.answer) {
      // Check if sensitivity was detected
      if (res.detectedSensitivity && res.detectedSensitivity.length > 0) {
        setSensitiveTypes(res.detectedSensitivity);
        setSensitiveRedactedText(res.redactedText || params.questionText);
      }

      const newRecord: QuestionRecord = {
        id: res.answer.questionId,
        questionText: params.questionText,
        redactedQuestionText: res.redactedText || params.questionText,
        categoryCode: res.answer.primaryCategory.id,
        language: 'ar',
        attachments: params.attachment ? [params.attachment] : [],
        answerResult: res.answer,
        status: res.answer.confidence === 'needs_review' ? 'needs_review' : 'grounded',
        isFavorite: false,
        createdAt: new Date().toISOString()
      };

      const updated = saveQuestionRecord(newRecord);
      setSavedQuestions(updated);
      setActiveQuestion(newRecord);
      setCurrentTab('home');

      trackAnonymousEvent('submit_question', res.answer.primaryCategory.id, 'ar', true);
    } else {
      setPipelineError(res.userMessage || 'حدث خطأ أثناء معالجة الاستفسار.');
    }
  };

  // Handle Follow-up Question Submission
  const handleAskFollowUp = async (followUpText: string) => {
    if (!activeQuestion) return;
    const combined = `${activeQuestion.questionText}\n[سؤال متابعة]: ${followUpText}`;
    handleQuerySubmit({
      questionText: combined,
      selectedCategoryCode: activeQuestion.categoryCode
    });
  };

  // Toggle Favorite
  const handleToggleFavorite = (id: string) => {
    const updated = toggleFavoriteQuestion(id);
    setSavedQuestions(updated);
    if (activeQuestion && activeQuestion.id === id) {
      setActiveQuestion({
        ...activeQuestion,
        isFavorite: !activeQuestion.isFavorite
      });
    }
  };

  // Delete Question
  const handleDeleteQuestion = (id: string) => {
    const updated = deleteQuestionRecord(id);
    setSavedQuestions(updated);
    if (activeQuestion?.id === id) {
      setActiveQuestion(null);
    }
  };

  // Clear All Data
  const handleClearAllData = () => {
    clearAllQuestionData();
    setSavedQuestions([]);
    setActiveQuestion(null);
  };

  // Auth Handlers
  const handleLoginEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmailInput) return;
    const role = authEmailInput.includes('admin') ? 'admin' : 'user';
    const u = loginWithEmailDemo(authEmailInput, role);
    setCurrentUser(u);
    setShowAuthModal(false);
  };

  const handleLoginGoogleClick = () => {
    const u = loginWithGoogleDemo();
    setCurrentUser(u);
    setShowAuthModal(false);
  };

  const handleLogoutClick = () => {
    const u = logoutUser();
    setCurrentUser(u);
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-[#1a2b3c] flex flex-col font-sans selection:bg-[#006aa7] selection:text-white" dir="rtl">
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuthModal={() => setShowAuthModal(true)}
        onLogout={handleLogoutClick}
      />

      {/* Main Body */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Tab 1: HOME */}
        {currentTab === 'home' && (
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-[#fecc02] border border-amber-300 text-[#1a2b3c] px-4 py-1.5 rounded-full text-xs font-black shadow-xs">
                <Sparkles className="w-4 h-4 text-[#006aa7]" />
                <span>دليل المعيشة والمعاملات الرسمية في السويد</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#006aa7] leading-tight">
                اطرح سؤالك واحصل على خطوات عمل ومصادر حكومية موثقة (.se)
              </h1>

              <p className="text-slate-600 text-sm sm:text-base font-semibold leading-relaxed max-w-2xl mx-auto">
                إجابات هيكلية تشمل الشروط، خطوات التقديم، قائمة الوثائق، والجهة السويدية المختصة، مستندة حصرياً على مواقع المؤسسات الرسمية.
              </p>
            </div>

            {/* Unified Question Box */}
            <UnifiedQuestionBox
              onSubmitQuery={handleQuerySubmit}
              onOpenSensitiveDataModal={(types, redacted, cb) => {
                setSensitiveTypes(types);
                setSensitiveRedactedText(redacted);
                setPendingProceedCallback(() => cb);
              }}
            />

            {/* Active Answer Result OR Quick Category Highlights */}
            {activeQuestion && activeQuestion.answerResult ? (
              <AnswerResultView
                answer={activeQuestion.answerResult}
                originalQuestionText={activeQuestion.questionText}
                isSaved={activeQuestion.isFavorite}
                onToggleSave={() => handleToggleFavorite(activeQuestion.id)}
                onEditQuestion={() => {
                  window.scrollTo({ top: 150, behavior: 'smooth' });
                }}
                onOpenPdfModal={() => {
                  if (activeQuestion.answerResult) {
                    setActivePdfModalAnswer({
                      answer: activeQuestion.answerResult,
                      questionText: activeQuestion.questionText
                    });
                  }
                }}
                onOpenEmailModal={() => {
                  if (activeQuestion.answerResult) {
                    setActiveEmailModalAnswer({
                      answer: activeQuestion.answerResult,
                      questionText: activeQuestion.questionText
                    });
                  }
                }}
                onAskFollowUp={handleAskFollowUp}
              />
            ) : (
              /* Trust Highlights */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2 shadow-xs">
                  <div className="p-2.5 bg-blue-50 text-[#006aa7] rounded-xl w-fit border border-blue-200">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-[#1a2b3c]">
                    اعتماد النطاقات الرسمية
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    يعتمد المحرك حصرياً على الصفحات والمستندات الرسمية الصادرة من الهيئات السويدية المعنية (.se).
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2 shadow-xs">
                  <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl w-fit border border-emerald-200">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-[#1a2b3c]">
                    نتائج هيكلية قابلة للتنفيذ
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    تلقى خلاصة ممتلئة بالخطوات السريعة وقوائم الوثائق المطلوبة ورقم مرجع رسمي للطباعة والحفظ.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2 shadow-xs">
                  <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl w-fit border border-amber-200">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-[#1a2b3c]">
                    حماية البيانات والخصوصية
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    تشفير آلي للرقم الشخصي (Personnummer) والتزام صارم بعدم استخدام البيانات لأغراض تدريبية.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: CATEGORIES */}
        {currentTab === 'categories' && (
          <CategoriesView
            onSelectCategoryForAsk={(categoryCode) => {
              setCurrentTab('home');
              window.scrollTo({ top: 150, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab 3: MY QUESTIONS */}
        {currentTab === 'my_questions' && (
          <MyQuestionsView
            questions={savedQuestions}
            onSelectQuestion={(q) => {
              setActiveQuestion(q);
              setCurrentTab('home');
            }}
            onToggleFavorite={handleToggleFavorite}
            onDeleteQuestion={handleDeleteQuestion}
            onClearAll={handleClearAllData}
            onOpenPdfModalForAnswer={(q) => {
              if (q.answerResult) {
                setActivePdfModalAnswer({
                  answer: q.answerResult,
                  questionText: q.questionText
                });
              }
            }}
          />
        )}

        {/* Tab 4: QA MATRIX (50 Questions) */}
        {currentTab === 'qa_matrix' && (
          <QAMatrixView
            onTestQuestionClick={(qText, catCode) => {
              setCurrentTab('home');
              handleQuerySubmit({
                questionText: qText,
                selectedCategoryCode: catCode
              });
            }}
          />
        )}

        {/* Tab 5: DOCUMENTATION */}
        {currentTab === 'docs' && <DocumentationView />}

        {/* Tab 6: ADMIN */}
        {currentTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentTab} />

      {/* Processing Pipeline Progress Modal */}
      {isProcessing && (
        <ProcessingModal
          stages={pipelineStages}
          errorMessage={pipelineError}
        />
      )}

      {/* Sensitive Data Warning Modal */}
      {sensitiveTypes && (
        <SensitiveDataWarningModal
          typesDetected={sensitiveTypes}
          redactedText={sensitiveRedactedText}
          onConfirm={() => {
            setSensitiveTypes(null);
            if (pendingProceedCallback) pendingProceedCallback();
          }}
          onCancel={() => {
            setSensitiveTypes(null);
            setPendingProceedCallback(null);
          }}
        />
      )}

      {/* Export PDF Modal */}
      {activePdfModalAnswer && (
        <ExportPdfModal
          answer={activePdfModalAnswer.answer}
          questionText={activePdfModalAnswer.questionText}
          onClose={() => setActivePdfModalAnswer(null)}
        />
      )}

      {/* Export Email Modal */}
      {activeEmailModalAnswer && (
        <ExportEmailModal
          answer={activeEmailModalAnswer.answer}
          questionText={activeEmailModalAnswer.questionText}
          onClose={() => setActiveEmailModalAnswer(null)}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 text-[#1a2b3c] shadow-2xl space-y-4 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-10 h-10 bg-blue-50 text-[#006aa7] rounded-2xl flex items-center justify-center mx-auto mb-2 border border-blue-200 shadow-2xs">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#1a2b3c]">تسجيل الدخول للدليل</h3>
              <p className="text-xs text-slate-500 font-bold">RAED SHIHAB — Arab Sweden Since 2007</p>
            </div>

            <form onSubmit={handleLoginEmailSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">البريد الإلكتروني:</label>
                <input
                  type="email"
                  value={authEmailInput}
                  onChange={(e) => setAuthEmailInput(e.target.value)}
                  placeholder="admin@swedenguide.se أو بريدك"
                  className="w-full bg-[#fcfcfc] border border-slate-300 rounded-xl px-3 py-2 text-[#1a2b3c] focus:outline-none focus:border-[#006aa7] font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#006aa7] hover:bg-[#005587] text-white font-bold rounded-xl shadow-xs transition-colors border border-blue-800"
              >
                دخول تجريبي (Demo Sign In)
              </button>
            </form>

            <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
              <button
                onClick={handleLoginGoogleClick}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>🌐 دخول بواسطة Google (Demo)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
