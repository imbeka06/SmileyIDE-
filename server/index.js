const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint to execute code
app.post('/execute', (req, res) => {
    const { language, code } = req.body;

    if (!language || !code) {
        return res.status(400).send({ error: 'Language and code are required' });
    }

    let command;
    switch (language) {
        case 'python':
            command = `python -c "${code}"`;
            break;
        case 'javascript':
            command = `node -e "${code}"`;
            break;
        case 'java':
            command = `echo "${code}" > Temp.java && javac Temp.java && java Temp`;
            break;
        case 'c_cpp':
            command = `echo "${code}" > temp.c && gcc temp.c -o temp && ./temp`;
            break;
        default:
            return res.status(400).send({ error: 'Unsupported language' });
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send({ error: stderr || 'Error executing code' });
        }
        res.send({ output: stdout });
    });
});

app.listen(PORT, () => {
    console.log(`Code execution server running on http://localhost:${PORT}`);
});