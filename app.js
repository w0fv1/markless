import { markdownToPlainText } from './markdown_to_text.js';

const convertBtn = document.getElementById('convertBtn');
const markdownInput = document.getElementById('markdownInput');
const plainOutput = document.getElementById('plainOutput');
const copyBtn = document.getElementById('copyBtn');
const loadSampleBtn = document.getElementById('loadSampleBtn');
const langSelect = document.getElementById('langSelect');
const langSelectTrigger = document.getElementById('langSelectTrigger');
const langSelectValue = document.getElementById('langSelectValue');
const langSelectMenu = document.getElementById('langSelectMenu');
const themeSelect = document.getElementById('themeSelect');
const themeSelectTrigger = document.getElementById('themeSelectTrigger');
const themeSelectValue = document.getElementById('themeSelectValue');
const themeSelectMenu = document.getElementById('themeSelectMenu');
const metaDescription = document.getElementById('metaDescription');
const metaOgDescription = document.getElementById('metaOgDescription');
const toast = document.getElementById('toast');

const md = window.markdownit();

const languageNames = {
  zh: '中文',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  nl: 'Nederlands',
  sv: 'Svenska',
  pl: 'Polski',
  uk: 'Українська',
};

const translations = {
  zh: {
    title: 'Markdown 转纯文本',
    subtitle: '在下面的文本框中输入你的 Markdown 内容，然后点击「转为纯文本」。',
    languageLabel: '语言：',
    languageSystem: '跟随系统',
    inputLabel: 'Markdown 内容：',
    placeholder: '在这里输入 Markdown 格式文本',
    convertBtn: '转为纯文本',
    loadSampleBtn: '加载完整样例',
    resultTitle: '转换结果：',
    copyBtn: '复制',
    alertEmpty: '没有可复制的文本！',
    alertCopied: '复制成功！',
    alertCopyFail: '复制失败，请手动复制。',
    themeLabel: '主题：',
    themeSystem: '跟随系统',
    themeLight: '浅色',
    themeDark: '深色',
    description: '将 Markdown 转为可读纯文本的静态网页工具，保留列表、换行、代码块与链接等关键信息。',
  },
  en: {
    title: 'Markdown to Plain Text',
    subtitle: 'Paste Markdown below, then click “Convert to Plain Text”.',
    languageLabel: 'Language:',
    languageSystem: 'System',
    inputLabel: 'Markdown:',
    placeholder: 'Enter Markdown here',
    convertBtn: 'Convert to Plain Text',
    loadSampleBtn: 'Load Full Sample',
    resultTitle: 'Result:',
    copyBtn: 'Copy',
    alertEmpty: 'Nothing to copy.',
    alertCopied: 'Copied!',
    alertCopyFail: 'Copy failed. Please copy manually.',
    themeLabel: 'Theme:',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    description: 'A static tool that converts Markdown to readable plain text while preserving lists, line breaks, code blocks, and links.',
  },
  es: {
    title: 'Markdown a Texto Plano',
    subtitle: 'Pega Markdown abajo y pulsa “Convertir a texto plano”.',
    languageLabel: 'Idioma:',
    languageSystem: 'Sistema',
    inputLabel: 'Markdown:',
    placeholder: 'Introduce Markdown aquí',
    convertBtn: 'Convertir a texto plano',
    loadSampleBtn: 'Cargar muestra completa',
    resultTitle: 'Resultado:',
    copyBtn: 'Copiar',
    alertEmpty: 'No hay texto para copiar.',
    alertCopied: '¡Copiado!',
    alertCopyFail: 'Error al copiar. Copia manualmente.',
    themeLabel: 'Tema:',
    themeSystem: 'Sistema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    description: 'Herramienta estática que convierte Markdown a texto legible conservando listas, saltos de línea, código y enlaces.',
  },
  fr: {
    title: 'Markdown en texte brut',
    subtitle: 'Collez du Markdown ci-dessous, puis cliquez sur « Convertir ». ',
    languageLabel: 'Langue :',
    languageSystem: 'Système',
    inputLabel: 'Markdown :',
    placeholder: 'Entrez du Markdown ici',
    convertBtn: 'Convertir en texte brut',
    loadSampleBtn: 'Charger un exemple complet',
    resultTitle: 'Résultat :',
    copyBtn: 'Copier',
    alertEmpty: 'Rien à copier.',
    alertCopied: 'Copié !',
    alertCopyFail: 'Échec de la copie. Copiez manuellement.',
    themeLabel: 'Thème :',
    themeSystem: 'Système',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    description: 'Outil statique qui convertit le Markdown en texte lisible en conservant listes, retours, code et liens.',
  },
  de: {
    title: 'Markdown zu Klartext',
    subtitle: 'Füge unten Markdown ein und klicke „In Klartext umwandeln“.',
    languageLabel: 'Sprache:',
    languageSystem: 'System',
    inputLabel: 'Markdown:',
    placeholder: 'Markdown hier eingeben',
    convertBtn: 'In Klartext umwandeln',
    loadSampleBtn: 'Vollständiges Beispiel laden',
    resultTitle: 'Ergebnis:',
    copyBtn: 'Kopieren',
    alertEmpty: 'Kein Text zum Kopieren.',
    alertCopied: 'Kopiert!',
    alertCopyFail: 'Kopieren fehlgeschlagen. Bitte manuell kopieren.',
    themeLabel: 'Thema:',
    themeSystem: 'System',
    themeLight: 'Hell',
    themeDark: 'Dunkel',
    description: 'Statisches Tool, das Markdown in lesbaren Klartext umwandelt und Listen, Zeilenumbrüche, Code und Links erhält.',
  },
  it: {
    title: 'Markdown in testo semplice',
    subtitle: 'Incolla Markdown qui sotto e fai clic su “Converti”.',
    languageLabel: 'Lingua:',
    languageSystem: 'Sistema',
    inputLabel: 'Markdown:',
    placeholder: 'Inserisci Markdown qui',
    convertBtn: 'Converti in testo semplice',
    loadSampleBtn: 'Carica esempio completo',
    resultTitle: 'Risultato:',
    copyBtn: 'Copia',
    alertEmpty: 'Niente da copiare.',
    alertCopied: 'Copiato!',
    alertCopyFail: 'Copia non riuscita. Copia manualmente.',
    themeLabel: 'Tema:',
    themeSystem: 'Sistema',
    themeLight: 'Chiaro',
    themeDark: 'Scuro',
    description: 'Strumento statico che converte Markdown in testo leggibile preservando elenchi, a capo, codice e link.',
  },
  pt: {
    title: 'Markdown para texto simples',
    subtitle: 'Cole o Markdown abaixo e clique em “Converter”.',
    languageLabel: 'Idioma:',
    languageSystem: 'Sistema',
    inputLabel: 'Markdown:',
    placeholder: 'Digite Markdown aqui',
    convertBtn: 'Converter para texto simples',
    loadSampleBtn: 'Carregar exemplo completo',
    resultTitle: 'Resultado:',
    copyBtn: 'Copiar',
    alertEmpty: 'Nada para copiar.',
    alertCopied: 'Copiado!',
    alertCopyFail: 'Falha ao copiar. Copie manualmente.',
    themeLabel: 'Tema:',
    themeSystem: 'Sistema',
    themeLight: 'Claro',
    themeDark: 'Escuro',
    description: 'Ferramenta estática que converte Markdown em texto legível preservando listas, quebras de linha, código e links.',
  },
  ru: {
    title: 'Markdown в обычный текст',
    subtitle: 'Вставьте Markdown ниже и нажмите «Преобразовать».',
    languageLabel: 'Язык:',
    languageSystem: 'Система',
    inputLabel: 'Markdown:',
    placeholder: 'Введите Markdown здесь',
    convertBtn: 'Преобразовать в текст',
    loadSampleBtn: 'Загрузить полный пример',
    resultTitle: 'Результат:',
    copyBtn: 'Копировать',
    alertEmpty: 'Нет текста для копирования.',
    alertCopied: 'Скопировано!',
    alertCopyFail: 'Не удалось скопировать. Скопируйте вручную.',
    themeLabel: 'Тема:',
    themeSystem: 'Система',
    themeLight: 'Светлая',
    themeDark: 'Тёмная',
    description: 'Статический инструмент для конвертации Markdown в читаемый текст с сохранением списков, переносов, кода и ссылок.',
  },
  ja: {
    title: 'Markdown からプレーンテキスト',
    subtitle: 'Markdown を入力して「プレーンテキストに変換」をクリックします。',
    languageLabel: '言語:',
    languageSystem: 'システム',
    inputLabel: 'Markdown:',
    placeholder: 'ここに Markdown を入力',
    convertBtn: 'プレーンテキストに変換',
    loadSampleBtn: '完全サンプルを読み込み',
    resultTitle: '結果:',
    copyBtn: 'コピー',
    alertEmpty: 'コピーするテキストがありません。',
    alertCopied: 'コピーしました！',
    alertCopyFail: 'コピーに失敗しました。手動でコピーしてください。',
    themeLabel: 'テーマ:',
    themeSystem: 'システム',
    themeLight: 'ライト',
    themeDark: 'ダーク',
    description: 'Markdown を読みやすいプレーンテキストに変換し、リストや改行、コード、リンクを保持します。',
  },
  ko: {
    title: 'Markdown → 일반 텍스트',
    subtitle: '아래에 Markdown을 입력하고 “일반 텍스트로 변환”을 클릭하세요.',
    languageLabel: '언어:',
    languageSystem: '시스템',
    inputLabel: 'Markdown:',
    placeholder: '여기에 Markdown 입력',
    convertBtn: '일반 텍스트로 변환',
    loadSampleBtn: '전체 샘플 불러오기',
    resultTitle: '결과:',
    copyBtn: '복사',
    alertEmpty: '복사할 텍스트가 없습니다.',
    alertCopied: '복사했습니다!',
    alertCopyFail: '복사 실패. 수동으로 복사하세요.',
    themeLabel: '테마:',
    themeSystem: '시스템',
    themeLight: '라이트',
    themeDark: '다크',
    description: '리스트, 줄바꿈, 코드, 링크를 유지하며 Markdown을 읽기 쉬운 텍스트로 변환하는 정적 도구입니다.',
  },
  ar: {
    title: 'Markdown إلى نص عادي',
    subtitle: 'ألصق Markdown أدناه ثم اضغط “تحويل إلى نص عادي”.',
    languageLabel: 'اللغة:',
    languageSystem: 'النظام',
    inputLabel: 'Markdown:',
    placeholder: 'أدخل Markdown هنا',
    convertBtn: 'تحويل إلى نص عادي',
    loadSampleBtn: 'تحميل مثال كامل',
    resultTitle: 'النتيجة:',
    copyBtn: 'نسخ',
    alertEmpty: 'لا يوجد نص للنسخ.',
    alertCopied: 'تم النسخ!',
    alertCopyFail: 'فشل النسخ. انسخ يدويًا.',
    themeLabel: 'السمة:',
    themeSystem: 'النظام',
    themeLight: 'فاتح',
    themeDark: 'داكن',
    description: 'أداة ثابتة لتحويل Markdown إلى نص مقروء مع الحفاظ على القوائم والأسطر البرمجية والروابط.',
  },
  hi: {
    title: 'Markdown से सादा टेक्स्ट',
    subtitle: 'Markdown नीचे चिपकाएं और “सादा टेक्स्ट में बदलें” दबाएं।',
    languageLabel: 'भाषा:',
    languageSystem: 'सिस्टम',
    inputLabel: 'Markdown:',
    placeholder: 'यहाँ Markdown दर्ज करें',
    convertBtn: 'सादा टेक्स्ट में बदलें',
    loadSampleBtn: 'पूरा नमूना लोड करें',
    resultTitle: 'परिणाम:',
    copyBtn: 'कॉपी',
    alertEmpty: 'कॉपी करने के लिए कुछ नहीं है।',
    alertCopied: 'कॉपी हो गया!',
    alertCopyFail: 'कॉपी विफल। कृपया मैन्युअल रूप से कॉपी करें।',
    themeLabel: 'थीम:',
    themeSystem: 'सिस्टम',
    themeLight: 'लाइट',
    themeDark: 'डार्क',
    description: 'एक स्थिर टूल जो Markdown को पढ़ने योग्य टेक्स्ट में बदलता है और सूची, लाइन ब्रेक, कोड व लिंक बनाए रखता है।',
  },
  id: {
    title: 'Markdown ke Teks Biasa',
    subtitle: 'Tempel Markdown di bawah lalu klik “Ubah ke teks biasa”.',
    languageLabel: 'Bahasa:',
    languageSystem: 'Sistem',
    inputLabel: 'Markdown:',
    placeholder: 'Masukkan Markdown di sini',
    convertBtn: 'Ubah ke teks biasa',
    loadSampleBtn: 'Muat contoh lengkap',
    resultTitle: 'Hasil:',
    copyBtn: 'Salin',
    alertEmpty: 'Tidak ada teks untuk disalin.',
    alertCopied: 'Tersalin!',
    alertCopyFail: 'Gagal menyalin. Silakan salin manual.',
    themeLabel: 'Tema:',
    themeSystem: 'Sistem',
    themeLight: 'Terang',
    themeDark: 'Gelap',
    description: 'Alat statis untuk mengonversi Markdown ke teks yang mudah dibaca dengan mempertahankan daftar, jeda baris, kode, dan tautan.',
  },
  tr: {
    title: 'Markdown düz metne',
    subtitle: 'Aşağıya Markdown yapıştırın ve “Düz metne dönüştür”e tıklayın.',
    languageLabel: 'Dil:',
    languageSystem: 'Sistem',
    inputLabel: 'Markdown:',
    placeholder: 'Markdown buraya girin',
    convertBtn: 'Düz metne dönüştür',
    loadSampleBtn: 'Tam örneği yükle',
    resultTitle: 'Sonuç:',
    copyBtn: 'Kopyala',
    alertEmpty: 'Kopyalanacak metin yok.',
    alertCopied: 'Kopyalandı!',
    alertCopyFail: 'Kopyalama başarısız. Elle kopyalayın.',
    themeLabel: 'Tema:',
    themeSystem: 'Sistem',
    themeLight: 'Açık',
    themeDark: 'Koyu',
    description: 'Markdown’u okunabilir düz metne çeviren ve listeleri, satır sonlarını, kodu ve bağlantıları koruyan statik araç.',
  },
  vi: {
    title: 'Markdown sang văn bản thuần',
    subtitle: 'Dán Markdown bên dưới rồi bấm “Chuyển sang văn bản thuần”.',
    languageLabel: 'Ngôn ngữ:',
    languageSystem: 'Hệ thống',
    inputLabel: 'Markdown:',
    placeholder: 'Nhập Markdown ở đây',
    convertBtn: 'Chuyển sang văn bản thuần',
    loadSampleBtn: 'Tải mẫu đầy đủ',
    resultTitle: 'Kết quả:',
    copyBtn: 'Sao chép',
    alertEmpty: 'Không có nội dung để sao chép.',
    alertCopied: 'Đã sao chép!',
    alertCopyFail: 'Sao chép thất bại. Vui lòng sao chép thủ công.',
    themeLabel: 'Giao diện:',
    themeSystem: 'Hệ thống',
    themeLight: 'Sáng',
    themeDark: 'Tối',
    description: 'Công cụ tĩnh chuyển Markdown thành văn bản dễ đọc, giữ danh sách, xuống dòng, mã và liên kết.',
  },
  th: {
    title: 'Markdown เป็นข้อความธรรมดา',
    subtitle: 'วาง Markdown ด้านล่างแล้วคลิก “แปลงเป็นข้อความธรรมดา”.',
    languageLabel: 'ภาษา:',
    languageSystem: 'ระบบ',
    inputLabel: 'Markdown:',
    placeholder: 'ใส่ Markdown ที่นี่',
    convertBtn: 'แปลงเป็นข้อความธรรมดา',
    loadSampleBtn: 'โหลดตัวอย่างเต็ม',
    resultTitle: 'ผลลัพธ์:',
    copyBtn: 'คัดลอก',
    alertEmpty: 'ไม่มีข้อความให้คัดลอก',
    alertCopied: 'คัดลอกแล้ว!',
    alertCopyFail: 'คัดลอกไม่สำเร็จ โปรดคัดลอกด้วยตนเอง',
    themeLabel: 'ธีม:',
    themeSystem: 'ระบบ',
    themeLight: 'สว่าง',
    themeDark: 'มืด',
    description: 'เครื่องมือแบบสแตติกที่แปลง Markdown เป็นข้อความอ่านง่าย พร้อมคงรายการ บรรทัดใหม่ โค้ด และลิงก์ไว้.',
  },
  nl: {
    title: 'Markdown naar platte tekst',
    subtitle: 'Plak Markdown hieronder en klik op “Omzetten naar platte tekst”.',
    languageLabel: 'Taal:',
    languageSystem: 'Systeem',
    inputLabel: 'Markdown:',
    placeholder: 'Voer Markdown hier in',
    convertBtn: 'Omzetten naar platte tekst',
    loadSampleBtn: 'Volledige voorbeeld laden',
    resultTitle: 'Resultaat:',
    copyBtn: 'Kopiëren',
    alertEmpty: 'Geen tekst om te kopiëren.',
    alertCopied: 'Gekopieerd!',
    alertCopyFail: 'Kopiëren mislukt. Kopieer handmatig.',
    themeLabel: 'Thema:',
    themeSystem: 'Systeem',
    themeLight: 'Licht',
    themeDark: 'Donker',
    description: 'Statische tool die Markdown omzet naar leesbare tekst met behoud van lijsten, regeleinden, code en links.',
  },
  sv: {
    title: 'Markdown till ren text',
    subtitle: 'Klistra in Markdown nedan och klicka på “Konvertera till ren text”.',
    languageLabel: 'Språk:',
    languageSystem: 'System',
    inputLabel: 'Markdown:',
    placeholder: 'Skriv Markdown här',
    convertBtn: 'Konvertera till ren text',
    loadSampleBtn: 'Ladda komplett exempel',
    resultTitle: 'Resultat:',
    copyBtn: 'Kopiera',
    alertEmpty: 'Ingen text att kopiera.',
    alertCopied: 'Kopierat!',
    alertCopyFail: 'Kopiering misslyckades. Kopiera manuellt.',
    themeLabel: 'Tema:',
    themeSystem: 'System',
    themeLight: 'Ljus',
    themeDark: 'Mörk',
    description: 'Statisk verktyg som konverterar Markdown till läsbar text och bevarar listor, radbrytningar, kod och länkar.',
  },
  pl: {
    title: 'Markdown na zwykły tekst',
    subtitle: 'Wklej Markdown poniżej i kliknij „Konwertuj”.',
    languageLabel: 'Język:',
    languageSystem: 'System',
    inputLabel: 'Markdown:',
    placeholder: 'Wpisz Markdown tutaj',
    convertBtn: 'Konwertuj na zwykły tekst',
    loadSampleBtn: 'Wczytaj pełny przykład',
    resultTitle: 'Wynik:',
    copyBtn: 'Kopiuj',
    alertEmpty: 'Brak tekstu do skopiowania.',
    alertCopied: 'Skopiowano!',
    alertCopyFail: 'Nie udało się skopiować. Skopiuj ręcznie.',
    themeLabel: 'Motyw:',
    themeSystem: 'System',
    themeLight: 'Jasny',
    themeDark: 'Ciemny',
    description: 'Statyczne narzędzie konwertujące Markdown na czytelny tekst z zachowaniem list, łamań wierszy, kodu i linków.',
  },
  uk: {
    title: 'Markdown у простий текст',
    subtitle: 'Вставте Markdown нижче та натисніть «Перетворити».',
    languageLabel: 'Мова:',
    languageSystem: 'Система',
    inputLabel: 'Markdown:',
    placeholder: 'Введіть Markdown тут',
    convertBtn: 'Перетворити на текст',
    loadSampleBtn: 'Завантажити повний приклад',
    resultTitle: 'Результат:',
    copyBtn: 'Копіювати',
    alertEmpty: 'Немає тексту для копіювання.',
    alertCopied: 'Скопійовано!',
    alertCopyFail: 'Не вдалося скопіювати. Скопіюйте вручну.',
    themeLabel: 'Тема:',
    themeSystem: 'Система',
    themeLight: 'Світла',
    themeDark: 'Темна',
    description: 'Статичний інструмент для перетворення Markdown у читабельний текст зі збереженням списків, перенесень, коду та посилань.',
  },
};

const languageOptions = [
  'system',
  'zh',
  'en',
  'es',
  'fr',
  'de',
  'it',
  'pt',
  'ru',
  'ja',
  'ko',
  'ar',
  'hi',
  'id',
  'tr',
  'vi',
  'th',
  'nl',
  'sv',
  'pl',
  'uk',
];

const themeOptions = ['system', 'light', 'dark'];
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getSystemLanguageCode() {
  const browserLang = (navigator.language || 'en').split('-')[0];
  return translations[browserLang] ? browserLang : 'en';
}

function getLanguageLabel(option, activeLang) {
  const strings = translations[activeLang] ?? translations.en;
  const systemCode = getSystemLanguageCode();
  const systemName = languageNames[systemCode] || systemCode;
  if (option === 'system') {
    return `${strings.languageSystem} (${systemName})`;
  }
  return languageNames[option] || option;
}

function getThemeLabel(option, activeLang) {
  const strings = translations[activeLang] ?? translations.en;
  const systemTheme = systemThemeQuery.matches ? 'dark' : 'light';
  const systemLabel = systemTheme === 'dark' ? strings.themeDark : strings.themeLight;
  if (option === 'light') {
    return strings.themeLight;
  }
  if (option === 'dark') {
    return strings.themeDark;
  }
  return `${strings.themeSystem} (${systemLabel})`;
}

function setSelectOpen(selectRoot, isOpen) {
  if (!selectRoot) {
    return;
  }
  selectRoot.classList.toggle('open', isOpen);
  const trigger = selectRoot.querySelector('.select-trigger');
  if (trigger) {
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
}

function closeAllSelects() {
  setSelectOpen(langSelect, false);
  setSelectOpen(themeSelect, false);
}

function renderSelectMenu(menu, options, labelFn, currentValue, onSelect) {
  if (!menu) {
    return;
  }
  menu.innerHTML = '';
  options.forEach(option => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = labelFn(option);
    button.setAttribute('role', 'option');
    button.setAttribute('aria-selected', option === currentValue ? 'true' : 'false');
    button.dataset.value = option;
    button.addEventListener('click', () => {
      onSelect(option);
      closeAllSelects();
    });
    item.appendChild(button);
    menu.appendChild(item);
  });
}

function getPreferredLanguage() {
  const stored = window.localStorage.getItem('markless-lang');
  if (stored === 'system') {
    return 'system';
  }
  if (stored && translations[stored]) {
    return stored;
  }
  return 'system';
}

function applyTranslations(lang) {
  const strings = translations[lang] ?? translations.en;
  document.documentElement.lang = lang;
  document.title = strings.title;
  if (metaDescription) {
    metaDescription.setAttribute('content', strings.description);
  }
  if (metaOgDescription) {
    metaOgDescription.setAttribute('content', strings.description);
  }

  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (strings[key]) {
      node.textContent = strings[key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
    const key = node.getAttribute('data-i18n-placeholder');
    if (strings[key]) {
      node.setAttribute('placeholder', strings[key]);
    }
  });
  renderSelectMenu(
    langSelectMenu,
    languageOptions,
    option => getLanguageLabel(option, lang),
    languageSelection,
    setLanguage,
  );
  renderSelectMenu(
    themeSelectMenu,
    themeOptions,
    option => getThemeLabel(option, lang),
    themeSelection,
    setTheme,
  );
  if (langSelectValue) {
    langSelectValue.textContent = getLanguageLabel(languageSelection, lang);
  }
  if (themeSelectValue) {
    themeSelectValue.textContent = getThemeLabel(themeSelection, lang);
  }
}

let languageSelection = 'system';
let themeSelection = 'system';

function setLanguage(lang) {
  const value = lang === 'system' ? 'system' : (translations[lang] ? lang : 'en');
  const activeLang = value === 'system' ? getSystemLanguageCode() : value;
  languageSelection = value;
  window.localStorage.setItem('markless-lang', value);
  applyTranslations(activeLang);
}

function getActiveLanguage() {
  if (languageSelection === 'system') {
    return getSystemLanguageCode();
  }
  if (translations[languageSelection]) {
    return languageSelection;
  }
  const stored = window.localStorage.getItem('markless-lang');
  if (stored === 'system') {
    return getSystemLanguageCode();
  }
  if (stored && translations[stored]) {
    return stored;
  }
  return 'en';
}

function applyTheme(theme) {
  if (!theme || theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
    return;
  }
  document.documentElement.setAttribute('data-theme', theme);
}

function setTheme(theme) {
  const value = theme === 'light' || theme === 'dark' ? theme : 'system';
  themeSelection = value;
  window.localStorage.setItem('markless-theme', value);
  applyTheme(value);
  const activeLang = getActiveLanguage();
  applyTranslations(activeLang);
}

let toastTimer = null;

function showToast(message) {
  if (!toast) {
    return;
  }
  toast.textContent = message;
  toast.classList.add('show');
  if (toastTimer) {
    window.clearTimeout(toastTimer);
  }
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 1800);
}

const sampleMarkdown = `# Markdown Parser Fixture

Paragraph with **bold**, *italic*, ~~strike~~, and \`inline code\`.
Soft break should stay on a new line.

---

## Lists

- unordered item
- another item
  - nested bullet
  - nested bullet with **bold**

1. ordered one
2. ordered two
   1. nested ordered
   2. nested ordered

## Task Lists

- [x] done item
- [ ] todo item

## Blockquote

> Quote line one.
> Quote line two.
>
> - quoted list
> - second item

## Code

\`\`\`js
function add(a, b) {
  return a + b;
}
\`\`\`

\`\`\`python
def greet(name):
    return f"hi {name}"
\`\`\`

## Table

| Name | Value | Note |
| --- | --- | --- |
| alpha | 1 | first |
| beta | 2 | second |

## Links & Images

[Example link](https://example.com)

Autolink: <https://example.com/auto>

![Alt text](https://example.com/image.png)

## Escapes & Entities

Escape \\*asterisks\\* and \\\`backticks\\\`.
Use &amp; &lt; &gt; entities.

## Inline HTML

<span>Inline HTML text</span> with <em>emphasis</em>.

## Definition Style Link

[ref-link][id]

[id]: https://example.com/reference "Reference Title"`;

convertBtn.addEventListener('click', () => {
  const markdownText = markdownInput.value;
  plainOutput.textContent = markdownToPlainText(markdownText, md, document);
});

loadSampleBtn.addEventListener('click', () => {
  markdownInput.value = sampleMarkdown;
  plainOutput.textContent = markdownToPlainText(sampleMarkdown, md, document);
});

copyBtn.addEventListener('click', async () => {
  const text = plainOutput.textContent;
  const lang = getActiveLanguage();
  const strings = translations[lang] ?? translations.en;
  if (!text) {
    showToast(strings.alertEmpty);
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    showToast(strings.alertCopied);
  } catch (err) {
    showToast(strings.alertCopyFail);
  }
});

const initialLang = getPreferredLanguage();
setLanguage(initialLang);

const savedTheme = window.localStorage.getItem('markless-theme') || 'system';
setTheme(savedTheme);

if (langSelectTrigger) {
  langSelectTrigger.addEventListener('click', () => {
    const isOpen = langSelect.classList.contains('open');
    closeAllSelects();
    setSelectOpen(langSelect, !isOpen);
  });
}

if (themeSelectTrigger) {
  themeSelectTrigger.addEventListener('click', () => {
    const isOpen = themeSelect.classList.contains('open');
    closeAllSelects();
    setSelectOpen(themeSelect, !isOpen);
  });
}

document.addEventListener('click', event => {
  if (langSelect && langSelect.contains(event.target)) {
    return;
  }
  if (themeSelect && themeSelect.contains(event.target)) {
    return;
  }
  closeAllSelects();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeAllSelects();
  }
});

systemThemeQuery.addEventListener('change', () => {
  if (themeSelection !== 'system') {
    return;
  }
  const activeLang = getActiveLanguage();
  applyTranslations(activeLang);
});
