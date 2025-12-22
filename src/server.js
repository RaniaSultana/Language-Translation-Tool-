const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { translateText } = require('./translate');
const { translateTextMock } = require('./translate-mock');
const { translateTextMyMemory } = require('./translate-mymemory');

const PORT = 3000;
const USE_MOCK = process.env.USE_MOCK === 'true';
const USE_MYMEMORY = process.env.USE_MYMEMORY === 'true';

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
};

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/api/translate' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                console.log('Received translation request');
                console.log('Request body:', body);

                const { text, sourceLanguage, targetLanguage } = JSON.parse(body);

                console.log('Parsed data:', { text, sourceLanguage, targetLanguage });
                console.log('USE_MOCK:', USE_MOCK);

                if (!text || !targetLanguage) {
                    console.log('Missing required fields');
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: false,
                        error: 'Missing required fields: text and targetLanguage'
                    }));
                    return;
                }

                console.log('Calling translation function...');
                let result;
                if (USE_MYMEMORY) {
                    result = await translateTextMyMemory(text, targetLanguage, sourceLanguage);
                } else if (USE_MOCK) {
                    result = await translateTextMock(text, targetLanguage, sourceLanguage);
                } else {
                    result = await translateText(text, targetLanguage, sourceLanguage);
                }

                console.log('Translation result:', result);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (error) {
                console.error('Error in translation endpoint:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    error: error.message
                }));
            }
        });
    } else {
        let filePath = path.join(__dirname, '..', 'public') + pathname;
        if (pathname === '/') {
            filePath = path.join(__dirname, '..', 'public', 'index.html');
        }

        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 - File Not Found</h1>', 'utf-8');
                } else {
                    res.writeHead(500);
                    res.end('Server Error: ' + error.code, 'utf-8');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    let mode = 'Google Translate API';
    if (USE_MYMEMORY) mode = 'MyMemory (Free Translation API)';
    else if (USE_MOCK) mode = 'MOCK (Demo)';
    console.log(`Translation mode: ${mode}`);
    console.log('Press Ctrl+C to stop the server');
});
