<?php

parse();

function parse() {
	$postURLString = 'http://video.soundtooth.cn/parse';
	$curl_handle = curl_init();
	$postData = array(
	   'url' => $_POST['url']
	);
	curl_setopt($curl_handle, CURLOPT_URL, $postURLString);
	curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 1);
	curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl_handle, CURLOPT_POSTFIELDS, $postData);
	$buffer = curl_exec($curl_handle);
	curl_close($curl_handle);
	echo $buffer;
}