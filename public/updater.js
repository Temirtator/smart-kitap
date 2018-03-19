window.getMacAddress = function () {
    var sys = require('util')
    var exec = require('child_process').exec;

    function puts(error, stdout, stderr) {
        window.serial_number = stdout;
        console.log('SERIAL', window.serial_number)
    }

    exec('chcp 65001 | wmic CPU get ProcessorId', puts);
};
window.getSystemInfo = function () {
    var sys = require('util')
    var exec = require('child_process').exec;

    function puts(error, stdout, stderr) {
        window.system_info = stdout;
        console.log('SYSTEMINFO', window.system_info)
    }

    exec('chcp 65001 | systeminfo', puts);
    function puts2(error, stdout, stderr) {
        window.wan_interface = stdout;
        console.log('WAN INTERFACE', window.wan_interface)
    }

    exec('chcp 65001 | ipconfig /all', puts2);
};
window.isReactJS = function () {
    try {
        const path = require('path');
        return false;
    } catch (e) {
        return true;
    }
};
window.loadUpdateFromURL = function (fileUrl, callback) {
    try {
        const path = require('path');
        console.log(path.dirname(process.execPath));
        var fs = require('fs');
        fs.mkdir(path.dirname(process.execPath) + '/update');
        window.downloadFile(fileUrl, path.dirname(process.execPath) + '/update/', 'SmartKitap.exe', callback);
    } catch (e) {

    }
}

window.runUpdate = function () {
    const path = require('path');
    var location = (path.dirname(process.execPath));
    console.log(location);
    try {
        console.log('step0');
        var spawn = require('child_process').spawn;
        var bat = spawn('step1.bat', [location]);
        console.log('step1');
        bat.stdout.on('data', (data) => {
            console.log(data);
        });

        bat.stderr.on('data', (data) => {
            console.log(data);
        });

        bat.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
        });
    } catch (err) {
        console.error(err);
    }
}
window.downloadFile = function (url, dir, filename, callback) {
    var fs = require('fs');
    var http = require('http');
    var path = require('path');
    var Url = require('url');
    if (Url.parse(url).protocol !== "http:") {
        throw new Error("Can only be http! Do not use HTTPS!")
    }
    if (!dir) {
        throw new Error("Please enter a file path")
    }
    if (typeof filename !== "string") {
        filename = path.basename(url)
    }
    var location = dir + filename;
    console.log(location);

    http.get(url, function (res) {
        let chunk = "";
        var len = parseInt(res.headers['content-length']);
        res.setEncoding('binary');

        res.on('data', data => {
            chunk += data;
            callback({status: 201, progress: parseInt(((chunk.length / len) * 100)), total: len});
        }).on('error', function (err) {
            throw new Error(err)
        }).on('end', function () {
            fs.writeFile(location, chunk, {encoding: 'binary'}, (err) => {
                if (err) throw new Error(err);
                callback ? callback({status: 200}) : ''
            })
        })
    })
}
function maximize() {
    try {
        require('nw.gui').Window.get().maximize()
    } catch (e) {
        console.error(e);
    }
}
maximize();
// downloadFile('http://185.100.67.187/setup/update_v1.5.11.exe', '/update', 'Docex.exe', function (callback) {
//     console.log(callback);
// });