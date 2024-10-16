import fetch from 'node-fetch';
import { jest } from '@jest/globals';

global.fetch = fetch;

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});


