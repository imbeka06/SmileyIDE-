// Registration functionality

function registerUser(email, password) {
    // In a real implementation, this would create a new user account
    // For demo purposes, we'll just check if the user already exists
    
    if (localStorage.getItem('smileyide_user')) {
        return false;
    }
    
    const user = {
        email: email,
        name: email.split('@')[0],
        remember: false
    };
    
    setCurrentUser(user);
    return true;
}

// Make function available globally
window.registerUser = registerUser;