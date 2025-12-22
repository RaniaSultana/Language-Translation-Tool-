const sourceText = document.getElementById('source-text');
const sourceLanguage = document.getElementById('source-language');
const targetLanguage = document.getElementById('target-language');
const translatedTextArea = document.getElementById('translated-text');
const translateBtn = document.getElementById('translate-btn');
const swapBtn = document.getElementById('swap-languages');
const speakBtn = document.getElementById('speak-btn');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const charCount = document.getElementById('char-count');

sourceText.addEventListener('input', () => {
    const length = sourceText.value.length;
    charCount.textContent = length;

    // Color code based on length
    if (length > 5000) {
        charCount.style.color = '#d32f2f';
        charCount.style.fontWeight = 'bold';
    } else if (length > 4000) {
        charCount.style.color = '#ff9800';
    } else {
        charCount.style.color = '#666';
        charCount.style.fontWeight = 'normal';
    }
});

swapBtn.addEventListener('click', () => {
    if (sourceLanguage.value === 'auto') {
        alert('Cannot swap when source language is set to Auto-detect');
        return;
    }

    const temp = sourceLanguage.value;
    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = temp;

    if (translatedTextArea.querySelector('.translation-result')) {
        const tempText = sourceText.value;
        sourceText.value = translatedTextArea.textContent;
        translatedTextArea.innerHTML = `<p class="translation-result">${tempText}</p>`;
        charCount.textContent = sourceText.value.length;
    }
});

translateBtn.addEventListener('click', async () => {
    const text = sourceText.value.trim();

    // Input validation
    if (!text) {
        showError('Please enter text to translate');
        sourceText.focus();
        return;
    }

    if (text.length > 5000) {
        showError('Text is too long. Please limit to 5000 characters.');
        return;
    }

    if (!targetLanguage.value) {
        showError('Please select a target language');
        return;
    }

    if (sourceLanguage.value === targetLanguage.value && sourceLanguage.value !== 'auto') {
        showError('Source and target languages must be different');
        return;
    }

    translateBtn.disabled = true;
    translateBtn.textContent = 'Translating...';

    translatedTextArea.innerHTML = '<p class="placeholder">Translation in progress...</p>';

    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                sourceLanguage: sourceLanguage.value,
                targetLanguage: targetLanguage.value
            })
        });

        const result = await response.json();

        if (result.success) {
            translatedTextArea.innerHTML = `<p class="translation-result">${result.translatedText}</p>`;
            copyBtn.disabled = false;
            speakBtn.disabled = false;

            if (result.detectedSourceLanguage && sourceLanguage.value === 'auto') {
                console.log('Detected language:', result.detectedSourceLanguage);
            }
        } else {
            translatedTextArea.innerHTML = `
                <div class="error-message">
                    <p style="color: #d32f2f; font-weight: bold;">⚠️ Translation Failed</p>
                    <p style="color: #666; font-size: 0.9rem;">${result.error}</p>
                </div>
            `;
            copyBtn.disabled = true;
            speakBtn.disabled = true;
        }
    } catch (error) {
        console.error('Translation error:', error);
        let errorMessage = 'Failed to translate. Please try again.';

        if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Network error. Please check your internet connection.';
        } else if (error.message.includes('timeout')) {
            errorMessage = 'Translation timed out. Please try again.';
        }

        translatedTextArea.innerHTML = `
            <div class="error-message">
                <p style="color: #d32f2f; font-weight: bold;">⚠️ Error</p>
                <p style="color: #666; font-size: 0.9rem;">${errorMessage}</p>
            </div>
        `;
        copyBtn.disabled = true;
        speakBtn.disabled = true;
    } finally {
        translateBtn.disabled = false;
        translateBtn.textContent = 'Translate';
    }
});

speakBtn.addEventListener('click', () => {
    const translationResult = translatedTextArea.querySelector('.translation-result');

    if (translationResult && 'speechSynthesis' in window) {
        const textToSpeak = translationResult.textContent;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        const targetLang = targetLanguage.value;
        const langMap = {
            'en': 'en-US',
            'es': 'es-ES',
            'fr': 'fr-FR',
            'de': 'de-DE',
            'it': 'it-IT',
            'pt': 'pt-PT',
            'ru': 'ru-RU',
            'ja': 'ja-JP',
            'ko': 'ko-KR',
            'zh': 'zh-CN',
            'ar': 'ar-SA',
            'hi': 'hi-IN'
        };

        utterance.lang = langMap[targetLang] || 'en-US';
        utterance.rate = 0.9;

        const originalText = speakBtn.textContent;
        speakBtn.textContent = '🔊 Speaking...';
        speakBtn.disabled = true;

        utterance.onend = () => {
            speakBtn.textContent = originalText;
            speakBtn.disabled = false;
        };

        utterance.onerror = (error) => {
            console.error('Speech synthesis error:', error);
            speakBtn.textContent = originalText;
            speakBtn.disabled = false;
            alert('Text-to-speech failed. This feature may not be supported in your browser.');
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech is not supported in your browser.');
    }
});

copyBtn.addEventListener('click', () => {
    const translationResult = translatedTextArea.querySelector('.translation-result');

    if (translationResult) {
        navigator.clipboard.writeText(translationResult.textContent)
            .then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✓ Copied!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text:', err);
                alert('Failed to copy text. Please try again.');
            });
    }
});

clearBtn.addEventListener('click', () => {
    sourceText.value = '';
    translatedTextArea.innerHTML = '<p class="placeholder">Translation will appear here...</p>';
    charCount.textContent = '0';
    copyBtn.disabled = true;
    speakBtn.disabled = true;

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
});

// Helper function to show error messages
function showError(message) {
    translatedTextArea.innerHTML = `
        <div class="error-message">
            <p style="color: #d32f2f; font-weight: bold;">⚠️ Validation Error</p>
            <p style="color: #666; font-size: 0.9rem;">${message}</p>
        </div>
    `;

    // Auto-clear error after 4 seconds
    setTimeout(() => {
        if (translatedTextArea.innerHTML.includes('Validation Error')) {
            translatedTextArea.innerHTML = '<p class="placeholder">Translation will appear here...</p>';
        }
    }, 4000);
}
