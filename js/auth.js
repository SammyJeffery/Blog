/* ---------------------------------------------------------------
   Auth — a single-author login, stored in localStorage.
   This is a frontend demo pattern, not real security: the password
   sits in plain text in the browser's storage. For a real deployment,
   swap these functions for calls to a real auth backend (Firebase
   Auth, Supabase, or a small custom API) — the rest of the site
   doesn't need to change.
   --------------------------------------------------------------- */
const Auth = (() => {
  const ACCOUNT_KEY = 'ss:account';
  const SESSION_KEY = 'ss:session';

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function seedIfEmpty() {
    if (read(ACCOUNT_KEY, null)) return;
    write(ACCOUNT_KEY, {
      name: 'Michael Asubiojo',
      email: 'michael@silentstorm.com',
      password: 'silentstorm123'
    });
  }

  return {
    init() { seedIfEmpty(); },

    getAccount() { return read(ACCOUNT_KEY, null); },

    // Creates (or replaces) the one author account and logs them in.
    signup(name, email, password) {
      write(ACCOUNT_KEY, { name: name.trim(), email: email.trim().toLowerCase(), password });
      sessionStorage.setItem(SESSION_KEY, '1');
    },

    login(email, password) {
      const acc = this.getAccount();
      if (acc && acc.email === email.trim().toLowerCase() && acc.password === password) {
        sessionStorage.setItem(SESSION_KEY, '1');
        return true;
      }
      return false;
    },

    logout() { sessionStorage.removeItem(SESSION_KEY); },

    isLoggedIn() { return sessionStorage.getItem(SESSION_KEY) === '1'; }
  };
})();
Auth.init();
