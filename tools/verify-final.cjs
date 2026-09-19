// Final-pass verification: OG mapping, audio, quiz data, i18n, byline, routes.
const fs = require('fs');
const get = (f, rx) => {
  const h = fs.readFileSync('dist/' + f, 'utf8');
  const m = h.match(rx);
  return (m && m[1]) || '?';
};
console.log('og quiz/food:', get('quiz/food/index.html', /og:image" content="([^"]*)"/).slice(0, 80));
console.log('og vocab/food:', get('vocabulary/food/index.html', /og:image" content="([^"]*)"/).slice(0, 80));
console.log('og hi:', get('hi/index.html', /og:image" content="([^"]*)"/).slice(0, 80));
const food = fs.readFileSync('dist/vocabulary/food/index.html', 'utf8');
console.log('audio buttons (food):', (food.match(/data-say=/g) || []).length);
const quiz = fs.readFileSync('dist/quiz/food/index.html', 'utf8');
console.log('quiz embedded words:', (quiz.match(/"mr":"/g) || []).length);
console.log('quiz options JS:', quiz.includes('qopt') ? 'OK' : 'MISSING');
const hiHome = fs.readFileSync('dist/hi/index.html', 'utf8');
console.log('hi footer:', hiHome.includes('सबसे पहले जानें') ? 'Hindi OK' : 'MISSING');
console.log('byline:', food.includes('xmirtunjay') ? 'OK' : 'MISSING');
console.log('colors route:', fs.existsSync('dist/vocabulary/colors/index.html') ? 'OK' : 'MISSING');
console.log('quiz colors route:', fs.existsSync('dist/quiz/colors/index.html') ? 'OK' : 'MISSING');
console.log('downloads:', fs.existsSync('dist/downloads/marathi-top-100.tsv') && fs.existsSync('dist/downloads/marathi-full-1002.tsv') ? 'OK' : 'MISSING');
console.log('trailing slash nav:', food.includes('href="/learn-marathi/vocabulary/"') ? 'OK' : 'CHECK');
