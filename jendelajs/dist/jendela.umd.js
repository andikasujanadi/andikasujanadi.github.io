(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jendelaJS = {}));
})(this, (function (exports) { 'use strict';

    var createWindowHeader = function createWindowHeader(title, minimizeButton, resizeButton, closeButton, control) {
      var minimizeListener, maximizeListener, closeListener;
      var windowHeader = document.createElement('div');
      windowHeader.className = 'header';
      var windowTitle = document.createElement('div');
      windowTitle.className = 'title';
      windowTitle.innerText = title;
      var windowButton = document.createElement('div');
      windowButton.className = 'headerButtonContainer';
      if (minimizeButton) {
        var _windowMinimize = document.createElement('div');
        _windowMinimize.className = 'headerButton headerButtonMinimize';
        _windowMinimize.innerHTML = '<div class="icon"></div>';
        minimizeListener = control.minimizeWindow;
        _windowMinimize.addEventListener('mouseup', minimizeListener);
        _windowMinimize.addEventListener('touchend', minimizeListener);
        windowButton.appendChild(_windowMinimize);
      }
      if (resizeButton) {
        var _windowResize = document.createElement('div');
        _windowResize.className = 'headerButton headerButtonResize';
        _windowResize.innerHTML = '<div class="icon"></div>';
        maximizeListener = control.maximizeWindow;
        _windowResize.addEventListener('mouseup', maximizeListener);
        _windowResize.addEventListener('touchend', maximizeListener);
        windowButton.appendChild(_windowResize);
      }
      if (closeButton) {
        var _windowClose = document.createElement('div');
        _windowClose.className = 'headerButton headerButtonClose';
        _windowClose.innerHTML = '<div class="icon"></div>';
        closeListener = control.closeWindow;
        _windowClose.addEventListener('mouseup', closeListener);
        _windowClose.addEventListener('touchend', closeListener);
        windowButton.appendChild(_windowClose);
      }
      windowHeader.appendChild(windowTitle);
      windowHeader.appendChild(windowButton);
      return windowHeader;
    };
    var windows = [];
    var addValueZIndex = 99;
    var addWindow = function addWindow() {
      var _params$title, _params$body, _params$theme, _params$minimizeButto, _params$resizeButton, _params$closeButton, _params$minWidth, _params$minHeight, _params$width, _params$height, _params$left, _params$top;
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var title = (_params$title = params.title) !== null && _params$title !== void 0 ? _params$title : '';
      var body = (_params$body = params.body) !== null && _params$body !== void 0 ? _params$body : '';
      var theme = (_params$theme = params.theme) !== null && _params$theme !== void 0 ? _params$theme : 'jendela-classic';
      var minimizeButton = (_params$minimizeButto = params.minimizeButton) !== null && _params$minimizeButto !== void 0 ? _params$minimizeButto : true;
      var resizeButton = (_params$resizeButton = params.resizeButton) !== null && _params$resizeButton !== void 0 ? _params$resizeButton : true;
      var closeButton = (_params$closeButton = params.closeButton) !== null && _params$closeButton !== void 0 ? _params$closeButton : true;
      var minWidth = (_params$minWidth = params.minWidth) !== null && _params$minWidth !== void 0 ? _params$minWidth : 200;
      var minHeight = (_params$minHeight = params.minHeight) !== null && _params$minHeight !== void 0 ? _params$minHeight : 200;
      var width = (_params$width = params.width) !== null && _params$width !== void 0 ? _params$width : minWidth;
      var height = (_params$height = params.height) !== null && _params$height !== void 0 ? _params$height : minHeight;
      var left = (_params$left = params.left) !== null && _params$left !== void 0 ? _params$left : false;
      var top = (_params$top = params.top) !== null && _params$top !== void 0 ? _params$top : false;
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;
      width = Math.min(parseInt(width), viewportWidth - 40);
      height = Math.min(parseInt(height), viewportHeight - 40);
      width = Math.max(width, minWidth);
      height = Math.max(height, minHeight);
      var parsedWidth = parseInt(width);
      var parsedHeight = parseInt(height);
      if (left) {
        var parsedLeft = parseInt(left);
        if (parsedLeft + parsedWidth > viewportWidth) {
          parsedLeft = viewportWidth - parsedWidth - 20;
        }
        if (parsedLeft < 0) {
          parsedLeft = 0;
        }
        left = parsedLeft;
      } else {
        left = "calc(50% - ".concat(width / 2, "px)");
      }
      if (top) {
        var parsedTop = parseInt(top);
        if (parsedTop + parsedHeight > viewportHeight) {
          parsedTop = viewportHeight - parsedHeight - 20;
        }
        if (parsedTop < 0) {
          parsedTop = 0;
        }
        top = parsedTop;
      } else {
        top = "calc(50% - ".concat(height / 2, "px)");
      }
      if (Number.isInteger(width)) {
        width = "".concat(width, "px");
      }
      if (Number.isInteger(height)) {
        height = "".concat(height, "px");
      }
      if (Number.isInteger(left)) {
        left = "".concat(left, "px");
      }
      if (Number.isInteger(top)) {
        top = "".concat(top, "px");
      }
      var newWindow = document.createElement('div');
      newWindow.className = "jendela ".concat(theme);
      var animateWindow = function animateWindow() {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
        newWindow.style.transition = "height ease ".concat(t, "ms, width ease ").concat(t, "ms, top ease ").concat(t, "ms, left ease ").concat(t, "ms, border ease ").concat(t, "ms, left ease ").concat(t, "ms, opacity ease ").concat(t, "ms, transform ease ").concat(t, "ms");
        setTimeout(function () {
          newWindow.style.transition = "box-shadow ease ".concat(t, "ms");
        }, t);
      };
      var maximizeWindow = function maximizeWindow() {
        var window = newWindow;
        var classes = window.classList;
        var isMaximized = false;
        var isMinimized = false;
        classes.forEach(function (className) {
          if (className.includes('maximized')) {
            isMaximized = true;
          }
          if (className.includes('minimized')) {
            isMinimized = true;
          }
        });
        if (isMaximized) {
          window.classList.remove('maximized');
        } else if (isMinimized) {
          window.classList.remove('minimized');
        } else {
          window.classList.add('maximized');
          window.classList.remove('minimized');
        }
        animateWindow(250);
      };
      var minimizeWindow = function minimizeWindow() {
        var window = newWindow;
        window.classList.remove('maximized');
        window.classList.add('minimized');
        animateWindow(250);
      };
      var closeWindow = function closeWindow() {
        var window = newWindow;
        window.style.transition = 'transform ease 0.3s, opacity ease 0.2s';
        window.style.transform = 'scale(0.75)';
        window.style.opacity = '0';
        setTimeout(function () {
          try {
            if (minimizeListener) {
              windowMinimize.removeEventListener('mouseup', minimizeListener);
              windowMinimize.removeEventListener('touchend', minimizeListener);
            }
          } catch (error) {}
          try {
            if (maximizeListener) {
              windowResize.removeEventListener('mouseup', maximizeListener);
              windowResize.removeEventListener('touchend', maximizeListener);
            }
          } catch (error) {}
          try {
            if (closeListener) {
              windowClose.removeEventListener('mouseup', closeListener);
              windowClose.removeEventListener('touchend', closeListener);
            }
          } catch (error) {}
          window.remove();
        }, 300);
      };
      var control = {
        maximizeWindow: maximizeWindow,
        minimizeWindow: minimizeWindow,
        closeWindow: closeWindow
      };
      var windowHeader = createWindowHeader(title, minimizeButton, resizeButton, closeButton, control);
      newWindow.appendChild(windowHeader);
      var windowBody = document.createElement('div');
      windowBody.className = 'body';
      windowBody.innerHTML = body;
      newWindow.appendChild(windowBody);
      newWindow.setAttribute('tabindex', '0');
      document.body.appendChild(newWindow);
      newWindow.style.width = width;
      newWindow.style.height = height;
      newWindow.style.left = left;
      newWindow.style.top = top;
      newWindow.setAttribute('data-min-width', minWidth);
      newWindow.setAttribute('data-min-height', minHeight);
      newWindow.focus();
      dragElement(newWindow);
      windows.push(newWindow);
      updateWindowZIndices();
      newWindow.style.opacity = 0;
      newWindow.style.transform = 'scale(0.75)';
      setTimeout(function () {
        animateWindow(100);
        newWindow.style.opacity = 1;
        newWindow.style.transform = 'scale(1)';
      }, 50);
      newWindow.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        newWindow.focus();
      });
      newWindow.addEventListener('touchstart', function (e) {
        e.stopPropagation();
        newWindow.focus();
      });
      newWindow.addEventListener('focus', function () {
        handleWindowClick(newWindow);
        newWindow.classList.remove('inactive');
      });
      newWindow.addEventListener('blur', function () {
        newWindow.classList.add('inactive');
      });
      return {
        element: newWindow,
        close: closeWindow,
        minimize: minimizeWindow,
        maximize: maximizeWindow
      };
    };
    function updateWindowZIndices() {
      windows.forEach(function (window, index) {
        window.style.zIndex = index + addValueZIndex;
      });
    }
    function handleWindowClick(windowElement) {
      var clickedIndex = windows.indexOf(windowElement);
      if (clickedIndex !== windows.length - 1) {
        var movedWindow = windows.splice(clickedIndex, 1)[0];
        windows.push(movedWindow);
        updateWindowZIndices();
      }
    }
    var refreshWindows = function refreshWindows() {
      var windows = document.querySelectorAll(".jendela");
      if (windows.length) {
        windows.forEach(function (window) {
          dragElement(window);
        });
      }
    };
    refreshWindows();
    function dragElement(element) {
      element.insertAdjacentHTML('afterbegin', "\n        <div class=\"topHandle\"></div>\n        <div class=\"bottomHandle\"></div>\n        <div class=\"startHandle\"></div>\n        <div class=\"endHandle\"></div>\n        <div class=\"nwHandle cornerHandle\"></div>\n        <div class=\"neHandle cornerHandle\"></div>\n        <div class=\"swHandle cornerHandle\"></div>\n        <div class=\"seHandle cornerHandle\"></div>\n    ");
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      var action = 'idle';
      var minWidth = parseInt(element.getAttribute('data-min-width'));
      var minHeight = parseInt(element.getAttribute('data-min-height'));
      var offsetX = 0,
        offsetY = 0;
      if (element.querySelector(".header")) {
        var handleBindings = [{
          selector: ".bottomHandle",
          event: resizeS
        }, {
          selector: ".topHandle",
          event: resizeN
        }, {
          selector: ".endHandle",
          event: resizeE
        }, {
          selector: ".startHandle",
          event: resizeW
        }, {
          selector: ".nwHandle",
          event: resizeNW
        }, {
          selector: ".neHandle",
          event: resizeNE
        }, {
          selector: ".swHandle",
          event: resizeSW
        }, {
          selector: ".seHandle",
          event: resizeSE
        }, {
          selector: ".header",
          event: dragMouseDown
        }];
        handleBindings.forEach(function (_ref) {
          var selector = _ref.selector,
            event = _ref.event;
          var handle = element.querySelector(selector);
          if (handle) {
            handle.onmousedown = event;
            handle.ontouchstart = event;
          }
        });
        var buttons = element.querySelectorAll(".headerButton");
        buttons.forEach(function (e) {
          e.onmousedown = preventDrag;
          e.ontouchstart = preventDrag;
        });
      } else {
        element.onmousedown = dragMouseDown;
        element.ontouchstart = dragMouseDown;
      }
      function resizeS(e) {
        action = 'resize-s';
        dragMouseDown(e);
      }
      function resizeN(e) {
        action = 'resize-n';
        dragMouseDown(e);
      }
      function resizeE(e) {
        action = 'resize-e';
        dragMouseDown(e);
      }
      function resizeW(e) {
        action = 'resize-w';
        dragMouseDown(e);
      }
      function resizeNW(e) {
        action = 'resize-nw';
        dragMouseDown(e);
      }
      function resizeNE(e) {
        action = 'resize-ne';
        dragMouseDown(e);
      }
      function resizeSW(e) {
        action = 'resize-sw';
        dragMouseDown(e);
      }
      function resizeSE(e) {
        action = 'resize-se';
        dragMouseDown(e);
      }
      function preventDrag(e) {
        action = 'dontmove';
        dragMouseDown(e);
      }
      function dragMouseDown(e) {
        if (action == 'idle') {
          action = 'move';
        }
        e = e || window.event;
        e.preventDefault();
        pos3 = e.type === 'touchstart' ? e.changedTouches[0].clientX : e.clientX;
        pos4 = e.type === 'touchstart' ? e.changedTouches[0].clientY : e.clientY;
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
      }
      function elementDrag(e) {
        e = e || window.event;
        var positionX = e.type === 'touchmove' ? e.changedTouches[0].clientX : e.clientX;
        var positionY = e.type === 'touchmove' ? e.changedTouches[0].clientY : e.clientY;
        pos1 = pos3 - positionX;
        pos2 = pos4 - positionY;
        pos3 = positionX;
        pos4 = positionY;
        if (action !== 'dontmove') {
          if (action !== 'resize-w' && action !== 'resize-e') {
            element.style.top = element.offsetTop - pos2 + "px";
          }
          if (action !== 'resize-n' && action !== 'resize-s') {
            element.style.left = element.offsetLeft - pos1 + "px";
          }
        }
        if (action !== 'move') {
          if (action === 'resize-n' || action === 'resize-nw' || action === 'resize-ne') {
            if (element.clientHeight + pos2 >= minHeight && offsetY >= 0) {
              element.style.height = "".concat(element.clientHeight + pos2, "px");
            } else {
              element.style.height = "".concat(minHeight, "px");
              element.style.top = "".concat(element.offsetTop + pos2, "px");
              offsetY += pos2;
            }
          }
          if (action === 'resize-s' || action === 'resize-sw' || action === 'resize-se') {
            if (element.clientHeight - pos2 >= minHeight && offsetY <= 0) {
              element.style.top = "".concat(element.offsetTop + pos2, "px");
              element.style.height = "".concat(element.clientHeight - pos2, "px");
            } else {
              element.style.height = "".concat(minHeight, "px");
              element.style.top = "".concat(element.offsetTop + pos2, "px");
              offsetY += pos2;
            }
          }
          if (action === 'resize-w' || action === 'resize-nw' || action === 'resize-sw') {
            if (element.clientWidth + pos1 >= minWidth && offsetX >= 0) {
              element.style.width = element.clientWidth + pos1 + "px";
            } else {
              element.style.width = "".concat(minWidth, "px");
              element.style.left = element.offsetLeft + pos1 + "px";
              offsetX += pos1;
            }
          }
          if (action === 'resize-e' || action === 'resize-ne' || action === 'resize-se') {
            if (element.clientWidth - pos1 >= minWidth && offsetX <= 0) {
              element.style.left = element.offsetLeft + pos1 + "px";
              element.style.width = element.clientWidth - pos1 + "px";
            } else {
              element.style.width = "".concat(minWidth, "px");
              element.style.left = element.offsetLeft + pos1 + "px";
              offsetX += pos1;
            }
          }
        }
      }
      function closeDragElement() {
        document.onmouseup = null;
        document.ontouchup = null;
        document.onmousemove = null;
        document.ontouchmove = null;
        action = 'idle';
        offsetX = 0;
        offsetY = 0;
      }
    }

    exports.addWindow = addWindow;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
