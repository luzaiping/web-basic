const readline = require('readline');
const fs = require('fs');
const { exec } = require('child_process');

const getUserInput = input => {
  const myReadline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    myReadline.question(input, answer => {
      myReadline.close();
      resolve(answer);
    });
  });
};

const getDirNameList = pathName => {
  const dirList = [];
  const allList = fs.readdirSync(pathName); // 同步获取指定目录的文件/文件夹信息
  // eslint-disable-next-line no-restricted-syntax
  for (const item of allList) {
    if (fs.statSync(item).isDirectory()) {
      // 分析指定文件/文件夹信息，判定是否是文件夹
      dirList.push(item);
    }
  }
  return dirList;
};

const generatePackageJsonFile = projectName => {
  /* eslint-disable */
  let jsonContent = {
    name: projectName,
    version: '1.0.0',
    description: '',
    main: 'index.js',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1'
    },
    author: '',
    license: 'ISC',
    dependencies: {
      react: '^16.2.0',
      'react-dom': '^16.2.0'
    }
    /* eslint-enable */
  };
  fs.writeFileSync(
    `./${projectName}/package.json`,
    JSON.stringify(jsonContent)
  );
};

const createProject = (input = 'Please input project name:\n') => {
  getUserInput(input).then((answer = '') => {
    const dirList = getDirNameList('./');
    // eslint-disable-next-line no-param-reassign
    answer = answer.trim();

    // 同名处理，提示project存在，重新输入新project name
    if (dirList.includes(answer)) {
      createProject('Project exists, please input a new project name: ');
    } else {
      exec(`mkdir ${answer}`, err => {
        if (err) {
          // 创建文件夹出错，提示信息并退出
          console.log(err);
          process.exit();
        } else {
          // 生成 package.json 文件
          console.log(
            '\ncreate project dir successfully, start crating package.json...'
          );
          generatePackageJsonFile(answer);
          console.log(
            '\ncreate package.json successfully, start installing dependencies...'
          );
          exec(`cd ${answer} && npm i`, error => {
            if (error) {
              console.log(error);
            } else {
              console.log('install dependencies successfully.\n Done.');
            }
            process.exit();
          });
        }
      });
    }
  });
};

createProject();
