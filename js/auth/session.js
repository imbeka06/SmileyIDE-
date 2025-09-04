// Session management functions

function isLoggedIn() {
    return localStorage.getItem('smileyide_user') !== null;
}

function getCurrentUser() {
    const userData = localStorage.getItem('smileyide_user');
    return userData ? JSON.parse(userData) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('smileyide_user', JSON.stringify(user));
}

function logout() {
    localStorage.removeItem('smileyide_user');
    window.location.href = 'login.html';
}

// Check session on page load
function checkSession() {
    if (!isLoggedIn() && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'login.html';
    } else if (isLoggedIn() && window.location.pathname.endsWith('login.html')) {
        window.location.href = 'languages.html';
    }
}

// Make functions available globally
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.setCurrentUser = setCurrentUser;
window.logout = logout;
window.checkSession = checkSession;