/*global $, window, chrome*/

var url = '';
var random;
var show = false;

chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    parsePage();
});

chrome.tabs.onUpdated.addListener(function(tab) {
		chrome.tabs.executeScript(tab.id, {
            code: "var urlencode = function(str){\
	    str = str.toString();\
	    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\\(/g, '%28').replace(/\\)/g, '%29').replace(/\\*/g, '%2A').replace(/%20/g, '+');\
		};\
		var soundtooth = document.createElement('div');\
		soundtooth.setAttribute('id', 'soundtooth');\
		var inputUrl = document.createElement('input');\
		inputUrl.setAttribute('value', 'http://video.soundtooth.cn/play?url=' + urlencode(window.location.href));\
		inputUrl.setAttribute('type', 'hidden');\
		inputUrl.setAttribute('id', 'inputUrl');\
        soundtooth.setAttribute('style','width: 130px;height: 220px;background-color: #f0eff5;position: absolute;top: 125px;right: 0;z-index: 99998;');\
		var speedUpLogo = document.createElement('div');\
		speedUpLogo.setAttribute('style', 'width: 84px;height: 73px;margin: 11px auto 0;background: url(http://7xl1kb.com2.z0.glb.qiniucdn.com/icon-speedup-adv@2x.png) no-repeat;background-size: contain;');\
		soundtooth.appendChild(speedUpLogo);\
		var font1 = document.createElement('div');\
		font1.innerHTML = '去广告&加速';\
		font1.setAttribute('style', 'width: 100%;text-align: center;margin-top: 12px;font-size: 16px;color: #666666;');\
		soundtooth.appendChild(font1);\
		var font2 = document.createElement('div');\
		font2.innerHTML = '在voice-in观看 立即去除片头广告 尽享声牙加速';\
		font2.setAttribute('style', 'width: 96px;margin: 12px auto 0;font-size: 12px;text-align: center;line-height: 16px;color: #999999;');\
		soundtooth.appendChild(font2);\
		var btn = document.createElement('div');\
		btn.innerHTML = '立即体验';\
		btn.setAttribute('onclick', 'document.getElementById(\\'loading_area\\').setAttribute(\\'style\\', \\'display: block;width: 100%;position: fixed;z-index: 99999;height: 100%;top: 0;background-color: rgba(0,0,0,0.8);padding: 0 38%;box-sizing: border-box;\\');setTimeout(function(){window.location.href = document.getElementById(\\'inputUrl\\').value;}, Math.random() * 6000);');\
		btn.setAttribute('style', 'cursor: pointer;width: 70px;height: 24px;margin: 12px auto 0;border-radius: 2px;background-color: #f88639;text-align: center;color: #fff;font-size: 10px;line-height: 24px;');\
		soundtooth.appendChild(btn);\
		soundtooth.appendChild(inputUrl);\
		var close_btn = document.createElement('div');\
		close_btn.setAttribute('onclick', 'this.parentNode.setAttribute(\\'style\\', \\'display: none;\\')');\
		close_btn.setAttribute('style', 'cursor: pointer;position: absolute;width: 11.3px;height: 11.3px;top: 8px;left: 8px;background: url(http://7xl1kb.com2.z0.glb.qiniucdn.com/btn-close-adv@2x.png) no-repeat;background-size: contain;');\
		soundtooth.appendChild(close_btn);\
		\
		var wmode = document.createElement('param');\
		wmode.setAttribute('name', 'wmode');\
		wmode.setAttribute('value', 'transparent');\
		\
		if(document.getElementById('youku-player') != null) {document.getElementById('youku-player').parentNode.setAttribute('style', 'margin:0 auto;width:860px;height:476px;position: relative;');document.getElementById('youku-player').parentNode.appendChild(soundtooth);document.getElementById('youku-player').appendChild(wmode);}\
		if(document.getElementById('player') != null && document.getElementById('sohuplayer') == null && document.getElementById('soundtooth') == null) {document.getElementById('player').appendChild(soundtooth);if(document.getElementById('movie_player') != null) {document.getElementById('movie_player').appendChild(wmode);} if(document.getElementById('tudouHomePlayer') != null) {document.getElementById('tudouHomePlayer').appendChild(wmode);}}\
		if(document.getElementById('kplayer') != null && document.getElementById('soundtooth') == null) {soundtooth.setAttribute('style','width: 130px;height: 220px;background-color: #f0eff5;position: absolute;top: 125px;right: 350px;z-index: 99998;');document.getElementById('kplayer').appendChild(soundtooth);}\
		if(document.getElementById('acVideo') != null && document.getElementById('soundtooth') == null) {if(document.getElementById('pl_relvd') != null || document.getElementById('prgList_1') != null) {soundtooth.setAttribute('style','width: 130px;height: 220px;background-color: #f0eff5;position: absolute;top: 125px;right: 320px;z-index: 99998;'); }document.getElementById('acVideo').appendChild(soundtooth);}\
		if(document.getElementById('sohuplayer') != null && document.getElementById('soundtooth') == null) {document.getElementById('sohuplayer').appendChild(soundtooth);document.getElementById('sohuplayer').setAttribute('style', 'position: relative;');}\
		if(document.getElementById('mod_player') != null && document.getElementById('soundtooth') == null) {setTimeout(function(){document.getElementById('mod_player').appendChild(soundtooth);}, 3000);}\
		if(document.getElementById('bofqi') != null && document.getElementById('soundtooth') == null) {soundtooth.setAttribute('style','width: 130px;height: 220px;background-color: #f0eff5;position: absolute;top: 125px;right: 298px;z-index: 99998;');document.getElementById('bofqi').appendChild(soundtooth);if(document.getElementById('player_placeholder') != null) {document.getElementById('player_placeholder').appendChild(wmode);}}\
		\
		var outter = document.createElement('div');\
        outter.setAttribute('id', 'loading_area');\
		outter.setAttribute('style', 'display: none;width: 100%;position: fixed;z-index: 99999;height: 100%;top: 0;background-color: rgba(0,0,0,0.8);padding: 0 38%;box-sizing: border-box;');\
		var inner = document.createElement('div');\
		inner.setAttribute('style', 'background: url(http://video.soundtooth.cn/dist/skin/blue.monday/image/loading.gif) no-repeat;background-size: contain;width: 40px;height: 40px;margin: 250px auto 0;');\
		outter.appendChild(inner);\
		var font = document.createElement('div');\
		font.setAttribute('style', 'font-size: 14px;text-align: center;margin-top: 10%; color: #cccccc;');\
		font.innerHTML='正在为您配置加速环境';\
		outter.appendChild(font);\
		if(document.getElementById('loading_area') == null) { document.body.appendChild(outter); }"
        }, function(tab) {
            if (chrome.runtime.lastError) {
                console.log("ERROR: " + chrome.runtime.lastError.message);
            }
        });
});

function getDomainFromUrl(url){
     var host = "null";
     if(typeof url == "undefined" || null == url)
          url = window.location.href;
     var regex = /.*\:\/\/([^\/]*).*/;
     var match = url.match(regex);
     if(typeof match != "undefined" && null != match)
          host = match[1];
     return host;
}


function parsePage() {
    chrome.tabs.getSelected(null, function(tab) {
        url = tab.url;
        chrome.tabs.executeScript(tab.id, {
            code: 'var outter = document.createElement(\'div\');\
            outter.setAttribute(\'id\', \'loading_area\');\
outter.setAttribute(\'style\', \'width: 100%;position: fixed;z-index: 99999;height: 100%;top: 0;background-color: rgba(0,0,0,0.8);padding: 0 38%;box-sizing: border-box;\');\
var inner = document.createElement(\'div\');\
inner.setAttribute(\'style\', \'background: url(http://video.soundtooth.cn/dist/skin/blue.monday/image/loading.gif) no-repeat;background-size: contain;width: 40px;height: 40px;margin: 250px auto 0;\');\
outter.appendChild(inner);\
var font = document.createElement(\'div\');\
font.setAttribute(\'style\', \'font-size: 14px;text-align: center;margin-top: 10%; color: #cccccc;\');\
font.innerHTML=\'正在为您配置加速环境\';\
outter.appendChild(font);\
document.body.appendChild(outter);'
        });
        // var parsed = parse(url);
        // if (parsed) {
        //     var createProperties = {
        //         url: 'http://video.soundtooth.cn/play?url=' + urlencode(url)
        //      };
        // } else {
        //     var createProperties = {
        //         url: 'http://video.soundtooth.cn/'
        //     };
        // }
        if (url.indexOf('v.youku') >= 0 || url.indexOf('news.youku') >= 0 || url.indexOf('v.ku6') >= 0 || url.indexOf('tudou') >= 0 || url.indexOf('video.sina') >= 0 || url.indexOf('tv.sohu') >= 0 || url.indexOf('v.qq') >= 0 || url.indexOf('hunantv') >= 0 || url.indexOf('bilibili') >= 0) {
            var createProperties = {
                url: 'http://video.soundtooth.cn/play?url=' + urlencode(url)
            };
            random = 6000;
        } else {
            var createProperties = {
                url: 'http://video.soundtooth.cn'
            };
            random = 0;
        }

        setTimeout(function() {
            chrome.tabs.update(tab.id, createProperties, function(tab) {});
            chrome.tabs.executeScript(tab.id, {
               code: 'document.getElementById(\'loading_area\').setAttribute(\'style\', \'display: none;\');\
            document.getElementById(\'loading_area\').setAttribute(\'id\', \'\');\
            document.body.removeChild(document.body.childNodes[document.body.childNodes.length - 1]);'
            });
        }, Math.random() * random);

    });
}

function urlencode(str) {
    "use strict";
    str = str.toString();

    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function parse(inputUrl) {
    var parse = false;
    $.ajax({
            url: 'http://video.soundtooth.cn/parse',
            type: 'POST',
            dataType: 'json',
            data: {
                url: inputUrl
            },
            async: false
        })
        .done(function(data) {
            if (typeof(data) == 'object' && data.length != 0) {
                parse = true;
            }
        })
        .fail(function(data) {})
    return parse;
}
