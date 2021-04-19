<?php 

?>
	<!doctype html>
	<html>

	<head>
		<title>podenok-sender</title>

		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta http-equiv="Content-type" content="text/html; charset=utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">

		<link rel="stylesheet" href="css/styles.css" type="text/css">
		<link rel="stylesheet" href="css/background.css" type="text/css">
		<link rel="stylesheet" href="css/select.css" type="text/css">
		<link rel="stylesheet" href="css/form.css" type="text/css">
		<link rel="stylesheet" href="css/tip.css" type="text/css">

		<link rel="stylesheet" href="css/drag&drop.css" />
        	<link rel="stylesheet" href="css/css-file-icons.css" />
		<link rel="stylesheet" href="css/share.css" />
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:400,300" type="text/css">


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="canonical" href="https://www.codesprogram.com/icons/Font-awesome-telegram-icon">
<link rel="alternate" media="only screen and (max-width:640px)" href="https://m.codesprogram.com/icons/Font-awesome-telegram-icon">



 		<link rel="shortcut icon" href="/images/favicon.png" type="image/png">
		<script src="https://code.jquery.com/jquery-3.4.1.js"></script>

		<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
		<script src="js/select.js"></script>
		<script src="js/background.js"></script>

		<script type="text/javascript" src="https://vk.com/js/api/share.js?95" charset="windows-1251"></script>
	</head>
<canvas id="canvas">


</canvas>

<div id="wrapper">
<!--
<form>
<input id="id" type="text" placeholder="id"><div id="search"><img src="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/search-512.png" width="32" height="32" alt="search" ></div>
<input id="name1" type="text"><select id="num" name="hero[]" style="
    height: 30px;
    margin: 10% 0 0 10%;
">
   			<option selected="" value="1">Лаборатрная работа 1</option>
			<option value="2">Лаборатрная работа 2</option>
    			<option value="3">Лаборатрная работа 3</option>
    			<option value="4">Лаборатрная работа 4</option>
   			<option value="5">Лаборатрная работа 5</option>
			<option value="6">Лаборатрная работа 6</option>
    			<option value="7">Лаборатрная работа 7</option>
    			<option value="8">Лаборатрная работа 8</option>
			<option value="9">Курсовой проект</option>
   			</select>
<input id="name2" type="text">
<input id="name3" type="text">    
</form>
-->







<div class="share">
  <nav>
    <a href="#" class="icon"><i class="fa fa-copy"></i></a>
    <a href="#" class="icon"><i class="fa fa-facebook"></i></a>
    <a href="https://vk.com/share.php?url=https%3A%2F%2Fbsuir.lab.bhuser.ru%2Fmobile.php" target="_blank" onclick="return VK.Share.click(0, this);" class="icon"><i class="fa fa-vk"></i></a>
    <a href="tg://msg_url?url=http%3A%2F%2Fpodonok.com%2Fmobile.php&text=%D0%9B%D0%B0%D0%B1%D0%BE%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%201"class="icon"><i class="fab fa-telegram-plane"></i></a>
  </nav>
<div> <i class="fa fa-share-alt"></i></div>
</div>




<form>
  <h1>Отправка лабораторных работ</h1>
  <div class="form">
    <p class="group"style="
    width: 216px;
    display: inline-block;
">
      <input  id="code" type="text" required>
      <label for="name">Код лабораторной</label>
    </p>
	<div id="anim">
    <span class="tooltip" data-tooltip="Код состоит из 32 символов. Оставьте пустым для загрузки новой лабораторной">?</span>
    </div>
    <p class="group">
      <input id="name1" type="text" required>
      <label for="name">Фамилия</label>
    </p>
    <p class="group">
      <input id="name2" type="text" required>
      <label for="name">Имя</label>
    </p>

    <p class="group">
      <input id="name3" type="text" required>
      <label for="name">Отчество</label>
    </p>
<div class="md-select">

  <label for="ul-id"><button type="button" class="ng-binding">Лаборатрная работа 1</button></label>
  <ul role="listbox" id="ul-id" class="md-whiteframe-z1" aria-activedescendant="state2_AK" name="ul-id">
    <li role="option" id="state1" class="ng-binding ng-scope active" tabindex="-1" aria-selected="true">Лаборатрная работа 1</li>
    <li role="option" id="state2" class="ng-binding ng-scope" tabindex="-1" aria-selected="false">Лабораторная работа 2</li>
    <li role="option" id="state3" class="ng-binding ng-scope" tabindex="-1" aria-selected="false">Лабораторная работа 3</li>
    <li role="option" id="state4" class="ng-binding ng-scope" tabindex="-1" aria-selected="false">Лабораторная работа 4</li>
    <li role="option" id="state5" class="ng-binding ng-scope" tabindex="-1" aria-selected="false">Лабораторная работа 5</li>
    <li role="option" id="state6" class="ng-binding ng-scope" tabindex="-1" aria-selected="false">Лабораторная работа 6</li>
 </ul>

</div>
    <p class="group">
      <input id="group" type="text" required>
      <label for="name">Группа</label>
    </p>

<p class="group">
   
   <span 
  class="input" 
  role="textbox" 
  contenteditable></span>
      <label for="name">Комментарий</label>
    </p><br/>
			
    <div class="drop-area">
		<div class="drop-area-content">
                 <span class = "group">Drag and drop</span>
           </div>           
		<input id="file-input" multiple="" type="file" name="file">
           
    </div>

    <input type="submit" value="Отправить">
    <input type="submit" value="Сохранить">

  </div>
</form>
<a class="follow"  href="https://github.com/podenok-sender" target="_blank"><img src="http://pngimg.com/uploads/github/github_PNG24.png"  height="30" alt="search" >
</a>



</div>



<!--<a class="follow" href="https://facebook.com/incredibleweb" target="_blank"><i class="fa fa-facebook"></i>Follow Me</a>
-->
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

<link href='https://fonts.googleapis.com/css?family=Roboto:400' rel='stylesheet' type='text/css'>








<script>

$('.md-select').on('click', function(){
  $(this).toggleClass('active')
})

$('.md-select ul li').on('click', function() {
  var v = $(this).text();
  $('.md-select ul li').not($(this)).removeClass('active');
  $(this).addClass('active');
  $('.md-select label button').text(v)
})

</script>




	<body>
		
			
			<header>

			</header>
			<div id="content">
		

		
			
			</div>
	</body>
<script src="js/share.js"></script>
<script src="js/drag&drop.js"></script>
	</html>