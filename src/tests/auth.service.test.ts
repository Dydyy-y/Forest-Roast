import { describe, test, expect, beforeAll, beforeEach, vi } from 'vitest';
import { isAuthenticated } from '../services/auth.service';

beforeAll(() => {
  const store: Record<string, string> = {};
  global.localStorage = {
    clear: vi.fn(() => {
      for (const k in store) delete store[k];
    }),
    getItem: vi.fn((key: string) => (key in store ? store[key] : null)),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  } as unknown as Storage;
});

beforeEach(() => {
  localStorage.clear();
});

describe('isAuthenticated', () => {
  test('returns false when no token present', () => {
    expect(isAuthenticated()).toBe(false);
  });

  test('returns true when token exists', () => {
    localStorage.setItem('token', 'abc');
    expect(isAuthenticated()).toBe(true);
  });
});