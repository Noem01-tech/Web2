const API_URL = "http://localhost:3000";

class AuthError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

//Auth

export const login = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/students/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new AuthError(data.message || "Erreur de connexion", res.status);
  }

  return data;
};

//Gestion du token en local

const TOKEN_KEY = "auth_token";

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
export const isAuthenticated = () => !!getToken();

// Decode le payload du JWT sans verifier la signature
// Utile seulement pour affichage cote UI ex: cacher un bouton
// la vraie securite reste geree par le backend, qui revalide le token a chaque requete.
export const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

//Wrapper fetch qui ajoute automatiquement le token

export const authFetch = async (path, options = {}) => {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401 || res.status === 403) {
    clearToken();
  }

  return res;
};

//CRUD Students

const handleJson = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new AuthError(data.message || "Erreur serveur", res.status);
  }
  return data;
};

export const getStudents = async () => {
  const res = await authFetch("/students");
  return handleJson(res);
};

export const getStudentById = async (id) => {
  const res = await authFetch(`/students/${id}`);
  return handleJson(res);
};

export const createStudent = async (payload) => {
  const res = await authFetch("/students", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleJson(res);
};

export const createUser = async ({ email, password, role }) => {
  const res = await authFetch("/students/user", {
    method: "POST",
    body: JSON.stringify({ email, password, role }),
  });
  return handleJson(res);
};

export const updateStudent = async (id, payload) => {
  const res = await authFetch(`/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return handleJson(res);
};

export const deleteStudent = async (id) => {
  const res = await authFetch(`/students/${id}`, {
    method: "DELETE",
  });
  return handleJson(res);
};