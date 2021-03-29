/**
 * Copy pasted types and defaults
 * TODO import these from background-js project
 */

import { useState } from 'react';
import { TopicsResponse } from './Types';

export interface RandomFilterConfig {
  featured: boolean;
  query?: string;
  orientation?: 'landscape' | 'portrait';
}

export interface TopicFilterConfig {
  topic?: string;
  orientation?: 'landscape' | 'portrait';
}

export type FiltersI =
  | { type: 'search'; params: RandomFilterConfig }
  | { type: 'topics'; params: TopicFilterConfig };

declare global {
  interface Window {
    CNT_getBackgroundFilter: () => FiltersI;
    CNT_setBackgroundFilter: (filter: FiltersI) => Promise<void>;
    CNT_resetBackgroundFilter: () => void;

    CNT_getTopics: () => Promise<any>;
  }
}

const defaultFiltersTopic = {
  type: 'topics',
  params: {
    orientation: 'landscape'
  }
} as const;

const defaultFiltersSearch = {
  type: 'search',
  params: {
    featured: true,
    query: undefined,
    orientation: 'landscape'
  }
} as const;

/**
 * Custom code for sports-new-tab-react project
 */

export function checkIfCNTEnabled() {
  if (
    !window.CNT_getBackgroundFilter ||
    !window.CNT_setBackgroundFilter ||
    !window.CNT_getTopics
  ) {
    throw new Error('CNT not initalized');
  }
}

export function setSearchFilters(config: RandomFilterConfig) {
  window.CNT_setBackgroundFilter({ type: 'search', params: config });
}

export function setTopicFilters(config: TopicFilterConfig) {
  window.CNT_setBackgroundFilter({ type: 'topics', params: config });
}

export function getSearchFilters(): RandomFilterConfig {
  const filters = window.CNT_getBackgroundFilter();
  if (filters.type === 'search') return filters.params;

  return defaultFiltersSearch.params;
}

export function getTopicsFilters(): TopicFilterConfig {
  const filters = window.CNT_getBackgroundFilter();
  if (filters.type === 'topics') return filters.params;

  return defaultFiltersTopic.params;
}

export function updateSearchFilters(config: RandomFilterConfig) {
  const curr = getSearchFilters();
  window.CNT_setBackgroundFilter({
    type: 'search',
    params: { ...curr, ...config }
  });
}

export type UpdateFilterI = (config: TopicFilterConfig) => void;

export function useTopicFilterUpdate() {
  const [, _tick] = useState(0);
  const tick = () => _tick(t => t + 1);

  const update: UpdateFilterI = config => {
    const curr = getTopicsFilters();

    window.CNT_setBackgroundFilter({
      type: 'topics',
      params: { ...curr, ...config }
    });

    tick();
  };

  return [update] as const;
}

export function getTopics(): Promise<TopicsResponse> {
  return window.CNT_getTopics();
}
