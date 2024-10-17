import { login } from '../../auth/login.js';
import * as storage from '../../../storage/index.js';

jest.mock('../../../storage/index.js', () => ({
  save: jest.fn(),
  load: jest.fn(),
}));

describe('login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('stores a token when provided with valid credentials', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ accessToken: 'mockToken123', name: 'User' }),
      }),
    );

    const profile = await login('user@example.com', 'password123');

    expect(storage.save).toHaveBeenCalledWith('token', 'mockToken123');
    expect(storage.save).toHaveBeenCalledWith('profile', { name: 'User' });
    expect(profile).toEqual({ name: 'User' });
  });

  it('throws an error when provided with invalid credentials', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false, statusText: 'Unauthorized' }),
    );

    await expect(login('wrong@example.com', 'wrongpassword')).rejects.toThrow(
      'Unauthorized',
    );
  });

  it('throws an error when the fetch call fails', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network Error')),
    );

    await expect(login('user@example.com', 'password123')).rejects.toThrow(
      'Network Error',
    );
  });
});
