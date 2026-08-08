import { describe, it, expect } from 'vitest';
import type { LocalizedText } from '../data/types';
import { getLocalizedValue } from '../i18n/config';
import { createLocalBusinessJsonLd, siteUrl } from '../i18n/metadata';

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

  it('uses the deployed Vercel project as the canonical fallback', () => {
    expect(siteUrl).toBe('https://tiger-gym-original.vercel.app');
  });

  it('publishes machine-readable gym hours and real facility images', () => {
    const schema = createLocalBusinessJsonLd('en');

    expect(schema.openingHoursSpecification).toHaveLength(2);
    expect(schema.openingHoursSpecification[0]).toMatchObject({
      opens: '05:00',
      closes: '02:00',
    });
    expect(schema.image[0]).toContain('/images/tiger-gym-interior.webp');
    expect(schema.address.addressCountry).toBe('KW');
  });
});
