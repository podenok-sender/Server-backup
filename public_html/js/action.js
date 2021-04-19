/*
$('#file').change(function() {
    if ($(this).val() != '') $(this).prev().text('Выбрано файлов: ' + $(this)[0].files.length);
    else $(this).prev().text('Выберите файлы');
});

function E(str, code){
		err++;		
		document.getElementById("Users").innerHTML += str+'<br>';
		document.getElementById("Codes").innerHTML += code+'<br>';
}

function addproject(){
	name1 = document.getElementById("name1").value.trim();
	if (/\s{1,}/.test(name1)){E(str, 'Пробелы в фамилии');return;}
	name1.replace(/(^|\-)[а-я]/,  str => str.toUpperCase())
	
	name2 = document.getElementById("name2").value.trim();
	if (/\s{1,}/.test(name2)){E(str, 'Пробелы в имени');return;}
	name2 = name2[0].toUpperCase();

	name3 = document.getElementById("name3").value.trim();
	if (/\s{1,}/.test(name3)){E(str, 'Пробелы в имени');return;}
	name3 = name2[0].toUpperCase();
return false;
}*/


function info(){

/*$.ajax({
		type: 'POST',
		url: 'PHP/API.php',
		data: {
			'action': 'save',
			'id': '',
			'name1': 'Яценко',
			'name2': 'Станислав',
			'name3': 'Сергеевич',
			'group':'95051',
			'lab': '1',
			'comments':'nope',
			'copyID':'4rdbDpHKB5SVuJJ2tAYoMTXNHCpHKyb4',
			'copyFiles':{'names':{'0' : 'lab2.pdf', '1' : 'lab3.pdf'}}
			},
		success: function (data, textStatus, request) {
			
			if(data.OK){

				 alert('OK');
				alert(data);
			}

			
			else	alert(data);
					
				
		},
		error: function (request, textStatus, errorThrown) {
			OnRequestFailed('-2', 'Login request error: ' + errorThrown, true);
		}
	});
*/
 $.ajax({
        url: 'PHP/API.php',
        type: 'POST',
        dataType: 'binary',
        xhrFields: {
            responseType: 'blob'
        },
        data: {
            action: 'download',
            id: '4rdbDpHKB5SVuJJ2tAYoMTXNHCpHKyb4',
            file: '2',
           tar: 'true'
        },
        success: function (data, status, xhr) {
            var blob = new Blob([data], { type: xhr.getResponseHeader('Content-Type') })
            var link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'download.png'
            link.click()
        }
    })


import {MDCMenu} from '@material/menu';

const menu = new MDCMenu(document.querySelector('.mdc-menu'));
menu.open = true;


}

