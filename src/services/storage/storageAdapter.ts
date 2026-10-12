/**
 * Sweden Life Guide - Storage Adapter
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import { QuestionRecord } from '../../types';
import { DEMO_PRELOADED_QUESTIONS } from '../../data/demoData';

const QUESTIONS_STORAGE_KEY = 'sweden_guide_questions_v1';

export function getSavedQuestions(): QuestionRecord[] {
  try {
    const raw = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}

  // Initialize with realistic preloaded demo questions
  saveQuestionsToStorage(DEMO_PRELOADED_QUESTIONS);
  return DEMO_PRELOADED_QUESTIONS;
}

export function saveQuestionsToStorage(questions: QuestionRecord[]): void {
  try {
    localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  } catch {}
}

export function saveQuestionRecord(record: QuestionRecord): QuestionRecord[] {
  const current = getSavedQuestions();
  const existingIndex = current.findIndex(q => q.id === record.id);
  
  if (existingIndex >= 0) {
    current[existingIndex] = record;
  } else {
    current.unshift(record);
  }

  saveQuestionsToStorage(current);
  return current;
}

export function toggleFavoriteQuestion(questionId: string): QuestionRecord[] {
  const current = getSavedQuestions();
  const item = current.find(q => q.id === questionId);
  if (item) {
    item.isFavorite = !item.isFavorite;
    saveQuestionsToStorage(current);
  }
  return [...current];
}

export function deleteQuestionRecord(questionId: string): QuestionRecord[] {
  const current = getSavedQuestions();
  const updated = current.filter(q => q.id !== questionId);
  saveQuestionsToStorage(updated);
  return updated;
}

export function clearAllQuestionData(): void {
  localStorage.removeItem(QUESTIONS_STORAGE_KEY);
}
