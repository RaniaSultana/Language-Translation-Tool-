const axios = require('axios');

const MYMEMORY_API_URL = 'https://api.mymemory.translated.net/get';
const LIBRETRANSLATE_API_URL = 'https://translate.argosopentech.com/translate';

const langMap = {
    'auto': 'en',
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
        const sourceLang = sourceLanguage === 'auto' ? 'en' : langMap[sourceLanguage] || sourceLanguage;
        const targetLang = langMap[targetLanguage] || targetLanguage;
        const langPair = `${sourceLang}|${targetLang}`;

        console.log('MyMemory - Translating:', { text, langPair });

        const response = await axios.get(MYMEMORY_API_URL, {
            params: {
                q: text,
                langpair: langPair
            },
            timeout: 10000
        });

        console.log('MyMemory response status:', response.status);

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
        console.error('MyMemory error:', error.message);
        return {
            success: false,
            error: error.response?.data?.error || error.message
        };
    }
}

async function translateTextLibre(text, targetLanguage, sourceLanguage = 'auto') {
    try {
        console.log('LibreTranslate - Translating');

        const response = await axios.post(LIBRETRANSLATE_API_URL, {
            q: text,
            source: sourceLanguage,
            target: targetLanguage,
            format: 'text'
        }, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 15000
        });

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
        console.error('LibreTranslate error:', error.message);
        return {
            success: false,
            error: error.response?.data?.error || error.message
        };
    }
}

module.exports = async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ success: false, error: 'Method not allowed' });
        return;
    }

    try {
        const { text, sourceLanguage, targetLanguage } = req.body;

        if (!text || !targetLanguage) {
            res.status(400).json({
                success: false,
                error: 'Missing required fields: text and targetLanguage'
            });
            return;
        }

        console.log('Translation request:', { text, sourceLanguage, targetLanguage });

        // Try LibreTranslate first (more reliable on Vercel)
        let result = await translateTextLibre(text, targetLanguage, sourceLanguage);

        // If LibreTranslate fails, try MyMemory as fallback
        if (!result.success) {
            console.log('LibreTranslate failed, trying MyMemory...');
            result = await translateTextMyMemory(text, targetLanguage, sourceLanguage);
        }

        console.log('Translation result:', result);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error in translation endpoint:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
};
