/*! autocomplete - v1.1 - 2013-08-08 10:54:33 AM
* Copyright (c) 2013 舒克; Licensed  */
KISSY.add(function(a,b,c,d,e){var f="select",g="afterQueryChange",h="J_AcItem",i="ks-ac-hot-selected",j="."+h,k=".J_TabItem",l=function(){this.initHot.apply(this,arguments)};return l.ATTRS={hotTemplate:{value:'<div class="ks-ac-hot-city"><div class="ks-ac-acinput-hot-tit">\u70ed\u95e8\u57ce\u5e02/\u56fd\u5bb6(\u652f\u6301\u6c49\u5b57/\u62fc\u97f3/\u82f1\u6587\u5b57\u6bcd)</div><ul class="tab-nav">{{#results}}<li class="J_TabItem" tabindex="2"><a href="javascript:void(0)" target="_self">{{tabname}}</a></li>{{/results}}</ul><div class="tab-content J_TabContent">{{#results}}<div class="tab-pannel J_Pannel">{{#tabdata}}<dl><dt>{{dt}}</dt><dd>{{#dd}}<span><a data-sid="{{sid}}" class="J_AcItem" tabindex="3" href="javascript:void(0);" target="_self">{{cityName}}</a></span>{{/dd}}</dd></dl>{{/tabdata}}</div>{{/results}}</div></div>'},hotWidth:{value:320},hotSource:{value:null,setter:"_onHotSourceChange"},hotSourceCharset:{value:void 0},hotJsonpCallback:{value:"callback"},hotActiveTab:{value:null},hotResultsFormatter:{value:function(b){var c={};return a.each(b.results,function(b){a.each(b.tabdata,function(b){a.each(b.dd,function(b){var d="hot_source_id_"+a.guid();b.raw=a.mix({},b),b.sid=d,b.text=b.cityName,c[d]=b})})}),c}},hotResultsLocator:{value:null},hotVisible:{value:!1}},l.prototype={initHot:function(){null!==this.get("hotSource")&&(this._renderHot(),this._bindHot(),this._hasBuildHot=!1,this._hotResults={})},destructor:function(){this.hotNode.detach()},_renderHot:function(){},_bindHot:function(){var b=this.get("inputNode");this.on("afterHotVisibleChange",function(a){var b=a.newVal;b?(this._hasBuildHot||this._buildHot(),this.hotNode.show(),this.overlay.set("width",this.get("hotWidth")),this.set("resultsListVisible",!1),this.set("visible",!0),this._syncPosition()):this.hotNode.hide()},this),this.on("afterVisibleChange",function(a){a.newVal===!1&&this.set("hotVisible",!1)},this),this.on("afterResultsListVisibleChange",function(a){a.newVal&&this.set("hotVisible",!1)},this),b.on("focus",function(){this._isSelectVal||this.set("hotVisible",!0)},this),b.on("keydown",function(a){!this.get("hotVisible")||38!==a.keyCode&&40!==a.keyCode||this.overlayNode[0].focus()},this),this.on(g,function(b){""===a.trim(b.newVal.query)?(this.set("messageVisible",!1),this.set("hotVisible",!0)):this.set("hotVisible",!1)},this),this.hotNode.delegate("click",j,function(b){var c=a.one(b.currentTarget);this.fire(f,{node:c,result:this._hotResults[c.attr("data-sid")]})},this),this.hotNode.delegate("click",k,function(b){var c=a.indexOf(b.currentTarget,this.hotNavNodes);this.set("hotActiveTab",c)},this),this.on("afterHotActiveTabChange",function(a){var b=this.hotNavNodes.item(a.prevVal),c=this.hotPannelNodes.item(a.prevVal),d=this.hotNavNodes.item(a.newVal),e=this.hotPannelNodes.item(a.newVal);b&&b.removeClass(i),c&&c.hide(),d&&d.addClass(i),e&&e.show(),this._syncPosition()},this),this.hotNode.on("keydown",function(a){27===a.keyCode&&(this.set("hotVisible",!1),this.set("visible",!1))},this)},_buildHot:function(){var b=this,c=this.get("hotSource"),d=function(a){var c=b.get("hotResultsLocator"),d=b.get("hotResultsFormatter");c&&(a=c.call(b,a)),b._hotResults=d.call(b,a);var f=new e(b.get("hotTemplate")).render(a),g=b.hotNode;g.html(f),b.hotNavNodes=g.all(".J_TabItem"),b.hotPannelNodes=g.all(".J_Pannel"),b.hotPannelNodes.hide(),b.set("hotActiveTab",0),b._hasBuildHot=!0};a.isString(c)?a.IO({url:c,dataType:"jsonp",jsonp:this.get("hotJsonpCallback"),scriptCharset:b.get("hotSourceCharset"),success:function(a){d(a)}}):(a.isObject(c)||a.isArray(c))&&d(c)},_onHotSourceChange:function(){this._hasBuildHot=!1,this._hotResults={},this.set("hotActiveTab",-1)}},l},{requires:["node","event","ajax","xtemplate"]});