async function initProjectDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('smileyide_projects', 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('projects', { keyPath: 'id' });
        };
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

async function loadUserProjects(userId) {
    const db = await initProjectDB();
    const tx = db.transaction('projects', 'readonly');
    const store = tx.objectStore('projects');
    const request = store.getAll();
    return new Promise((resolve) => {
        request.onsuccess = () => {
            const projects = request.result.filter(p => p.userId === userId);
            resolve(projects);
        };
    });
}

async function saveProject(userId, projectName, code) {
    const db = await initProjectDB();
    const tx = db.transaction('projects', 'readwrite');
    const store = tx.objectStore('projects');
    store.put({ id: `${userId}_${projectName}`, userId, projectName, code });
}