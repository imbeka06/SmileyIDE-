// Editor management

let currentEditor = null;

function initializeEditor() {
    //  initialize Monaco Editor in a real implementation
    // For this demo, we'll just set up the basic editor functionality
    
    const editorElement = document.getElementById('codeEditor');
    if (!editorElement) return;
    
    // Set up editor content based on selected language
    const language = localStorage.getItem('selectedLanguage') || 'java';
    const defaultCode = CONFIG.DEFAULT_CODE[language.toUpperCase()] || CONFIG.DEFAULT_CODE.JAVA;
    
    editorElement.innerHTML = formatCodeForDisplay(defaultCode);
    
    // Set up language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = language;
        
        languageSelect.addEventListener('change', function() {
            const newLanguage = this.value;
            localStorage.setItem('selectedLanguage', newLanguage);
            
            const newCode = CONFIG.DEFAULT_CODE[newLanguage.toUpperCase()] || CONFIG.DEFAULT_CODE.JAVA;
            editorElement.innerHTML = formatCodeForDisplay(newCode);
        });
    }
}

function formatCodeForDisplay(code) {
    // Convert code to HTML with syntax highlighting for display
    return code
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>')
        .replace(/\/\/.*?(?=<br>|$)/g, '<span class="code-comment">$&</span>')
        .replace(/(public|class|static|void|int|for|if|else|return|include|using|namespace)/g, '<span class="code-keyword">$1</span>')
        .replace(/(".*?"|'.*?')/g, '<span class="code-string">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
}

function getCode() {
    // In a real implementation, this would get code from Monaco Editor
    const editorElement = document.getElementById('codeEditor');
    if (!editorElement) return '';
    
    // Convert displayed HTML back to plain text code
    return editorElement.innerHTML
        .replace(/<br>/g, '\n')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/<span class="code-[^"]*">/g, '')
        .replace(/<\/span>/g, '');
}

// File management functionality
const fileManager = {
    files: {},

    createFile: function (fileName) {
        if (this.files[fileName]) {
            alert('File already exists!');
            return;
        }
        this.files[fileName] = '';
        alert(`File '${fileName}' created successfully!`);
        this.updateFileList();
    },

    openFile: function (fileName) {
        if (!this.files[fileName]) {
            alert('File does not exist!');
            return;
        }
        const editor = monaco.editor.getModels()[0];
        editor.setValue(this.files[fileName]);
        alert(`File '${fileName}' opened successfully!`);
    },

    saveFile: function (fileName) {
        const editor = monaco.editor.getModels()[0];
        this.files[fileName] = editor.getValue();
        alert(`File '${fileName}' saved successfully!`);
    },

    deleteFile: function (fileName) {
        if (!this.files[fileName]) {
            alert('File does not exist!');
            return;
        }
        delete this.files[fileName];
        alert(`File '${fileName}' deleted successfully!`);
        this.updateFileList();
    },

    updateFileList: function () {
        const fileExplorer = document.getElementById('fileExplorer');
        fileExplorer.innerHTML = '';
        for (const fileName in this.files) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = fileName;
            li.addEventListener('click', () => this.openFile(fileName));
            fileExplorer.appendChild(li);
        }
    }
};

// Make functions available globally
window.initializeEditor = initializeEditor;
window.getCode = getCode;

// Initialize editor when page loads
document.addEventListener('DOMContentLoaded', initializeEditor);

// Event listeners for file management buttons
document.getElementById('createFileBtn').addEventListener('click', function () {
    const fileName = prompt('Enter file name:');
    if (fileName) fileManager.createFile(fileName);
});

document.getElementById('openFileBtn').addEventListener('click', function () {
    const fileName = prompt('Enter file name to open:');
    if (fileName) fileManager.openFile(fileName);
});

document.getElementById('saveFileBtn').addEventListener('click', function () {
    const fileName = prompt('Enter file name to save:');
    if (fileName) fileManager.saveFile(fileName);
});

document.getElementById('deleteFileBtn').addEventListener('click', function () {
    const fileName = prompt('Enter file name to delete:');
    if (fileName) fileManager.deleteFile(fileName);
});