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
	category: 'kn_360plugin_mainframe',
	action: 'frame_show'
});

var ip, port, url, dial_account;
var client_type = "pc-360browser-1.0";
var client_version = "360browser-1.0";
var bg = chrome.extension.getBackgroundPage();

var ajax = $.ajax;
$.ajax = function(opt) {
	var opt = opt || {};
	opt.data = opt.data || {};
	opt.data.timeStamp = opt.data.timeStamp || +new Date;
	ajax(opt);
}

var data = {};
function queryportal() {
	$('.txt_info').html('正在查询您的宽带信息…');
	$.ajax({
		url: 'http://api.portal.swjsq.vip.xunlei.com:81/v2/queryportal',
		success: function(r) {
			
			if (r.errno === 0) {
				ip = r.interface_ip;
				port = r.interface_port;
				url = 'http://' + ip + ':' + port;
				bandwidth();
			} else {
				$('.btn_green').unbind().on('click', function() {
					queryportal();

				}).html('重新查询').show();
				$(".txt_info").html('您的宽带不支持提速');
				xla.push({
					type: 'event',
					category: 'kn_360plugin_mainframe',
					action: 'btn_show',
					extdata: {
						type: "retry"
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
				dial_account = r.dial_account;
				data.bandwidth = r.bandwidth.downstream;
				data.max_bandwidth = r.max_bandwidth.downstream;
				localStorage.bandwidth = r.bandwidth.downstream;
				localStorage.max_bandwidth = r.max_bandwidth.downstream;
				var _bandwidth = parseBand(data.bandwidth);
				var max_bandwidth = parseBand(data.max_bandwidth);
				setIc(45);
				$('.num').html("<em>" + _bandwidth[0] + "</em>" + _bandwidth[1]);
				$('.txt_info').html('快鸟可将您的带宽从' + _bandwidth.join('') + '提升到' + max_bandwidth.join(''));
				if (r.can_upgrade) {
					xla.push({
						type: 'event',
						category: 'kn_360plugin_mainframe',
						action: 'btn_show',
						extdata: {
							type: "try"
						}
					});
					$('.btn_green').unbind().on('click', function() {
						xla.push({
							type: 'event',
							category: 'kn_360plugin_mainframe',
							action: 'btn_click',
							extdata: {
								type: "try"
							}
						});
						query_try_info();
					}).html('免费试用').show();
				} else {
					$(".txt_info").html('您的宽带不支持提速');
					$('.btn_green').unbind().on('click', function() {
						query_try_info();
					}).html('重新查询').show();
					xla.push({
						type: 'event',
						category: 'kn_360plugin_mainframe',
						action: 'btn_show',
						extdata: {
							type: "retry"
						}
					});
				}
			} else {
				$(".txt_info").html('您的宽带不支持提速');
				$('.btn_green').unbind().on('click', function() {
					bandwidth();
				}).html('重新查询').show();
				xla.push({
					type: 'event',
					category: 'kn_360plugin_mainframe',
					action: 'btn_show',
					extdata: {
						type: "retry"
					}
				});
			}
		}
	})
}

function upgrade() {
	$('.btn_green').html('提速中').addClass('btn_ing').unbind();
	$.ajax({
		url: url + '/v2/upgrade',
		data: {
			peerid: 1,
			sequence: 1,
			client_version: client_version,
			client_type: client_type,
			dial_account: dial_account,
			user_type: 2
		},
		success: function(r) {
			$('.btn_green').removeClass('btn_ing');
			if (r.errno == 0 || r.errno == 812 || r.errno == 815) {

				xla.push({
					type: 'event',
					category: 'kn_360plugin_mainframe',
					action: 'speed_res',
					extdata: {
						type: "noviptry",
						res: "success"
					}
				});

				$('.btn_green').html('下载客户端').unbind().on('click', function() {
					down();
				});
				var max_bandwidth = parseBand(data.max_bandwidth);
				$('.num').html("<em>" + max_bandwidth[0] + "</em>" + max_bandwidth[1]);
				setLeftTime(localStorage.try_duration);
				localStorage.startTime = +new Date;
				setIc(180);
			} else {
				$('.txt_info').html('提速出了点问题，请稍后重试');
				$('.btn_green').html('重新提速').unbind().on('click', function() {
					upgrade();
					xla.push({
						type: 'event',
						category: 'kn_360plugin_mainframe',
						action: 'btn_click',
						extdata: {
							type: "respeed"
						}
					});
				});
				xla.push({
					type: 'event',
					category: 'kn_360plugin_mainframe',
					action: 'btn_show',
					extdata: {
						type: "respeed"
					}
				});

				xla.push({
					type: 'event',
					category: 'kn_360plugin_mainframe',
					action: 'speed_res',
					extdata: {
						type: "noviptry",
						res: "fail"
					}
				});

			};
		}
	})
}

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
			$('.btn_green').show();
			if (!r.errno) {
				if (r.number_of_try) {
					var try_duration = r.try_duration * 60;
					localStorage.try_duration = try_duration;
					upgrade();
				} else {
					$('.txt_info').html('今天的试用机会已用完<br>下载客户端，享受更多免费提速');
					$('.btn_green').html('下载客户端').unbind().on('click', function() {
						down();
					});

					xla.push({
						type: 'event',
						category: 'kn_360plugin_mainframe',
						action: 'btn_show',
						extdata: {
							type: "notry"
						}
					});

				}
			} else if (r.errno === 510 || r.errno === 511 || r.errno === 512 || r.errno === 508) {
				$('.txt_info').html('今天的试用机会已用完<br>下载客户端，享受更多免费提速');
				$('.btn_green').html('下载客户端').unbind().on('click', function() {
					down();
				});

				xla.push({
					type: 'event',
					category: 'kn_360plugin_mainframe',
					action: 'btn_show',
					extdata: {
						type: "notry"
					}
				});
			} else {
				$('.txt_info').html('提速出了点问题，请稍后重试');
				$('.btn_green').html('重新提速').unbind().on('click', function() {
					$('.btn_green').hide();
					query_try_info();

					xla.push({
						type: 'event',
						category: 'kn_360plugin_mainframe',
						action: 'btn_click',
						extdata: {
							type: "respeed"
						}
					});
				}).show();

				xla.push({
					type: 'event',
					category: 'kn_360plugin_mainframe',
					action: 'btn_show',
					extdata: {
						type: "respeed"
					}
				});

				xla.push({
					type: 'event',
					category: 'kn_360plugin_mainframe',
					action: 'speed_res',
					extdata: {
						type: "noviptry",
						res: "fail"
					}
				});

			}
		}
	})
}

function setWidth(w) {
	$('.num').html('<em>' + w[0] + '</em>' + w[1])
}

function parseBand(w) {
	return [Math.floor(w / 1024), 'M'];
	if (w < 0) {
		return [0, 'K'];
	} else if (w < 1024) {
		return [w, 'K'];
	} else if (w < 1024 * 1024) {
		return [Math.floor(w / 1024), 'M'];
	} else if (w < 1024 * 1024 * 1024) {
		return [Math.floor(w / 1024 / 1024), 'G'];
	} else {
		return ['光速', '']
	}
}

function down() {
	xla.push({
		type: 'event',
		category: 'kn_360plugin_mainframe',
		action: 'btn_click',
		extdata: {
			type: "download"
		}
	});
	window.open('http://down.sandai.net/XLNetAcc/XLNetAccSetup.exe');
}

function setLeftTime(left) {

	var timer = 0;

	function loop() {
		var min = Math.floor(left / 60);
		if (min < 10) {
			min = '0' + min;
		}
		var sec = left % 60;
		if (sec < 10) {
			sec = '0' + sec;
		}
		$('.txt_info').html('试用倒计时 ' + min + ':' + sec);
		left--;
		if (left < 0) {
			var bandwidth = parseBand(localStorage.bandwidth);
			$('.num').html("<em>" + bandwidth[0] + "</em>" + bandwidth[1]);
			clearInterval(timer);
			$('.txt_info').html('试用结束！<br>下载客户端，享受更多免费提速');
			$('.btn_green').html('下载客户端').unbind().on('click', function() {
				down();
			});
			setIc(45);
			xla.push({
				type: 'event',
				category: 'kn_360plugin_mainframe',
				action: 'btn_show',
				extdata: {
					type: "notry"
				}
			});
		}
	}
	var timer = setInterval(loop, 1000);
	loop();
}


function setIc(rad) {
	$('.ic_bar').css({
		transform: 'rotate(' + rad + 'deg)'
	});
}

$(function() {
	var start = parseInt(localStorage.startTime || 0);
	if (start) {
		var now = +new Date;
		var left = parseInt(localStorage.try_duration) - Math.floor((now - start) / 1000);
		if (left > 0) {
			setLeftTime(left);
			setIc(180);
			var max_bandwidth = parseBand(localStorage.max_bandwidth);
			$('.num').html("<em>" + max_bandwidth[0] + "</em>" + max_bandwidth[1]);
			$('.btn_green').show().html('下载客户端').unbind().on('click', function() {
				down();
			});
		} else {
			queryportal();
		}
	} else {
		queryportal();
	}
});

function setBrowerIcon(status) {
	var png = status ? '../19_dot.png' : '../19.png';
	chrome.browserAction.setIcon({
		path: png
	})
}

setBrowerIcon(0);