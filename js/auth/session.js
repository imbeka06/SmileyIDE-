function checkSession() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        window.location.href = 'login.html';
    }
    return userId;
}
function logout() {
    sessionStorage.removeItem('userId');
    window.location.href = 'login.html';
}