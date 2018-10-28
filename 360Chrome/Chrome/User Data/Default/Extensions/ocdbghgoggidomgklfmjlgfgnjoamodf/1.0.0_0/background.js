// 监听发送请求
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
	var url=details.url;
	if(url.indexOf("http://ajax.googleapis.com/ajax/libs/jquery/")>-1)
	{
		var urls=url.split('/');
		var newUrl='http://apps.bdimg.com/libs/jquery/'+ urls[urls.length-2]+'/jquery.min.js';
		return {redirectUrl: newUrl};
	}
    return true;
  },
  {
    urls: ["<all_urls>"],
    types: ["script"]
  },
  ["blocking"]
);

