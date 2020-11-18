const colors = require('colors');
const readLine = require('readline');

const runCommand = (command, args) => {
  const cp = require("child_process");
  return new Promise((resolve, reject) => {
      const executedCommand = cp.spawn(command, args, {
          stdio: "inherit",
          shell: true
      })

      executedCommand.on('error', () => {
          reject()
      })

      executedCommand.on('exit', code => {
          if (code === 0) {
              resolve()
          } else {
              reject()
          }
      })
  });
};

const packageManager = 'npm';

const installOptions = ['install', '-D'];

const packageName = 'shortid';

const question = `do you want to install '${packageName}' (yes/no): `;

const questionInterface = readLine.createInterface({
    input: process.stdin,
    output: process.stderr
});

questionInterface.question(question, answer => {
    questionInterface.close();

    const rightAnswer = answer.toLowerCase().startsWith('y');

    if (!rightAnswer) {
        console.log(`if you want to use shortid, you must install it`.red);
        process.exitCode = 1;
        return;
    }

    console.log(`Install ${packageName} (running ${packageManager} ${installOptions.join(' ')} ${packageName})...`);

    runCommand(packageManager, installOptions.concat(packageName))
        .then(() => {
            console.log('Success!!!'.green);
        })
        .catch((err) => {
            console.error(err);
			process.exitCode = 1;
        });

})
