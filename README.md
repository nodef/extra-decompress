Decompress Git URL, File URL, File Upload, or Local File, using decompress module.

```javascript
const decompress = require('extra-decompress');


var gitUrl = 'https://github.com/user/repo';
await decompress({gitUrl}, '/home/user/work');
// "user/repo" extracted to "/home/user/work"

var fileUrl = 'https://github.com/user/repo/archive/master.zip';
await decompress({fileUrl}, '/home/user/work');
// "master.zip" extracted to "/home/user/work"

var {fileUpload} = req.files; // express-fileupload (upload.zip)
await decompress({fileUpload}, '/home/user/work');
// "upload.zip" extracted to "/home/user/work"

await decompress('local.zip', '/home/user/work');
// "local.zip" extracted to "/home/user/work"
```
<br>


## reference

```javascript
const decompress = require('extra-decompress');
// : includes functionality of "decompress"


decompress(input, [output=.], [options={}]);
- input: {gitUrl | fileUrl | fileUpload} | localFile <string>
- output: <string> (output directory)
- options: {filter, map, plugins, strip} (see "decompress")
-> Promise
```
