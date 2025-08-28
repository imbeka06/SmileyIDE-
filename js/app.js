document.addEventListener('DOMContentLoaded', () => {
    const userId = checkSession();
    initEditor();
    loadUserProjects(userId).then(projects => {
        const sidebar = document.getElementById('sidebar');
        projects.forEach(p => {
            const btn = document.createElement('button');
            btn.textContent = p.projectName;
            btn.onclick = () => editor.setValue(p.code);
            sidebar.appendChild(btn);
        });
    });
});

async function runCode() {
    const userId = sessionStorage.getItem('userId');
    const code = getEditorContent();
    const lang = editor.getModel().getLanguageId();
    if (lang === 'python') {
        await runPython(code);
    } else if (lang === 'javascript') {
        updatePreview(code);
    } else if (lang === 'java') {
        await compileJava(code, userId);
    } else if (lang === 'cpp') {
        document.getElementById('output').innerText = 'C/C++ coming in Phase 2';
    }
}

async function saveProject() {
    const userId = sessionStorage.getItem('userId');
    const code = getEditorContent();
    const projectName = prompt('Enter project name:');
    if (projectName) {
        await saveProject(userId, projectName, code);
        alert('Project saved!');
        // Refresh sidebar
        loadUserProjects(userId).then(projects => {
            const sidebar = document.getElementById('sidebar');
            sidebar.querySelectorAll('button.project').forEach(btn => btn.remove());
            projects.forEach(p => {
                const btn = document.createElement('button');
                btn.textContent = p.projectName;
                btn.className = 'project';
                btn.onclick = () => editor.setValue(p.code);
                sidebar.insertBefore(btn, sidebar.lastElementChild);
            });
        });
    }
}

function getAIHelp() {
    const code = getEditorContent();
    document.getElementById('output').innerText = `AI analyzing:\n${code}\n(TinyLlama coming in Phase 3)`;
}