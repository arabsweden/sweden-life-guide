/**
 * Sweden Life Guide - Official Source Registry
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import { OfficialSource } from '../types';

export const ALLOWED_OFFICIAL_DOMAINS = [
  'migrationsverket.se',
  'skatteverket.se',
  'forsakringskassan.se',
  'arbetsformedlingen.se',
  'socialstyrelsen.se',
  '1177.se',
  'csn.se',
  'skolverket.se',
  'transportstyrelsen.se',
  'bolagsverket.se',
  'verksamt.se',
  'imy.se',
  'polisen.se',
  'uhr.se',
  'pensionsmyndigheten.se',
  'trafikverket.se'
];

export const OFFICIAL_SOURCES_REGISTRY: OfficialSource[] = [
  {
    id: 'src_mv_perm',
    authorityName: 'Migrationsverket (دائرة الهجرة السويدية)',
    title: 'تأشيرات وإقامات العمل والتمديد والإقامة الدائمة',
    url: 'https://www.migrationsverket.se/Privatpersoner/Arbeta-i-Sverige/Forlanga-tillstand.html',
    domain: 'migrationsverket.se',
    categoryIds: ['cat_migration', 'cat_work'],
    language: 'sv',
    fetchedAt: '2026-07-01T10:00:00Z',
    lastReviewedAt: '2026-07-15T12:00:00Z',
    status: 'active'
  },
  {
    id: 'src_mv_reunification',
    authorityName: 'Migrationsverket',
    title: 'شروط الإعالة والسكن للم شمل الأسرة في السويد',
    url: 'https://www.migrationsverket.se/Privatpersoner/Flytta-till-nagon-i-Sverige/Forsorjningskrav.html',
    domain: 'migrationsverket.se',
    categoryIds: ['cat_family'],
    language: 'sv',
    fetchedAt: '2026-07-05T09:00:00Z',
    lastReviewedAt: '2026-07-18T14:00:00Z',
    status: 'active'
  },
  {
    id: 'src_mv_citizenship',
    authorityName: 'Migrationsverket',
    title: 'شروط التقديم على الجنسية السويدية والمدة القانونية',
    url: 'https://www.migrationsverket.se/Privatpersoner/Bli-svensk-medborgare.html',
    domain: 'migrationsverket.se',
    categoryIds: ['cat_citizenship'],
    language: 'sv',
    fetchedAt: '2026-07-02T11:00:00Z',
    lastReviewedAt: '2026-07-10T10:00:00Z',
    status: 'active'
  },
  {
    id: 'src_skat_personnummer',
    authorityName: 'Skatteverket (مصلحة الضرائب السويدية)',
    title: 'التسجيل في السجل السكاني والحصول على الرقم الشخصي Personnummer',
    url: 'https://www.skatteverket.se/privat/folkbokforing/flyttatillsverige.4.18e1b10334ebe8bc8000411.html',
    domain: 'skatteverket.se',
    categoryIds: ['cat_taxes'],
    language: 'sv',
    fetchedAt: '2026-07-01T08:00:00Z',
    lastReviewedAt: '2026-07-12T16:00:00Z',
    status: 'active'
  },
  {
    id: 'src_fk_parental',
    authorityName: 'Försäkringskassan (صندوق التأمينات العامة)',
    title: 'تعويضات ودليل إجازة الوالدين Föräldrapenning',
    url: 'https://www.forsakringskassan.se/privatperson/foralder/foraldrapenning',
    domain: 'forsakringskassan.se',
    categoryIds: ['cat_insurance'],
    language: 'sv',
    fetchedAt: '2026-06-28T12:00:00Z',
    lastReviewedAt: '2026-07-14T11:00:00Z',
    status: 'active'
  },
  {
    id: 'src_af_unemployment',
    authorityName: 'Arbetsförmedlingen (مكتب العمل السويدي)',
    title: 'التسجيل كباحث عن عمل وحقوق صندوق البطالة A-kassa',
    url: 'https://arbetsformedlingen.se/for-arbetssökande/stod-och-ersattning/a-kassa',
    domain: 'arbetsformedlingen.se',
    categoryIds: ['cat_work'],
    language: 'sv',
    fetchedAt: '2026-07-03T10:00:00Z',
    lastReviewedAt: '2026-07-16T15:00:00Z',
    status: 'active'
  },
  {
    id: 'src_uhr_eval',
    authorityName: 'UHR (المجلس السويدي للتعليم العالي)',
    title: 'تقييم ومعادلة المؤهلات والشهادات الدراسية الأجنبية',
    url: 'https://www.uhr.se/bedomning-av-utlandsk-utbildning/',
    domain: 'uhr.se',
    categoryIds: ['cat_education'],
    language: 'sv',
    fetchedAt: '2026-06-25T14:00:00Z',
    lastReviewedAt: '2026-07-08T09:00:00Z',
    status: 'active'
  },
  {
    id: 'src_ts_license',
    authorityName: 'Transportstyrelsen (هيئة النقل السويدية)',
    title: 'قواعد وقوانين استخدام واستبدال رخص القيادة الأجنبية',
    url: 'https://www.transportstyrelsen.se/sv/vagtrafik/Korkort/utlandska-korkort/',
    domain: 'transportstyrelsen.se',
    categoryIds: ['cat_transport'],
    language: 'sv',
    fetchedAt: '2026-07-04T13:00:00Z',
    lastReviewedAt: '2026-07-19T08:00:00Z',
    status: 'active'
  },
  {
    id: 'src_verksamt_biz',
    authorityName: 'Verksamt.se & Bolagsverket',
    title: 'خطوات دليل تأسيس شركة فردية Enskild firma وطلب F-skatt',
    url: 'https://www.verksamt.se/starta/enskild-naringsverksamhet',
    domain: 'verksamt.se',
    categoryIds: ['cat_business'],
    language: 'sv',
    fetchedAt: '2026-07-01T15:00:00Z',
    lastReviewedAt: '2026-07-17T11:00:00Z',
    status: 'active'
  },
  {
    id: 'src_1177_health',
    authorityName: '1177 Vårdguiden (الدليل الصحي السويدي)',
    title: 'الحصول على الرعاية الصحية والحجز والتواصل مع المراكز الصحية',
    url: 'https://www.1177.se/sa-fungerar-varden/',
    domain: '1177.se',
    categoryIds: ['cat_health'],
    language: 'sv',
    fetchedAt: '2026-06-30T09:00:00Z',
    lastReviewedAt: '2026-07-11T13:00:00Z',
    status: 'active'
  }
];

export function isAllowedOfficialDomain(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return ALLOWED_OFFICIAL_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}
