// Mock translation service for testing
// This simulates translation without requiring an API key

const translations = {
    en: {
        es: {
            'hello': 'hola',
            'goodbye': 'adiós',
            'thank you': 'gracias',
            'please': 'por favor',
            'how are you': 'cómo estás',
            'good morning': 'buenos días',
            'good night': 'buenas noches',
            'yes': 'sí',
            'no': 'no'
        },
        fr: {
            'hello': 'bonjour',
            'goodbye': 'au revoir',
            'thank you': 'merci',
            'please': 's\'il vous plaît',
            'how are you': 'comment allez-vous',
            'good morning': 'bonjour',
            'good night': 'bonne nuit',
            'yes': 'oui',
            'no': 'non'
        },
        de: {
            'hello': 'hallo',
            'goodbye': 'auf wiedersehen',
            'thank you': 'danke',
            'please': 'bitte',
            'how are you': 'wie geht es dir',
            'good morning': 'guten morgen',
            'good night': 'gute nacht',
            'yes': 'ja',
            'no': 'nein'
        }
    }
};

async function translateTextMock(text, targetLanguage, sourceLanguage = 'auto') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const textLower = text.toLowerCase();

    // Simple word-by-word translation for common phrases
    if (sourceLanguage === 'auto' || sourceLanguage === 'en') {
        const translationMap = translations.en[targetLanguage];

        if (translationMap) {
            // Check if exact phrase exists
            if (translationMap[textLower]) {
                return {
                    success: true,
                    translatedText: translationMap[textLower],
                    detectedSourceLanguage: 'en'
                };
            }

            // Try word-by-word translation
            const words = text.split(' ');
            let translated = words.map(word => {
                const wordLower = word.toLowerCase();
                return translationMap[wordLower] || word;
            }).join(' ');

            return {
                success: true,
                translatedText: `[DEMO] ${translated}`,
                detectedSourceLanguage: 'en'
            };
        }
    }

    // Default response
    return {
        success: true,
        translatedText: `[DEMO Translation to ${targetLanguage}] ${text}`,
        detectedSourceLanguage: sourceLanguage === 'auto' ? 'en' : sourceLanguage
    };
}

async function testTranslation() {
    console.log('Testing Mock Translation Service...\n');

    const testText = 'Hello, how are you?';
    const targetLang = 'es';

    console.log(`Original text: "${testText}"`);
    console.log(`Target language: ${targetLang}`);
    console.log('Translating...\n');

    const result = await translateTextMock(testText, targetLang);

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

module.exports = { translateTextMock };
