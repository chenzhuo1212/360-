var xla = window.xla || (window.xla = []);
xla.push({
	type: 'config',
	appid: 20003,
	secret: '08a74ab30ab5376da8eb0f29ff690e6c',
	event: ['mouseover']
});

xla.push({
	type: 'globalExtData',
	data: {
		login_type: 'no_log',
		ver: "1.0",
		peerid: "1",
		userid: '00000000'
	}
});

xla.push({
	type: 'event',
	category: 'kn_360plugin',
	action: 'plugin_load'
});

var ip, port, url;
var client_type = "pc-360browser-1.0";
var client_version = "360browser-1.0";
var ajax = $.ajax;

$.ajax = function(opt){
	var opt = opt || {};
	opt.data = opt.data || {};
	opt.data.timeStamp = opt.data.timeStamp || + new Date;
	ajax(opt);
}

function queryportal(fn) {
	$.ajax({
		url: 'http://api.portal.swjsq.vip.xunlei.com:81/v2/queryportal',
		success: function(r) {
			if (r.errno === 0) {
				ip = r.interface_ip;
				port = r.interface_port;
				url = 'http://' + ip + ':' + port;
				bandwidth();
			} else {
				xla.push({
					type: 'event',
					category: 'kn_360plugin',
					action: 'plugin_query',
					extdata: {
						speedup_type: 'no_speed',
						speedup_chance: 'no',
						is_corner: 'no'
					}
				});
			}
		}
	});
}

function bandwidth() {
	$.ajax({
		url: url + '/v2/bandwidth',
		data: {
			peerid: 1,
			sequence: 1,
			client_version: client_version,
			client_type: client_type
		},
		success: function(r) {
			if (!r.errno) {
				if (r.can_upgrade) {
					query_try_info();
				} else {
					xla.push({
						type: 'event',
						category: 'kn_360plugin',
						action: 'plugin_query',
						extdata: {
							speedup_type: 'no_speed',
							speedup_chance: 'no',
							is_corner: 'no'
						}
					});
				}
			} else {
				xla.push({
					type: 'event',
					category: 'kn_360plugin',
					action: 'plugin_query',
					extdata: {
						speedup_type: 'no_speed',
						speedup_chance: 'no',
						is_corner: 'no'
					}
				});
			}
		}
	})
}

function upgrade(fn) {
	$.ajax({
		url: url + '/v2/upgrade',
		data: {
			peerid: 1,
			sequence: 1,
			client_version: client_version,
			client_type: client_type,
			dial_account: localStorage.dial_account,
			user_type: 2
		},
		success: function(r) {
			fn && fn(r);
			if (!r.errno) {
				// heart.start();
			} else {

			}
		}
	})
}

function recover() {
	$.ajax({
		url: url + '/v2/recover',
		data: {
			peerid: 1,
			sequence: 1,
			client_version: client_version,
			client_type: client_type
		},
		success: function(r) {
			console.log(r)
		}
	})
}

var heart = function(){

	var timer = 0;

	function keepalive() {
		$.ajax({
			url: url + '/v2/keepalive',
			data: {
				peerid: 1,
				sequence: 1,
				client_version: client_version,
				client_type: client_type
			},
			success: function(r) {
				if(r.errno) {
					stop();
				} 
			}
		})
	}

	function start() {
		clearInterval(timer);
		timer = setInterval(keepalive, 2000);
	}

	function stop() {
		recover();
		clearInterval(timer);
	}

	return {
		stop: stop,
		start: start
	}
}();


function query_try_info(fn) {
	$.ajax({
		url: url + '/v2/query_try_info',
		data: {
			peerid: 1,
			sequence: 1,
			client_version: client_version,
			client_type: client_type
		},
		success: function(r) {
			if (r.errno === 0) {
				if (r.number_of_try) {
					setBrowerIcon(1);

					xla.push({
						type: 'event',
						category: 'kn_360plugin',
						action: 'plugin_query',
						extdata: {
							speedup_type: 'speed',
							speedup_chance: 'yes',
							is_corner: 'yes'
						}
					});
				} else {
					xla.push({
						type: 'event',
						category: 'kn_360plugin',
						action: 'plugin_query',
						extdata: {
							speedup_type: 'speed',
							speedup_chance: 'no',
							is_corner: 'no'
						}
					});
					setBrowerIcon(0);
				}
			} else if(r.errno === 510 || r.errno === 511 || r.errno === 512 || r.errno === 508) {
				xla.push({
					type: 'event',
					category: 'kn_360plugin',
					action: 'plugin_query',
					extdata: {
						speedup_type: 'speed',
						speedup_chance: 'no',
						is_corner: 'no'
					}
				});
			} else {
				xla.push({
					type: 'event',
					category: 'kn_360plugin',
					action: 'plugin_query',
					extdata: {
						speedup_type: 'no_speed',
						speedup_chance: 'no',
						is_corner: 'no'
					}
				});
			}

			
		}
	})
}

function getusingexpcardinfo() {
	$.ajax({
		url: url + '/v2/getusingexpcardinfo',
		data: {
			peerid: 1,
			sequence: 1
		},
		success: function(r) {
			console.log(r)
		}
	})
}

function getuserallexpcardinfo() {
	$.ajax({
		url: url + '/v2/getuserallexpcardinfo',
		data: {
			peerid: 1,
			sequence: 1
		},
		success: function(r) {
			console.log(r)
		}
	})
}

function setBrowerIcon(status) {
	var png = status ? '../19_dot.png' : '../19.png';
	chrome.browserAction.setIcon({
		path: png
	})
}

queryportal();