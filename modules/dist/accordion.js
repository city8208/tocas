// Generated by CoffeeScript 2.0.0-beta4
// Accordion

// 手風琴。
var Accordion;

Accordion = (function() {
  class Accordion {
    constructor() {
      // 元素初始化函式。
      this.init = this.init.bind(this);
      // 元素摧毀函式。
      this.destroy = this.destroy.bind(this);
      // Open

      // 開啟手風琴分頁。
      this.open = this.open.bind(this);
      // Close

      // 關閉手風琴分頁。
      this.close = this.close.bind(this);
      // Toggle

      // 切換手風琴分頁。
      this.toggle = this.toggle.bind(this);
      // Event

      // 呼叫指定事件函式。
      this.event = this.event.bind(this);
      // 模組可用的方法。
      this.methods = this.methods.bind(this);
    }

    // 延遲函式。
    delay() {}

    init() {
      var module;
      module = this;
      // 尋找手風琴容器裡的每個標題，當標題被按下時。
      this.$this.find(this.className.title).on('click.accordion', function() {
        // 因為是標題被按下，所以我們呼叫切換手風琴分頁的函式，
        // 當手風琴是開的，則關，反之亦然。
        module.$title = $selector(this);
        return module.toggle();
      });
      return ts.fn;
    }

    destroy() {
      // 移除 `click` 的綁定事件。
      this.$this.find(this.className.title).off('click.accordion');
      // 關閉所有手風琴。
      return this.$this.find(this.className.active).removeClass('active');
    }

    async open() {
      var $activeContent, $content, height;
      // 如果這個手風琴正在執行動畫效果則離開。
      if (this.$this.hasClass('animating')) {
        return;
      }
      // 呼叫指定事件函式。
      this.event('onOpen');
      this.event('onChange');
      // 取得內容元素。
      $content = this.$title.next();
      // 如果要開啟的分頁，正是已經被開啟的那個，
      // 那麼就忽略這次的請求。
      if ($content.get() === this.$this.find(this.className.activeContent).get()) {
        return;
      }
      // 如果手風琴只允許同ㄧ時間展開一個分頁。
      if (this.$title.closest(this.className.accordion).data('exclusive')) {
        // 那麼就上拉並關閉其他的分頁內容。
        $activeContent = this.$this.find(this.className.activeContent);
        // 如果有其他分頁內容則對這些分頁內容進行處理。
        if ($activeContent.length !== 0) {
          // 呼叫事件函式。
          this.event('onClose', $activeContent.prev());
          this.event('onChange', $activeContent.prev());
          // 重新計算內容目前的高度。
          height = $activeContent.css('height');
          // 替內容設置固定高度。
          $activeContent.css('height', height);
          // 稍微延遲一下，避免太快執行會沒有效果。
          await this.delay();
          // 呼叫上拉動畫
          $activeContent.css('height', '0px').one('transitionend', function() {
            return $activeContent.css('height', '').removeClass('active').prev().removeClass('active');
          }).emulate('transitionend', this.duration);
        }
      }
      // 啟用指定分頁的標題。
      this.$title.addClass('active');
      // 啟用指定分頁的內容，並馬上顯示內容。
      $content.addClass('active').css('height', 'auto');
      // 取得該內容展開時的高度。
      height = $content.css('height');
      // 現在趕快把內容趁使用者沒看見之前藏起來。
      $content.css('height', '0px');
      // 稍微延遲一下，避免太快執行會沒有效果。
      await this.delay();
      // 現在展開，讓使用者看到下拉的動畫。
      $content.css('height', height);
      // 表明這個手風琴正在執行動畫。
      this.$this.addClass('animating');
      // 下拉完畢之後移除固定高度，這樣才能有彈性高度。
      return $content.one('transitionend', () => {
        $content.css('height', '');
        return this.$this.removeClass('animating');
      }).emulate('transitionend', this.duration);
    }

    async close() {
      var $content, height;
      // 如果這個手風琴正在執行動畫效果則離開。
      if (this.$this.hasClass('animating')) {
        return;
      }
      // 呼叫事件函式。
      this.event('onClose');
      this.event('onChange');
      // 取得內容元素。
      $content = this.$title.next();
      if (!this.$title.hasClass('active')) {
        return;
      }
      // 移除標題的啟用樣式。
      this.$title.removeClass('active');
      // 重新計算內容目前的高度。
      height = $content.css('height');
      // 替內容設置固定高度。
      $content.css('height', height);
      // 表明這個手風琴正在執行動畫。
      this.$this.addClass('animating');
      // 稍微延遲一下，避免太快執行會沒有效果。
      await this.delay();
      // 將內容高度設為 0px ，這樣才能觸發上拉動畫。
      $content.css('height', '0px');
      // 當上拉動畫結束的時候，才移除內容的啟用樣式，
      // 直接移除的話會沒辦法觸發動畫效果。
      return $content.one('transitionend', () => {
        $content.css('height', '').removeClass('active');
        return this.$this.removeClass('animating');
      }).emulate('transitionend', this.duration);
    }

    toggle() {
      if (this.$title.hasClass('active')) {
        return this.close();
      } else {
        return this.open();
      }
    }

    event(event, $title = this.$title) {
      return this.$this.data(event).call(this.$this.get(), Math.floor(this.$title.index() / 2));
    }

    methods() {
      return {
        // Open

        // 開啟指定索引的手風琴內容。
        open: (index) => {
          this.$title = this.$this.find(this.className.title).eq(index);
          this.open();
          return ts.fn;
        },
        // Close

        // 關閉指定索引的手風琴內容。
        close: (index) => {
          this.$title = this.$this.find(this.className.title).eq(index);
          this.close();
          return ts.fn;
        },
        // Toggle

        // 切換指定索引的手風琴內容，如果是開啟的則關閉，相反之。
        toggle: (index) => {
          this.$title = this.$this.find(this.className.title).eq(index);
          this.toggle();
          return ts.fn;
        }
      };
    }

  };

  // 模組名稱。
  Accordion.module = 'accordion';

  // 模組屬性。
  Accordion.prototype.props = {
    // 是否僅允許單個手風琴只有一個分頁能被打開，設為 false 則無限制。
    exclusive: true,
    // 當分頁被打開時所呼叫的函式。
    onOpen: function() {},
    // 當分頁被關閉時所呼叫的函式。
    onClose: function() {},
    // 當分頁被打開或者關閉時所呼叫的函式。
    onChange: function() {}
  };

  // 模組自己選擇器。
  Accordion.prototype.$this = null;

  // 所選的手風琴標題元素。
  Accordion.prototype.$title = null;

  // 開展閉合動畫效果毫秒。
  Accordion.prototype.duration = 400;

  // 模組內部資料。
  Accordion.prototype.className = {
    // 標題的類別名稱。
    title: '.title',
    // 分頁內容的類別名稱。
    content: '.content',
    // 手風琴容器的類別名稱。
    accordion: '.ts.accordion',
    // 已啟用的分頁內容類別名稱。
    activeContent: '.content.active',
    // 已啟用的類別名稱。
    active: '.active'
  };

  return Accordion;

})();

ts(Accordion);