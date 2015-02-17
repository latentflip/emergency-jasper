var MetaInspector = require('node-metainspector');
var data = require('./data.json');
var async = require('async');


async.map(data, function (url, next) {
    var client = new MetaInspector(url, {});

    client.on("fetch", function(){
        next(null, { url: url, video: client.video, image: client.image });
    });

    client.on("error", function(err){
        console.log(error);
        next(null, {});
    });

    client.fetch();
}, function (err, results) {
    var fs = require('fs');
    fs.writeFileSync(__dirname + '/data-parsed.json', JSON.stringify(results, null, 2));
});
