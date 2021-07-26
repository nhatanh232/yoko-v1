$(document).ready(function() {
    is_show_value = JSON.parse($(".is_show_value").val()), phone = is_show_value.call_button.value, mail = is_show_value.send_email_button.value,
        function(t) {
            if (t.BX) {
                if (t.BX.SiteButton) return
            } else t.BX = {};
            t.BX.SiteButton = {
                isShown: !1,
                init: function(e) {
                    if (this.loadBxAnalytics(), this.userParams = t.Bitrix24WidgetObject || {}, this.config = e, this.handlers = this.userParams.handlers || {}, this.eventHandlers = [], this.execEventHandler("init", [this]), this.check())
                        if (this.load(), this.config.delay) {
                            var i = this;
                            t.setTimeout(function() {
                                i.show()
                            }, 1e3 * this.config.delay)
                        } else this.show()
                },
                check: function() {
                    return !!this.config.isActivated && (0 != this.config.widgets.length && ((!this.config.disableOnMobile || !this.util.isMobile()) && (!!this.wm.checkPagesAll(this) && !!this.wm.checkWorkTimeAll(this))))
                },
                loadBxAnalytics: function() {
                },
                load: function() {
                    this.execEventHandler("load", [this]), this.util.isIOS() && this.addClass(document.documentElement, "bx-ios"), this.util.isMobile() && this.addClass(document.documentElement, "bx-touch"), this.config.resources.forEach(function(t) {
                        switch (t.type) {
                            case "text/css":
                                var e = document.createElement("STYLE");
                                e.setAttribute("type", "text/css"), e.styleSheet ? e.styleSheet.cssText = t.content : e.appendChild(document.createTextNode(t.content)), document.head.appendChild(e)
                        }
                    }, this), this.context = this.util.getNodeFromText(this.config.layout), this.context && (document.body.appendChild(this.context), this.container = this.context.querySelector("[data-b24-crm-button-cont]"), this.shadow.init({
                        caller: this,
                        shadowNode: this.context.querySelector("[data-b24-crm-button-shadow]")
                    }), this.buttons.init({
                        caller: this,
                        container: this.container.querySelector("[data-b24-crm-button-block]"),
                        blankButtonNode: this.context.querySelector("[data-b24-crm-button-widget-blank]"),
                        openerButtonNode: this.context.querySelector("[data-b24-crm-button-block-button]")
                    }), this.wm.init({
                        caller: this
                    }), this.hello.init({
                        caller: this,
                        context: this.container.querySelector("[data-b24-crm-hello-cont]")
                    }), this.wm.loadAll(), this.execEventHandler("loaded", [this]))
                },
                setPulse: function(t) {
                    t = t || !1;
                    var e = this.context.querySelector("[data-b24-crm-button-pulse]");
                    e && (e.style.display = t ? "" : "none")
                },
                show: function() {
                    this.removeClass(this.container, "b24-widget-button-disable"), this.addClass(this.container, "b24-widget-button-visible"), this.execEventHandler("show", [this]), this.isShown = !0
                },
                hide: function() {
                    this.addClass(this.container, "b24-widget-button-disable"), this.execEventHandler("hide", [this])
                },
                addEventHandler: function(t, e) {
                    t && e && this.eventHandlers.push({
                        eventName: t,
                        handler: e
                    })
                },
                execEventHandler: function(e, i) {
                    if (i = i || [], e) {
                        this.eventHandlers.forEach(function(t) {
                            t.eventName == e && t.handler.apply(this, i)
                        }, this), this.handlers[e] && this.handlers[e].apply(this, i);
                        var o = "b24-sitebutton-" + e;
                        if (t.BX.onCustomEvent && t.BX.onCustomEvent(document, o, i), t.jQuery && "function" == typeof t.$) {
                            var n = t.$(document);
                            n && n.trigger && n.trigger(o, i)
                        }
                    }
                },
                onWidgetFormInit: function(t) {
                    this.execEventHandler("form-init", [t])
                },
                onWidgetClose: function() {
                    this.buttons.hide(), this.show()
                },
                addClass: function(t, e) {
                    t && "string" == typeof t.className && -1 === t.className.indexOf(e) && (t.className += " " + e, t.className = t.className.replace("  ", " "))
                },
                removeClass: function(t, e) {
                    t && t.className && (t.className = t.className.replace(e, "").replace("  ", " "))
                },
                addEventListener: function(e, i, o) {
                    e = e || t, t.addEventListener ? e.addEventListener(i, o, !1) : e.attachEvent("on" + i, o)
                },
                buttons: {
                    isShown: !1,
                    isInit: !1,
                    wasOnceShown: !1,
                    wasOnceClick: !1,
                    blankButtonNode: null,
                    list: [],
                    animatedNodes: [],
                    attributeAnimateNode: "data-b24-crm-button-icon",
                    init: function(t) {
                        this.c = t.caller, this.container = t.container, this.blankButtonNode = t.blankButtonNode, this.openerButtonNode = t.openerButtonNode, this.openerClassName = this.c.config.location > 3 ? "b24-widget-button-bottom" : "b24-widget-button-top";
                        var e = this;
                        this.c.addEventListener(this.openerButtonNode, "click", function(t) {
                            1 == e.list.length && e.list[0].onclick && !e.list[0].href ? e.list[0].onclick.apply(this, []) : e.toggle()
                        }), this.isInit = !0, this.list.forEach(function(t) {
                            t.node || this.insert(t)
                        }, this), this.initAnimation(), this.c.addClass(this.c.context.querySelector("[data-b24-crm-button-pulse]"), "b24-widget-button-pulse-animate")
                    },
                    initAnimation: function() {
                        var t = this.c.util.nodeListToArray(this.c.context.querySelectorAll("[" + this.attributeAnimateNode + "]"));
                        this.animatedNodes = t.filter(function(t) {
                            var e = t.getAttribute(this.attributeAnimateNode),
                                i = !this.getByType(e);
                            return t.style.display = i ? "none" : "", !i
                        }, this), this.animate()
                    },
                    animate: function() {
                        var t = "b24-widget-button-icon-animation",
                            e = 0;
                        if (this.animatedNodes.forEach(function(i, o) {
                                this.c.util.hasClass(i, t) && (e = o), this.c.removeClass(i, t)
                            }, this), e++, e = e < this.animatedNodes.length ? e : 0, this.c.addClass(this.animatedNodes[e], t), this.animatedNodes.length > 1) {
                            var i = this;
                            setTimeout(function() {
                                i.animate()
                            }, 1500)
                        }
                    },
                    getByType: function(t) {
                        var e = this.list.filter(function(e) {
                            return t == e.type
                        }, this);
                        return e.length > 0 ? e[0] : null
                    },
                    toggle: function() {
                        this.isShown ? this.hide() : this.show()
                    },
                    show: function() {
                        this.c.util.isIOS() && this.c.addClass(document.documentElement, "bx-ios-fix-frame-focus"), this.c.shadow.show(), this.isShown = !0, this.wasOnceShown = !0, this.c.addClass(this.c.container, this.openerClassName), this.c.addClass(this.container, "b24-widget-button-show"), this.c.removeClass(this.container, "b24-widget-button-hide"), this.c.hello.hide()
                    },
                    hide: function() {
                        this.c.util.isIOS() && this.c.removeClass(document.documentElement, "bx-ios-fix-frame-focus"), this.isShown = !1, this.c.addClass(this.container, "b24-widget-button-hide"), this.c.removeClass(this.container, "b24-widget-button-show"), this.c.removeClass(this.c.container, this.openerClassName), this.c.hello.hide(), this.c.shadow.hide()
                    },
                    displayButton: function(t, e) {
                        this.list.forEach(function(i) {
                            i.id == t && i.node && (i.node.style.display = e ? "" : "none")
                        })
                    },
                    sortOut: function() {
                        this.list.sort(function(t, e) {
                            return t.sort > e.sort ? 1 : -1
                        }), this.list.forEach(function(t) {
                            t.node && t.node.parentNode.appendChild(t.node)
                        })
                    },
                    add: function(t) {
                        return this.list.push(t), this.insert(t)
                    },
                    insert: function(e) {
                        if (!this.isInit) return e.node = null, null;
                        var i = this.blankButtonNode.cloneNode(!0);
                        if (e.node = i, e.sort = e.sort || 100, i.setAttribute("data-b24-crm-button-widget", e.id), i.setAttribute("data-b24-widget-sort", e.sort), e.classList && e.classList.length > 0 && e.classList.forEach(function(t) {
                                this.c.addClass(i, t)
                            }, this), e.title) {
                            var o = i.querySelector("[data-b24-crm-button-tooltip]");
                            o ? o.innerText = e.title : i.title = e.title
                        }
                        if (e.icon ? i.style["background-image"] = "url(" + e.icon + ")" : (e.iconColor && setTimeout(function() {
                                if (t.getComputedStyle) {
                                    var o = t.getComputedStyle(i, null).getPropertyValue("background-image");
                                    i.style["background-image"] = (o || "").replace("FFF", e.iconColor.substring(1))
                                }
                            }, 1e3), e.bgColor && (i.style["background-color"] = e.bgColor)), e.href && (i.href = e.href, i.target = e.target ? e.target : "_blank"), e.onclick) {
                            var n = this;
                            this.c.addEventListener(i, "click", function(t) {
                                n.wasOnceClick = !0, e.onclick.apply(n, [])
                            })
                        }
                        return this.container.appendChild(i), this.sortOut(), this.initAnimation(), i
                    }
                },
                shadow: {
                    clickHandler: null,
                    shadowNode: null,
                    init: function(e) {
                        this.c = e.caller, this.shadowNode = e.shadowNode;
                        var i = this;
                        this.c.addEventListener(this.shadowNode, "click", function(t) {
                            i.onClick()
                        }), this.c.addEventListener(document, "keyup", function(e) {
                            27 == (e = e || t.e).keyCode && i.onClick()
                        })
                    },
                    onClick: function() {
                        this.c.wm.hide(), this.c.buttons.hide(), this.clickHandler && (this.clickHandler.apply(this, []), this.clickHandler = null)
                    },
                    show: function(t) {
                        this.clickHandler = t, this.c.addClass(this.shadowNode, "b24-widget-button-show"), this.c.removeClass(this.shadowNode, "b24-widget-button-hide"), this.c.addClass(document.documentElement, "crm-widget-button-mobile")
                    },
                    hide: function() {
                        this.c.addClass(this.shadowNode, "b24-widget-button-hide"), this.c.removeClass(this.shadowNode, "b24-widget-button-show"), this.c.removeClass(document.documentElement, "crm-widget-button-mobile")
                    }
                },
                util: {
                    getNodeFromText: function(t) {
                        var e = document.createElement("div");
                        return e.innerHTML = t, e.children[0]
                    },
                    hasClass: function(t, e) {
                        return this.nodeListToArray(t.classList).filter(function(t) {
                            return t == e
                        }).length > 0
                    },
                    nodeListToArray: function(t) {
                        var e = [];
                        if (!t) return e;
                        for (var i = 0; i < t.length; i++) e.push(t.item(i));
                        return e
                    },
                    isIOS: function() {
                        return /(iPad;)|(iPhone;)/i.test(navigator.userAgent)
                    },
                    isOpera: function() {
                        return -1 != navigator.userAgent.toLowerCase().indexOf("opera")
                    },
                    isIE: function() {
                        return document.attachEvent && !this.isOpera()
                    },
                    isMobile: function() {
                        return /(ipad|iphone|android|mobile|touch)/i.test(navigator.userAgent)
                    },
                    isArray: function(t) {
                        return t && "[object Array]" == Object.prototype.toString.call(t)
                    },
                    isString: function(t) {
                        return "" === t || !!t && ("string" == typeof t || t instanceof String)
                    },
                    evalGlobal: function(t) {
                        if (t) {
                            var e = document.getElementsByTagName("head")[0] || document.documentElement,
                                i = document.createElement("script");
                            i.type = "text/javascript", this.isIE() ? i.text = t : i.appendChild(document.createTextNode(t)), e.insertBefore(i, e.firstChild), e.removeChild(i)
                        }
                    },
                    isCurPageInList: function(e) {
                        return e.filter(function(e) {
                            var i = this.prepareUrl(e).split("*").map(function(t) {
                                return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                            }).join(".*");
                            return i = "^" + i + "$", new RegExp(i).test(this.prepareUrl(t.location.href))
                        }, this).length > 0
                    },
                    prepareUrl: function(t) {},
                    getCookie: function(t) {},
                    setCookie: function(t, e, i) {}
                },
                wm: {
                    showedWidget: null,
                    loadedCount: 0,
                    init: function(t) {
                        this.c = t.caller
                    },
                    getList: function() {
                        return this.c.config.widgets.filter(function(t) {
                            return t.isLoaded
                        }, this)
                    },
                    getById: function(t) {
                        var e = this.c.config.widgets.filter(function(e) {
                            return t == e.id && e.isLoaded
                        }, this);
                        return e.length > 0 ? e[0] : null
                    },
                    hide: function() {
                        this.showedWidget && (this.showedWidget.hide && this.c.util.evalGlobal(this.showedWidget.hide), this.c.onWidgetClose(), this.c.shadow.hide(), this.showedWidget = null)
                    },
                    show: function(t) {
                        t.show && this.c.util.isString(t.show) && (this.showedWidget = t, this.c.shadow.show(), this.c.util.evalGlobal(t.show), this.c.hide())
                    },
                    checkPagesAll: function(t) {
                        return this.c = t, this.c.config.widgets.some(this.checkPages, this)
                    },
                    checkPages: function(t) {
                        var e = this.c.util.isCurPageInList(t.pages.list);
                        return "EXCLUDE" == t.pages.mode ? !e : e
                    },
                    checkWorkTimeAll: function(t) {
                        return this.c = t, this.c.config.widgets.some(this.checkWorkTime, this)
                    },
                    checkWorkTime: function(t) {
                        if (t.workTime || (t.isWorkTimeNow = !0, t.isWorkTimeChecked = !0), t.isWorkTimeChecked) return t.isWorkTimeNow;
                        var e = t.workTime,
                            i = new Date,
                            o = e.timeZoneOffset + i.getTimezoneOffset();
                        i = new Date(i.valueOf() + 6e4 * o);
                        var n = parseFloat(i.getHours() + "." + i.getMinutes()),
                            r = !0;
                        if (e.dayOff) {
                            var a = i.getDay();
                            e.dayOff.some(function(t) {
                                return t === a
                            }) && (r = !1)
                        }
                        if (r && e.holidays) {
                            var s = (i.getMonth() + 1).toString();
                            s = (1 == s.length ? "0" : "") + s, s = i.getDate() + "." + s, e.holidays.some(function(t) {
                                return t === s
                            }) && (r = !1)
                        }
                        return r && (e.timeTo < e.timeFrom ? n > e.timeTo && n < e.timeFrom && (r = !1) : (n < e.timeFrom || n > e.timeTo) && (r = !1)), t.isWorkTimeChecked = !0, t.isWorkTimeNow = r, !!r || !!e.actionRule
                    },
                    loadAll: function() {
                        this.c.config.widgets.forEach(this.load, this)
                    },
                    load: function(e) {
                        if (e.isLoaded = !1, this.c.execEventHandler("load-widget-" + e.id, [e]), this.checkPages(e) && this.checkWorkTime(e)) {
                            if (e.workTime && !e.isWorkTimeNow) switch (e.workTime.actionRule) {
                                case "text":
                                    "callback" == e.type && this.c.addEventHandler("form-init", function(i) {
                                        i.isCallbackForm && t.Bitrix24FormLoader.addEventHandler(i, "init-frame-params", function(t, i) {
                                            i.resultSuccessText = e.workTime.actionText, i.stopCallBack = !0
                                        })
                                    })
                            }
                            e.buttonNode = this.c.buttons.add({
                                id: e.id,
                                type: e.type,
                                href: this.getButtonUrl(e),
                                sort: e.sort,
                                classList: void 0 !== e.classList ? e.classList : null,
                                title: void 0 !== e.title ? e.title : null,
                                onclick: this.getButtonHandler(e),
                                bgColor: e.useColors ? this.c.config.bgColor : null,
                                iconColor: e.useColors ? this.c.config.iconColor : null
                            }), this.loadScript(e), e.isLoaded = !0, this.loadedCount++
                        }
                    },
                    getButtonHandler: function(t) {
                        var e = this;
                        return function() {
                            e.show(t)
                        }
                    },
                    getButtonUrl: function(t) {
                        if (t.script || !t.show) return null;
                        if (this.c.util.isString(t.show) || !t.show.url) return null;
                        var e = null;
                        return this.c.util.isMobile() && t.show.url.mobile ? e = t.show.url.mobile : !this.c.util.isMobile() && t.show.url.desktop ? e = t.show.url.desktop : this.c.util.isString(t.show.url) && (e = t.show.url), e
                    },
                    loadScript: function(t) {
                        if (t.script) {
                            var e = "",
                                i = !1,
                                o = t.script.match(/<script\b[^>]*>(.*?)<\/script>/i);
                            if (o && o[1]) e = o[1], i = !0;
                            else {
                                if (t.node = this.c.util.getNodeFromText(t.script), !t.node) return;
                                if (i = !1, void 0 !== t.caption) {
                                    var n = t.node.querySelector("[data-bx-crm-widget-caption]");
                                    n && (n.innerText = t.caption)
                                }
                            }
                            if (i) {
                                t.node = document.createElement("script");
                                try {
                                    t.node.appendChild(document.createTextNode(e))
                                } catch (i) {
                                    t.node.text = e
                                }
                                document.head.appendChild(t.node)
                            } else document.body.insertBefore(t.node, document.body.firstChild)
                        }
                    }
                },
                hello: {
                    isInit: !1,
                    wasOnceShown: !1,
                    condition: null,
                    cookieName: "b24_sitebutton_hello",
                    init: function(t) {
                        if (this.c = t.caller, !this.isInit && (this.context = t.context, this.showClassName = "b24-widget-button-popup-show", this.config = this.c.config.hello, this.delay = this.config.delay, this.buttonHideNode = this.context.querySelector("[data-b24-hello-btn-hide]"), this.iconNode = this.context.querySelector("[data-b24-hello-icon]"), this.nameNode = this.context.querySelector("[data-b24-hello-name]"), this.textNode = this.context.querySelector("[data-b24-hello-text]"), this.initHandlers(), this.isInit = !0, "y" != this.c.util.getCookie(this.cookieName) && this.config && this.config.conditions && 0 != this.config.conditions.length)) {
                            this.condition || this.setConditions(this.config.conditions);
                            var e = this;
                            this.c.addEventHandler("show", function() {
                                e.c.isShown || e.initCondition()
                            })
                        }
                    },
                    setConditions: function(t) {
                        this.condition = this.findCondition(t), this.initCondition()
                    },
                    initCondition: function() {
                        this.condition && this.isInit && (this.condition.icon && (this.iconNode.style["background-image"] = "url(" + this.condition.icon + ")"), this.condition.name && (this.nameNode.innerText = this.condition.name), this.condition.text && (this.textNode.innerText = this.condition.text), this.condition.delay && (this.delay = this.condition.delay), this.planShowing())
                    },
                    initHandlers: function() {
                        var e = this;
                        this.c.addEventListener(this.buttonHideNode, "click", function(i) {
                            e.hide(), i || (i = t.event), i.stopPropagation ? (i.preventDefault(), i.stopPropagation()) : (i.cancelBubble = !0, i.returnValue = !1)
                        }), this.c.addEventListener(this.context, "click", function() {
                            e.showWidget()
                        })
                    },
                    planShowing: function() {
                        if (!this.wasOnceShown && !this.c.buttons.wasOnceClick) {
                            var t = this.delay || 10,
                                e = this;
                            setTimeout(function() {
                                e.show()
                            }, 1e3 * t)
                        }
                    },
                    findCondition: function(t) {
                        if (t) {
                            var e;
                            return (e = t.filter(function(t) {
                                return !(!t.pages || "EXCLUDE" == t.pages.MODE || 0 == t.pages.LIST.length) && this.c.util.isCurPageInList(t.pages.LIST)
                            }, this)).length > 0 ? e[0] : (e = t.filter(function(t) {
                                return !(!t.pages || "INCLUDE" == t.pages.MODE) && !this.c.util.isCurPageInList(t.pages.LIST)
                            }, this)).length > 0 ? e[0] : (e = t.filter(function(t) {
                                return !t.pages
                            }, this), e.length > 0 ? e[0] : null)
                        }
                    },
                    showWidget: function() {
                        this.hide();
                        var t = null;
                        if (this.condition && this.condition.showWidgetId && (t = this.c.wm.getById(this.condition.showWidgetId)), t || (t = this.c.wm.getById(this.config.showWidgetId)), !t) {
                            var e = this.c.wm.getList();
                            e.length > 0 && (t = e[0])
                        }
                        t && this.c.wm.show(t)
                    },
                    showImmediately: function(t) {
                        (t = t || null) && this.setConditions([{
                            icon: t.icon,
                            name: t.name,
                            text: t.text,
                            page: "",
                            delay: 0
                        }]), this.show(!0)
                    },
                    show: function(t) {
                        this.condition && ((t = t || !1) || !this.c.buttons.isShown ? (this.wasOnceShown = !0, this.c.addClass(this.context, this.showClassName)) : this.planShowing())
                    },
                    hide: function() {
                        this.c.removeClass(this.context, this.showClassName), this.c.util.setCookie(this.cookieName, "y", {
                            expires: 21600
                        })
                    }
                }
            }
        }(window),
        window.BX.SiteButton.init({
            isActivated: !0,
            disableOnMobile: !1,
            resources: [{
                name: "style.css",
                type: "text/css",
                content: "html.bx-ios.bx-ios-fix-frame-focus,.bx-ios.bx-ios-fix-frame-focus body{-webkit-overflow-scrolling:touch}.bx-touch{-webkit-tap-highlight-color:rgba(0,0,0,0)}.bx-touch.crm-widget-button-mobile,.bx-touch.crm-widget-button-mobile body{height:100%;overflow:auto}.b24-widget-button-shadow{position:fixed;background:rgba(33,33,33,.3);width:100%;height:100%;top:0;left:0;visibility:hidden;z-index:10100}.bx-touch .b24-widget-button-shadow{background:rgba(33,33,33,.75)}.b24-widget-button-inner-container{position:relative;display:inline-block}.b24-widget-button-position-fixed{position:fixed;z-index:10000}.b24-widget-button-block{width:66px;height:66px;border-radius:100%;box-sizing:border-box;overflow:hidden;cursor:pointer}.b24-widget-button-block .b24-widget-button-icon{opacity:1}.b24-widget-button-block-active .b24-widget-button-icon{opacity:.7}.b24-widget-button-position-top-left{top:50px;left:50px}.b24-widget-button-position-top-middle{top:50px;left:50%;margin:0 0 0 -33px}.b24-widget-button-position-top-right{bottom:50px;right:50px}.b24-widget-button-position-bottom-left{left:50px;bottom:50px}.b24-widget-button-position-bottom-middle{left:50%;bottom:50px;margin:0 0 0 -33px}.b24-widget-button-position-bottom-right{right:50px;bottom:50px}.b24-widget-button-inner-block{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;height:66px;border-radius:100px;background:#00aeef;box-sizing:border-box}.b24-widget-button-icon-container{position:relative}.b24-widget-button-inner-item{position:absolute;top:0;left:0;padding:20px 19px;-webkit-transition:opacity .6s ease-out;transition:opacity .6s ease-out;-webkit-animation:socialRotateBack .4s;animation:socialRotateBack .4s;opacity:0}.b24-widget-button-icon-animation{opacity:1}.b24-widget-button-inner-mask{position:absolute;top:-8px;left:-8px;height:82px;min-width:66px;-webkit-width:calc(100% + 16px);width:calc(100% + 16px);border-radius:100px;background:#00aeef;opacity:.2}.b24-widget-button-icon{-webkit-transition:opacity .3s ease-out;transition:opacity .3s ease-out;cursor:pointer}.b24-widget-button-icon:hover{opacity:1}.b24-widget-button-inner-item-active .b24-widget-button-icon{opacity:1}.b24-widget-button-wrapper{position:fixed;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end;visibility:hidden;z-index:10150}.bx-imopenlines-config-sidebar{z-index:10101}.b24-widget-button-visible{visibility:visible;-webkit-animation:b24-widget-button-visible 1s ease-out forwards 1;animation:b24-widget-button-visible 1s ease-out forwards 1}@-webkit-keyframes b24-widget-button-visible{0%{-webkit-transform:scale(0);transform:scale(0)}30.001%{-webkit-transform:scale(1.2);transform:scale(1.2)}62.999%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes b24-widget-button-visible{0%{-webkit-transform:scale(0);transform:scale(0)}30.001%{-webkit-transform:scale(1.2);transform:scale(1.2)}62.999%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(1);transform:scale(1)}}.b24-widget-button-disable{-webkit-animation:b24-widget-button-disable .3s ease-out forwards 1;animation:b24-widget-button-disable .3s ease-out forwards 1}@-webkit-keyframes b24-widget-button-disable{0%{-webkit-transform:scale(1);transform:scale(1)}50.001%{-webkit-transform:scale(.5);transform:scale(.5)}92.999%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(0);transform:scale(0)}}@keyframes b24-widget-button-disable{0%{-webkit-transform:scale(1);transform:scale(1)}50.001%{-webkit-transform:scale(.5);transform:scale(.5)}92.999%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(0);transform:scale(0)}}.b24-widget-button-social{display:none}.b24-widget-button-social-item{position:relative;display:block;margin:0 10px 10px 0;width:45px;height:44px;background-color:#fff;background-size:100%;border-radius:25px;-webkit-box-shadow:0 8px 6px -6px rgba(33,33,33,.2);-moz-box-shadow:0 8px 6px -6px rgba(33,33,33,.2);box-shadow:0 8px 6px -6px rgba(33,33,33,.2);cursor:pointer}.b24-widget-button-social-item:hover{-webkit-box-shadow:0 0 6px rgba(0,0,0,.16),0 6px 12px rgba(0,0,0,.32);box-shadow:0 0 6px rgba(0,0,0,.16),0 6px 12px rgba(0,0,0,.32);-webkit-transition:box-shadow .17s cubic-bezier(0,0,.2,1);transition:box-shadow .17s cubic-bezier(0,0,.2,1)}.connector-icon-45{width:45px;height:45px}.b24-widget-button-callback{background-image:url('/images/icons/contacts/phone-ico.png');background-repeat:no-repeat;background-position:center;background-color:#00aeef;background-size:43%}.b24-widget-button-facebook{background-image:url('/images/icons/contacts/icon-facebook.png');background-repeat:no-repeat;background-position:center;background-color:#00aeef;background-size:43%}.b24-widget-button-mail{background-image:url('/images/icons/contacts/icon-mail.png');background-repeat:no-repeat;background-position:center;background-color:#00aeef;background-size:43%}.b24-widget-button-crmform{background-image:url('../../images/icons/contacts/phone-ico.png');background-repeat:no-repeat;background-position:center;background-color:#00aeef;background-size:43%}.b24-widget-button-openline_livechat{background-image:url('');background-repeat:no-repeat;background-position:center;background-color:#00aeef;background-size:43%}.b24-widget-button-social-tooltip{position:absolute;top:50%;left:-9000px;display:inline-block;padding:5px 10px;border-radius:10px;font:13px/15px \"Helvetica Neue\",Arial,Helvetica,sans-serif;color:#000;background:#fff;text-align:center;-webkit-transform:translate(0,-50%);transform:translate(0,-50%);-webkit-transition:opacity .6s linear;transition:opacity .6s linear;opacity:0}.b24-widget-button-social-item:hover .b24-widget-button-social-tooltip{left:50px;-webkit-transform:translate(0%,-50%);transform:translate(0%,-50%);opacity:1;z-index:1}.b24-widget-button-close{display:none}.b24-widget-button-position-bottom-left .b24-widget-button-social-item:hover .b24-widget-button-social-tooltip,.b24-widget-button-position-top-left .b24-widget-button-social-item:hover .b24-widget-button-social-tooltip{left:50px;-webkit-transform:translate(0%,-50%);transform:translate(0%,-50%);opacity:1}.b24-widget-button-position-top-right .b24-widget-button-social-item:hover .b24-widget-button-social-tooltip,.b24-widget-button-position-bottom-right .b24-widget-button-social-item:hover .b24-widget-button-social-tooltip{left:-5px;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%);opacity:1}.b24-widget-button-inner-container,.bx-touch .b24-widget-button-inner-container{-webkit-transform:scale(.85);transform:scale(.85);-webkit-transition:transform .3s;transition:transform .3s}.b24-widget-button-top .b24-widget-button-inner-container,.b24-widget-button-bottom .b24-widget-button-inner-container{-webkit-transform:scale(.7);transform:scale(.7);-webkit-transition:transform .3s linear;transition:transform .3s linear}.b24-widget-button-top .b24-widget-button-inner-block,.b24-widget-button-top .b24-widget-button-inner-mask,.b24-widget-button-bottom .b24-widget-button-inner-block,.b24-widget-button-bottom .b24-widget-button-inner-mask{background:#d6d6d6!important;-webkit-transition:background .3s linear;transition:background .3s linear}.b24-widget-button-top .b24-widget-button-pulse,.b24-widget-button-bottom .b24-widget-button-pulse{display:none}.b24-widget-button-wrapper.b24-widget-button-position-bottom-right,.b24-widget-button-wrapper.b24-widget-button-position-bottom-middle,.b24-widget-button-wrapper.b24-widget-button-position-bottom-left{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.b24-widget-button-bottom .b24-widget-button-social,.b24-widget-button-top .b24-widget-button-social{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-line-pack:end;align-content:flex-end;height:-webkit-calc(100vh - 110px);height:calc(100vh - 110px);-webkit-animation:bottomOpen .3s;animation:bottomOpen .3s;visibility:visible}.b24-widget-button-top .b24-widget-button-social{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;padding:10px 0 0 0;-webkit-animation:topOpen .3s;animation:topOpen .3s}.b24-widget-button-position-bottom-left.b24-widget-button-bottom .b24-widget-button-social{-ms-flex-line-pack:start;align-content:flex-start}.b24-widget-button-position-top-left.b24-widget-button-top .b24-widget-button-social{-ms-flex-line-pack:start;align-content:flex-start}.b24-widget-button-position-top-right.b24-widget-button-top .b24-widget-button-social{-ms-flex-line-pack:start;align-content:flex-start;-ms-flex-wrap:wrap-reverse;flex-wrap:wrap-reverse;position:absolute;bottom:-170px;}.b24-widget-button-position-bottom-right.b24-widget-button-bottom .b24-widget-button-social,.b24-widget-button-position-bottom-left.b24-widget-button-bottom .b24-widget-button-social,.b24-widget-button-position-bottom-middle.b24-widget-button-bottom .b24-widget-button-social{-ms-flex-line-pack:start;align-content:flex-start;-ms-flex-wrap:wrap-reverse;flex-wrap:wrap-reverse;order:1}.b24-widget-button-position-bottom-left.b24-widget-button-bottom .b24-widget-button-social{-ms-flex-wrap:wrap;flex-wrap:wrap}.b24-widget-button-position-bottom-left .b24-widget-button-social-item,.b24-widget-button-position-top-left .b24-widget-button-social-item,.b24-widget-button-position-top-middle .b24-widget-button-social-item,.b24-widget-button-position-bottom-middle .b24-widget-button-social-item{margin:0 0 10px 10px}.b24-widget-button-position-bottom-left.b24-widget-button-wrapper{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.b24-widget-button-position-top-left.b24-widget-button-wrapper{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.b24-widget-button-position-bottom-middle.b24-widget-button-wrapper,.b24-widget-button-position-top-middle.b24-widget-button-wrapper{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}.b24-widget-button-position-top-middle.b24-widget-button-top .b24-widget-button-social{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-line-pack:start;align-content:flex-start}.b24-widget-button-bottom .b24-widget-button-inner-item{display:none}.b24-widget-button-bottom .b24-widget-button-close{display:block;-webkit-animation:socialRotate .4s;animation:socialRotate .4s;opacity:1}.b24-widget-button-top .b24-widget-button-inner-item{display:none}.b24-widget-button-top .b24-widget-button-close{display:block;-webkit-animation:socialRotate .4s;animation:socialRotate .4s;opacity:1}.b24-widget-button-show{-webkit-animation:show .3s linear forwards;animation:show .3s linear forwards}@-webkit-keyframes show{0%{opacity:0}50%{opacity:0}100%{opacity:1;visibility:visible}}@keyframes show{0%{opacity:0}50%{opacity:0}100%{opacity:1;visibility:visible}}.b24-widget-button-hide{-webkit-animation:hidden .3s linear forwards;animation:hidden .3s linear forwards}@-webkit-keyframes hidden{0%{opacity:1;visibility:visible}50%{opacity:1}99.999%{visibility:visible}100%{opacity:0;visibility:hidden}}@keyframes hidden{0%{opacity:1;visibility:visible}50%{opacity:1}99.999%{visibility:visible}100%{opacity:0;visibility:hidden}}.b24-widget-button-hide-icons{-webkit-animation:hideIconsBottom .2s linear forwards;animation:hideIconsBottom .2s linear forwards}@-webkit-keyframes hideIconsBottom{0%{opacity:1}50%{opacity:1}100%{opacity:0;-webkit-transform:translate(0,20px);transform:translate(0,20px);visibility:hidden}}@keyframes hideIconsBottom{0%{opacity:1}50%{opacity:1}100%{opacity:0;-webkit-transform:translate(0,20px);transform:translate(0,20px);visibility:hidden}}@-webkit-keyframes hideIconsTop{0%{opacity:1}50%{opacity:1}100%{opacity:0;-webkit-transform:translate(0,-20px);transform:translate(0,-20px);visibility:hidden}}@keyframes hideIconsTop{0%{opacity:1}50%{opacity:1}100%{opacity:0;-webkit-transform:translate(0,-20px);transform:translate(0,-20px);visibility:hidden}}.b24-widget-button-popup-name{font:bold 14px \"Helvetica Neue\",Arial,Helvetica,sans-serif;color:#000}.b24-widget-button-popup-description{margin:4px 0 0 0;font:13px \"Helvetica Neue\",Arial,Helvetica,sans-serif;color:#424956}.b24-widget-button-close-item{width:28px;height:28px;background-image:url('');background-repeat:no-repeat;background-position:center;cursor:pointer}.b24-widget-button-wrapper.b24-widget-button-top{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}@-webkit-keyframes bottomOpen{0%{opacity:0;-webkit-transform:translate(0,20px);transform:translate(0,20px)}100%{opacity:1;-webkit-transform:translate(0,0);transform:translate(0,0)}}@keyframes bottomOpen{0%{opacity:0;-webkit-transform:translate(0,20px);transform:translate(0,20px)}100%{opacity:1;-webkit-transform:translate(0,0);transform:translate(0,0)}}@-webkit-keyframes topOpen{0%{opacity:0;-webkit-transform:translate(0,-20px);transform:translate(0,-20px)}100%{opacity:1;-webkit-transform:translate(0,0);transform:translate(0,0)}}@keyframes topOpen{0%{opacity:0;-webkit-transform:translate(0,-20px);transform:translate(0,-20px)}100%{opacity:1;-webkit-transform:translate(0,0);transform:translate(0,0)}}@-webkit-keyframes socialRotate{0%{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}100%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}@keyframes socialRotate{0%{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}100%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}@-webkit-keyframes socialRotateBack{0%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}100%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}@keyframes socialRotateBack{0%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}100%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}.b24-widget-button-popup{display:none;position:absolute;left:100px;padding:12px 20px 12px 14px;width:312px;border:2px solid #2fc7f7;background:#fff;border-radius:15px;box-sizing:border-box;z-index:1;cursor:pointer}.b24-widget-button-popup-triangle{position:absolute;display:block;width:8px;height:8px;background:#fff;border-right:2px solid #2fc7f7;border-bottom:2px solid #2fc7f7}.b24-widget-button-popup-show{display:block;-webkit-animation:show .4s linear forwards;animation:show .4s linear forwards}.b24-widget-button-position-top-left .b24-widget-button-popup-triangle{top:19px;left:-6px;-webkit-transform:rotate(134deg);transform:rotate(134deg)}.b24-widget-button-position-bottom-left .b24-widget-button-popup-triangle{bottom:25px;left:-6px;-webkit-transform:rotate(134deg);transform:rotate(134deg)}.b24-widget-button-position-bottom-left .b24-widget-button-popup,.b24-widget-button-position-bottom-middle .b24-widget-button-popup{bottom:0;left:75px}.b24-widget-button-position-bottom-right .b24-widget-button-popup-triangle{bottom:25px;right:-6px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.b24-widget-button-position-bottom-right .b24-widget-button-popup{left:-320px;bottom:0}.b24-widget-button-position-top-right .b24-widget-button-popup-triangle{top:19px;right:-6px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.b24-widget-button-position-top-right .b24-widget-button-popup{top:0;left:-320px}.b24-widget-button-position-top-middle .b24-widget-button-popup-triangle{top:19px;left:-6px;-webkit-transform:rotate(134deg);transform:rotate(134deg)}.b24-widget-button-position-top-middle .b24-widget-button-popup,.b24-widget-button-position-top-left .b24-widget-button-popup{top:0;left:75px}.b24-widget-button-position-bottom-middle .b24-widget-button-popup-triangle{bottom:25px;left:-6px;-webkit-transform:rotate(134deg);transform:rotate(134deg)}.bx-touch .b24-widget-button-popup{padding:10px 22px 10px 15px}.bx-touch .b24-widget-button-popup{width:230px}.bx-touch .b24-widget-button-position-bottom-left .b24-widget-button-popup{bottom:90px;left:0}.bx-touch .b24-widget-button-popup-image{margin:0 auto 10px auto}.bx-touch .b24-widget-button-popup-content{text-align:center}.bx-touch .b24-widget-button-position-bottom-left .b24-widget-button-popup-triangle{bottom:-6px;left:25px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.bx-touch .b24-widget-button-position-bottom-left .b24-widget-button-popup{bottom:90px;left:0}.bx-touch .b24-widget-button-position-bottom-right .b24-widget-button-popup{bottom:90px;left:-160px}.bx-touch .b24-widget-button-position-bottom-right .b24-widget-button-popup-triangle{bottom:-6px;right:30px;-webkit-transform:rotate(-45deg);transform:rotate(45deg)}.bx-touch .b24-widget-button-position-bottom-middle .b24-widget-button-popup{bottom:90px;left:50%;-webkit-transform:translate(-50%,0%);transform:translate(-50%,0%)}.bx-touch .b24-widget-button-position-bottom-middle .b24-widget-button-popup-triangle{bottom:-6px;left:108px;-webkit-transform:rotate(134deg);transform:rotate(45deg)}.bx-touch .b24-widget-button-position-top-middle .b24-widget-button-popup{top:90px;left:50%;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}.bx-touch .b24-widget-button-position-top-middle .b24-widget-button-popup-triangle{top:-7px;left:auto;right:108px;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.bx-touch .b24-widget-button-position-top-left .b24-widget-button-popup{top:90px;left:0}.bx-touch .b24-widget-button-position-top-left .b24-widget-button-popup-triangle{left:25px;top:-6px;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.bx-touch .b24-widget-button-position-top-right .b24-widget-button-popup{top:90px;left:-150px}.bx-touch .b24-widget-button-position-top-right .b24-widget-button-popup-triangle{top:-7px;right:40px;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.b24-widget-button-popup-btn-hide{position:absolute;top:4px;right:4px;display:inline-block;height:20px;width:20px;background-image:url('');background-repeat:no-repeat;background-position:center;opacity:.2;-webkit-transition:opacity .3s;transition:opacity .3s;cursor:pointer}.b24-widget-button-popup-btn-hide:hover{opacity:1}.bx-touch .b24-widget-button-popup-btn-hide{background-image:url('');background-repeat:no-repeat}.b24-widget-button-popup-inner{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap}.b24-widget-button-popup-content{width:222px}.b24-widget-button-popup-image{margin:0 10px 0 0;width:42px;text-align:center}.b24-widget-button-popup-image-item{display:inline-block;width:42px;height:42px;border-radius:100%;background-repeat:no-repeat;background-position:center;background-size:cover}.b24-widget-button-popup-button{margin:15px 0 0 0;-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:center}.b24-widget-button-popup-button-item{display:inline-block;margin:0 16px 0 0;font:bold 12px \"Helvetica Neue\",Arial,Helvetica,sans-serif;color:#08a6d8;text-transform:uppercase;border-bottom:1px solid #08a6d8;-webkit-transition:border-bottom .3s;transition:border-bottom .3s;cursor:pointer}.b24-widget-button-popup-button-item:hover{border-bottom:1px solid transparent}.b24-widget-button-popup-button-item:last-child{margin:0}.b24-widget-button-pulse{position:absolute;top:0;left:0;bottom:0;right:0;border:1px solid #00aeef;border-radius:50%}.b24-widget-button-pulse-animate{-webkit-animation:widgetPulse infinite 1.5s;animation:widgetPulse infinite 1.5s}@-webkit-keyframes widgetPulse{50%{-webkit-transform:scale(1,1);transform:scale(1,1);opacity:1}100%{-webkit-transform:scale(2,2);transform:scale(2,2);opacity:0}}@keyframes widgetPulse{50%{-webkit-transform:scale(1,1);transform:scale(1,1);opacity:1}100%{-webkit-transform:scale(2,2);transform:scale(2,2);opacity:0}}@media(min-height:1024px){.b24-widget-button-top .b24-widget-button-social,.b24-widget-button-bottom .b24-widget-button-social{max-height:900px}}@media(max-height:768px){.b24-widget-button-top .b24-widget-button-social,.b24-widget-button-bottom .b24-widget-button-social{max-height:600px}}@media(max-height:667px){.b24-widget-button-top .b24-widget-button-social,.b24-widget-button-bottom .b24-widget-button-social{max-height:440px}}@media(max-height:568px){.b24-widget-button-top .b24-widget-button-social,.b24-widget-button-bottom .b24-widget-button-social{max-height:380px}}@media(max-height:480px){.b24-widget-button-top .b24-widget-button-social,.b24-widget-button-bottom .b24-widget-button-social{max-height:335px}}"
            }, {
                name: "webform_style.css",
                type: "text/css",
                content: '.bx-crm-widget-form-config-sidebar{position:fixed;left:-3850px;height:100%;width:369px;box-shadow:0 0 5px 0 rgba(0,0,0,0.25);background:rgba(255,255,255,.98);overflow:hidden;-webkit-transition:opacity .5s ease;-moz-transition:opacity .5s ease;transition:opacity .5s ease;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;opacity:0;z-index:10101}.bx-crm-widget-form-config-sidebar-inner{position:absolute;width:100%;height:100%;overflow:hidden}.bx-crm-widget-form-config-sidebar.open-sidebar{left:auto;right:0;opacity:1;top:0}.bx-crm-widget-form-config-button.open-sidebar{display:none}.bx-crm-widget-form-config-button.button-visible{display:block}.bx-crm-widget-form-config-sidebar.close-sidebar{right:-385px}.bx-crm-widget-form-config-sidebar-header{position:absolute;top:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 20px;height:60px;width:100%;border-bottom:1px solid #e6e6e7;box-shadow:0 1px 0 0 rgba(0,0,0,0.03);background:#fff;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;z-index:4}.bx-crm-widget-form-config-sidebar-close{display:inline-block;-webkit-box-flex:1;-ms-flex:1;flex:1}.bx-crm-widget-form-config-sidebar-close-item{display:inline-block;background-image:url(\'\');cursor:pointer;-webkit-transition:opacity .3s ease-in-out;-moz-transition:opacity .3s ease-in-out;transition:opacity .3s ease-in-out;opacity:.5}.bx-crm-widget-form-config-sidebar-close-item{width:20px;height:18px;background-position:3px 2px;background-repeat:no-repeat}.bx-crm-widget-form-config-sidebar-close-item:hover{opacity:1}.bx-crm-widget-form-config-sidebar-message{-webkit-box-flex:16;-ms-flex:16;flex:16;text-align:center}.bx-crm-widget-form-config-sidebar-message-item{display:inline-block;max-width:310px;font:bold 10px "Helvetica Neue",Arial,Helvetica,sans-serif;color:#424956;text-transform:uppercase;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.bx-crm-widget-form-config-sidebar-rollup{display:none;margin:0 6px 0 0}.bx-crm-widget-form-config-sidebar-hamburger{display:none}.bx-crm-widget-form-config-sidebar-info{position:absolute;top:60px;width:100%;-webkit-height:calc(100% - 130px);height:calc(100% - 130px);background:#fff;-webkit-transition:opacity .6s ease;-moz-transition:opacity .6s ease;transition:opacity .6s ease;overflow:auto;opacity:1;-webkit-overflow-scrolling:touch}.bx-crm-widget-form-config-sidebar-chat-container{position:absolute;bottom:0;width:100%;background:#fff;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;z-index:4}.bx-crm-widget-form-config-sidebar-chat{padding:20px;-webkit-box-shadow:0 -2px 0 0 rgba(0,0,0,0.03);box-shadow:0 -2px 0 0 rgba(0,0,0,0.03)}.bx-crm-widget-form-config-sidebar-chat-border{height:3px;background:#2fc7f7;background:-moz-linear-gradient(left,#2fc7f7 0,#35e8f6 50%,#7ce3a7 74%,#bcf664 100%);background:-webkit-linear-gradient(left,#2fc7f7 0,#35e8f6 50%,#7ce3a7 74%,#bcf664 100%);background:linear-gradient(to right,#2fc7f7 0,#35e8f6 50%,#7ce3a7 74%,#bcf664 100%)}.bx-crm-widget-form-config-sidebar-logo{padding:15px 0 10px 0;text-align:center}.bx-crm-widget-form-config-sidebar-logo-text{display:inline-block;margin:0 0 0 -2px;font:12px "Helvetica Neue",Arial,Helvetica,sans-serif;color:#b2b6bd}.bx-crm-widget-form-config-sidebar-logo-bx{display:inline-block;margin:0 -2px 0 0;font:bold 14px "Helvetica Neue",Helvetica,Arial,sans-serif;color:#2fc7f7}.bx-crm-widget-form-config-sidebar-logo-24{display:inline-block;font:bold 15px "Helvetica Neue",Helvetica,Arial,sans-serif;color:#215f98}@media(min-width:320px) and (max-width:420px){.bx-crm-widget-form-config-sidebar{width:100%}.bx-crm-widget-form-config-sidebar-info-block-container{padding:0;width:100%;height:115px;border-radius:0}.bx-crm-widget-form-config-sidebar-info-block-container:before{top:0;left:0;width:100%;height:113px;border-radius:0}.bx-crm-widget-form-config-sidebar-info-block-container:after{top:0;left:0;width:100%;height:100px;border-radius:0}.bx-crm-widget-form-config-sidebar-social{width:100%}.crm-webform-header-container{text-align:center}}'
            }, {
                name: "ol_imcon_icon_style.css",
                type: "text/css",
                content: ".connector-icon{display:inline-block;width:44px;height:44px;background:#f2f2f2;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;background-color:#ebeff2;background-size:50% 50%;background-position:center center;background-repeat:no-repeat}.connector-icon-square{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.connector-icon-22{width:22px;height:22px}.connector-icon-30{width:30px;height:30px}.connector-icon-40{width:40px;height:40px}.connector-icon-botframework-twilio{background-color:#e22330;background-size:60%;background-image:url('')}.connector-icon-botframework-telegram{background-color:#20a4e2;background-position:40% center;background-image:url('')}.connector-icon-botframework-facebookmessenger{background-color:#0183ff;background-size:53%;background-image:url('')}.connector-icon-botframework-groupme{background-color:#1db0ed;background-size:53%;background-position:center 58%;background-image:url('')}.connector-icon-botframework-kik{background-size:70%;background-position:60% center;background-color:#92d300;background-image:url('')}.connector-icon-botframework-slack{background-size:57%;background-color:#776ebd;background-image:url('')}.connector-icon-instagram{background-size:57%;background-color:#d12988;background-image:url('')}.connector-icon-network{background-size:57%;background-color:#3bc8f5;background-image:url('')}.connector-icon-vkgroup{background-size:60%;background-color:#4a74a5;background-image:url('')}.connector-icon-livechat{background-position:center 55%;background-color:#4a90e2;background-image:url('')}.connector-icon-botframework-skype{background-color:#06afe5;background-image:url('')}.connector-icon-telegrambot{background-color:#20a4e2;background-position:40% center;background-image:url('')}.connector-icon-facebook{background-color:#3680f9;background-image:url('')}.connector-icon-viber{background-color:#9a5aca;background-size:93% 93%;background-image:url('')}.connector-icon-botframework{background-color:#06afe5;background-image:url('')}.connector-icon-botframework-emailoffice365{background-color:#0071c9;background-image:url('')}.connector-icon-botframework-webchat{background-color:#4393d0;background-image:url('')}.connector-icon-botframework-directline{background-color:#4393d0;background-image:url('')}.connector-icon-facebookcomments{background-color:#0183ff;background-image:url('')}.connector-icon-botframework-msteams{background-size:80%;background-color:#5455b0;background-image:url('')}"
            }],
            location: 3,
            delay: 0,
            bgColor: "#00AEEF",
            iconColor: "#FFFFFF",
            widgets: [{
                id: "callback",
                title: phone,
                script: '<div class="bx-crm-widget-form-config-wrapper">\n\t<div id="bx24_form_container_12" class="bx-crm-widget-form-config-sidebar">\n\t\t<div class="bx-crm-widget-form-config-sidebar-inner">\n\t\t\t<div class="bx-crm-widget-form-config-sidebar-header">\n\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-hamburger">\n\t\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-hamburger-item"></span>\n\t\t\t\t</span>\n\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-message">\n\t\t\t\t\t<span data-bx-crm-widget-caption="" class="bx-crm-widget-form-config-sidebar-message-item">We\'ll call you back</span>\n\t\t\t\t</span>\n\t\t\t\t<div class="bx-crm-widget-form-config-sidebar-rollup">\n\t\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-rollup-item"></span>\n\t\t\t\t</div>\n\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-close">\n\t\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-close-item" onclick="BX.SiteButton.removeClass(document.getElementById(\'bx24_form_container_12\'), \'open-sidebar\'); BX.SiteButton.onWidgetClose();"></span>\n\t\t\t\t</span>\n\t\t\t</div>\n\n\t\t\t<div class="bx-crm-widget-form-config-sidebar-info">\n\n\t\t\t\t<div id="bx24_form_inline_loader_container_12" class="">\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class="bx-crm-widget-form-config-sidebar-chat-container">\n\t\t\t\t<div class="bx-crm-widget-form-config-sidebar-chat-border"></div>\n\t\t\t\t\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>',
                sort: 200,
                useColors: !0,
                classList: ["b24-widget-button-callback"],
                show: "",
                hide: "",
                type: "callback",
                pages: {
                    mode: "EXCLUDE",
                    list: []
                },
                workTime: null
            }, {
                id: "mail",
                title: mail,
                script: '<div class="bx-crm-widget-form-config-wrapper">\n\t<div id="bx24_form_container_12" class="bx-crm-widget-form-config-sidebar">\n\t\t<div class="bx-crm-widget-form-config-sidebar-inner">\n\t\t\t<div class="bx-crm-widget-form-config-sidebar-header">\n\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-hamburger">\n\t\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-hamburger-item"></span>\n\t\t\t\t</span>\n\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-message">\n\t\t\t\t\t<span data-bx-crm-widget-caption="" class="bx-crm-widget-form-config-sidebar-message-item">We\'ll call you back</span>\n\t\t\t\t</span>\n\t\t\t\t<div class="bx-crm-widget-form-config-sidebar-rollup">\n\t\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-rollup-item"></span>\n\t\t\t\t</div>\n\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-close">\n\t\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-close-item" onclick="BX.SiteButton.removeClass(document.getElementById(\'bx24_form_container_12\'), \'open-sidebar\'); BX.SiteButton.onWidgetClose();"></span>\n\t\t\t\t</span>\n\t\t\t</div>\n\n\t\t\t<div class="bx-crm-widget-form-config-sidebar-info">\n\n\t\t\t\t<div id="bx24_form_inline_loader_container_12" class="">\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class="bx-crm-widget-form-config-sidebar-chat-container">\n\t\t\t\t<div class="bx-crm-widget-form-config-sidebar-chat-border"></div>\n\t\t\t\t\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>',
                sort: 200,
                useColors: !0,
                classList: ["b24-widget-button-mail"],
                show: "",
                hide: "",
                type: "mail",
                pages: {
                    mode: "EXCLUDE",
                    list: []
                },
                workTime: null
            }, {
                id: "facebook",
                title: "Facebook",
                script: '<div class="bx-crm-widget-form-config-wrapper">\n\t<div id="bx24_form_container_12" class="bx-crm-widget-form-config-sidebar">\n\t\t<div class="bx-crm-widget-form-config-sidebar-inner">\n\t\t\t<div class="bx-crm-widget-form-config-sidebar-header">\n\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-hamburger">\n\t\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-hamburger-item"></span>\n\t\t\t\t</span>\n\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-message">\n\t\t\t\t\t<span data-bx-crm-widget-caption="" class="bx-crm-widget-form-config-sidebar-message-item">We\'ll call you back</span>\n\t\t\t\t</span>\n\t\t\t\t<div class="bx-crm-widget-form-config-sidebar-rollup">\n\t\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-rollup-item"></span>\n\t\t\t\t</div>\n\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-close">\n\t\t\t\t\t<span class="bx-crm-widget-form-config-sidebar-close-item" onclick="BX.SiteButton.removeClass(document.getElementById(\'bx24_form_container_12\'), \'open-sidebar\'); BX.SiteButton.onWidgetClose();"></span>\n\t\t\t\t</span>\n\t\t\t</div>\n\n\t\t\t<div class="bx-crm-widget-form-config-sidebar-info">\n\n\t\t\t\t<div id="bx24_form_inline_loader_container_12" class="">\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class="bx-crm-widget-form-config-sidebar-chat-container">\n\t\t\t\t<div class="bx-crm-widget-form-config-sidebar-chat-border"></div>\n\t\t\t\t\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>',
                sort: 200,
                useColors: !0,
                classList: ["b24-widget-button-facebook"],
                type: "facebook",
                pages: {
                    mode: "EXCLUDE",
                    list: []
                },
                workTime: null
            }],
            layout: '<div>\n\t<div data-b24-crm-button-shadow="" class="b24-widget-button-shadow"></div>\n\t<div style="display: none;">\n\t\t<a data-b24-crm-button-widget-blank="" data-b24-crm-button-widget="" class="b24-widget-button-social-item" title="">\n\t\t\t<span data-b24-crm-button-tooltip="" class="b24-widget-button-social-tooltip"></span>\n\t\t</a>\n\t</div>\n\n\t<div data-b24-crm-button-cont="" class="b24-widget-button-wrapper b24-widget-button-position-top-right">\n\t\t<div data-b24-crm-hello-cont="" class="b24-widget-button-popup" style="border-color: #00AEEF;">\n\t\t\t<span data-b24-hello-btn-hide="" class="b24-widget-button-popup-btn-hide"></span>\n\t\t\t<div class="b24-widget-button-popup-inner">\n\t\t\t\t<div class="b24-widget-button-popup-image">\n\t\t\t\t\t<span data-b24-hello-icon="" class="b24-widget-button-popup-image-item"></span>\n\t\t\t\t</div>\n\t\t\t\t<div class="b24-widget-button-popup-content">\n\t\t\t\t\t<div data-b24-hello-name="" class="b24-widget-button-popup-name"></div>\n\t\t\t\t\t<div data-b24-hello-text="" class="b24-widget-button-popup-description"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="b24-widget-button-popup-triangle" style="border-color: #00AEEF;"></div>\n\t\t</div>\n\n\t\t<div data-b24-crm-button-block="" class="b24-widget-button-social">\n\n\t\t</div>\n\t\t<div data-b24-crm-button-block-button="" class="b24-widget-button-inner-container">\n\t\t\t<div data-b24-crm-button-block-border="" class="b24-widget-button-inner-mask" style="background: #00AEEF;"></div>\n\t\t\t<div class="b24-widget-button-block">\n\t\t\t\t<div data-b24-crm-button-pulse="" class="b24-widget-button-pulse" style="border-color: #00AEEF;"></div>\n\t\t\t\t<div data-b24-crm-button-block-inner="" class="b24-widget-button-inner-block" style="background: #00AEEF;">\n\t\t\t\t\t<div class="b24-widget-button-icon-container">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div data-b24-crm-button-icon="callback" class="b24-widget-button-inner-item">\n\t\t\t\t\t\t\t\t<svg class="b24-crm-button-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28"\n\t\t\t\t\t\t\t\t\tviewBox="0 0 28 30">\n\t\t\t\t\t\t\t\t\t<path class="b24-crm-button-call-icon" fill="#FFFFFF" fill-rule="evenodd"\n\t\t\t\t\t\t\t\t\t\td="M940.872414,978.904882 C939.924716,977.937215 938.741602,977.937215 937.79994,978.904882 C937.08162,979.641558 936.54439,979.878792 935.838143,980.627954 C935.644982,980.833973 935.482002,980.877674 935.246586,980.740328 C934.781791,980.478121 934.286815,980.265859 933.840129,979.97868 C931.757607,978.623946 930.013117,976.882145 928.467826,974.921839 C927.701216,973.947929 927.019115,972.905345 926.542247,971.731659 C926.445666,971.494424 926.463775,971.338349 926.6509,971.144815 C927.36922,970.426869 927.610672,970.164662 928.316918,969.427987 C929.300835,968.404132 929.300835,967.205474 928.310882,966.175376 C927.749506,965.588533 927.206723,964.77769 926.749111,964.14109 C926.29156,963.50449 925.932581,962.747962 925.347061,962.154875 C924.399362,961.199694 923.216248,961.199694 922.274586,962.161118 C921.55023,962.897794 920.856056,963.653199 920.119628,964.377388 C919.437527,965.045391 919.093458,965.863226 919.021022,966.818407 C918.906333,968.372917 919.274547,969.840026 919.793668,971.269676 C920.856056,974.228864 922.473784,976.857173 924.43558,979.266977 C927.085514,982.52583 930.248533,985.104195 933.948783,986.964613 C935.6148,987.801177 937.341181,988.444207 939.218469,988.550339 C940.510236,988.625255 941.632988,988.288132 942.532396,987.245549 C943.148098,986.533845 943.842272,985.884572 944.494192,985.204083 C945.459999,984.192715 945.466036,982.969084 944.506265,981.970202 C943.359368,980.777786 942.025347,980.091055 940.872414,978.904882 Z M940.382358,973.54478 L940.649524,973.497583 C941.23257,973.394635 941.603198,972.790811 941.439977,972.202844 C940.97488,970.527406 940.107887,969.010104 938.90256,967.758442 C937.61538,966.427182 936.045641,965.504215 934.314009,965.050223 C933.739293,964.899516 933.16512,965.298008 933.082785,965.905204 L933.044877,966.18514 C932.974072,966.707431 933.297859,967.194823 933.791507,967.32705 C935.117621,967.682278 936.321439,968.391422 937.308977,969.412841 C938.23579,970.371393 938.90093,971.53815 939.261598,972.824711 C939.401641,973.324464 939.886476,973.632369 940.382358,973.54478 Z M942.940854,963.694228 C940.618932,961.29279 937.740886,959.69052 934.559939,959.020645 C934.000194,958.902777 933.461152,959.302642 933.381836,959.8878 L933.343988,960.167112 C933.271069,960.705385 933.615682,961.208072 934.130397,961.317762 C936.868581,961.901546 939.347628,963.286122 941.347272,965.348626 C943.231864,967.297758 944.53673,969.7065 945.149595,972.360343 C945.27189,972.889813 945.766987,973.232554 946.285807,973.140969 L946.55074,973.094209 C947.119782,972.993697 947.484193,972.415781 947.350127,971.835056 C946.638568,968.753629 945.126778,965.960567 942.940854,963.694228 Z"\n\t\t\t\t\t\t\t\t\t\ttransform="translate(-919 -959)"/>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div data-b24-crm-button-icon="openline" class="b24-widget-button-inner-item">\n\t\t\t\t\t\t\t\t<svg class="b24-crm-button-icon b24-crm-button-icon-active" xmlns="http://www.w3.org/2000/svg"\n\t\t\t\t\t\t\t\t\twidth="28" height="28" viewBox="0 0 28 29">\n\t\t\t\t\t\t\t\t\t<path class="b24-crm-button-chat-icon" fill="#FFFFFF" fill-rule="evenodd"\n\t\t\t\t\t\t\t\t\t\td="M878.289968,975.251189 L878.289968,964.83954 C878.289968,963.46238 876.904379,962 875.495172,962 L857.794796,962 C856.385491,962 855,963.46238 855,964.83954 L855,975.251189 C855,976.924031 856.385491,978.386204 857.794796,978.090729 L860.589592,978.090729 L860.589592,981.876783 L860.589592,983.76981 L861.521191,983.76981 C861.560963,983.76981 861.809636,982.719151 862.45279,982.823297 L866.179185,978.090729 L875.495172,978.090729 C876.904379,978.386204 878.289968,976.924031 878.289968,975.251189 Z M881.084764,971.465135 L881.084764,976.197702 C881.43316,978.604561 879.329051,980.755508 876.426771,980.93027 L868.042382,980.93027 L866.179185,982.823297 C866.400357,983.946455 867.522357,984.94992 868.973981,984.716324 L876.426771,984.716324 L879.221567,988.502377 C879.844559,988.400361 880.153166,989.448891 880.153166,989.448891 L881.084764,989.448891 L881.084764,987.555864 L881.084764,984.716324 L882.947962,984.716324 C884.517696,984.949819 885.742758,983.697082 885.742758,981.876783 L885.742758,974.304675 C885.742659,972.717669 884.517597,971.465135 882.947962,971.465135 L881.084764,971.465135 Z"\n\t\t\t\t\t\t\t\t\t\ttransform="translate(-855 -962)"/>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t<div class="b24-widget-button-inner-item b24-widget-button-close">\n\t\t\t\t\t\t<svg class="b24-widget-button-icon b24-widget-button-close-item" xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29"><path fill="#FFF" fill-rule="evenodd" d="M18.866 14.45l9.58-9.582L24.03.448l-9.587 9.58L4.873.447.455 4.866l9.575 9.587-9.583 9.57 4.418 4.42 9.58-9.577 9.58 9.58 4.42-4.42"/></svg>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n</div>\n\n',
            hello: {
                delay: 1,
                showWidgetId: "openline_livechat"
            }
        })
});