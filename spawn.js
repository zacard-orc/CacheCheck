/**
 * Created by linly on 15-2-17.
 */


var spawn = require('child_process').spawn,
  //  ls    = spawn('ls', ['-lh', '/usr']);
  // ls =spawn('ps',['ax'])
  //  ls=spawn('python',['-V'])
    ls=spawn('java',['-version'])

ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

ls.on('close', function (code) {
    console.log('child process exited with code ' + code);
});