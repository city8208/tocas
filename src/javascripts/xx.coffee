# --------------------------------------------------------------
# 模組註冊
# --------------------------------------------------------------

ts.register class Accordion

    # --------------------------------------------------------------
    # 變數與常數設置
    # --------------------------------------------------------------

    # 模組設定。
    settings:
        # 是否僅允許單個手風琴只有一個分頁能被打開。
        exclusive  : true
        # 展開的手風琴是否可以被關閉。
        collapsible: true
        # 當手風琴被關閉時，是否一同閉合子手風琴。
        closeNested: true
        # 當手風琴正在展開時所會呼叫的函式。
        onOpening: =>
        # 當手風琴展開時所會呼叫的函式。
        onOpen   : =>
        # 當手風琴正在關閉時所會呼叫的函式。
        onClosing: =>
        # 當手風琴關閉時所會呼叫的函式。
        onClose  : =>
        # 當手風琴被切換開關時所會呼叫的函式。
        onChange : =>

    # 事件名稱。
    events:
        opening: 'opening'
        open   : 'open'
        closing: 'closing'
        close  : 'close'
        change : 'change'
        click  : 'click'

    # 樣式名稱。
    classNames:
        active: 'active'

    # 選擇器名稱。
    selectors:
        TITLE         : '.title'
        CONTENT       : '.content'
        ACCORDION     : '.ts.accordion'
        ACTIVE_CONTENT: '.active.content'
        ACTIVE        : '.active'

    # --------------------------------------------------------------
    # 建構子
    # --------------------------------------------------------------

    constructor: ({@settings, @$allModules, @$module, @element, @listener, @id}) ->

        # --------------------------------------------------------------
        # 區域變數
        # --------------------------------------------------------------

        @data =
            $title  : @$module.find @selectors.title
            $content: @$module.find @selectors.content

    # --------------------------------------------------------------
    # 公開方法
    # --------------------------------------------------------------

    # Open 能夠開啟指定的手風琴項目。
    Open: (index) =>
        @open index
        return @

    # Close 能夠關閉指定的手風琴項目。
    Close: (index) =>
        @close index
        return @

    # Toggle 能夠切換指定的手風琴項目，當項目是關閉的時候開啟，反之亦然。
    Toggle: (index) =>
        if @is.active index
            @close index
        else
            @open index
        return @

    # CloseChildren 能夠關閉指定項目下的所有手風琴項目。
    CloseChildren: =>
        @$module
            .find      @selectors.accordion
            .accordion 'close all'
        return @

    # CloseOthers 能夠關閉指定項目以外的所有項目。
    CloseOthers: (index) =>
        for i in [0..@data.$title.length-1]
            if i isnt index
                @close i
        return @

    # CloseAll 會關閉所有項目。
    CloseAll: =>
        @close i for i in [0..@data.$title.length-1]
        return @

    # --------------------------------------------------------------
    # 內部方法
    # --------------------------------------------------------------

    open: (index) =>
        @set.active   index
        @trigger.open index

        if @settings.exclusive
            @closeOthers index

    close: (index) =>
        @set.hidden    index
        @trigger.close index

    trigger:
        open: (index) =>
            @settings.onOpen.call   @get.$content index
            @settings.onChange.call @get.$content index
        close: (index) =>
            @settings.onClose.call  @get.$content index
            @settings.onChange.call @get.$content index

    is:
        active: (index) =>
            @data.$title
                .eq       index
                .hasClass classNames.active

    set:
        active: (index) =>
            @data.$title
                .eq       index
                .addClass classNames.active
            @data.$content
                .eq       index
                .addClass classNames.active
        hidden: (index) =>
            @data.$title
                .eq          index
                .removeClass classNames.active
            @data.$content
                .eq          index
                .removeClass classNames.active

    get:
        $content: (index) =>
            @data.$content.eq index

    bind:
        events: =>
            @listener.on @events.click, @selectors.title, @event.click

    event:
        click: (element) =>
            index = @data.$title.indexOf element
            if @is.active index
                if @settings.collapsible
                    @close index
            else
                @open index

    # --------------------------------------------------------------
    # 生命週期
    # --------------------------------------------------------------

    beforeCreate: =>

    created: =>
        @bind.events()

    beforeUpdate: =>

    updated: =>

    beforeDestroy: =>

    destroyed: =>