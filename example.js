var Join = require('./index');

var join = Join({
    apiKey: 'paste-apikey-here'
});

var push = join({
    deviceId: 'paste-a-device-id-here',
    title: 'Node Join API Notifications',
    text: 'Nice! We can use the Join API from our applications now.',
    icon: 'http://tinyurl.com/thumbsupicon'
});

push.send(function (error, response, body) {
    if (error) console.error('error:', error);

    console.log('statusCode:', response && response.statusCode);

    console.log('body:', body);
});
