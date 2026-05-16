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

// Make functions available globally
window.initializeEditor = initializeEditor;
window.getCode = getCode;

// Initialize editor when page loads
document.addEventListener('DOMContentLoaded', initializeEditor);