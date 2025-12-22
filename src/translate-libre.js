const axios = require('axios');

const LIBRETRANSLATE_API_URL = 'https://libretranslate.com/translate';

async function translateTextLibre(text, targetLanguage, sourceLanguage = 'auto') {
    try {
        console.log('LibreTranslate - Translating:', { text, sourceLanguage, targetLanguage });

        const response = await axios.post(LIBRETRANSLATE_API_URL, {
            q: text,
            source: sourceLanguage,
            target: targetLanguage,
            format: 'text',
            api_key: ''
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('LibreTranslate response:', response.data);

        if (response.data && response.data.translatedText) {
            return {
                success: true,
                translatedText: response.data.translatedText,
                detectedSourceLanguage: response.data.detectedLanguage?.language || sourceLanguage
            };
        } else {
            throw new Error('Invalid response from LibreTranslate API');
        }
    } catch (error) {
        console.error('LibreTranslate error:', error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.error || error.message
        };
    }
}

async function testTranslation() {
    console.log('Testing LibreTranslate API...\n');

    const testText = 'Hello, how are you today?';
    const targetLang = 'es';

    console.log(`Original text: "${testText}"`);
    console.log(`Target language: ${targetLang}`);
    console.log('Translating...\n');

    const result = await translateTextLibre(testText, targetLang);

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

module.exports = { translateTextLibre };
