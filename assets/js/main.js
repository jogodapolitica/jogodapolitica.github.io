// VARIÁVEIS

var btnDownload = document.getElementById('btn-download');
var btnCollapse = document.getElementById('btn-collapse');

var tabItems = document.querySelectorAll('.tab__item');

// FUNÇÕES

window.onscroll = function() {
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
		document.body.classList.add('is-scrolling');
		btnDownload.classList.add('btn--transparent');
	} else {
		document.body.classList.remove('is-scrolling');
		btnDownload.classList.remove('btn--transparent');
	}
}

btnCollapse.onclick = function() {
	var menu = document.querySelector('.menu__container');

	this.classList.toggle('icon--close');

	if (menu.classList.contains('is-hidded')) {
		menu.classList.remove('is-hidded');
		menu.classList.add('is-collapsing');

		setTimeout(function(){
			menu.classList.remove('is-collapsing');
			menu.classList.add('is-collapsed');
		}, 150);
	} else {
		menu.classList.remove('is-collapsed');
		menu.classList.add('is-hidding');

		setTimeout(function(){
			menu.classList.remove('is-hidding');
			menu.classList.add('is-hidded');
		}, 150);
	}
}

document.querySelectorAll('a[href^="#"').forEach(anchor => {
	anchor.onclick = function(e) {
		e.preventDefault();

		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth',
			alignToTop: false
		});
	}
});

function tabs(obj) {
	var target = obj.getAttribute('data-href');
	var panel = document.getElementById(target);
	var siblings = getSiblings(obj, sameObjFilter);
	var tabSiblings = getSiblings(obj.parentElement.parentElement);

	for (var i = 0; i < siblings.length; i++)
		siblings[i].classList.remove('is-active');

	for (var i = 0; i < tabSiblings.length; i++){
		if (tabSiblings[i].classList.contains('tab-panel'))
			tabSiblings[i].classList.remove('is-active');
	}

	obj.classList.add('is-active');
	panel.classList.add('is-active');
}

function getSiblings(el, filter) {
	var siblings = [];
	obj = el;
	el = el.parentNode.firstChild;

	do {
		if ((!filter || filter(el, obj)) && el.nodeName != '#text')
			siblings.push(el);
	} while (el = el.nextSibling);

	return siblings;
}

function sameObjFilter(el, obj) {
	return el.nodeName === obj.nodeName;
}

