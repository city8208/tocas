// Generated by CoffeeScript 2.0.0-beta4
(function() {
  // ------------------------------------------------------------------------
  // 變數與常數設置
  // ------------------------------------------------------------------------

  // 模組名稱。
  var Attribute, ClassName, EVENT_NAMESPACE, Error, Event, MODULE_NAMESPACE, Metadata, NAME, Position, Selector, Settings, duration;

  NAME = 'popup';

  // 模組事件鍵名。
  EVENT_NAMESPACE = `.${NAME}`;

  // 模組命名空間。
  MODULE_NAMESPACE = `module-${NAME}`;

  // 模組設定。
  Settings = {
    // 消音所有提示，甚至是錯誤訊息。
    silent: false,
    // 顯示除錯訊息。
    debug: true,
    // 監聽 DOM 結構異動並自動重整快取。
    observeChanges: true,
    // 欲使用的彈出式訊息元素選擇器（如果已經有先建立好的話），`false` 的話則是即時產生。
    popup: false,
    // 同時是否僅能有一個彈出式訊息出現在螢幕上。
    exclusive: false,
    // 彈出式訊息的邊界元素，彈出式訊息會試圖不要超過這個元素。
    boundary: 'body',
    // 即時產生的彈出式訊息應該要被擺置在哪個元素內。
    context: 'body',
    // 此彈出式訊息偵測畫面是否有捲動的元素選擇器，如果指定元素有捲動事件則會自動隱藏此彈出式訊息。
    scrollContext: window,
    // 如果有指定邊緣選擇器，彈出訊息則會試著依靠這個父元素的邊緣，適合用於表格的標頭等。
    edgeContext: false,
    // 偏好的彈出式訊息出現位置。
    position: 'top',
    // 欲觸發彈出式訊息的事件，如：`click`、`hover`、`focus`。
    on: 'hover',
    // 觸發的延遲毫秒數。
    delay: {
      // 欲顯示彈出式訊息前所需的毫秒數。
      show: 50,
      // 隱藏彈出式訊息前所等待的毫秒數。
      hide: 0
    },
    // 過場動畫。
    transition: 'auto',
    // 過場動畫的演繹毫秒時間。
    duration: 'auto',
    // 游標是否能在彈出式訊息遊走，如：導覽式彈出選單。
    hoverable: false,
    // 是否能在點擊彈出式訊息以外的地方自動關閉。
    closable: true,
    // 是否要在指定捲動時自動隱藏此彈出式訊息。
    hideOnScroll: 'auto',
    // 是否帶有指標外觀。
    pointing: true,
    // 是否為反色外觀。
    inverted: false,
    // 大小尺寸。
    size: 'medium',
    // 目標元素選擇器，彈出式訊息會以這個元素為主。
    target: false,
    // 欲套用的樣式名稱，以空白分隔。
    variation: false,
    // 內容純文字。
    content: false,
    // 標題純文字。
    title: false,
    // 彈出式訊息的 HTML 內容，如果採用此屬性則會忽略 `content` 與 `title`。
    html: false,
    // 當彈出式訊息被建立時所會呼叫的回呼函式。
    onCreate: () => {},
    // 當彈出式訊息不再被需要且從頁面上移除時所會呼叫的回呼函式。
    onRemove: () => {},
    // 當彈出式訊息開始顯示時所會呼叫的回呼函式，回傳 `false` 將會停止顯示。
    onShow: () => {
      return true;
    },
    // 當彈出式訊息動畫結束並顯示在畫面上時所會呼叫的回呼函式。
    onVisible: () => {},
    // 當彈出式訊息開始消失時所會呼叫的回呼函式，回傳 `false` 將會避免消失。
    onHide: () => {
      return true;
    },
    // 當彈出式訊息已經完全消失時所會呼叫的回呼函式。
    onHidden: () => {},
    // 當彈出式訊息無法在畫面上產生或放置（不合適尺寸）時所會呼叫的回呼函式。
    onUnplaceable: () => {}
  };

  // 事件名稱。
  Event = {
    CREATE: `create${EVENT_NAMESPACE}`,
    REMOVE: `remove${EVENT_NAMESPACE}`,
    SHOW: `show${EVENT_NAMESPACE}`,
    VISIBLE: `visible${EVENT_NAMESPACE}`,
    HIDE: `hide${EVENT_NAMESPACE}`,
    HIDDEN: `hidden${EVENT_NAMESPACE}`,
    UNPLACEABLE: `unplaceable${EVENT_NAMESPACE}`,
    CLICK: `click${EVENT_NAMESPACE}`,
    FOCUS: `focus${EVENT_NAMESPACE}`,
    SCROLL: `scroll${EVENT_NAMESPACE}`,
    MOUSEMOVE: `mousemove${EVENT_NAMESPACE}`,
    MOUSEENTER: `mouseenter${EVENT_NAMESPACE}`,
    MOUSELEAVE: `mouseleave${EVENT_NAMESPACE}`,
    MOUSEOUT: `mouseout${EVENT_NAMESPACE}`,
    ANIMATIONEND: 'animationend'
  };

  // 樣式名稱。
  ClassName = {
    TOP: 'top',
    LEFT: 'left',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    CENTER: 'center',
    VISIBLE: 'visible',
    ANIMATING: 'animating',
    HIDDEN: 'hidden',
    CUSTOM: 'custom',
    POPUP: 'ts popup',
    TITLE: 'title',
    CONTENT: 'content',
    ARROW: 'arrow',
    HOVERABLE: 'hoverable',
    MEDIUM: 'medium',
    INVERTED: 'inverted',
    POINTING: 'pointing',
    SIZES: 'mini tiny small medium large big huge massive'
  };

  // 位置。
  Position = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right'
  };

  // 中繼資料。
  Metadata = {
    SHOW_TIMER: 'showTimer',
    HIDE_TIMER: 'hideTimer'
  };

  // 選擇器名稱。
  Selector = {
    BODY: 'body',
    DIV: '<div>',
    ARROW: '.arrow',
    POPUP: '.ts.popup'
  };

  // 元素標籤。
  Attribute = {
    CONTENT: 'data-content',
    HTML: 'data-html',
    TITLE: 'data-title',
    VARIATION: 'data-variation',
    TRANSITION: 'data-popup-transition',
    POSITION: 'data-position',
    STYLE: 'style'
  };

  // 錯誤訊息。
  Error = {};

  // 過場動畫毫秒。
  duration = 200;

  // ------------------------------------------------------------------------
  // 模組註冊
  // ------------------------------------------------------------------------
  ts.register({NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) => {
    var $body, $boundary, $popup, $scrollContext, arrowSize, boundary, boundaryRect, module, offset, padding, popupRect, rect, scrollContext;
    // ------------------------------------------------------------------------
    // 區域變數
    // ------------------------------------------------------------------------
    $body = ts(Selector.BODY);
    $popup = ts();
    $boundary = ts();
    popupRect = {};
    rect = {};
    boundaryRect = {};
    boundary = null;
    $scrollContext = ts();
    scrollContext = null;
    offset = 20;
    padding = 10;
    arrowSize = 14;
    // ------------------------------------------------------------------------
    // 模組定義
    // ------------------------------------------------------------------------
    return module = {
      show: (callback) => {
        module.remove.timers();
        if (module.is.animating()) {
          return;
        }
        if (module.is.visible()) {
          return;
        }
        module.calculate.popup.position();
        module.animate.show(() => {
          module.set.animating(false);
          if (callback != null) {
            return callback.call();
          }
        });
        return $allModules;
      },
      hide: (callback) => {
        module.remove.timers();
        if (module.is.animating()) {
          return;
        }
        if (module.is.hidden()) {
          return;
        }
        module.animate.hide(() => {
          module.set.animating(false);
          if (callback != null) {
            return callback.call();
          }
        });
        return $allModules;
      },
      hideAll: () => {
        return $allModules;
      },
      remove: {
        timers: () => {
          module.remove.show.timer();
          return module.remove.hide.timer();
        },
        show: {
          timer: () => {
            return $this.removeTimer(Metadata.SHOW_TIMER);
          }
        },
        hide: {
          timer: () => {
            return $this.removeTimer(Metadata.HIDE_TIMER);
          }
        }
      },
      set: {
        position: (position, modify = false) => {
          $popup.attr(Attribute.POSITION, position);
          if (modify) {
            return settings.position = position;
          }
        },
        transition: (transition) => {
          settings.transition = transition;
          $popup.attr(Attribute.TRANSITION, transition);
          if (settings.duration !== 'auto') {
            // IF SET
            // IF SET
            switch (settings.transition) {
              case 'fade':
                return duration = 300;
            }
          }
        },
        pointing: (value) => {
          settings.pointing = value;
          if (value) {
            return $popup.addClass(ClassName.POINTING);
          } else {
            return $popup.removeClass(ClassName.POINTING);
          }
        },
        inverted: (value) => {
          settings.inverted = value;
          if (value) {
            return $popup.addClass(ClassName.INVERTED);
          } else {
            return $popup.removeClass(ClassName.INVERTED);
          }
        },
        hoverable: (value) => {
          settings.hoverable = value;
          if (value) {
            return $popup.addClass(ClassName.HOVERABLE);
          } else {
            return $popup.removeClass(ClassName.HOVERABLE);
          }
        },
        boundary: (selector) => {
          $boundary = $this.closest(selector);
          return boundary = $boundary.get();
        },
        scrollContext: (selector) => {
          $scrollContext = ts(selector);
          return scrollContext = $scrollContext.get();
        },
        coordinate: (x, y) => {
          return $popup.css({
            top: x,
            left: y
          });
        },
        width: (width) => {
          return $popup.css({
            width: width
          });
        },
        animating: (value) => {
          if (value) {
            return $popup.addClass(ClassName.ANIMATING);
          } else {
            return $popup.removeClass(ClassName.ANIMATING);
          }
        },
        variation: (value) => {
          return $popup.addClass(value);
        },
        size: (size) => {
          $popup.removeClass(ClassName.SIZES).addClass(size);
          return $allModules;
        },
        show: {
          timer: () => {
            return $this.setTimer({
              name: Metadata.SHOW_TIMER,
              callback: module.show,
              interval: settings.delay.show,
              looping: false,
              visible: true
            });
          }
        },
        hide: {
          timer: () => {
            return $this.setTimer({
              name: Metadata.HIDE_TIMER,
              callback: module.hide,
              interval: settings.delay.hide,
              looping: false,
              visible: true
            });
          }
        }
      },
      init: {
        popup: () => {
          var $arrow, $next;
          if ($popup.exists()) {
            return $popup;
          }
          $next = $this.next();
          if ($next.is(Selector.POPUP)) {
            $popup = $next;
          } else {
            module.create.popup();
          }
          $arrow = ts(Selector.DIV).addClass(ClassName.ARROW).appendTo($popup);
          return $popup;
        }
      },
      get: {
        distance: () => {
          var bRect, bottom, isBody, right;
          bRect = boundaryRect;
          isBody = $boundary.is(Selector.BODY);
          if (isBody) {
            bRect.top = 0;
            bRect.left = 0;
            bRect.bottom = 0;
            bRect.right = 0;
            bRect.width = document.body.clientWidth;
            bRect.height = document.body.clientHeight;
          }
          right = (bRect.left + bRect.width) - (rect.left + rect.width);
          bottom = (bRect.top + bRect.height) - (rect.top + rect.height);
          if (isBody) {
            right = bRect.width - (rect.left + rect.width);
            bottom = bRect.height - (rect.top + rect.height);
          }
          return {
            viewport: {
              top: rect.top - bRect.top,
              left: rect.left - bRect.left,
              right: bRect.width - rect.left - bRect.left - rect.width,
              bottom: bRect.height - rect.top - bRect.top - rect.height,
              width: rect.width,
              height: rect.height
            },
            inBoundary: {
              top: element.offsetTop,
              left: element.offsetLeft,
              right: boundary.clientWidth - (element.offsetLeft + rect.width),
              bottom: boundary.scrollHeight - (element.offsetTop + rect.height),
              width: rect.width,
              height: rect.height
            },
            boundary: {
              top: bRect.top,
              left: bRect.left,
              right: bRect.right,
              bottom: bRect.bottom,
              width: bRect.width,
              height: bRect.height,
              scrollHeight: boundary.scrollHeight,
              scrollWidth: boundary.scrollWidth
            }
          };
        },
        position: () => {
          return $popup.attr(Attribute.POSITION);
        }
      },
      reposition: {
        arrow: () => {
          var $arrow;
          $arrow = $popup.find(Selector.ARROW).removeAttr(Attribute.STYLE);
          return setTimeout(() => {
            module.refresh();
            switch (module.get.position()) {
              case Position.TOP:
                return $arrow.css({
                  left: (rect.left + rect.width / 2) - popupRect.left - 8 - 2,
                  top: popupRect.height - 2
                });
              case Position.RIGHT:
                return $arrow.css({
                  left: -20,
                  top: (rect.top + rect.height / 2) - popupRect.top - 8 - 2
                });
              case Position.BOTTOM:
                return $arrow.css({
                  left: (rect.left + rect.width / 2) - popupRect.left - 8 - 2,
                  top: -20
                });
              case Position.LEFT:
                return $arrow.css({
                  left: popupRect.width - 2,
                  top: (rect.top + rect.height / 2) - popupRect.top - 8 - 2
                });
            }
          }, 0);
        }
      },
      calculate: {
        direction: () => {
          var bottomOK, direction, distance, leftOK, rightOK, topOK;
          distance = module.get.distance();
          topOK = distance.viewport.top > popupRect.height + arrowSize;
          rightOK = distance.viewport.right > popupRect.width + arrowSize;
          bottomOK = distance.viewport.bottom > popupRect.height + arrowSize;
          leftOK = distance.viewport.left > popupRect.width + arrowSize;
          direction = '';
          switch (settings.position) {
            case Position.TOP:
              if (topOK) {
                direction = Position.TOP;
              }
              break;
            case Position.RIGHT:
              if (rightOK) {
                direction = Position.RIGHT;
              }
              break;
            case Position.BOTTOM:
              if (bottomOK) {
                direction = Position.BOTTOM;
              }
              break;
            case Position.LEFT:
              if (leftOK) {
                direction = Position.LEFT;
              }
          }
          if (direction === settings.position) {
            return direction;
          }
          switch (false) {
            case !topOK:
              direction = Position.TOP;
              break;
            case !bottomOK:
              direction = Position.BOTTOM;
              break;
            case !rightOK:
              direction = Position.RIGHT;
              break;
            case !leftOK:
              direction = Position.LEFT;
          }
          return direction;
        },
        popup: {
          position: () => {
            var direction, distance, position;
            module.refresh();
            distance = module.get.distance();
            direction = module.calculate.direction();
            position = '';
            console.log(distance);
            if (direction === '') {
              console.log('NOPE');
            }
            direction = Position.BOTTOM;
            switch (direction) {
              case Position.TOP:
                $popup.css({
                  top: distance.inBoundary.top - popupRect.height
                });
                break;
              case Position.RIGHT:
                $popup.css({
                  left: distance.inBoundary.left + rect.width
                });
                break;
              case Position.BOTTOM:
                $popup.css({
                  top: distance.inBoundary.top + rect.height
                });
                break;
              case Position.LEFT:
                $popup.css({
                  left: distance.inBoundary.left - popupRect.width
                });
            }
            switch (direction) {
              case Position.TOP:
              case Position.BOTTOM:
                // 如果左右各有空間，那麼就置中彈出式訊息。
                if (distance.inBoundary.left > popupRect.width / 2 && distance.inBoundary.right > popupRect.width / 2) {
                  console.log("A");
                  $popup.css({
                    left: (distance.inBoundary.left + rect.width / 2) - popupRect.width / 2
                  });
                } else {
                  // 否則。
                  console.log("B");
                  // 如果彈出式訊息突出限界。
                  if (((distance.inBoundary.left + popupRect.width) - distance.boundary.width < 0 && distance.inBoundary.left < distance.boundary.width / 2) || ((distance.inBoundary.left + rect.width) - popupRect.width - distance.boundary.width < 0 && distance.inBoundary.left > distance.boundary.width / 2)) {
                    console.log("C");
                    // 如果按鈕在左半邊。
                    if (distance.inBoundary.left < distance.boundary.width / 2) {
                      console.log("D");
                      // 就讓彈出式訊息靠齊左側。

                      //$popup.css
                      //    left: 0
                      //    #left: distance.inBoundary.left
                      $popup.css({
                        left: distance.inBoundary.left
                      });
                    } else {
                      //console.log distance.inBoundary.left + popupRect.width, distance.boundary.width

                      //if distance.inBoundary.left + popupRect.width > distance.boundary.width
                      //    $popup.css
                      //        left: 0
                      //else
                      //    $popup.css
                      //        left: distance.inBoundary.left
                      // 如果在右半邊。
                      console.log("E");
                      // 就讓彈出式訊息靠右側。
                      $popup.css({
                        left: distance.inBoundary.left + rect.width - popupRect.width
                      });
                    }
                  } else {
                    console.log("F");
                    $popup.css({
                      left: distance.boundary.width - popupRect.width - 2
                    });
                  }
                }
                break;
              //if distance.viewport.left > distance.viewport.right
              //    $popup.css
              //        left: distance.inBoundary.left + rect.width - popupRect.width + distance.viewport.right
              //else
              //    $popup.css
              //        left: distance.inBoundary.left - distance.viewport.left
              case Position.LEFT:
              case Position.RIGHT:
                if (distance.viewport.top > popupRect.height / 2 && distance.viewport.bottom > popupRect.height / 2) {
                  $popup.css({
                    top: (distance.inBoundary.top + rect.height / 2) - popupRect.height / 2
                  });
                } else {
                  if (distance.viewport.top > distance.viewport.bottom) {
                    $popup.css({
                      top: distance.inBoundary.top + rect.height - popupRect.height + distance.viewport.bottom - padding
                    });
                  } else {
                    $popup.css({
                      top: distance.inBoundary.top - distance.viewport.top + padding
                    });
                  }
                }
            }
            module.set.position(direction);
            return module.reposition.arrow();
          }
        }
      },
      toggle: () => {
        if (module.is.hidden()) {
          module.show();
        } else {
          module.hide();
        }
        return $allModules;
      },
      change: {
        title: (title) => {
          $popup.find(Selector.TITLE).html(title);
          return $allModules;
        },
        content: (content) => {
          $popup.find(Selector.CONTENT).html(content);
          return $allModules;
        },
        html: (html) => {
          $popup.html(html);
          return $allModules;
        }
      },
      animate: {
        show: (callback) => {
          return $popup.addClass(`${ClassName.VISIBLE} ${ClassName.ANIMATING}`).off(Event.ANIMATIONEND).one(Event.ANIMATIONEND, () => {
            if (callback != null) {
              return callback.call();
            }
          }).emulate(Event.ANIMATIONEND, duration);
        },
        hide: (callback) => {
          return $popup.removeClass(ClassName.VISIBLE).addClass(ClassName.ANIMATING).one(Event.ANIMATIONEND, () => {
            if (callback != null) {
              return callback.call();
            }
          }).emulate(Event.ANIMATIONEND, duration);
        }
      },
      is: {
        visible: () => {
          return $popup.hasClass(ClassName.VISIBLE);
        },
        hidden: () => {
          return !module.is.visible();
        },
        showing: () => {
          return $this.hasTimer(Metadata.SHOW_TIMER);
        },
        hiding: () => {
          return $this.hasTimer(Metadata.HIDE_TIMER);
        },
        animating: () => {
          return $popup.hasClass(ClassName.ANIMATING);
        },
        hoverable: () => {
          return settings.hoverable === true;
        },
        arrow: {
          bounding: (x, y) => {
            switch (module.get.position()) {
              case Position.TOP:
                if (y > popupRect.bottom && y < rect.top && x < popupRect.right && x > popupRect.left) {

                }
                break;
              case Position.RIGHT:
                if (y < popupRect.bottom && y > popupRect.top && x < popupRect.left && x > rect.right) {

                }
                break;
              case Position.BOTTOM:
                if (y > rect.bottom && y < popupRect.top && x < popupRect.right && x > popupRect.left) {

                }
                break;
              case Position.LEFT:
                if (y < popupRect.bottom && y > popupRect.top && x < rect.left && x > popupRect.right) {

                }
            }
          }
        }
      },
      create: {
        popup: () => {
          var $content, $title, attr, content, html, title, variation;
          variation = settings.variation || '';
          content = settings.content || '';
          html = settings.html || '';
          title = settings.title || '';
          attr = {
            variation: $this.attr(Attribute.VARIATION),
            content: $this.attr(Attribute.CONTENT),
            title: $this.attr(Attribute.TITLE),
            html: $this.attr(Attribute.HTML)
          };
          if (attr.variation !== null) {
            variation = attr.variation;
          }
          if (attr.content !== null) {
            content = attr.content;
          }
          if (attr.title !== null) {
            title = attr.title;
          }
          if (attr.html !== null) {
            html = attr.html;
          }
          $popup = ts(Selector.DIV).addClass(`${ClassName.POPUP} ${variation}`);
          if (html !== '') {
            $popup.html(html);
          }
          if (content !== '') {
            $content = ts(Selector.DIV).addClass(ClassName.CONTENT).html(content);
            $title = ts(Selector.DIV).addClass(ClassName.TITLE).html(title);
            if (title !== '') {
              $popup.append($title);
            }
            $popup.append($content);
          }
          return $popup.insertAfter($this);
        }
      },
      exists: () => {},
      repaint: () => {
        return $popup.repaint();
      },
      //reposition: =>

      //remove:
      //    popup: =>
      trigger: () => {},
      hover: {
        handler: (event) => {
          var isHoverable, isPointingChild, isPointingPopup, isPointingSelf, pointElement;
          if (!$popup.exists()) {
            return;
          }
          pointElement = ts.fromPoint(event.clientX, event.clientY).get();
          isPointingSelf = $this.is(pointElement);
          isPointingChild = $this.contains(pointElement);
          isPointingPopup = $popup.contains(pointElement);
          isHoverable = module.is.hoverable();
          if (isPointingSelf || isPointingChild) {
            module.remove.hide.timer();
            if (!module.is.showing()) {
              module.set.show.timer();
            }
            return;
          }
          if (!isHoverable) {
            module.remove.show.timer();
            if (!module.is.hiding()) {
              module.set.hide.timer();
            }
            return;
          }
          if (isPointingPopup) {
            module.remove.hide.timer();
            return;
          }
          module.refresh();
          if (module.is.arrow.bounding(event.clientY, event.clientX)) {
            return;
          }
          module.remove.show.timer();
          if (!module.is.hiding()) {
            return module.set.hide.timer();
          }
        }
      },
      click: {
        handler: (event) => {
          var isPointingPopup, isPointingSelf, pointElement;
          pointElement = ts.fromPoint(event.clientX, event.clientY).get();
          isPointingSelf = $this.is(pointElement);
          isPointingPopup = $popup.contains(pointElement);
          if (isPointingSelf) {
            module.toggle();
            return;
          }
          if (!isPointingPopup && settings.closable) {
            return module.hide();
          }
        }
      },
      focus: {
        handler: (event) => {}
      },
      scroll: {
        handler: () => {
          return module.hide();
        }
      },
      bind: {
        hover: () => {
          return $body.on(Event.MOUSEMOVE, module.hover.handler);
        },
        click: () => {
          return $body.on(Event.CLICK, module.click.handler);
        },
        focus: () => {
          return $this.on(Event.FOCUS, module.focus.handler);
        },
        scroll: () => {
          return $scrollContext.on(Event.SCROLL, module.scroll.handler);
        },
        events: () => {
          switch (settings.on) {
            case 'hover':
              module.bind.hover();
              break;
            case 'click':
              module.bind.click();
              break;
            case 'focus':
              module.bind.focus();
          }
          if (settings.hideOnScroll === 'auto') {
            if (settings.on === 'hover') {
              module.bind.scroll();
            }
          }
          if (settings.hideOnScroll === true) {
            return module.bind.scroll();
          }
        }
      },
      // ------------------------------------------------------------------------
      // 基礎方法
      // ------------------------------------------------------------------------
      initialize: () => {
        var position, variation;
        debug('初始化彈出式訊息', element);
        position = $this.attr(Attribute.POSITION);
        if (position !== null) {
          module.set.position(position, true);
        }
        variation = $this.attr(Attribute.VARIATION);
        if (variation !== null) {
          module.set.variation(variation);
        }
        module.init.popup();
        module.set.hoverable(settings.hoverable);
        module.set.size(settings.size);
        module.set.transition(settings.transition);
        module.set.inverted(settings.inverted);
        module.set.pointing(settings.pointing);
        module.set.boundary(settings.boundary);
        module.set.scrollContext(settings.scrollContext);
        return module.bind.events();
      },
      instantiate: () => {
        return debug('實例化彈出式訊息', element);
      },
      refresh: () => {
        rect = $this.rect();
        popupRect = $popup.rect();
        boundaryRect = $boundary.rect();
        return $allModules;
      },
      destroy: () => {
        debug('摧毀彈出式訊息', element);
        $this.removeData(MODULE_NAMESPACE).off(EVENT_NAMESPACE);
        return $allModules;
      }
    };
  });

}).call(this);
