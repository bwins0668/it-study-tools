// Coding Typing Practice - Data Index
// Merges all four datasets

window.CODING_TYPING_CATEGORIES = [
  { id: "python", label: "Python", icon: "fab fa-python", count: 45 },
  { id: "java", label: "Java", icon: "fab fa-java", count: 35 },
  { id: "sql", label: "SQL", icon: "fa-solid fa-database", count: 45 },
  { id: "symbol", label: "Symbols", icon: "fa-solid fa-code", count: 25 }
];

(function() {
  var all = [];
  function add(arr) { if (arr && Array.isArray(arr)) all = all.concat(arr); }
  add(window.CODING_TYPING_DATA_PYTHON);
  add(window.CODING_TYPING_DATA_JAVA);
  add(window.CODING_TYPING_DATA_SQL);
  add(window.CODING_TYPING_DATA_SYMBOLS);
  window.CODING_TYPING_DATA = all;
  window.CODING_TYPING_BY_ID = {};
  all.forEach(function(item) { window.CODING_TYPING_BY_ID[item.id] = item; });
  window.CODING_TYPING_BY_LANG = {};
  all.forEach(function(item) {
    var lang = item.language;
    if (!window.CODING_TYPING_BY_LANG[lang]) window.CODING_TYPING_BY_LANG[lang] = [];
    window.CODING_TYPING_BY_LANG[lang].push(item);
  });
  window.CODING_TYPING_BY_LANG_CAT = {};
  all.forEach(function(item) {
    var key = item.language + "|" + item.category;
    if (!window.CODING_TYPING_BY_LANG_CAT[key]) window.CODING_TYPING_BY_LANG_CAT[key] = [];
    window.CODING_TYPING_BY_LANG_CAT[key].push(item);
  });
})();
