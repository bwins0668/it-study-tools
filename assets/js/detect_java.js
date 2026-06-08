const fs = require('fs');

// 我们需要模拟浏览器或者单纯 require。但 java_lessons.js 中定义了全局变量 const JAVA_LESSONS
// 我们可以读取 java_lessons.js 的文本，把 const JAVA_LESSONS = ... 改为 module.exports = ...
let content = fs.readFileSync('java_lessons.js', 'utf8');
content = content.replace('const JAVA_LESSONS =', 'module.exports =');
// 写入临时文件并 require
fs.writeFileSync('temp_java_lessons.js', content, 'utf8');

const JAVA_LESSONS = require('./temp_java_lessons.js');
JAVA_LESSONS.forEach(l => {
  const getH3 = (text) => {
    const matches = [];
    const regex = /<h3>(.*?)<\/h3>/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };
  console.log(`ID: ${l.id} | Book: ${l.book} | Chap: ${l.chapter} | ${l.titleJa}`);
  console.log("  H3 Ja:", getH3(l.conceptJa));
  console.log("  H3 Zh:", getH3(l.conceptZh));
});

// 清理临时文件
try {
  fs.unlinkSync('temp_java_lessons.js');
} catch(e){}
