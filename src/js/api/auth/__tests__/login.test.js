import { login } from '../../auth/login.js';
import { logout } from '../../auth/logout.js';
import * as storage from '../../../storage/index.js';

jest.mock('../../../storage/index.js', () => ({
  save: jest.fn(),
  load: jest.fn(),
  remove: jest.fn(),
}));

describe('auth tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('Throws an error when provided with invalid credentials', async () => {
   
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false, statusText: 'Unauthorized' }),
    );

    await expect(login('wrong@example.com', 'wrongpassword')).rejects.toThrow(
      'Unauthorized',
    );

    expect(storage.save).not.toHaveBeenCalledWith('token', expect.any(String));

  });

  it('Succsessfully stores a token when provided with valid credentials', async () => {
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

    storage.load.mockReturnValueOnce('mockToken123');

    const token = storage.load('token');
    expect(token).toBe('mockToken123');

  });

  it('Throws an error when the fetch call fails', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network Error')),
    );

    await expect(login('user@example.com', 'password123')).rejects.toThrow(
      'Network Error',
    );

    expect(storage.save).not.toHaveBeenCalledWith('token', expect.any(String));

  });

  it('Succsessfully clears the user token from storage when logging out', () => {

    storage.load.mockReturnValueOnce('mockToken123'); 

    let token = storage.load('token');
    expect(token).toBe('mockToken123');

    logout();

    expect(storage.remove).toHaveBeenCalledWith('token');

    storage.load.mockReturnValueOnce(null);

    token = storage.load('token');
    expect(token).toBeNull();

  });

});
