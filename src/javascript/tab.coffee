# ------------------------------------------------------------------------
# 變數與常數設置
# ------------------------------------------------------------------------

# 模組名稱。
NAME             = 'tab'
# 模組事件鍵名。
EVENT_NAMESPACE  = ".#{NAME}"
# 模組命名空間。
MODULE_NAMESPACE = "module-#{NAME}"

# 模組設定。
Settings =
    # 消音所有提示，甚至是錯誤訊息。
    silent        : false
    # 顯示除錯訊息。
    debug         : true
    # 監聽 DOM 結構異動並自動重整快取。
    observeChanges: true
    # 當分頁第一次開啟時所會呼叫的回呼函式。
    onFirstLoad   : (tabName) =>
    # 當分頁被開啟時所會呼叫的回呼函式。
    onLoad        : (tabName) =>
    # 是否要紀錄分頁籤的開關歷程至瀏覽器的上下頁歷程中。
    history       : true
    # 欲採用何種分頁籤手法？可用：`hash` 或 `state`。
    historyType   : 'hash'

# 中繼資料名稱。
Metadata =
    LOADED : 'loaded'

# 事件名稱。
Event =
    FIRSTLOAD : "firstload#{EVENT_NAMESPACE}"
    LOAD      : "load#{EVENT_NAMESPACE}"
    CLICK     : "click#{EVENT_NAMESPACE}"
    HASHCHANGE: "hashchange#{EVENT_NAMESPACE}"
    POPSTATE  : "popstate#{EVENT_NAMESPACE}"

# 標籤名稱。
Attribute =
    GROUP: 'data-tab-group'
    TAB  : 'data-tab'

# 樣式名稱。
ClassName =
    ACTIVE: 'active'
    TAB   : 'tab'

# 選擇器名稱。
Selector =
    TAB             : (name) => ".tab[#{Attribute.TAB}='#{name}']"
    ANY_TAB         : '.tab[data-tab]'
    ACTIVE_TAB      : '.active.tab[data-tab]'
    MENU            : '.menu'
    MENU_ITEM       : (name) => ".menu .item[#{Attribute.TAB}='#{name}']"
    ITEM            : '.item'

# 錯誤訊息。
Error = {}

# ------------------------------------------------------------------------
# 模組註冊
# ------------------------------------------------------------------------

ts.register {NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings, index}) =>

    # ------------------------------------------------------------------------
    # 區域變數
    # ------------------------------------------------------------------------


    # ------------------------------------------------------------------------
    # 模組定義
    # ------------------------------------------------------------------------

    module =

        change:
            tab: (name, recursive=true) =>
                name = module.decode name

                openAndCloseOthers = (value) =>
                    ts Selector.MENU_ITEM value
                        .addClass ClassName.ACTIVE
                        .closest  Selector.MENU
                        .find     Selector.ITEM
                        .not      Selector.MENU_ITEM value
                        .each ->
                            ts Selector.TAB ts(@).attr Attribute.TAB
                                .removeClass ClassName.ACTIVE
                        .removeClass ClassName.ACTIVE

                    $tab = ts Selector.TAB value
                    $tab
                        .addClass ClassName.ACTIVE

                    $item = ts Selector.MENU_ITEM value

                    if not $item.tab 'is loaded'
                        $item.trigger Event.FIRSTLOAD, $tab.get(), value
                        $item.tab 'set loaded', true
                    $item.trigger Event.LOAD, $tab.get(), value


                if recursive
                    ts Selector.TAB name
                        .tab     'get paths'
                        .forEach openAndCloseOthers
                else
                    openAndCloseOthers name

                module.update.hash()



                return $allModules

        decode: (uri) =>
            decodeURIComponent uri

        get:
            name: =>
                $this.attr Attribute.TAB
            paths: =>
                paths = []
                getParent = ($element) =>
                    paths.push $element.attr Attribute.TAB
                    $parentTab = $element
                        .parent()
                        .closest Selector.ANY_TAB
                    if $parentTab.length isnt 0
                        getParent $parentTab
                    return paths
                getParent $this
            tab: =>
                ts(Selector.TAB(module.get.name())).get()
            $tab: =>
                ts(Selector.TAB(module.get.name()))
            path: =>
                module.get.paths().join ','
            hash: =>
                hash = window.location.hash
                return if hash then module.decode(hash[1..]) else ''

        has:
            hash: =>
                not not window.location.hash

        set:
            loaded: (bool) =>
                $this.data Metadata.LOADED, bool

        is:
            active: =>
                $this.hasClass ClassName.ACTIVE
            tab: =>
                $this.hasClass ClassName.TAB
            loaded: =>
                $this.data(Metadata.LOADED) is true

        apply:
            hash: =>
                setTimeout ->
                    if not module.has.hash()
                        return
                    hash = module.get.hash()
                    if module.same.hash(hash)
                        return
                    hash
                        .split ','
                        .forEach (value) =>
                            module.change.tab value
                , 0

        update:
            hash: =>
                hash = []
                ts(Selector.ACTIVE_TAB).each ->
                    $tab       = ts @
                    $parentTab = $tab
                        .parent()
                        .closest Selector.ANY_TAB
                    if $parentTab.length isnt 0 and not $parentTab.hasClass ClassName.ACTIVE
                        return
                    if $tab.find(Selector.ACTIVE_TAB).length isnt 0
                        return

                    hash.push $tab.tab 'get name'

                hash = "##{hash.join(',')}"

                if settings.history
                    history.pushState null, null, hash
                else
                    history.replaceState null, null, hash
        same:
            hash: (hash) =>
                same = true
                hash
                    .split ','
                    .forEach (value) =>
                        if not ts(Selector.TAB(value)).hasClass ClassName.ACTIVE
                            same = false
                return same

        bind:
            events: =>
                $this.on Event.CLICK, =>
                    if module.is.active()
                        return
                    module.change.tab module.get.name(), false
                $this.on Event.FIRSTLOAD, (event, context, name) =>
                    debug '發生 FIRSTLOAD 事件', context, name
                    settings.onFirstLoad.call context, event, name
                $this.on Event.LOAD, (event, context, name) =>
                    debug '發生 LOAD 事件', context, name
                    settings.onLoad.call context, event, name

                if settings.history
                    ts(window).on Event.POPSTATE, =>
                        module.apply.hash()

                $this.attr 'href', 'javascript:void(0)'

        # ------------------------------------------------------------------------
        # 基礎方法
        # ------------------------------------------------------------------------

        initialize: =>
            debug '初始化分頁籤', element
            if module.is.tab()
                return
            module.bind.events()
            module.apply.hash()

        instantiate: =>
            debug '實例化分頁籤', element

        refresh: =>
            return $allModules

        destroy: =>
            debug '摧毀分頁籤', element
            $this.removeData MODULE_NAMESPACE
                 .off        EVENT_NAMESPACE
            return $allModules