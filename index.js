const decompress = require('decompress');
const download = require('download');
const cp = require('extra-cp');
const fs = require('extra-fs');
const path = require('path');



async function decompressGit(git, dir) {
  var repo = git.replace(/#.*/, ''), branch = git.substring(repo.length+1)||'master';
  var cmd = `git clone --single-branch --branch ${branch} --depth=1 ${repo} .`;
  await cp.exec(cmd, {cwd: dir});
}

async function decompressUrl(url, dir) {
  var out = path.join(dir, path.basename(url));
  var ans = await download(url, dir, {extract: true});
  await fs.remove(out);
  await fs.dehuskDir(dir);
  return ans;
}

async function decompressFile(file, dir) {
  var out = path.join(dir, path.basename(file.name));
  await new Promise((fres, frej) => file.mv(out, e => e? frej(e):fres()));
  var ans = await decompress(out, dir);
  await fs.remove(out);
  await fs.dehuskDir(dir);
  return ans;
}

async function decompressAny(input, output, options) {
  if(typeof input==='string') return decompress(input, output, options);
  var {gitUrl, fileUrl, fileUpload} = input, output = output||'.';
  if(fs.existsSync(output)) await fs.remove(output+'/*');
  else await fs.mkdirp(output);
  if(gitUrl) return decompressGit(gitUrl, output);
  if(fileUrl) return decompressUrl(fileUrl, output);
  return decompressFile(fileUpload, output);
}
module.exports = decompressAny;
