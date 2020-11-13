const fs = require("fs");
const msgPath = process.env.HUSKY_GIT_PARAMS;

const msg = fs.readFileSync(msgPath, 'utf-8');

console.log('====================================');
console.log('msg', msg);
console.log('====================================');