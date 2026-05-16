// Data storage handling

function saveCode() {
    const code = getCode();
    const language = localStorage.getItem('selectedLanguage') || 'java';
    
    // Save code to localStorage
    localStorage.setItem(`smileyide_code_${language}`, code);
    
    // Show save confirmation
    alert('Code saved successfully!');
}

function loadCode() {
    const language = localStorage.getItem('selectedLanguage') || 'java';
    const savedCode = localStorage.getItem(`smileyide_code_${language}`);
    
    if (savedCode) {
        const editorElement = document.getElementById('codeEditor');
        if (editorElement) {
            editorElement.innerHTML = formatCodeForDisplay(savedCode);
        }
    }
}

// Make functions available globally
window.saveCode = saveCode;
window.loadCode = loadCode;