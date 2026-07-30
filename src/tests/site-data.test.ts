import { describe, it, expect } from 'vitest';
import type { LocalizedText } from '../data/types';
import { getLocalizedValue } from '../i18n/config';

describe('site data utilities', () => {
  it('correctly retrieves localized values', () => {
    const text: LocalizedText = { en: 'Hello', ar: 'مرحباً' };
    expect(getLocalizedValue(text, 'en')).toBe('Hello');
    expect(getLocalizedValue(text, 'ar')).toBe('مرحباً');
  });

  it('defaults to English when Arabic is missing', () => {
    const text: LocalizedText = { en: 'Hello' };
    expect(getLocalizedValue(text, 'ar')).toBe('Hello');
  });
});
