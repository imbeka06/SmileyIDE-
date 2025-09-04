// Main application logic

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize the application
    initializeEditor();
    loadCode();
    setupEventListeners();
});

function setupEventListeners() {
    // Run button
    document.getElementById('runBtn').addEventListener('click', runCode);
    
    // Debug button
    document.getElementById('debugBtn').addEventListener('click', function() {
        alert('Debug functionality would start here');
    });
    
    // Syntax check button
    document.getElementById('syntaxBtn').addEventListener('click', function() {
        alert('Syntax check would happen here');
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Ask AI button
    document.getElementById('askAI').addEventListener('click', function() {
        const question = prompt('What would you like to ask?');
        if (question) {
            askAI(question);
        }
    });
    
    // Send video button
    document.getElementById('sendVideo').addEventListener('click', function() {
        alert('Video sending functionality would be implemented here');
    });
}

async function runCode() {
    const language = localStorage.getItem('selectedLanguage') || 'java';
    const code = getCode();
    
    try {
        let output;
        
        switch(language) {
            case 'java':
                output = await runJavaCode(code);
                break;
            case 'python':
                output = await runPythonCode(code);
                break;
            case 'c':
                output = await runCCode(code);
                break;
            case 'cpp':
                output = await runCppCode(code);
                break;
            case 'html':
                updateWebPreview();
                output = "Web preview updated successfully.";
                break;
            default:
                output = "Unsupported language";
        }
        
        displayOutput(output);
    } catch (error) {
        displayOutput(`Error: ${error.message}`);
    }
}

function displayOutput(output) {
    const outputElement = document.getElementById('outputConsole');
    if (outputElement) {
        outputElement.innerHTML = `<pre>${output}</pre>`;
    }
}

async function askAI(question) {
    const code = getCode();
    
    try {
        const response = await askOpenAI(question, code);
        displayAIResponse(response);
    } catch (error) {
        displayAIResponse(`Error: ${error.message}`);
    }
}

function displayAIResponse(response) {
    const suggestionsElement = document.getElementById('aiSuggestions');
    if (suggestionsElement) {
        suggestionsElement.innerHTML = `<pre>${response}</pre>`;
    }
}