/**
 * @license
 * Sweden Life Guide - Type Definitions
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

export type AppLanguage = 'ar' | 'sv' | 'en';

export type UserRole = 'admin' | 'editor' | 'reviewer' | 'support' | 'user';

export interface User {
  id: string;
  email: string;
  displayName: string;
  preferredLanguage: AppLanguage;
  role: UserRole;
  createdAt: string;
}

export type QuestionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'needs_review' | 'grounded' | 'unverified';

export interface Attachment {
  id: string;
  questionId?: string;
  type: 'audio' | 'image' | 'pdf' | 'docx';
  mimeType: string;
  originalName: string;
  extractedText?: string;
  sizeBytes: number;
  createdAt: string;
}

export interface OfficialSource {
  id: string;
  authorityName: string;
  title: string;
  url: string;
  domain: string;
  categoryIds: string[];
  language?: AppLanguage | 'other';
  fetchedAt: string;
  lastReviewedAt?: string;
  publishedOrUpdatedAt?: string;
  contentHash?: string;
  status: 'active' | 'stale' | 'blocked' | 'needs_review' | 'inactive';
}

export interface AnswerResult {
  questionId: string;
  language: AppLanguage;
  normalizedQuestion: string;
  primaryCategory: {
    id: string;
    label: string;
  };
  relatedCategories: Array<{
    id: string;
    label: string;
  }>;
  summary: string;
  assumptions: string[];
  followUpQuestions: string[];
  applicableToUser: string[];
  actionSteps: Array<{
    order: number;
    title: string;
    description: string;
    authority?: string;
  }>;
  requiredDocuments: Array<{
    name: string;
    required: boolean;
    note?: string;
  }>;
  responsibleAuthorities: string[];
  sources: Array<{
    sourceId: string;
    authorityName: string;
    title: string;
    url: string;
    reviewedAt: string;
    supports?: string[];
  }>;
  confidence: 'high' | 'medium' | 'needs_review';
  confidenceReason: string;
  warnings: string[];
  disclaimer: string;
  createdAt: string;
}

export interface QuestionRecord {
  id: string;
  userId?: string;
  questionText: string;
  originalText?: string;
  normalizedText?: string;
  redactedQuestionText?: string;
  categoryCode: string;
  categoryIds?: string[];
  language: AppLanguage;
  attachments?: Attachment[];
  answerResult?: AnswerResult;
  answer?: AnswerResult;
  status: QuestionStatus;
  isFavorite: boolean;
  createdAt: string;
}

export interface CategoryInfo {
  id: string;
  code: string;
  title: Record<AppLanguage, string>;
  description: Record<AppLanguage, string>;
  iconName: string;
  icon?: string;
  authorities: string[];
  sampleQuestions: Array<Record<AppLanguage, string>>;
  sampleQuestionsAr: string[];
  faqs: Array<{
    q: Record<AppLanguage, string>;
    a: Record<AppLanguage, string>;
  }>;
}

export type CategoryDefinition = CategoryInfo;

export interface QAQuestionItem {
  id: number;
  questionAr: string;
  categoryCode: string;
  expectedAuthority: string;
  expectedSourceDomain: string;
  testStatus: 'pass' | 'fail' | 'pending';
  notes?: string;
}

export interface AnalyticsEvent {
  id: string;
  eventName: string;
  categoryId?: string;
  language: AppLanguage;
  success: boolean;
  durationBucket: '0-2s' | '2-5s' | '5-10s' | '10s+';
  createdAt: string;
}
