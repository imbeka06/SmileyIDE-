let editor;
function initEditor() {
    require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.50.0/min/vs' } });
    require(['vs/editor/editor.main'], () => {
        editor = monaco.editor.create(document.getElementById('editor'), {
            value: '// Start coding here\n',
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            minimap: { enabled: false }
        });
    });
}
function switchLanguage(lang) {
    if (editor) {
        monaco.editor.setModelLanguage(editor.getModel(), lang);
    }
}
function getEditorContent() {
    return editor ? editor.getValue() : '';
}