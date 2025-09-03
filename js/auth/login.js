let db;
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('smileyide_users', 1);
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            console.log('DB opened');
            db.createObjectStore('users', { keyPath: 'username' });
        };
        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };
        request.onerror = (event) => reject(event.target.error);
    });
}

async function login(username, password) {
    try {
        db = await initDB();
        const tx = db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const request = store.get(username);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const user = request.result;
                if (user && user.password === password) {
                    sessionStorage.setItem('userId', username);
                    window.location.href = 'index.html';
                    resolve();
                } else {
                    document.getElementById('error').innerText = 'Invalid credentials';
                    reject('Invalid credentials');
                }
            };
            request.onerror = () => reject('DB error');
        });
    } catch (err) {
        document.getElementById('error').innerText = err.message;
    }
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});