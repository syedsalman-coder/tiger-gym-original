import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Navigation from '@/components/layout/Navigation';

// Mock the next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock the dependencies
vi.mock('@/data/site', () => ({
  navigation: [{ label: { en: 'Home' }, href: '/' }],
  site: { name: { en: 'Tiger Gym' }, descriptor: { en: 'Gym' } },
}));

vi.mock('@/i18n/config', () => ({
  localizePath: (locale: string, path: string) => `/${locale}${path}`,
  getLocalizedValue: (val: {en: string}) => val.en,
  switchLocalePath: (pathname: string) => pathname,
}));

vi.mock('@/i18n/dictionaries', () => ({
  getDictionary: () => ({
    accessibility: { home: 'Home', primaryNavigation: 'Nav' },
    common: { joinNow: 'Join' },
  }),
}));

vi.mock('@/components/layout/LanguageSwitcher', () => ({
  default: () => <div>Switcher</div>,
}));

vi.mock('@/components/layout/MobileMenu', () => ({
  default: () => <div>Menu</div>,
}));

vi.mock('@/components/shared/Logo', () => ({
  default: () => <div>Logo</div>,
}));

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation locale="en" />);
    const nav = screen.getByRole('navigation', { name: /Nav/i });
    expect(within(nav).getByRole('link', { name: /home/i })).toBeDefined();
  });
});
