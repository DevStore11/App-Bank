const API_URL = 'http://localhost:3000/api';

// --- Gerenciamento de Autenticação ---
const Auth = {
    saveToken: (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },
    getToken: () => localStorage.getItem('token'),
    getUser: () => JSON.parse(localStorage.getItem('user')),
    clear: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    isAuthenticated: () => !!localStorage.getItem('token'),
    logout: () => {
        Auth.clear();
        window.location.href = 'index.html';
    }
};

// --- Headers Padrão (inclui o token se existir) ---
const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json'
    };
    const token = Auth.getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

// --- Funções da API ---
const API = {
    // Autenticação
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }

            Auth.saveToken(data.token, data.user);
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao registrar');
            }

            return data;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    },

    // Contas
    getAccounts: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/accounts/${userId}/accounts`, {
                method: 'GET',
                headers: getHeaders()
            });

            if (response.status === 401 || response.status === 403) {
                Auth.logout();
                throw new Error('Sessão expirada');
            }

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Transações
    transfer: async (transferData) => {
        try {
            const response = await fetch(`${API_URL}/transactions/transfer`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(transferData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    }
};