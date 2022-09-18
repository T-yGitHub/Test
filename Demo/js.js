//共享load事件→使用情况:同一时间加载多个函数
function addloadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') { //判断是否调用过函数
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
//insertBefore():在已有元素前插入一个新元素
//语法parentElement.insertBefore(newElement,targetElement)
//编写insertAfter()函数
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling)
    }
}
//动态创建标记
function preparePlacehodler() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById('imagegallery')) return false;
    var placeholder = document.createElement('img');
    placeholder.setAttribute('id', 'placeholder');
    placeholder.setAttribute('src', 'images/cloud.jpg');
    placeholder.setAttribute('alt', 'my image gallery');
    var description = document.createElement('p');
    description.setAttribute('id', 'description');
    var desctext = document.createTextNode('Choose an image');
    description.appendChild(desctext);
    var gallery = document.getElementById('imagegallery')
    //document.getElementsByTagName('body')[0].appendChild('placeholder');
    //document.getElementsByTagName('body')[0].appendChild('description');
    //HTML-DOM写法↓
    //document.body.appendChild('placeholder');
    //document.body.appendChild('description');
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}
//添加事件处理函数
function prepareGallery() {
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById('imagegallery')) return false;
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return showPic(this) ? false : true; //在showPic()成功执行后，取消链接被点击时的默认行为
        }
    }
}
//获取和设置元素属性
function showPic(whichPic) {
    //获取元素属性并更改元素属性
    if (!document.getElementById('placeholder')) return false;
    var source = whichPic.getAttribute('href');
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != 'IMG') return false; //nodeName的返回值为大写字母
    placeholder.setAttribute("src", source);
    //获取P元素节点中文本节点的值并修改其值
    if (document.getElementById('description')) {
        var text = whichPic.getAttribute('title') ? whichPic.getAttribute('title') : ""; //三元操作检查title属性是否存在
        var description = document.getElementById('description');
        if (description.firstChild.nodeType == 3) { //检查ID为description第一个节点的节点属性是否为文本节点
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}
//addloadEvent()括号里为需调用的函数
addloadEvent(preparePlacehodler);
addloadEvent(prepareGallery);