const download = require('download');
const decompress = require('./');
const path = require('path');



async function testGitUrl() {
  var gitUrl = 'https://github.com/nodef/extra-decompress';
  await decompress({gitUrl}, 'build/gitUrl');
}

async function testFileUrl() {
  var fileUrl = 'https://github.com/nodef/extra-decompress/archive/master.zip';
  await decompress({fileUrl}, 'build/fileUrl');
}

async function testFileUpload() {
  var url = 'https://github.com/nodef/extra-decompress/archive/master.zip';
  var fileUpload = {mv: (out, fn) => download(url, path.dirname(out), {
    filename: path.basename(out)
  }).then(ans => fn(null, ans), fn)};
  fileUpload.name = 'master.zip';
  await decompress({fileUpload}, 'build/fileUpload');
}

async function testLocalFile() {
  var url = 'https://github.com/nodef/extra-decompress/archive/master.zip';
  await download(url, 'build/localFile', {filename: 'master.zip'});
  await decompress(path.join('build/localFile', path.basename(url)), 'build/localFile');
}

async function test() {
  await testGitUrl();
  await testFileUrl();
  await testFileUpload();
  await testLocalFile();
}
test();
