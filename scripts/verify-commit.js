const fs = require("fs");
const msgPath = process.env.HUSKY_GIT_PARAMS;

const msg = fs.readFileSync(msgPath, 'utf-8').trim();
const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?(:|：)(\s)?.{1,50}/;


if (!commitRE.test(msg)) {
    console.log('\x1B[31m%s\x1B[0m', `
        不合法的commit提交格式
        请查看 git commit 提交规范
    `);
    process.exit(1);
}
