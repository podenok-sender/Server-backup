<?php
//-------------------------------------------------------------------------------------------------
//	API.php
// 
//	Описание:
//	Отвечает на три типа POST-запросов.
//
//	Аргументы POST-запроса:
//	action - тип запроса, принамает значения:		[string]
//		'info' - получение информации о лабораторной,
// 		'save' - сохранение лабораторной,
//		'sent' - отправка лабораторной электронным письмом.
//		'download' - Скачивает файл с сервера.
//
//	id - 32х символьная строка, адрес лабораторной работы.	[string:32]
//	name1 - фамилия студента.				[string]
//	name1 - имя студента.					[string]
//	name1 - отчество студента.				[string]
//	group - номер группы студента.				[string:6]
//	lab - '1 -'8' - номера лабораторных работ соответственно,
//	      '9' - курсовой проект.				[int:1-9]
//	comments - коменарии к работе (опционально).		[string]
//	copyFiles - список файлов для копирования.		[sring array]
//	copyID - арес файлов для копирования.			[string:32]
//	OK - код возврата.					[bool]
//	message - сообщение об ошибке.				[string]
//	file - название файла для скачивания 			[string]
//	tar - запрос на скачивание лабы в архиве		[bool]
//
//
//	Файлы POST-запроса:
//	[files] - двумерный массив файлов,
//	первое поле - одно из описанный далее,
//	второе поле - порядковый номер загружаемого файла.
//	(подробнее: https://www.php.net/manual/ru/features.file-upload.post-method.php)
//		[name] - названия файлов.			[string array]
//			[0] - информация о первом файле.	[string]
//			[1] - информация о втором файле.	[string]
//		[tmp_name] - временное имя в директории.	[string array]
//		[size] - размер фала в байтах.			[int array]
//		[error] - ошибки при загрузке файла.		[int array]
//
//
//	Пример запроса:
//	info - принимает: action, id; возвращает id, name1, name2, name3, group, lab, comments, files[name], OK, message;
// 	send - принимает: action, id; возвращает OK, message;
//	save - принимает: action, id, name1, name2, name3, group, lab, comments, copyFiles, copyID, files; возвращает OK, message;
//	download - принимает: action, id, file, tar; возвращает binary stream;
//
//-------------------------------------------------------------------------------------------------	

include 'mail.php';
include '../../config.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$path = __DIR__ . '/../../user_data/';

if ($_POST['action'] == 'info')
{
	header('Content-type: application/json; charset=utf-8');
	$file = $path . $_POST['id'] . '/info';
	if (!file_exists($file))
	{
		$res['OK'] = 0;
		$res['message'] = "INFO file not found";
		echo json_encode($res);
		return;
	}
	$info = json_decode(file_get_contents($file) , true);
 
	if (!is_numeric($info['group']) || strlen($info['group']) != 6 || $info['lab'] < 1 || $info['lab'] > 9 || $info['id'] != $_POST['id'] || count($info['files']['name']) < 1)
	{ // проверка корректности информации
		$res['OK'] = 0;
		$res['message'] = "Uncorrect INFO file";
		echo json_encode($res);
		return;
	}
	$info['OK'] = 1;
	echo json_encode($info);
	return;
}

if ($_POST['action'] == 'sent')
{

	header('Content-type: application/json; charset=utf-8');
	$path = __DIR__ . '/../../user_data/' . $_POST['id'] . '/';

	if (!file_exists($path . 'archive.tar.gz'))
	{ // проверка существования архива
		$res['OK'] = 0;
		$res['message'] = "archive.tar.gz not found";
		echo json_encode($res);
		return;
	}

	if (!file_exists($path . 'info'))
	{ // проверка существования файла данных
		$res['OK'] = 0;
		$res['message'] = "INFO file not found";
		echo json_encode($res);
		return;
	}

	$info = json_decode(file_get_contents($path . 'info') , true);

	if (!is_numeric($info['group']) || strlen($info['group']) != 6 || $info['lab'] < 1 || $info['lab'] > 9 || $info['id'] != $_POST['id'] || count($info['files']['name']) < 1)
	{ // проверка корректности информации
		$res['OK'] = 0;
		$res['message'] = "Uncorrect INFO file";
		echo json_encode($res);
		return;
	}

	$subject = $info['group'] . ' ' . $info['name1'] . ' ' . mb_substr($info['name2'], 0, 1,'utf-8') . '.' . mb_substr($info['name3'], 0, 1,'utf-8') . '. ';
	if ($info['lab'] < 9) $subject = $subject . 'Лабораторная работа №' . $info['lab'];
	if ($info['lab'] == 9) $subject = $subject . 'Курсовое проектирование';

    
    //echo newmail($subject,'','1');
   if (!array_key_exists('commen', $info))$info['comment'] = '';
   
	if (newmail($subject, $info['comment'].' ', $path . 'archive.tar.gz') < 1)
	{ // письмо не отправлено
		$res['OK'] = 0;
		$res['message'] = "Can't send email !";
		$res['mail'] = $subject;
		$res['path'] = $path;
		
		echo json_encode($res);
		return;
	}

	$res['OK'] = 1;
	echo json_encode($res);
	return;
}

if ($_POST['action'] == 'save')
{
    header('Content-type: application/json; charset=utf-8');
	$path = __DIR__ . '/../../user_data/';
	
    $_POST['name1'] = trim ($_POST['name1']);
    $_POST['name2'] = trim ($_POST['name2']);
    $_POST['name3'] = trim ($_POST['name3']);
 
	if (!is_numeric($_POST['group']) || strlen($_POST['group']) != 6 || $_POST['lab'] < 1 || $_POST['lab'] > 9 ||
	preg_match('/[^а-яёА-ЯЁ\-]/u',$_POST['name1'])==1 || strlen($_POST['name1']) < 4 ||
	preg_match('/[^а-яёА-ЯЁ]/u',$_POST['name2'])==1 || strlen($_POST['name2']) < 4 ||
    preg_match('/[^а-яёА-ЯЁ]/u',$_POST['name3'])==1 || strlen($_POST['name3']) < 4)
	{ // проверка корректности информации
		$res['OK'] = 0;
		$res['message'] = "Uncorrect input information";
		echo json_encode($res);
		return;
	}

	if ($_POST['id'] != '' && (!array_key_exists('uploaded', $_FILES) || count($_FILES['uploaded']['name']) == 0) && equal())
	{ // создание нового файла не требуется
	    $res['id'] = $_POST['id'];
        $res['name1'] = $_POST['name1'];
        $res['name2'] = $_POST['name2'];
        $res['name3'] = $_POST['name3'];
        $res['group'] = $_POST['group'];
        $res['lab'] = $_POST['lab'];
        $res['comments'] = $_POST['comments'];
        $res['OK'] = 1;
	    $res['message'] = "File aredy saved";
		echo json_encode($res);
		return;
	}

	$id = random(); // создание новой лабораторной
	$tempdir = $path . $id;
	$name = $_POST['name1'] . ' ' . mb_substr($_POST['name2'], 0, 1,'utf-8') . '.' . mb_substr($_POST['name3'], 0, 1,'utf-8') . '.'; // название папки пользователя
	mkdir($tempdir); // создание новой дериктории
	mkdir($tempdir . '/' . $name , 0755, true); // создание папки пользователя
	$name = $name . '/Лабораторная работа №' . $_POST['lab'];
	mkdir($tempdir . '/' . $name, 0755, true); // создание папки лабораторной
	
  
    $filesCount = 0;
	if ($_POST['copyID'] != '' && array_key_exists('copyFiles', $_POST) && count($_POST['copyFiles']['name']) > 0)
	{
		$copypath = $path . $_POST['copyID'] . '/' . foldername($_POST['copyID']);
        shell_exec('cd "'.$path . $_POST['copyID'].'"; tar -xf archive.tar.gz');
		for ($i = 0;$i < count($_POST['copyFiles']['name']);$i++) {
		    if (copy($copypath . '/' . $_POST['copyFiles']['name'][$i], $tempdir . '/' . $name .'/'. $_POST['copyFiles']['name'][$i])){
		        $info['files']['name'][$filesCount] = $_POST['copyFiles']['name'][$i];
		        $filesCount++;
		    }
		  	else {
		  	    deldir($copypath);
                deldir($tempdir);
                $res['OK'] = 0;
	            $res['message'] = 'can\'t copy file: ' . $_POST['copyFiles']['name'][$i];
	            echo json_encode($res);	
	            return;
		    }
		}
		deldir($copypath);
	}

	$totalSize = 0;
	
	if (array_key_exists('uploaded', $_FILES))
 	for ( $i = 0; $i < count($_FILES['uploaded']['name']); $i++){
	    $totalSize += $_FILES['uploaded']['size'][$i];
		if (move_uploaded_file ( $_FILES['uploaded']['tmp_name'][$i] ,  $tempdir . '/' . $name.'/'.$_FILES['uploaded']['name'][$i])){
				$info['files']['name'][$filesCount] = $_FILES['uploaded']['name'][$i];
		        $filesCount++;
		}
		else {
            deldir($tempdir);
            $res['OK'] = 0;
            if ($_FILES['uploaded']['size'][$i] >= 1024*2048)$res['message'] = 'file bigger than 2M : ' . $_FILES['uploaded']['name'][$i];
	        else $res['message'] = 'can\'t upload file: ' . $_FILES['uploaded']['name'][$i];
	        echo json_encode($res);	
	        return;
		}
	}
    
    if ($totalSize > 1024 * 1024 * $maxSize){
        deldir($tempdir);
        $res['OK'] = 0;
	    $res['message'] = 'total size more than '.$maxSize.'M';
	    echo json_encode($res);
	    return;
    }

    $val = shell_exec('cd "'.$tempdir . '/" ; tar -caf  "archive.tar.gz" "' . $name . '"');

    if ($val != ''){
        deldir($tempdir);
        $res['OK'] = 0;
	    $res['message'] = 'can\'t create .tar.gz eror: '.$val;
	    echo json_encode($res);
	    return;
    }
    
   	deldir($tempdir . '/' . $name);

    $info['id'] = $id;
    $info['name1'] = $_POST['name1'];
    $info['name2'] = $_POST['name2'];
    $info['name3'] = $_POST['name3'];
    $info['group'] = $_POST['group'];
    $info['lab'] = $_POST['lab'];
    $info['comments'] = $_POST['comments'];
    
    file_put_contents($tempdir . '/info', json_encode($info));
 
    $info['OK'] = 1;
	$info['message'] = "OK";
	echo json_encode($info);
	return;
    
}

if ($_POST['action'] == 'download')
{
	if (empty($_POST['id']) || (empty($_POST['file']) && empty($_POST['tar'])))
	{
	    header('Content-type: application/json; charset=utf-8');
	    $res['OK'] = 0;
		$res['message'] = "invalid request";
		echo json_encode($res);
		return;
	}

	$path = __DIR__ . '/../../user_data/' . $_POST['id'] . '/'; //путь к файлам лабы
	
	if ($_POST['tar'] == 'true')
	{
		$file = $path . 'archive.tar.gz'; // путь к архиву
	}
	else
	{
		if (!file_exists($path . 'info'))// проверка существования файла данных
		{ 
		    header('Content-type: application/json; charset=utf-8');
			$res['OK'] = 0;
		    $res['message'] = "INFO file not found";
		    echo json_encode($res);
		    return;
		}
		
		$info = json_decode(file_get_contents($path . 'info') , true);
		$foldername = foldername($_POST['id']);
		shell_exec('cd "'.$path.'"; tar -xf archive.tar.gz "'.$foldername.'/'.$_POST['file'].'"');
		$file =  $path. '/'. $foldername.'/'. $_POST['file']; // путь к искомому файлу
		
	}

	if (!file_exists($file)) // проверка файла на существование
	{
	    header('Content-type: application/json; charset=utf-8');
		$res['OK'] = 0;
	    $res['message'] = "file not found";
	    $res['file'] = $file;
	   echo json_encode($res);
	   return;
	}
	
	header('Content-Description: File Transfer');
	header('Content-Type: application/octet-stream');
	header('Content-Disposition: attachment; filename="' . basename($file) . '"');
	header('Expires: 0');
	header('Cache-Control: must-revalidate');
	header('Pragma: public');
	header('Content-Length: ' . filesize($file));
	readfile($file);
	if ($_POST['tar'] != 'true')
	deldir($path. '/'. $foldername);
    return;
}
 
//------------------------------------------functions-------------------------------------
function equal()
{

	$path = __DIR__ . '/../../user_data/';
	$file = $path . $_POST['id'] . '/info';

	if (!file_exists($file))
	{
		return false;
	}

	$info = json_decode(file_get_contents($file) , true);

	if ($info['id'] != $_POST['id'] || $info['name1'] != $_POST['name1'] || $info['name2'] != $_POST['name2'] || $info['name3'] != $_POST['name3'] || $info['group'] != $_POST['group'] || $info['lab'] != $_POST['lab'] || $info['comments'] != $_POST['comments'] || count($info['files']['name']) != count($_POST['copyFiles']['name']))
	{
		return false;
	}

	for ($i = 0;$i < count($info['files']['name']);$i++) 
    if ($info['files']['name'][$i] != $_POST['copyFiles']['name'][$i]) return false;
	return true;
}

function deldir($dir)
{
	$d = opendir($dir);
	while (($entry = readdir($d)) !== false)
	{
		if ($entry != "." && $entry != "..")
		{
			if (is_dir($dir . "/" . $entry))
			{
				deldir($dir . "/" . $entry);
			}
			else
			{
				unlink($dir . "/" . $entry);
			}
		}
	}
	closedir($d);
	rmdir($dir);
}

function random($length = 32)
{
	static $randStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	$rand = '';
	for ($i = 0;$i < $length;$i++)
	{
		$key = rand(0, strlen($randStr) - 1);
		$rand .= $randStr[$key];
	}
	return $rand;
}


function foldername($id)
{
	$info = json_decode(file_get_contents(__DIR__ . '/../../user_data/' . $id . '/' . 'info') , true);
	return $info['name1'] . ' ' . mb_substr($info['name2'], 0, 1,'utf-8') . '.' . mb_substr($info['name3'], 0, 1,'utf-8') . './Лабораторная работа №' . $info['lab'];
}

?>
