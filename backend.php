<?php
	$data = array('New York', 'New Jersey', 'New Hampshire', 'New Delhi');
	$obj = array();
	$pattern = json_decode($_REQUEST['filter']);
	$pattern = "/".mb_strtoupper($pattern[0]->value)."/";
	
	$i = 0;
	foreach ($data as $key => $value) {
		if (preg_match($pattern, mb_strtoupper($value), $matches)) {
			$obj[$i] = (object)null;
			$obj[$i]->title = $value;
			$i++;
		}
	}
	echo json_encode($obj);