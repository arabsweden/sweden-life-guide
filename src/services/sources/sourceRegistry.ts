/**
 * Sweden Life Guide - Source Registry Service
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import { OfficialSource } from '../../types';
import { OFFICIAL_SOURCES_REGISTRY, isAllowedOfficialDomain } from '../../data/sources';

export function getOfficialSourcesByCategory(categoryId: string): OfficialSource[] {
  return OFFICIAL_SOURCES_REGISTRY.filter(
    src => src.categoryIds.includes(categoryId) && src.status === 'active'
  );
}

export function validateAndFormatSources(sources: OfficialSource[]): OfficialSource[] {
  return sources.filter(s => isAllowedOfficialDomain(s.url));
}

export function searchSourcesByQuery(query: string): OfficialSource[] {
  const q = query.toLowerCase();
  return OFFICIAL_SOURCES_REGISTRY.filter(src => {
    return (
      src.title.toLowerCase().includes(q) ||
      src.authorityName.toLowerCase().includes(q) ||
      src.domain.toLowerCase().includes(q)
    );
  });
}
