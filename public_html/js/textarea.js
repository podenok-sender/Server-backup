
 var oldHandler = window.onload;            
window.onload =  function (){
 oldHandler();
    let textareas = document.querySelectorAll('.txta'),
        hiddenDiv = document.createElement('div'),
        content = null;
    for (let j of textareas) {
        j.classList.add('txtstuff');
    }
    hiddenDiv.classList.add('txta');
    hiddenDiv.style.display = 'none';
    hiddenDiv.style.whiteSpace = 'pre-wrap';
    hiddenDiv.style.wordWrap = 'break-word';
    var last;

    for (let i of textareas) {
        (function (i) {
            i.addEventListener('input', function () {
                i.parentNode.appendChild(hiddenDiv);
                i.style.resize = 'none';
                i.style.overflow = 'hidden';
                if ((i.value.split('\n').length - 1) > 10) i.value = last;
                else last = i.value;
                content = i.value;
                content = content.replace(/\n/g, '<br>');
                hiddenDiv.innerHTML = content + '<br style="line-height: 40px;">';
                hiddenDiv.style.visibility = 'hidden';
                hiddenDiv.style.display = 'block';
               // i.style.height = ((int)i.style.height + 22) + 'px';
                
		i.style.height = hiddenDiv.offsetHeight + 'px';
                hiddenDiv.style.visibility = 'visible';
                hiddenDiv.style.display = 'none';
            });
        })(i);
    }
}