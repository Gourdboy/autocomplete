/*! autocomplete - v1.2 - 2013-10-22 2:06:53 PM
* Copyright (c) 2013 舒克; Licensed  */
KISSY.add("gallery/autocomplete/1.2/base",function(a){function b(){this.initBase.apply(this,arguments)}var c="inputNode",d="query",e="results",f="results",g="afterQueryChange",h="valuechange",i="requestTemplate",j="resultListLocator";return b.ATTRS={enableCache:{value:!0},inputNode:{value:null,setter:function(b){return b instanceof a.NodeList?b:a.one(b)}},maxResults:{value:1e3},minQueryLength:{value:1},jsonpCallback:{value:"callback"},query:{value:{query:"",inputValue:""}},queryDelay:{value:100},queryDelimiter:{value:null},requestTemplate:{value:null,setter:"_setRequestTemplate"},resultFilter:{value:null},resultFormatter:{value:function(b,c){return a.map(c,function(b){return a.substitute('<div class="ks-ac-item-inner"><span class="ks-ac-name">{cityname}</span><span class="ks-ac-intro">{py}</span></div>',{cityname:b.text,py:b.raw.py})})}},resultListLocator:{value:null,setter:"_setLocator"},results:{value:[]},resultTextLocator:{value:null,setter:"_setLocator"},source:{value:null,setter:"_setSource"},sourceCharset:{value:void 0},value:{value:"",setter:"_onSetVal"},allowBrowserAutocomplete:{value:!1}},b.prototype={initBase:function(){return this.get("enableCache")===!0&&(this._cache={}),this.inputNode=this.get("inputNode"),this.inputNode?(this._renderUIAcBase(),this._bindUIAcBase(),this):(a.log("error: \u6ca1\u6709\u5bf9\u5e94\u7684\u8f93\u5165\u6846\u8282\u70b9."),!1)},destructor:function(){var a=this.get("inputNode");a.detach()},_renderUIAcBase:function(){this._syncBrowserAutocomplete()},_bindUIAcBase:function(){var b=this.get(c);b.on(h,this._onInputValueChange,this),this.on("afterValueChange",this._afterValueChange,this),this.on(g,function(b){var c=a.trim(b.newVal.query);c.length<this.get("minQueryLength")||this.sendRequest(c)},this),this.on("afterAllowBrowserAutocompleteChange",this._syncBrowserAutocomplete,this)},sendRequest:function(b,c){var d,e=this.get("source");e&&(c||(c=this.get(i)),d=c?c.call(this,b):b,e.sendRequest({query:b,request:d,callback:{success:a.bind(this._onResponse,this,b)}}))},_onSetVal:function(){},_onInputValueChange:function(a){this.set("value",a.newVal)},_afterValueChange:function(a){var b,c=this,e=a.newVal,f=this.get("queryDelimiter"),g=e;if(null!==f){var h=this._getCursortPosition(this.get("inputNode")[0]),i=e.slice(0,h),j=i.split(f);b=e.split(f);var k=j.length>0?j.length-1:0;g=b[k]}var l=function(){c.set(d,{query:g,inputValue:e})},m=this.get("queryDelay");m?(clearTimeout(this._delay),this._delay=setTimeout(function(){l()},m)):l()},_getCursortPosition:function(a){var b=0;if(document.selection){a.focus();var c=document.selection.createRange();c.moveStart("character",-a.value.length),b=c.text.length}else(a.selectionStart||"0"==a.selectionStart)&&(b=a.selectionStart);return b},_setCaretPosition:function(a,b){if(a.setSelectionRange)a.focus(),a.setSelectionRange(b,b);else if(a.createTextRange){var c=a.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",b),c.select()}},_updateValue:function(b){var c,d,e=this.get("queryDelimiter"),f=this.get("inputNode");if(b=a.trim(b),e){c=a.trim(e),d=this.get("value");var g=this._getCursortPosition(f[0]),h=d.slice(0,g),i=h.split(e);d=d.split(e);var j=i.length>0?i.length-1:0;d=a.map(a.trim(this.get("value")).split(e),function(b){return a.trim(b)}),d[j]=b,b=d.join(c)}this.set("value",b,{silent:!0}),f.val(b),e&&this._setCaretPosition(f[0],d.slice(0,j+1).join(c).length)},_onResponse:function(a,b){a===(this.get("query").query||"")&&this._parseResponse(a||"",b.response,b.data)},_parseResponse:function(b,c,d){var g,h,i,k,l,m,n,o,p,q={data:d,query:b,results:[]},r=this.get(j),s=[],t=c&&c.results;if(t&&r&&(t=r.call(this,t)),t&&t.length){for(p=this.get("resultTextLocator"),i=this.get("resultFilter"),k=0,l=t.length;l>k;++k)n=t[k],o=p?p.call(this,n):n.toString(),s.push({display:o,raw:n,text:o});if(i&&(s=i.call(this,b,s.concat())),s.length&&(h=this.get("resultFormatter"),m=this.get("maxResults"),m&&m>0&&s.length>m&&(s.length=m),h))if(g=h.call(this,b,s.concat()))for(k=0,l=g.length;l>k;++k)s[k].display=g[k];else a.log("Formatter didn't return anything.","warn","autocomplete-base")}q.results=s,this.set(e,s),this.fire(f,q)},_sourceSuccess:function(a,b){b.callback.success({data:a,response:{results:a},request:b})},_setEnableCache:function(a){a===!0&&(this._cache={})},_setRequestTemplate:function(b){return a.isFunction(b)?b.call(this,query):function(c){return a.substitute(b,{query:encodeURIComponent(c)})}},_setResultFilter:function(a,b){return b},_setResultHighlighter:function(b){return a.isFunction(b)?b:!1},_setLocator:function(b){if(a.isFunction(b))return b;b=b.toString().split(".");var c=function(a,b){if(!a)return null;for(var c=0,d=b.length;d>c;c++)b[c]in a&&(a=a[b[c]]);return a};return function(a){return a&&c(a,b)}},_setSource:function(b){switch(!0){case a.isString(b):return this._createJsonpSource(b);case a.isFunction(b):return this._createFunctionSource(b);case a.isArray(b):return this._createArraySource(b);case a.isObject(b):return this._createObjectSource(b)}return b},_createJsonpSource:function(b){var c,d={type:"jsonp"},e=this,f=this.get(i);return f&&(b+=f.call(this,query)),d.sendRequest=function(d){c=d;var f=d.request;if(e._cache&&f in e._cache)return e._sourceSuccess(e._cache[f],d),void 0;var g;g=a.substitute(b,{query:d.query,maxResults:e.get("maxResults")}),a.IO({url:g,dataType:"jsonp",crossDomain:!0,scriptCharset:e.get("sourceCharset"),jsonp:e.get("jsonpCallback"),success:function(a){c===d&&(e._cache&&(e._cache[d.request]=a),e._sourceSuccess(a,d))}})},d},_createArraySource:function(a){var b=this;return{type:"Array",sendRequest:function(c){b._sourceSuccess(a,c)}}},_createFunctionSource:function(a){var b=this;return{type:"function",sendRequest:function(c){var d;(d=a(c.query))&&b._sourceSuccess(d,c)}}},_createObjectSource:function(a){var b=this;return{type:"Object",sendRequest:function(c){b._sourceSuccess(a,c)}}},_syncBrowserAutocomplete:function(){var a=this.get("inputNode");"input"===a.prop("nodeName").toLowerCase()&&a.attr("autocomplete",this.get("_syncBrowserAutocomplete")?"on":"off")}},b},{requires:["node","base"]}),KISSY.add("gallery/autocomplete/1.2/rich",function(a,b,c,d){var e="query",f="result",g="afterQueryChange",h="results",i="select",j="activeItem",k="hoverItem",l="ks-ac-active",m="ks-ac-hover",n="J_AcItem",o="ks-autocomplete",p="ks-autocomplete-input",q="."+n,r=a.isArray,s=document;s.body;var t=a.DOM,u=window,v=function(){this.initRich.apply(this,arguments)};return v.ATTRS={width:{value:null,getter:"_getWidth"},enableAutoFill:{value:!0},activeFirstItem:{value:!0},activeItem:{value:null},hoveredItem:{readOnly:!0,value:null},visible:{value:!1},resultsListVisible:{value:!1},enableNoResultsMessage:{value:!0},messageVisible:{value:!1},align:{value:{node:null,points:["bl","tl"],offset:[0,-1],overflow:{adjustX:0,adjustY:0}},setter:"_setAlign"},zIndex:{value:1e4},boundingBoxTemplate:{value:'<div class="ks-ac-header"></div><div class="ks-ac-body">   <div class="ks-ac-message J_AcMessage"></div>   <div class="ks-ac-content J_AcContent">       <div class="J_HotList"></div>       <div class="J_ResultsList"></div>   </div></div><div class="ks-ac-footer"><span></span></div>'},listNodeTemplate:{value:'<div class="ks-ac-list"></div>'},itemNodeTemplate:{value:'<div class="ks-ac-item"></div>'},noResultsMessage:{value:'\u6ca1\u6709"<span class="ks-ac-message-hightlight">{query}</span>"\u76f8\u5173\u7684\u63a8\u8350'},wrapperClass:{value:""},trigger:{value:[]}},v.prototype={initRich:function(){this.overlay=null,this.overlayNode=null,this.contentNode=null,this.resultsListNode=null,this.messageNode=null,this.hotNode=null,this.headerNode=null,this.footerNode=null,this._renderRich(),this._bindRich()},destructor:function(){this.resultsListNode.detach(),this.detach(),this.overlay=null},_renderRich:function(){var b=this.get("inputNode");b.addClass(p);var c=this.get("align");c.node=c.node?c.node:b;var e=this.overlay=new d({align:c,content:this.get("boundingBoxTemplate"),zIndex:this.get("zIndex")});e.render();var f=e.get("el");this.overlayId="J_Ks"+a.guid(),f.prop("id",this.overlayId).addClass(o).attr("tabindex","-1"),""!==this.get("wrapperClass")&&f.addClass(this.get("wrapperClass")),this.overlayNode=f,this.headerNode=f.one(".J_AcHeader"),this.bodyNode=f.one(".J_AcBody"),this.footerNode=f.one(".J_AcFooter"),this.messageNode=f.one(".J_AcMessage").hide(),this.contentNode=f.one(".J_AcContent"),this.hotNode=f.one(".J_HotList").hide(),this.resultsListNode=f.one(".J_ResultsList").hide()},_buildList:function(b){var c=a.one(a.DOM.create(this.get("listNodeTemplate")));return a.each(b,function(a){c.append(this._createItemNode(a).data(f,a))},this),c},_createItemNode:function(b){var c=a.one(t.create(this.get("itemNodeTemplate")));return c.addClass(n).append(b.display),c},_bindRich:function(){var b=this.get("inputNode");this.on("afterVisibleChange",this._afterVisibleChange,this),this.on("afterResultsListVisibleChange",this._afterResultsListVisibleChange,this),this.on("afterMessageVisibleChange",this._afterMessageVisibleChange,this),b.on("keydown",a.bind(this._afterKeyDown,this)),b.on("focus",this._onFocus,this),this.on(h,a.bind(this._onResults,this)),this.on(g,this._onQuery,this),this.on("afterActiveItemChange",a.bind(this._afterActiveChange,this)),this.on("afterHoverItemChange",a.bind(this._afterHoverChange,this)),this.on(i,this._onSelect,this);var c=a.one(s),d=a.bind(this._afterDocClick,this);this.overlay.on("afterVisibleChange",function(a){return a.newVal?(c.on("click",d),void 0):(c.detach("click",d),void 0)},this),a.Event.on(u,"resize",a.buffer(this._syncPosition,100,this),this),this.bindList()},bindList:function(){this.resultsListNode.delegate("mouseenter",q,function(b){var c=a.one(b.currentTarget);this.hoverItem(c)},this),this.resultsListNode.delegate("click",q,function(b){b.preventDefault();var c=a.one(b.currentTarget);this.selectItem(c)},this),this.resultsListNode.on("mouseleave",function(){this.set(k,null)},this)},_onResults:function(b){var c=b.results,d=b.query,e=this.resultsListNode;this._isSelectVal||(r(c)&&c.length>0?(this._clear(),e.empty(),e.append(this._buildList(c)),this.set("messageVisible",!1),this.get("activeFirstItem")&&this.set(j,this._getFirstItem()),s.activeElement==this.inputNode[0]&&this.set("resultsListVisible",!0),this._syncPosition()):(d=a.escapeHTML(d),s.activeElement==this.inputNode[0]&&(this.get("enableNoResultsMessage")?this.showMessage(a.substitute(this.get("noResultsMessage"),{query:d})):(e.empty(),this.set(j,null)))))},showMessage:function(a){this.messageNode.html(a);var b=this;return setTimeout(function(){b.set("messageVisible",!0)},1),this},_syncPosition:function(){var a=this.get("align");this.overlay.align(a.node,a.points,a.offset,a.overflow)},_clear:function(){this.set(j,null),this.set(k,null)},selectItem:function(a){a||(a=this.get(j));var b=a.data(f);return this.fire(i,{node:a,result:b}),this},_afterVisibleChange:function(a){var b=a.newVal;this._syncPosition(),b?this.overlay.show():this.overlay.hide()},_afterResultsListVisibleChange:function(a){var b=a.newVal;b?(this.overlay.set("width",this.get("width")),this.resultsListNode.show(),this.set("visible",!0),this._syncPosition()):this.resultsListNode.hide(),""!==this.get(e).query&&a.newVal===!1&&this.get("enableAutoFill")&&this.get(j)&&this.selectItem()},_afterMessageVisibleChange:function(a){var b=a.newVal;b?(this.messageNode.show(),this.set("visible",!0),this._syncPosition()):(this.messageNode.hide(),this.set("visilbe",!1))},_onFocus:function(a){var b=this;b.set("messageVisible",!1),setTimeout(function(){b._isSelectVal||a.currentTarget.select()},100)},_isOutSide:function(b,c){for(var d=0,e=c.length;e>d;d++){var f=c[d][0];if(b===f||a.one(b).parent(function(a){return a===f?!0:void 0}))return!1}return!0},_afterDocClick:function(a){var b=a.target;this._isOutSide(b,[this.overlayNode,this.inputNode].concat(this.get("trigger")))&&(this.set("resultsListVisible",!1),this.set("visible",!1))},_onSelect:function(a){var b=this,c=this.get("inputNode");this._updateValue(a.result.text),this._isSelectVal=!0,setTimeout(function(){b._isSelectVal=!1},200),c[0].focus(),this.set(j,null),this.set("resultsListVisible",!1),this.set("visible",!1)},_onQuery:function(a){0===a.newVal.query.length&&(this.set("resultsListVisible",!1),this.set("messageVisible",!1))},_afterActiveChange:function(a){var b=a.prevVal,c=a.newVal;b&&b.removeClass(l),c&&c.addClass(l)},_afterHoverChange:function(a){var b=a.prevVal,c=a.newVal;b&&b.removeClass(m),c&&c.addClass(m)},_afterKeyDown:function(a){switch(a.keyCode){case 38:a.preventDefault(),this.activePrevItem();break;case 40:a.preventDefault(),this.activeNextItem();break;case 13:a.preventDefault(),this.get("resultsListVisible")&&this.get(j)&&this.selectItem();break;case 9:this.get("resultsListVisible")&&this.get(j)&&(a.preventDefault(),this.selectItem()),this.set("resultsListVisible",!1),this.set("visible",!1);break;case 27:this.set("resultsListVisible",!1),this.set("visible",!1)}},hoverItem:function(a){a&&this.set(k,a)},activeNextItem:function(){var a,b=this.get(j);b?(a=b.next(q),a||(a=this._getFirstItem())):a=this._getFirstItem(),this.set(j,a)},activePrevItem:function(){var a=this.get(j),b=a?a.prev(q)||this._getLastItem():this._getLastItem();this.set(j,b)},_getFirstItem:function(){return this.resultsListNode.one(q)},_getLastItem:function(){return this.resultsListNode.one(q+":last-child")},_getWidth:function(b){return a.isNumber(b)?b:b instanceof a.NodeList?b.outerWidth():null===b?this.get("inputNode").outerWidth():void 0},_setAlign:function(b){var c={node:null,points:["bl","tl"],offset:[0,-1],overflow:{adjustX:0,adjustY:0}};return a.mix(c,b,void 0,void 0,!0),c.node=a.isString(c.node)?a.one(c.node):c.node,c.node?c:(c.node=this.get("inputNode"),c)}},v},{requires:["node","event","overlay","sizzle"]}),KISSY.add("gallery/autocomplete/1.2/hot",function(a,b,c,d,e){var f="select",g="afterQueryChange",h="J_AcItem",i="ks-ac-hot-selected",j="."+h,k=".J_TabItem",l=function(){this.initHot.apply(this,arguments)};return l.ATTRS={hotTemplate:{value:'<div class="ks-ac-hot-city"><div class="ks-ac-acinput-hot-tit">\u70ed\u95e8\u57ce\u5e02/\u56fd\u5bb6(\u652f\u6301\u6c49\u5b57/\u62fc\u97f3/\u82f1\u6587\u5b57\u6bcd)</div><ul class="tab-nav">{{#results}}<li class="J_TabItem" tabindex="2"><a href="javascript:void(0)" target="_self">{{tabname}}</a></li>{{/results}}</ul><div class="tab-content J_TabContent">{{#results}}<div class="tab-pannel J_Pannel">{{#tabdata}}<dl><dt>{{dt}}</dt><dd>{{#dd}}<span><a data-sid="{{sid}}" class="J_AcItem" tabindex="3" href="javascript:void(0);" target="_self">{{cityName}}</a></span>{{/dd}}</dd></dl>{{/tabdata}}</div>{{/results}}</div></div>'},hotWidth:{value:320},hotSource:{value:null,setter:"_onHotSourceChange"},hotSourceCharset:{value:void 0},hotJsonpCallback:{value:"callback"},hotActiveTab:{value:null},hotResultsFormatter:{value:function(b){var c={};return a.each(b.results,function(b){a.each(b.tabdata,function(b){a.each(b.dd,function(b){var d="hot_source_id_"+a.guid();b.raw=a.mix({},b),b.sid=d,b.text=b.cityName,c[d]=b})})}),c}},hotResultsLocator:{value:null},hotVisible:{value:!1}},l.prototype={initHot:function(){null!==this.get("hotSource")&&(this._renderHot(),this._bindHot(),this._hasBuildHot=!1,this._hotResults={})},destructor:function(){this.hotNode.detach()},_renderHot:function(){},_bindHot:function(){var b=this.get("inputNode");this.on("afterHotVisibleChange",function(a){var b=a.newVal;b?(this._hasBuildHot||this._buildHot(),this.hotNode.show(),this.overlay.set("width",this.get("hotWidth")),this.set("resultsListVisible",!1),this.set("visible",!0),this._syncPosition()):this.hotNode.hide()},this),this.on("afterVisibleChange",function(a){a.newVal===!1&&this.set("hotVisible",!1)},this),this.on("afterResultsListVisibleChange",function(a){a.newVal&&this.set("hotVisible",!1)},this),b.on("focus",function(){this._isSelectVal||this.set("hotVisible",!0)},this),b.on("keydown",function(a){!this.get("hotVisible")||38!==a.keyCode&&40!==a.keyCode||this.overlayNode[0].focus()},this),this.on(g,function(b){""===a.trim(b.newVal.query)?(this.set("messageVisible",!1),this.set("hotVisible",!0)):this.set("hotVisible",!1)},this),this.hotNode.delegate("click",j,function(b){var c=a.one(b.currentTarget);this.fire(f,{node:c,result:this._hotResults[c.attr("data-sid")]})},this),this.hotNode.delegate("click",k,function(b){var c=a.indexOf(b.currentTarget,this.hotNavNodes);this.set("hotActiveTab",c)},this),this.on("afterHotActiveTabChange",function(a){var b=this.hotNavNodes.item(a.prevVal),c=this.hotPannelNodes.item(a.prevVal),d=this.hotNavNodes.item(a.newVal),e=this.hotPannelNodes.item(a.newVal);b&&b.removeClass(i),c&&c.hide(),d&&d.addClass(i),e&&e.show(),this._syncPosition()},this),this.hotNode.on("keydown",function(a){27===a.keyCode&&(this.set("hotVisible",!1),this.set("visible",!1))},this)},_buildHot:function(){var b=this,c=this.get("hotSource"),d=function(a){var c=b.get("hotResultsLocator"),d=b.get("hotResultsFormatter");c&&(a=c.call(b,a)),b._hotResults=d.call(b,a);var f=new e(b.get("hotTemplate")).render(a),g=b.hotNode;g.html(f),b.hotNavNodes=g.all(".J_TabItem"),b.hotPannelNodes=g.all(".J_Pannel"),b.hotPannelNodes.hide(),b.set("hotActiveTab",0),b._hasBuildHot=!0};a.isString(c)?a.IO({url:c,dataType:"jsonp",jsonp:this.get("hotJsonpCallback"),scriptCharset:b.get("hotSourceCharset"),success:function(a){d(a)}}):(a.isObject(c)||a.isArray(c))&&d(c)},_onHotSourceChange:function(){this._hasBuildHot=!1,this._hotResults={},this.set("hotActiveTab",-1)}},l},{requires:["node","event","ajax","xtemplate"]}),KISSY.add("gallery/autocomplete/1.2/aria",function(a){var b="J_AcItem",c=".J_TabItem",d="."+b,e=function(){this.initAria.apply(this,arguments)};return e.ATTRS={},e.prototype={nodeArr:null,isFirstShow:!0,initAria:function(){this.bindAria(),this.nodeArr=null},bindAria:function(){this.on("afterHotActiveTabChange",function(a){var b=this.hotNavNodes.item(a.newVal),c=this.hotPannelNodes.item(a.newVal),e=this.hotItemNodes=c.all(d);this.nodeArr=this.buildArr2(e),this.isFirstShow?this.isFirstShow=!1:b.one("a")&&b.one("a")[0].focus()},this),this.on("afterHotSourceChange",function(){this.isFirstShow=!0},this),this.hotNode.delegate("keydown",d,function(c){var d=a.one(c.currentTarget),e=d.data("src");if(d.hasClass(b)&&d.hasData("src"))switch(c.keyCode){case 37:c.preventDefault(),this._selectHotLeft(e);break;case 38:c.preventDefault(),this._selectHotTop(e);break;case 39:c.preventDefault(),this._selectHotRight(e);break;case 40:c.preventDefault(),this._selectHotBottom(e)}},this),this.hotNode.delegate("keydown",c,function(a){var b=this.get("hotActiveTab");switch(a.keyCode){case 37:b--,0>b&&(b=this.hotNavNodes.length-1),this.set("hotActiveTab",b);break;case 39:b++,b>=this.hotNavNodes.length&&(b=0),this.set("hotActiveTab",b);break;case 38:this.hotItemNodes.item(0)[0].focus();break;case 40:this.hotItemNodes.item(0)[0].focus();break;case 9:a.preventDefault(),this.hotItemNodes.item(0)[0].focus()}},this)},buildArr2:function(b){var c=[],d={};return b.each(function(b){var c=b.offset();a.isArray(d[c.top])||(d[c.top]=[]),d[c.top].push({node:b,offset:c,x:d[c.top].length})}),a.each(d,function(a,b){c.push(b)}),c.sort(function(a,b){return a-b}),a.each(c,function(b,e){a.each(d[b],function(a){a.y=e,a.node.data("src",a)}),c[e]=d[b]}),c},_selectHotTop:function(a){var b=a.x,c=a.y;c--,0>c&&(c=this.nodeArr.length-1),this._selectHot(b,c,"up")},_selectHotBottom:function(a){var b=a.x,c=a.y;c++,c>=this.nodeArr.length&&(c=0),this._selectHot(b,c,"down")},_selectHotLeft:function(a){var b=a.x,c=a.y;b--,0>b&&(c--,0>c&&(c=this.nodeArr.length-1),b=this.nodeArr[c].length-1),this._selectHot(b,c)},_selectHotRight:function(a){var b=a.x,c=a.y;b++,b>=this.nodeArr[a.y].length&&(b=0,c++,c>=this.nodeArr.length&&(c=0)),this._selectHot(b,c)},_selectHot:function(a,b,c){if(this.nodeArr[b])if(this.nodeArr[b][a])this.nodeArr[b][a].node[0].focus();else{if("up"===c)return b--,this._selectHot(a,b,c),!1;if("down"===c)return b++,this._selectHot(a,b,c),!1}}},e},{requires:["node","event"]}),KISSY.add("gallery/autocomplete/1.2/index-aria",function(a,b,c,d,e,f){return b.extend([c,d,e,f],{},{})},{requires:["rich-base","./base","./rich","./hot","./aria","./autocomplete.css"]});