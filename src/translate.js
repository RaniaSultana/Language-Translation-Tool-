require('dotenv').config();
const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

async function translateText(text, targetLanguage, sourceLanguage = 'auto') {
    try {
        console.log('API Key loaded:', GOOGLE_API_KEY ? 'Yes (length: ' + GOOGLE_API_KEY.length + ')' : 'No');

        const params = {
            q: text,
            target: targetLanguage,
            key: GOOGLE_API_KEY,
            format: 'text'
        };

        if (sourceLanguage && sourceLanguage !== 'auto') {
            params.source = sourceLanguage;
        }

        console.log('Request params:', { ...params, key: params.key ? params.key.substring(0, 10) + '...' : 'missing' });

        const response = await axios.post(GOOGLE_TRANSLATE_API_URL, null, {
            params: params
        });

        if (response.data && response.data.data && response.data.data.translations) {
            const translation = response.data.data.translations[0];
            return {
                success: true,
                translatedText: translation.translatedText,
                detectedSourceLanguage: translation.detectedSourceLanguage || sourceLanguage
            };
        } else {
            throw new Error('Invalid response from Google Translate API');
        }
    } catch (error) {
        console.error('Full error object:', JSON.stringify(error.response?.data || error.message, null, 2));
        return {
            success: false,
            error: error.response?.data?.error?.message || error.message
        };
    }
}

async function testTranslation() {
    console.log('Testing Google Translate API...\n');

    const testText = 'Hello, how are you today?';
    const targetLang = 'es';

    console.log(`Original text: "${testText}"`);
    console.log(`Target language: ${targetLang}`);
    console.log('Translating...\n');

    const result = await translateText(testText, targetLang);

    if (result.success) {
        console.log('✓ Translation successful!');
        console.log(`Translated text: "${result.translatedText}"`);
        console.log(`Detected source language: ${result.detectedSourceLanguage}`);
    } else {
        console.log('✗ Translation failed!');
        console.log(`Error: ${result.error}`);
    }
}

if (require.main === module) {
    testTranslation();
}

module.exports = { translateText };
