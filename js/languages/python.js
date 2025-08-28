let pyodideInstance;
async function initPyodide() {
    if (!pyodideInstance) {
        pyodideInstance = await loadPyodide();
        await pyodideInstance.loadPackage(['numpy', 'pandas']);
    }
    return pyodideInstance;
}
async function runPython(code) {
    try {
        const py = await initPyodide();
        const output = await py.runPythonAsync(code);
        document.getElementById('output').innerText = output || 'No output';
    } catch (err) {
        document.getElementById('output').innerText = `Error: ${err.message}`;
    }
}