// Login functionality

function loginUser(email, password, remember) {
    // In a real implementation, this would validate against a backend
    // For demo purposes, we'll accept any non-empty credentials
    
    if (email && password) {
        const user = {
            email: email,
            name: email.split('@')[0],
            remember: remember
        };
        
        setCurrentUser(user);
        return true;
    }
    
    return false;
}

// Make function available globally
window.loginUser = loginUser;