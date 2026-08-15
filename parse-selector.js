import fs from 'fs';
import * as cheerio from 'cheerio';
const html = fs.readFileSync('dist/index.html', 'utf8');
const $ = cheerio.load(html);
console.log($('div#root:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)').html());
