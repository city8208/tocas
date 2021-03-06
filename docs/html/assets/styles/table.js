// Generated by CoffeeScript 2.0.0-beta4
(function() {
  // ------------------------------------------------------------------------
  // 變數與常數設置
  // ------------------------------------------------------------------------

  // 模組名稱。
  var Attribute, ClassName, EVENT_NAMESPACE, Error, Event, MODULE_NAMESPACE, NAME, Order, Selector, Settings;

  NAME = 'table';

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
    // 當行被展開時所會呼叫的回呼函式。
    onRowExpand: (event, index) => {},
    // 當行被閉合時所會呼叫的回呼函式。
    onRowCollapse: (event, index) => {},
    // 當垂直排被重新排序時所會呼叫的回呼函式。
    onSort: (event, order, index) => {}
  };

  // 排序
  Order = {
    ASCENDING: 'ascending',
    DESCENDING: 'descending'
  };

  // 元素標籤。
  Attribute = {
    COLSPAN: 'colspan'
  };

  // 事件名稱。
  Event = {
    ROW_EXPAND: `rowexpand${EVENT_NAMESPACE}`,
    ROW_COLLAPSE: `rowcollapse${EVENT_NAMESPACE}`,
    SORT: `sort${EVENT_NAMESPACE}`,
    CLICK: `click${EVENT_NAMESPACE}`
  };

  // 樣式名稱。
  ClassName = {
    DESCENDING: 'descending',
    ASCENDING: 'ascending',
    EXPANDED: 'expanded',
    SORTABLE: 'sortable',
    SORTED: 'sorted'
  };

  // 選擇器名稱。
  Selector = {
    EXPANDABLE: 'tr.expandable',
    EXPANDABLE_COLUMN: 'tr.expandable + tr td',
    EXPAND_CONTROL: 'tr.expandable > td.expand.control',
    ROW: 'tbody tr',
    HEADER: 'thead th',
    DESCENDING_HEADER: 'thead th.sorted.descending',
    ASCENDING_HEADER: 'thead th.sorted.ascending'
  };

  // 錯誤訊息。
  Error = {};

  // ------------------------------------------------------------------------
  // 模組註冊
  // ------------------------------------------------------------------------
  ts.register({NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) => {
    var module;
    // ------------------------------------------------------------------------
    // 區域變數
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // 模組定義
    // ------------------------------------------------------------------------
    return module = {
      expand: {
        row: (index) => {
          module.get.$row(index).addClass(ClassName.EXPANDED);
          return module.trigger.row.expand(index);
        }
      },
      collapse: {
        row: (index) => {
          module.get.$row(index).removeClass(ClassName.EXPANDED);
          return module.trigger.row.collapse(index);
        }
      },
      toggle: {
        row: (index) => {
          if (module.is.expanded(index)) {
            return module.collapse.row(index);
          } else {
            return module.expand.row(index);
          }
        }
      },
      sort: {
        table: (order, index) => {
          var i, len, reverse, t, tbody, tr;
          module.get.$header().removeClass(ClassName.SORTED, ClassName.ASCENDING, ClassName.DESCENDING);
          tbody = element.tBodies[0];
          tr = Array.prototype.slice.call(tbody.rows, 0);
          reverse = -((+(order === Order.ASCENDING)) || -1);
          tr = tr.sort((a, b) => {
            a = a.cells[index].textContent.replace(',', '').trim();
            b = b.cells[index].textContent.replace(',', '').trim();
            switch (false) {
              case !!isNaN(a):
                return reverse * (+a - +b);
              case !new Date(a).getTime():
                return reverse * (new Date(a) - new Date(b));
              default:
                return reverse * (a.localeCompare(b));
            }
          });
          for (i = 0, len = tr.length; i < len; i++) {
            t = tr[i];
            tbody.appendChild(t);
          }
          module.set.sorted(index);
          module.set.order(order, index);
          return module.trigger.sort(order, index);
        },
        ascending: (index) => {
          module.sort.table(Order.ASCENDING, index);
          return $allModules;
        },
        descending: (index) => {
          module.sort.table(Order.DESCENDING, index);
          return $allModules;
        }
      },
      trigger: {
        sort: (order, index) => {
          return $this.trigger(Event.SORT, module.get.$header(index).get(), order, index);
        },
        row: {
          expand: (index) => {
            return $this.trigger(Event.ROW_EXPAND, module.get.$row(index).get(), index);
          },
          collapse: (index) => {
            return $this.trigger(Event.ROW_COLLAPSE, module.get.$row(index).get(), index);
          }
        }
      },
      is: {
        sortable: () => {
          return $this.hasClass(ClassName.SORTABLE);
        },
        table: () => {
          return $this.is('table');
        },
        expanded: (index) => {
          return module.get.$row(index).hasClass(ClassName.EXPANDED);
        },
        ascending: () => {
          return $this.find(Selector.ASCENDING_HEADER).length !== 0;
        },
        descending: () => {
          return $this.find(Selector.DESCENDING_HEADER).length !== 0;
        }
      },
      set: {
        sorted: (index) => {
          return module.get.$header(index).addClass(ClassName.SORTED);
        },
        order: (order, index) => {
          var $header;
          $header = module.get.$header(index);
          switch (order) {
            case Order.ASCENDING:
              return $header.addClass(ClassName.ASCENDING);
            case Order.DESCENDING:
              return $header.addClass(ClassName.DESCENDING);
          }
        },
        colspan: (colspan) => {
          return $this.find(Selector.EXPANDABLE_COLUMN).attr(Attribute.COLSPAN, colspan);
        }
      },
      get: {
        $header: (index) => {
          if (index === void 0) {
            return $this.find(Selector.HEADER);
          } else {
            return $this.find(Selector.HEADER).eq(index);
          }
        },
        $row: (index) => {
          if (index === void 0) {
            return $this.find(Selector.ROW);
          } else {
            return $this.find(Selector.ROW).eq(index);
          }
        }
      },
      bind: {
        events: () => {
          $this.on(Event.CLICK, Selector.EXPAND_CONTROL, function() {
            debug('發生 EXPAND CLICK 事件', this);
            return module.toggle.row(ts(this).closest(Selector.EXPANDABLE).index());
          });
          $this.on(Event.SORT, (event, context, order, index) => {
            debug('發生 SORT 事件', context);
            return settings.onSort.call(context, event, order, index);
          });
          $this.on(Event.ROW_COLLAPSE, (event, context, index) => {
            debug('發生 ROW_COLLAPSE 事件', context);
            return settings.onRowCollapse.call(context, event, index);
          });
          return $this.on(Event.ROW_EXPAND, (event, context, index) => {
            debug('發生 ROW_EXPAND 事件', context);
            return settings.onRowExpand.call(context, event, index);
          });
        },
        sortable: {
          events: () => {
            return $this.on(Event.CLICK, Selector.HEADER, function() {
              var index;
              debug('發生 SORTABLE CLICK 事件', this);
              index = ts(this).index();
              if (module.is.ascending()) {
                return module.sort.descending(index);
              } else {
                return module.sort.ascending(index);
              }
            });
          }
        }
      },
      // ------------------------------------------------------------------------
      // 基礎方法
      // ------------------------------------------------------------------------
      initialize: () => {
        debug('初始化表格', element);
        if (!module.is.table()) {
          return;
        }
        module.bind.events();
        module.set.colspan(99);
        if (module.is.sortable()) {
          return module.bind.sortable.events();
        }
      },
      instantiate: () => {
        return debug('實例化表格', element);
      },
      refresh: () => {
        return $allModules;
      },
      destroy: () => {
        debug('摧毀表格', element);
        $this.removeData(MODULE_NAMESPACE).off(EVENT_NAMESPACE);
        return $allModules;
      }
    };
  });

}).call(this);
