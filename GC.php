<?php
include 'config.php';

$spaceBefore = explode('M',shell_exec('du -sh /home'),3)[0]; // место до удаления
$deleteCount = shell_exec('cd /home/bhx20178/user_data; find -maxdepth 1  -type d -atime +'.$deleteTime.' | wc -l');// количество удаленных файлов

echo shell_exec('cd /home/bhx20178/user_data; find -maxdepth 1  -not -regex ".*/lab[1-9]" -type d -atime +'.$deleteTime.'  -exec rm -rf {} \;');// удаление сарых файлов

//echo shell_exec('cd /home/bhx20178/user_data; find -maxdepth 2 -type f -size +'.$maxSize.'M ').'<br><br>';

$Bigfiles = explode(' ',shell_exec('cd /home/bhx20178/user_data; find -maxdepth 2 -atime 1 -size +'.$maxSize.'M '),1000);//список больших файлов

foreach($Bigfiles as $file){
    if (substr($file,0,2)!='./')continue;
    $deleteCount+=1;
    shell_exec('cd /home/bhx20178/user_data; rm -f -r '.dirname($file).' ');//удаление больших папок
}


$spaceAfter = explode('M',shell_exec('du -sh /home'),3)[0];// место после удаления

$Count = shell_exec('cd /home/bhx20178/user_data; find -maxdepth 1  -type d  | wc -l') - 1;// количество файлов 

echo 'disk space: '.$spaceAfter.'M / 1024M <br>Folders count: '.$Count.'<br>Deleted: '.$deleteCount.' '.(intval($spaceBefore,10) - intval($spaceAfter,10)).'M';

?>
