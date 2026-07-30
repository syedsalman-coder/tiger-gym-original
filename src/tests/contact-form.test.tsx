import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '@/components/contact/ContactForm';

// Mock the dictionary
vi.mock('@/i18n/dictionaries', () => ({
  getDictionary: () => ({
    contactForm: {
      name: 'Name',
      phone: 'Phone',
      message: 'Message',
      submit: 'Submit',
      note: 'Note',
      errors: {
        name: 'Name is required',
        phone: 'Phone is required',
        message: 'Message is required',
        phoneFormat: 'Phone must be between 7 and 15 digits',
      },
      template: {
        greeting: 'New message',
        name: 'From',
        phone: 'Phone',
        message: 'Message',
      },
      opened: 'WhatsApp opened',
      blocked: 'WhatsApp blocked',
      openWhatsapp: 'Open WhatsApp',
    },
  }),
}));

// Mock the site data
vi.mock('@/data/site', () => ({
  site: {
    whatsappNumber: '96569678350',
    whatsappHref: 'https://wa.me/96569678350',
  },
}));

// Mock window.open
const mockOpen = vi.fn();
Object.assign(window, { open: mockOpen });

describe('ContactForm', () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  it('validates required fields', async () => {
    render(<ContactForm locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeDefined();
      expect(screen.getByText('Phone is required')).toBeDefined();
      expect(screen.getByText('Message is required')).toBeDefined();
    });
    expect(mockOpen).not.toHaveBeenCalled();
  });
});
