// Generated by CoffeeScript 2.0.0-beta4
(function() {
  // ------------------------------------------------------------------------
  // 變數與常數設置
  // ------------------------------------------------------------------------

  // 模組名稱。
  var Attribute, ClassName, Device, EVENT_NAMESPACE, Error, Event, MODULE_NAMESPACE, NAME, Selector, Settings, Transition, Visibility;

  NAME = 'sidebar';

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
    // 是否要在側邊欄出現的時候淡化頁面。
    dimPage: true,
    // 是否允許使用者點擊頁面關閉側邊欄。
    closable: true,
    // 是否要在側邊欄出現的時候所動頁面捲軸滾動。
    scrollLock: true,
    // 側邊欄的出場效果。（`overlay` 為覆蓋、`push` 為推出、`squeeze` 為擠壓）
    transition: 'overlay',
    // 預設的顯示模式，設為 `auto` 的時候出場效果會被覆蓋。（`auto` 為電腦常駐、行動裝置隱藏、`hidden` 為預設隱藏）
    visibility: 'hidden',
    // 當側邊欄剛出現時所會呼叫的回呼函式。
    onVisible: () => {},
    // 當側邊欄出現動畫結束時所會呼叫的回呼函式。
    onShow: () => {},
    // 當側邊欄可見狀態有所變更且動畫執行完畢時所會呼叫的回呼函式。
    onChange: () => {},
    // 當側邊欄關閉時所會呼叫的回呼函式。
    onHide: () => {},
    // 當側邊欄關閉動畫結束時所會呼叫的回呼函式。
    onHidden: () => {}
  };

  // 標籤。
  Attribute = {
    SCROLL_LOCK: 'data-scroll-lock'
  };

  // 過場動畫。
  Transition = {
    OVERLAY: 'overlay',
    PUSH: 'push',
    SQUEEZE: 'squeeze'
  };

  // 可見度。
  Visibility = {
    AUTO: 'auto',
    HIDDEN: 'hidden',
    STATIC: 'static'
  };

  // 事件名稱。
  Event = {
    VISIBLE: `visible${EVENT_NAMESPACE}`,
    SHOW: `show${EVENT_NAMESPACE}`,
    CHANGE: `change${EVENT_NAMESPACE}`,
    HIDE: `hide${EVENT_NAMESPACE}`,
    HIDDEN: `hidden${EVENT_NAMESPACE}`,
    CLICK: `click${EVENT_NAMESPACE}`,
    RESIZE: `resize${EVENT_NAMESPACE}`,
    TOUCHSTART: `touchstart${EVENT_NAMESPACE}`,
    ANIMATIONEND: 'animationend'
  };

  // 樣式名稱。
  ClassName = {
    VISIBLE: 'visible',
    ACTIVE: 'active',
    DIMMED: 'dimmed',
    ANIMATING: 'animating',
    OVERLAY: 'overlay',
    SQUEEZABLE: 'squeezable'
  };

  // 裝置。
  Device = {
    MOBILE: 'mobile'
  };

  // 選擇器名稱。
  Selector = {
    PUSHER: '.ts.pusher',
    BODY: 'body'
  };

  // 錯誤訊息。
  Error = {};

  // ------------------------------------------------------------------------
  // 模組註冊
  // ------------------------------------------------------------------------
  ts.register({NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) => {
    var $pusher, device, duration, elementNamespace, module;
    // ------------------------------------------------------------------------
    // 區域變數
    // ------------------------------------------------------------------------
    $pusher = ts();
    device = '';
    duration = 450;
    elementNamespace = '';
    // ------------------------------------------------------------------------
    // 模組定義
    // ------------------------------------------------------------------------
    return module = {
      setting: (key, value) => {
        settings[key] = value;
        return $allModules;
      },
      set: {
        lock: (value) => {
          if (value) {
            return $pusher.attr(Attribute.SCROLL_LOCK, 'true');
          } else {
            return $pusher.removeAttr(Attribute.SCROLL_LOCK);
          }
        },
        animating: (value) => {
          if (value) {
            return $this.addClass(ClassName.ANIMATING);
          } else {
            return $this.removeClass(ClassName.ANIMATING);
          }
        },
        visible: (value) => {
          if (value) {
            return $this.addClass(ClassName.VISIBLE);
          } else {
            return $this.removeClass(ClassName.VISIBLE);
          }
        }
      },
      update: {
        device: () => {
          return device = ts.device().device;
        }
      },
      get: {
        transition: () => {
          return settings.transition;
        },
        visibility: () => {
          return settings.visibility;
        }
      },
      reset: {
        pusher: () => {
          return $pusher.removeClass(ClassName.SQUEEZABLE);
        },
        sidebar: () => {
          return $this.removeClass(ClassName.OVERLAY);
        }
      },
      dim: {
        page: (value) => {
          if (value) {
            return $pusher.addClass(ClassName.DIMMED);
          } else {
            return $pusher.removeClass(ClassName.DIMMED);
          }
        }
      },
      show: () => {
        if (module.is.visible()) {
          return;
        }
        module.trigger.visible();
        module.reset.pusher();
        module.reset.sidebar();
        if (module.get.transition() === Transition.SQUEEZE) {
          $pusher.addClass(ClassName.SQUEEZABLE);
        }
        if (module.get.transition() === Transition.OVERLAY) {
          $this.addClass(ClassName.OVERLAY);
        }
        if (module.get.visibility() === Visibility.AUTO) {
          if (device === Device.MOBILE) {
            module.dim.page(true);
            module.set.lock(true);
          } else {
            module.dim.page(false);
            module.set.lock(false);
          }
        }
        if (settings.scrollLock) {
          module.set.lock(true);
        }
        if (settings.dimPage && module.get.visibility() !== Visibility.AUTO) {
          module.dim.page(true);
        }
        module.animate.show(() => {
          module.trigger.show();
          return module.trigger.change();
        });
        return $allModules;
      },
      hide: () => {
        if (module.is.hidden()) {
          return;
        }
        module.trigger.hide();
        module.set.lock(false);
        if (settings.dimPage) {
          module.dim.page(false);
        }
        module.animate.hide(() => {
          module.trigger.hidden();
          module.reset.pusher();
          module.reset.sidebar();
          return module.trigger.change();
        });
        return $allModules;
      },
      toggle: () => {
        if (module.is.hidden()) {
          module.show();
        } else {
          module.hide();
        }
        return $allModules;
      },
      animate: {
        show: (callback) => {
          module.set.animating(true);
          module.set.visible(true);
          return $this.off(Event.ANIMATIONEND).one(Event.ANIMATIONEND, () => {
            module.set.animating(false);
            if (callback != null) {
              return callback.call();
            }
          }).emulate(Event.ANIMATIONEND, duration);
        },
        hide: (callback) => {
          module.set.animating(true);
          module.set.visible(false);
          return $this.off(Event.ANIMATIONEND).one(Event.ANIMATIONEND, () => {
            module.set.animating(false);
            if (callback != null) {
              return callback.call();
            }
          }).emulate(Event.ANIMATIONEND, duration);
        }
      },
      attach: {
        events: (selector) => {
          return ts(selector).on(Event.CLICK, () => {
            return module.toggle();
          });
        }
      },
      is: {
        visible: () => {
          return $this.hasClass(ClassName.VISIBLE);
        },
        hidden: () => {
          return !module.is.visible();
        },
        animating: () => {
          return $this.hasClass(ClassName.ANIMATING);
        },
        closable: () => {
          return settings.closable === true;
        },
        child: (target) => {
          return $this.contains(target);
        }
      },
      repaint: () => {
        module.update.device();
        if (device === Device.MOBILE) {
          settings.transition = Transition.OVERLAY;
          return module.hide();
        } else {
          settings.transition = Transition.SQUEEZE;
          return module.show();
        }
      },
      trigger: {
        visible: () => {
          return $this.trigger(Event.VISIBLE, element);
        },
        show: () => {
          return $this.trigger(Event.SHOW, element);
        },
        change: () => {
          return $this.trigger(Event.CHANGE, element);
        },
        hide: () => {
          return $this.trigger(Event.HIDE, element);
        },
        hidden: () => {
          return $this.trigger(Event.HIDDEN, element);
        }
      },
      create: {
        id: () => {
          var id;
          id = (Math.random().toString(16) + '000000000').substr(2, 8);
          elementNamespace = `.${id}`;
          return debug('已產生臨時編號', id);
        }
      },
      bind: {
        repaint: () => {
          return ts(window).on(Event.RESIZE, () => {
            return module.repaint();
          });
        },
        events: () => {
          ts(Selector.BODY).on(`click.${elementNamespace}`, (event, context) => {
            debug('發生 CLICK 事件', context);
            if (module.is.child(event.target)) {
              return;
            }
            if (device !== Device.MOBILE && module.get.visibility() === Visibility.AUTO) {
              return;
            }
            if (!module.is.animating() && module.is.closable()) {
              return module.hide();
            }
          });
          $this.on(Event.VISIBLE, (event, context) => {
            debug('發生 VISIBLE 事件', context);
            return settings.onVisible.call(context, event);
          });
          $this.on(Event.SHOW, (event, context) => {
            debug('發生 SHOW 事件', context);
            return settings.onShow.call(context, event);
          });
          $this.on(Event.CHANGE, (event, context) => {
            debug('發生 CHANGE 事件', context);
            return settings.onChange.call(context, event);
          });
          $this.on(Event.HIDE, (event, context) => {
            debug('發生 HIDE 事件', context);
            return settings.onHide.call(context, event);
          });
          return $this.on(Event.HIDDEN, (event, context) => {
            debug('發生 HIDDEN 事件', context);
            return settings.onHidden.call(context, event);
          });
        }
      },
      // ------------------------------------------------------------------------
      // 基礎方法
      // ------------------------------------------------------------------------
      initialize: () => {
        debug('初始化側邊欄', element);
        $pusher = ts(Selector.PUSHER);
        module.create.id();
        module.update.device();
        module.bind.events();
        if (module.get.visibility() !== Visibility.AUTO) {
          return;
        }
        module.bind.repaint();
        return module.repaint();
      },
      instantiate: () => {
        return debug('實例化側邊欄', element);
      },
      refresh: () => {
        return $allModules;
      },
      destroy: () => {
        debug('摧毀側邊欄', element);
        $this.removeData(MODULE_NAMESPACE).off(EVENT_NAMESPACE);
        ts(Selector.BODY).off(`click.${elementNamespace}`);
        return $allModules;
      }
    };
  });

}).call(this);
