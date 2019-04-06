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

async function testFile() {
  var url = 'https://github.com/nodef/extra-decompress/archive/master.zip';
  await download(url, 'build/file', {filename: 'master.zip'});
  var file = 'build/file/master.zip';
  await decompress({file}, 'build/file/inside');
}

async function testString() {
  var url = 'https://github.com/nodef/extra-decompress/archive/master.zip';
  await download(url, 'build/string', {filename: 'master.zip'});
  await decompress('build/string/master.zip', 'build/string/inside');
}

async function test() {
  await testGitUrl();
  await testFileUrl();
  await testFileUpload();
  await testFile();
  await testString();
}
test();
