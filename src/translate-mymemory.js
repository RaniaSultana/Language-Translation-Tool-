const axios = require('axios');

const MYMEMORY_API_URL = 'https://api.mymemory.translated.net/get';

// Language code mapping for MyMemory API
const langMap = {
    'auto': 'en', // MyMemory doesn't support auto-detect, default to English
    'en': 'en',
    'es': 'es',
    'fr': 'fr',
    'de': 'de',
    'it': 'it',
    'pt': 'pt',
    'ru': 'ru',
    'ja': 'ja',
    'ko': 'ko',
    'zh': 'zh',
    'ar': 'ar',
    'hi': 'hi'
};

async function translateTextMyMemory(text, targetLanguage, sourceLanguage = 'auto') {
    try {
        // If source is auto, we'll detect it as English for now
        const sourceLang = sourceLanguage === 'auto' ? 'en' : langMap[sourceLanguage] || sourceLanguage;
        const targetLang = langMap[targetLanguage] || targetLanguage;
        const langPair = `${sourceLang}|${targetLang}`;

        console.log('MyMemory - Translating:', { text, langPair });

        const response = await axios.get(MYMEMORY_API_URL, {
            params: {
                q: text,
                langpair: langPair
            }
        });

        console.log('MyMemory response:', response.data);

        if (response.data && response.data.responseData && response.data.responseData.translatedText) {
            return {
                success: true,
                translatedText: response.data.responseData.translatedText,
                detectedSourceLanguage: sourceLang
            };
        } else {
            throw new Error('Invalid response from MyMemory API');
        }
    } catch (error) {
        console.error('MyMemory error:', error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.error || error.message
        };
    }
}

async function testTranslation() {
    console.log('Testing MyMemory Translation API...\n');

    const tests = [
        { text: 'Hello, how are you today?', target: 'es' },
        { text: 'Thank you very much', target: 'fr' },
        { text: 'Good morning', target: 'de' }
    ];

    for (const test of tests) {
        console.log(`\nOriginal text: "${test.text}"`);
        console.log(`Target language: ${test.target}`);
        console.log('Translating...');

        const result = await translateTextMyMemory(test.text, test.target);

        if (result.success) {
            console.log('✓ Translation successful!');
            console.log(`Translated text: "${result.translatedText}"`);
        } else {
            console.log('✗ Translation failed!');
            console.log(`Error: ${result.error}`);
        }
    }
}

if (require.main === module) {
    testTranslation();
}

module.exports = { translateTextMyMemory };
