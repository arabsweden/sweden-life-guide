/**
 * Sweden Life Guide - Anonymous Analytics Adapter
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import { AnalyticsEvent } from '../../types';

const ANALYTICS_STORAGE_KEY = 'sweden_guide_analytics_logs';

export function trackAnonymousEvent(
  eventName: string,
  categoryId?: string,
  language: 'ar' | 'sv' | 'en' = 'ar',
  success: boolean = true,
  durationBucket: '0-2s' | '2-5s' | '5-10s' | '10s+' = '2-5s'
): void {
  const event: AnalyticsEvent = {
    id: 'evt_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    eventName,
    categoryId,
    language,
    success,
    durationBucket,
    createdAt: new Date().toISOString()
  };

  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    const list: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    list.unshift(event);
    // Keep last 100 anonymous events
    if (list.length > 100) list.length = 100;
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(list));
  } catch {}
}

export function getAnonymousAnalyticsLogs(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
