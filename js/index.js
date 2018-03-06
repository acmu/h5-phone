var getEle = function (selector) {
  return document.querySelector(selector);
}
var getEleAll = function (selector) {
  return document.querySelectorAll(selector);
}

var getCls = function (element) {
  return element.getAttribute('class');
}
var setCls = function (element, val) {
  element.setAttribute('class', val);
}
var addCls = function (element, cls) {
  var baseCls = getCls(element);
  if (baseCls.indexOf(cls) === -1) {
    setCls(element, baseCls + ' ' + cls);
  }
}
var delCls = function (element, cls) {
  var baseCls = getCls(element);
  if (baseCls.indexOf(cls) !== -1) {
    //替换空格，把连续的空格替换为一个空格
    setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
  }
}

var screenAnimateELements = {
  '.screen-1': [
    '.screen-1__heading',
    '.screen-1__phone',
    '.screen-1__shadow',
  ],
  '.screen-2': [
    '.screen-2__heading',
    '.screen-2__phone',
    '.screen-2__subheading',
    '.screen-2__point_i_1',
    '.screen-2__point_i_2',
    '.screen-2__point_i_3',
  ],
  '.screen-3': [
    '.screen-3__heading',
    '.screen-3__phone',
    '.screen-3__subheading',
    '.screen-3__features',
  ],
  '.screen-4': [
    '.screen-4__heading',
    '.screen-4__subheading',
    '.screen-4__type__item_i_1',
    '.screen-4__type__item_i_2',
    '.screen-4__type__item_i_3',
    '.screen-4__type__item_i_4',
  ],
  '.screen-5': [
    '.screen-5__heading',
    '.screen-5__subheading',
    '.screen-5__bg',
  ],
};
var setScreenAnimateInit = function (screenCls) {
  var screen = document.querySelector(screenCls); //直接获取的元素
  var animateElements = screenAnimateELements[screenCls];
  for (var i = 0; i < animateElements.length; i++) {
    var element = document.querySelector(animateElements[i]);
    var baseCls = element.getAttribute('class');
    element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
  }
}

var playScreenAnimateDone = function (screenCls) {
  var screen = document.querySelector(screenCls); //直接获取的元素
  var animateElements = screenAnimateELements[screenCls];
  for (var i = 0; i < animateElements.length; i++) {
    var element = document.querySelector(animateElements[i]);
    var baseCls = element.getAttribute('class');
    element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
  }
}
window.onload = function () {
  for (k in screenAnimateELements) {
    setScreenAnimateInit(k);
  }
}

//双向定位
var navItem = getEleAll('.header__nav-item');
var outlineItem = getEleAll('.outline__item');

var switchNavItemsActive = function (idx) {
  for (var i = 0; i < navItem.length; i++) {
    delCls(navItem[i], 'header__nav-item_status_active');
  }
  addCls(navItem[idx], 'header__nav-item_status_active');
  for (var i = 0; i < outlineItem.length; i++) {
    delCls(outlineItem[i], 'outline__item_staus_active');
  }
  addCls(outlineItem[idx], 'outline__item_staus_active');
}
switchNavItemsActive(0);
window.onscroll = function () {
  var top = document.documentElement.scrollTop;
  console.log(top);
  if (top > 80) {
    addCls(getEle('.header'), 'header_status_back');
    addCls(getEle('.outline'), 'outline_status_in');
  } else {
    delCls(getEle('.outline'), 'outline_status_in');
    delCls(getEle('.header'), 'header_status_back');
    switchNavItemsActive(0);
    navTip.style.left = '0px';
  }
  for (var i = 1; i < 5; i++) {
    if (top > 800 * i - 100) {
      playScreenAnimateDone('.screen-' + (i + 1));
      switchNavItemsActive(i);
      
      if(i != 5) {
      navTip.style.left = i * 70 + 'px';
    }
    }
  }
}


var setJump = function (i, lib) {
  var item = lib[i];
  item.onclick = function () {
    document.documentElement.scrollTop = i * 800;
  }
}

for (var i = 0; i < navItem.length; i++) {
  setJump(i, navItem);
}
for (var i = 0; i < outlineItem.length; i++) {
  setJump(i, outlineItem);
}
var navTip = getEle('.header__nav-tip');
var setTip = function (idx, lib) {
  lib[idx].onmouseover = function () {
    console.log(this, idx);
    if(idx != 5) {
      navTip.style.left = idx * 70 + 'px';
    }
  }
  lib[idx].onmouseout = function () {
    console.log(this, idx);
    for (var i = 0; i < navItem.length; i++) {
      if (getCls(lib[i]).indexOf('header__nav-item_status_active') != -1) {
        navTip.style.left = i * 70 + 'px';
      }
    }
  }
}

for (var i = 0; i < navItem.length; i++) {
  setTip(i, navItem);
}

setTimeout(()=>{ playScreenAnimateDone('.screen-1'); }, 200);