const fileManager = require('../js/editor');

describe('File Manager Tests', () => {
    beforeEach(() => {
        fileManager.files = {};
    });

    test('Create a new file', () => {
        fileManager.createFile('testFile');
        expect(fileManager.files['testFile']).toBe('');
    });

    test('Prevent creating duplicate files', () => {
        fileManager.createFile('testFile');
        fileManager.createFile('testFile');
        expect(Object.keys(fileManager.files).length).toBe(1);
    });

    test('Open an existing file', () => {
        fileManager.createFile('testFile');
        fileManager.files['testFile'] = 'Sample content';
        const editor = { setValue: jest.fn() };
        monaco.editor.getModels = jest.fn(() => [editor]);
        fileManager.openFile('testFile');
        expect(editor.setValue).toHaveBeenCalledWith('Sample content');
    });

    test('Save a file', () => {
        fileManager.createFile('testFile');
        const editor = { getValue: jest.fn(() => 'Updated content') };
        monaco.editor.getModels = jest.fn(() => [editor]);
        fileManager.saveFile('testFile');
        expect(fileManager.files['testFile']).toBe('Updated content');
    });

    test('Delete a file', () => {
        fileManager.createFile('testFile');
        fileManager.deleteFile('testFile');
        expect(fileManager.files['testFile']).toBeUndefined();
    });
});