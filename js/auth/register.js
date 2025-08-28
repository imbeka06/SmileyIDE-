let db;
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('smileyide_users', 1);
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            db.createObjectStore('users', { keyPath: 'username' });
        };
        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };
        request.onerror = (event) => reject(event.target.error);
    });
}

async function register() {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');
    if (username && password) {
        try {
            db = await initDB();
            const tx = db.transaction('users', 'readwrite');
            const store = tx.objectStore('users');
            store.put({ username, password });
            alert('Registered! Please login.');
        } catch (err) {
            alert('Registration failed: ' + err.message);
        }
    }
}