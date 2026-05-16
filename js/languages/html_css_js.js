// Web preview functionality

function updateWebPreview() {
    const code = getCode();
    const preview = document.getElementById('webPreview');
    
    if (preview) {
        const blob = new Blob([code], { type: 'text/html' });
        preview.src = URL.createObjectURL(blob);
    }
}

// Make function available globally
window.updateWebPreview = updateWebPreview;