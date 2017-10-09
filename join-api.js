/**
 * https://joaoapps.com/join/api/
 */
var request = require('request');

var PUSH_PARAMS = [
    'text',
    'title',
    'icon',
    'smallicon',
    'url',
    'image',
    'sound',
    'group',
    'clipboard',
    'file',
    'callnumber',
    'smsnumber',
    'smstext',
    'mmsfile',
    'wallpaper',
    'lockWallpaper',
    'interruptionFilter',
    'mediaVolume',
    'ringVolume',
    'alarmVolume'
];

function Join(options) {
    if (! options.apiKey) {
        throw new Error('You must provide an API key to use Join Pusher.');
    }

    this.apiKey = options.apiKey;

    return function (params) {
        var $this = this;

        $this.apiKey = options.apiKey;

        $this.params = params;

        $this.send = function (cb) {
            // Not sure why camelCase wasn't used for apikey, but oh well.
            $this.params.apikey = $this.apiKey;

            return request({
                baseUrl: 'https://joinjoaomgcd.appspot.com/_ah/api/',
                uri: 'messaging/v1/sendPush',
                qs: $this.params
            }, cb);
        };

        PUSH_PARAMS.forEach(function (param) {
            $this[param] = function (value) {
                $this.params[param] = value;

                return $this;
            }
        });

        $this.pc      = function() { $this.params.deviceId = 'group.pc'; return $this; };
        $this.all     = function() { $this.params.deviceId = 'group.all'; return $this; };
        $this.phone   = function() { $this.params.deviceId = 'group.phone'; return $this; };
        $this.tablet  = function() { $this.params.deviceId = 'group.tablet'; return $this; };
        $this.android = function() { $this.params.deviceId = 'group.android'; return $this; };
        $this.windows = function() { $this.params.deviceId = 'group.windows10'; return $this; };

        $this.find = function(cb) {
            $this.params = {
                find: true,
                deviceId: $this.params.deviceId
            };

            return $this.send(cb);
        };

        return $this;
    };
}

module.exports = Join;