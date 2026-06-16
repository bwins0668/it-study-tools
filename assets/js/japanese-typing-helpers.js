/**
 * Japanese Typing Helpers for SQL Learning Hub
 * Round 133.5 - Additional typing aids
 * Round 136.0 - Ported from archive (zero innerHTML, no network, no storage)
 */

class JapaneseTypingHelpers {
  constructor(options = {}) {
    this.editor = options.editor || null;
    this.onConvert = options.onConvert || null;

    // Helper state
    this.romajiMap = new Map();
    this.katakanaMode = false;
    this.conversionHistory = [];

    // Common romaji conversions
    this.initRomajiMap();

    this.init();
  }

  initRomajiMap() {
    // Basic romaji to hiragana
    const romaji = {
      'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
      'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
      'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
      'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',
      'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
      'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
      'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
      'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
      'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
      'wa': 'わ', 'wo': 'を', 'n': 'ん'
    };

    Object.entries(romaji).forEach(([key, value]) => {
      this.romajiMap.set(key, value);
    });
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    if (!this.editor) return;

    this.editor.addEventListener('input', () => {
      this.handleRomajiInput();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        this.toggleKatakanaMode();
      }
    });
  }

  handleRomajiInput() {
    if (!this.editor) return;

    const cursorPos = this.editor.selectionStart;
    const text = this.editor.value;
    const textBeforeCursor = text.substring(0, cursorPos);

    const words = textBeforeCursor.split(/[\s\n.,;:!?()[\]{}"']/);
    const lastWord = words[words.length - 1];

    if (lastWord && this.romajiMap.has(lastWord.toLowerCase())) {
      const conversion = this.katakanaMode
        ? this.toKatakana(this.romajiMap.get(lastWord.toLowerCase()))
        : this.romajiMap.get(lastWord.toLowerCase());

      this.editor.value = text.substring(0, cursorPos - lastWord.length) + conversion + text.substring(cursorPos);

      this.editor.selectionStart = cursorPos - lastWord.length + conversion.length;
      this.editor.selectionEnd = this.editor.selectionStart;

      if (this.onConvert) {
        this.onConvert(lastWord, conversion);
      }
    }
  }

  toKatakana(hiragana) {
    const kanaMap = {
      'あ': 'ア', 'い': 'イ', 'う': 'ウ', 'え': 'エ', 'お': 'オ',
      'か': 'カ', 'き': 'キ', 'く': 'ク', 'け': 'ケ', 'こ': 'コ',
      'さ': 'サ', 'し': 'シ', 'す': 'ス', 'せ': 'セ', 'そ': 'ソ',
      'た': 'タ', 'ち': 'チ', 'つ': 'ツ', 'て': 'テ', 'と': 'ト',
      'な': 'ナ', 'に': 'ニ', 'ぬ': 'ヌ', 'ね': 'ネ', 'の': 'ノ',
      'は': 'ハ', 'ひ': 'ヒ', 'ふ': 'フ', 'へ': 'ヘ', 'ほ': 'ホ',
      'ま': 'マ', 'み': 'ミ', 'む': 'ム', 'め': 'メ', 'も': 'モ',
      'や': 'ヤ', 'ゆ': 'ユ', 'よ': 'ヨ',
      'ら': 'ラ', 'り': 'リ', 'る': 'ル', 'れ': 'レ', 'ろ': 'ロ',
      'わ': 'ワ', 'を': 'ヲ', 'ん': 'ン'
    };

    let result = hiragana;
    Object.entries(kanaMap).forEach(([hira, kata]) => {
      result = result.replace(new RegExp(hira, 'g'), kata);
    });

    return result;
  }

  toggleKatakanaMode() {
    this.katakanaMode = !this.katakanaMode;
    this.showToast(`片假名模式: ${this.katakanaMode ? '开启' : '关闭'}`, 'info');
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 8px 16px;
      background: ${type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 4px;
      font-size: 12px;
      z-index: 10010;
      animation: fadeInOut 2s ease-in-out;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 2000);
  }

  destroy() {
    // Nothing to clean up
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = JapaneseTypingHelpers;
}

if (typeof window !== 'undefined') {
  window.JapaneseTypingHelpers = JapaneseTypingHelpers;
}
