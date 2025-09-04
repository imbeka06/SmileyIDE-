// Configuration constants for SmileyIDE
const CONFIG = {
    // CDN URLs for external libraries
    CDN: {
        MONACO_EDITOR: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.34.0/min/vs',
        PYODIDE: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js',
        BOOTSTRAP: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
        FONT_AWESOME: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    },
    
    // API endpoints
    API: {
        JUDGE0: 'https://api.judge0.com',
        OPENAI: 'https://api.openai.com/v1/chat/completions'
    },
    
    // Default code templates
    DEFAULT_CODE: {
        JAVA: `// Welcome to SmileyIDE Java Editor
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Calculate the sum of two numbers
        int a = 15;
        int b = 25;
        int sum = a + b;
        
        System.out.println("The sum of " + a + " and " + b + " is: " + sum);
        
        // Example of a simple loop
        for (int i = 1; i <= 5; i++) {
            System.out.println("Iteration: " + i);
        }
    }
}`,
        PYTHON: `# Welcome to SmileyIDE Python Editor
print("Hello, World!")

# Calculate the sum of two numbers
a = 15
b = 25
sum = a + b

print(f"The sum of {a} and {b} is: {sum}")

# Example of a simple loop
for i in range(1, 6):
    print(f"Iteration: {i}")`,
        C: `// Welcome to SmileyIDE C Editor
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    
    // Calculate the sum of two numbers
    int a = 15;
    int b = 25;
    int sum = a + b;
    
    printf("The sum of %d and %d is: %d\\n", a, b, sum);
    
    // Example of a simple loop
    for (int i = 1; i <= 5; i++) {
        printf("Iteration: %d\\n", i);
    }
    
    return 0;
}`,
        CPP: `// Welcome to SmileyIDE C++ Editor
#include <iostream>

using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Calculate the sum of two numbers
    int a = 15;
    int b = 25;
    int sum = a + b;
    
    cout << "The sum of " << a << " and " << b << " is: " << sum << endl;
    
    // Example of a simple loop
    for (int i = 1; i <= 5; i++) {
        cout << "Iteration: " << i << endl;
    }
    
    return 0;
}`,
        WEB: `<!DOCTYPE html>
<html>
<head>
    <title>SmileyIDE Web Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f0f0f0;
        }
        h1 {
            color: #6f42c1;
        }
        .card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>Welcome to SmileyIDE</h1>
        <p>Edit this HTML to see live preview.</p>
        <button onclick="showMessage()">Click Me!</button>
    </div>

    <script>
        function showMessage() {
            alert("Hello from SmileyIDE!");
        }
    </script>
</body>
</html>`
    },
    
    // Language IDs for Judge0 API
    LANGUAGE_IDS: {
        JAVA: 62,
        PYTHON: 71,
        C: 50,
        CPP: 54,
        JAVASCRIPT: 63
    }
};

// Make config available globally
window.CONFIG = CONFIG;