// Python execution using Pyodide

let pyodide = null;

async function loadPyodide() {
    if (!pyodide) {
        // Load Pyodide
        await loadScript(CONFIG.CDN.PYODIDE);
        
        // Initialize Pyodide
        pyodide = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/'
        });
        
        // Load common packages
        await pyodide.loadPackage(['numpy', 'pandas']);
    }
    
    return pyodide;
}

async function runPythonCode(code) {
    try {
        const pyodide = await loadPyodide();
        return await pyodide.runPythonAsync(code);
    } catch (error) {
        throw new Error(`Python error: ${error.message}`);
    }
}

// Make function available globally
window.runPythonCode = runPythonCode;