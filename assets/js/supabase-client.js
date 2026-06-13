/**
 * Study Tools Supabase adapter (Round 17.3).
 *
 * This layer is inert unless a complete config explicitly enables it and the
 * Supabase browser SDK is already available. It never stores credentials.
 */
(function () {
  "use strict";

  var client = null;
  var initError = null;

  function getConfig() {
    var source = window.STUDY_TOOLS_SUPABASE_CONFIG || {};
    var auth = source.auth || {};
    return {
      enabled: source.enabled === true,
      url: typeof source.url === "string" ? source.url.trim() : "",
      anonKey: typeof source.anonKey === "string" ? source.anonKey.trim() : "",
      auth: {
        persistSession: auth.persistSession !== false,
        autoRefreshToken: auth.autoRefreshToken !== false,
        detectSessionInUrl: auth.detectSessionInUrl !== false
      }
    };
  }

  function isConfigured() {
    var config = getConfig();
    return Boolean(config.url && config.anonKey);
  }

  function isEnabled() {
    return getConfig().enabled === true;
  }

  function getSdkFactory() {
    if (window.supabase && typeof window.supabase.createClient === "function") {
      return window.supabase.createClient;
    }
    return null;
  }

  function getStatus() {
    if (!isConfigured()) {
      return { code: "not_configured", ready: false, message: "Supabase is not configured." };
    }
    if (!isEnabled()) {
      return { code: "disabled", ready: false, message: "Supabase is disabled." };
    }
    if (!getSdkFactory()) {
      return { code: "sdk_not_loaded", ready: false, message: "Supabase SDK is not loaded." };
    }
    if (initError) {
      return { code: "initialization_error", ready: false, message: initError.message || "Supabase initialization failed." };
    }
    return { code: client ? "ready" : "ready_to_initialize", ready: Boolean(client), message: client ? "Supabase client is ready." : "Supabase client can be initialized." };
  }

  function initClient() {
    if (client) return client;
    if (!isConfigured() || !isEnabled()) return null;

    var createClient = getSdkFactory();
    if (!createClient) return null;

    try {
      var config = getConfig();
      client = createClient(config.url, config.anonKey, { auth: config.auth });
      initError = null;
      return client;
    } catch (error) {
      initError = error;
      client = null;
      return null;
    }
  }

  function getClient() {
    return client;
  }

  function localError(code, message) {
    return { name: "StudySupabaseError", code: code, message: message };
  }

  function unavailableError() {
    var status = getStatus();
    return localError(status.code, status.message);
  }

  async function getCurrentSession() {
    var activeClient = client || initClient();
    if (!activeClient || !activeClient.auth || typeof activeClient.auth.getSession !== "function") {
      return null;
    }
    var result = await activeClient.auth.getSession();
    return result && result.data ? result.data.session || null : null;
  }

  async function getCurrentUser() {
    var activeClient = client || initClient();
    if (!activeClient || !activeClient.auth || typeof activeClient.auth.getUser !== "function") {
      return null;
    }
    var result = await activeClient.auth.getUser();
    return result && result.data ? result.data.user || null : null;
  }

  async function signInWithEmail(email, password) {
    var activeClient = client || initClient();
    if (!activeClient || !activeClient.auth || typeof activeClient.auth.signInWithPassword !== "function") {
      return {
        data: { user: null, session: null },
        error: unavailableError()
      };
    }
    return activeClient.auth.signInWithPassword({ email: email, password: password });
  }

  async function signOut() {
    var activeClient = client || initClient();
    if (!activeClient || !activeClient.auth || typeof activeClient.auth.signOut !== "function") {
      return { error: unavailableError() };
    }
    return activeClient.auth.signOut();
  }

  function onAuthStateChange(callback) {
    var activeClient = client || initClient();
    if (!activeClient || !activeClient.auth || typeof activeClient.auth.onAuthStateChange !== "function") {
      return {
        data: {
          subscription: {
            unsubscribe: function () {}
          }
        },
        error: unavailableError()
      };
    }
    return activeClient.auth.onAuthStateChange(callback);
  }

  window.StudySupabase = {
    getConfig: getConfig,
    isConfigured: isConfigured,
    isEnabled: isEnabled,
    getStatus: getStatus,
    initClient: initClient,
    getClient: getClient,
    getCurrentSession: getCurrentSession,
    getCurrentUser: getCurrentUser,
    signInWithEmail: signInWithEmail,
    signOut: signOut,
    onAuthStateChange: onAuthStateChange
  };
})();
