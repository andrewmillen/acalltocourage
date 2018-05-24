function Scroller(e){this.svg=e.el,this.animationBounds={},this.animationBounds.top=e.startPoint||.5,this.animationBounds.bottom=e.endPoint||.5,this.animationBounds.containerBounds=this.svg.getBoundingClientRect(),this.start=this.getPagePosition("top"),this.end=this.getPagePosition("bottom"),this.svgLength=this.svg.getTotalLength(),this.svg.style.strokeDasharray=this.svgLength,this.animateLine(),window.addEventListener("scroll",this.animateLine.bind(this))}!function(){for(var e,t=function(){},n=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],i=n.length,r=window.console=window.console||{};i--;)e=n[i],r[e]||(r[e]=t)}(),$(function(){$('a[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash);if(e=e.length?e:$("[name="+this.hash.slice(1)+"]"),e.length)return $("html, body").animate({scrollTop:e.offset().top},1e3),!1}})}),Scroller.prototype.getPagePosition=function(e){var t=document.body.getBoundingClientRect().top,n=this.animationBounds.containerBounds[e],i=window.innerHeight*this.animationBounds[e];return n-t-i},Scroller.prototype.animateLine=function(){this.currentVisiblePosition=window.pageYOffset,this.currentVisiblePosition<this.start&&(this.svg.style.strokeDashoffset=this.svgLength),this.currentVisiblePosition>this.end&&(this.svg.style.strokeDashoffset="0px"),this.currentVisiblePosition>this.start&&this.currentVisiblePosition<this.end&&(this.svg.style.strokeDashoffset=this.distanceRemaining()*this.pixelsPerVerticalScroll()+"px")},Scroller.prototype.distanceRemaining=function(){return this.end-this.currentVisiblePosition},Scroller.prototype.pixelsPerVerticalScroll=function(){return this.verticalDistance=this.end-this.start,this.svgLength/this.verticalDistance},new Scroller({el:document.getElementById("animated-path"),startPoint:.6,endPoint:.3}),function($){"use strict";function e(t,n){if(!(this instanceof e)){var i=new e(t,n);return i.open(),i}this.id=e.id++,this.setup(t,n),this.chainCallbacks(e._callbackChain)}if("undefined"==typeof $)return void("console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery."));var t=[],n=function(e){return t=$.grep(t,function(t){return t!==e&&t.$instance.closest("body").length>0})},i=function(e,t){var n={},i=new RegExp("^"+t+"([A-Z])(.*)");for(var r in e){var o=r.match(i);if(o){var s=(o[1]+o[2].replace(/([A-Z])/g,"-$1")).toLowerCase();n[s]=e[r]}}return n},r={keyup:"onKeyUp",resize:"onResize"},o=function(t){$.each(e.opened().reverse(),function(){return t.isDefaultPrevented()||!1!==this[r[t.type]](t)?void 0:(t.preventDefault(),t.stopPropagation(),!1)})},s=function(t){if(t!==e._globalHandlerInstalled){e._globalHandlerInstalled=t;var n=$.map(r,function(t,n){return n+"."+e.prototype.namespace}).join(" ");$(window)[t?"on":"off"](n,o)}};e.prototype={constructor:e,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",loading:"",persist:!1,otherClose:null,beforeOpen:$.noop,beforeContent:$.noop,beforeClose:$.noop,afterOpen:$.noop,afterContent:$.noop,afterClose:$.noop,onKeyUp:$.noop,onResize:$.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(e,t){"object"!=typeof e||e instanceof $!=!1||t||(t=e,e=void 0);var n=$.extend(this,t,{target:e}),i=n.resetCss?n.namespace+"-reset":n.namespace,r=$(n.background||['<div class="'+i+"-loading "+i+'">','<div class="'+i+'-content">','<span class="'+i+"-close-icon "+n.namespace+'-close">',n.closeIcon,"</span>",'<div class="'+n.namespace+'-inner">'+n.loading+"</div>","</div>","</div>"].join("")),o="."+n.namespace+"-close"+(n.otherClose?","+n.otherClose:"");return n.$instance=r.clone().addClass(n.variant),n.$instance.on(n.closeTrigger+"."+n.namespace,function(e){var t=$(e.target);("background"===n.closeOnClick&&t.is("."+n.namespace)||"anywhere"===n.closeOnClick||t.closest(o).length)&&(n.close(e),e.preventDefault())}),this},getContent:function(){if(this.persist!==!1&&this.$content)return this.$content;var e=this,t=this.constructor.contentFilters,n=function(t){return e.$currentTarget&&e.$currentTarget.attr(t)},i=n(e.targetAttr),r=e.target||i||"",o=t[e.type];if(!o&&r in t&&(o=t[r],r=e.target&&i),r=r||n("href")||"",!o)for(var s in t)e[s]&&(o=t[s],r=e[s]);if(!o){var a=r;if(r=null,$.each(e.contentFilters,function(){return o=t[this],o.test&&(r=o.test(a)),!r&&o.regex&&a.match&&a.match(o.regex)&&(r=a),!r}),!r)return"console"in window&&window.console.error("Featherlight: no content filter found "+(a?' for "'+a+'"':" (no target specified)")),!1}return o.process.call(e,r)},setContent:function(e){var t=this;return(e.is("iframe")||$("iframe",e).length>0)&&t.$instance.addClass(t.namespace+"-iframe"),t.$instance.removeClass(t.namespace+"-loading"),t.$instance.find("."+t.namespace+"-inner").not(e).slice(1).remove().end().replaceWith($.contains(t.$instance[0],e[0])?"":e),t.$content=e.addClass(t.namespace+"-inner"),t},open:function(e){var n=this;if(n.$instance.hide().appendTo(n.root),!(e&&e.isDefaultPrevented()||n.beforeOpen(e)===!1)){e&&e.preventDefault();var i=n.getContent();if(i)return t.push(n),s(!0),n.$instance.fadeIn(n.openSpeed),n.beforeContent(e),$.when(i).always(function(t){n.setContent(t),n.afterContent(e)}).then(n.$instance.promise()).done(function(){n.afterOpen(e)})}return n.$instance.detach(),$.Deferred().reject().promise()},close:function(e){var t=this,i=$.Deferred();return t.beforeClose(e)===!1?i.reject():(0===n(t).length&&s(!1),t.$instance.fadeOut(t.closeSpeed,function(){t.$instance.detach(),t.afterClose(e),i.resolve()})),i.promise()},resize:function(e,t){if(e&&t){this.$content.css("width","").css("height","");var n=Math.max(e/parseInt(this.$content.parent().css("width"),10),t/parseInt(this.$content.parent().css("height"),10));n>1&&this.$content.css("width",""+e/n+"px").css("height",""+t/n+"px")}},chainCallbacks:function(e){for(var t in e)this[t]=$.proxy(e[t],this,$.proxy(this[t],this))}},$.extend(e,{id:0,autoBind:"[data-featherlight]",defaults:e.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(e){return e instanceof $&&e},process:function(e){return this.persist!==!1?$(e):$(e).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,process:function(e){var t=this,n=$.Deferred(),i=new Image,r=$('<img src="'+e+'" alt="" class="'+t.namespace+'-image" />');return i.onload=function(){r.naturalWidth=i.width,r.naturalHeight=i.height,n.resolve(r)},i.onerror=function(){n.reject(r)},i.src=e,n.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(e){return $(e)}},ajax:{regex:/./,process:function(e){var t=this,n=$.Deferred(),i=$("<div></div>").load(e,function(e,t){"error"!==t&&n.resolve(i.contents()),n.fail()});return n.promise()}},iframe:{process:function(e){var t=new $.Deferred,n=$("<iframe/>").hide().attr("src",e).css(i(this,"iframe")).on("load",function(){t.resolve(n.show())}).appendTo(this.$instance.find("."+this.namespace+"-content"));return t.promise()}},text:{process:function(e){return $("<div>",{text:e})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(e,t){var n=this,i=new RegExp("^data-"+t+"-(.*)"),r={};return e&&e.attributes&&$.each(e.attributes,function(){var e=this.name.match(i);if(e){var t=this.value,o=$.camelCase(e[1]);if($.inArray(o,n.functionAttributes)>=0)t=new Function(t);else try{t=$.parseJSON(t)}catch(s){}r[o]=t}}),r},extend:function(e,t){var n=function(){this.constructor=e};return n.prototype=this.prototype,e.prototype=new n,e.__super__=this.prototype,$.extend(e,this,t),e.defaults=e.prototype,e},attach:function(e,t,n){var i=this;"object"!=typeof t||t instanceof $!=!1||n||(n=t,t=void 0),n=$.extend({},n);var r=n.namespace||i.defaults.namespace,o=$.extend({},i.defaults,i.readElementConfig(e[0],r),n),s;return e.on(o.openTrigger+"."+o.namespace,o.filter,function(r){var a=$.extend({$source:e,$currentTarget:$(this)},i.readElementConfig(e[0],o.namespace),i.readElementConfig(this,o.namespace),n),c=s||$(this).data("featherlight-persisted")||new i(t,a);"shared"===c.persist?s=c:c.persist!==!1&&$(this).data("featherlight-persisted",c),a.$currentTarget.blur(),c.open(r)}),e},current:function(){var e=this.opened();return e[e.length-1]||null},opened:function(){var e=this;return n(),$.grep(t,function(t){return t instanceof e})},close:function(e){var t=this.current();return t?t.close(e):void 0},_onReady:function(){var e=this;e.autoBind&&($(e.autoBind).each(function(){e.attach($(this))}),$(document).on("click",e.autoBind,function(t){t.isDefaultPrevented()||"featherlight"===t.namespace||(t.preventDefault(),e.attach($(t.currentTarget)),$(t.target).trigger("click.featherlight"))}))},_callbackChain:{onKeyUp:function(e,t){return 27===t.keyCode?(this.closeOnEsc&&$.featherlight.close(t),!1):e(t)},onResize:function(e,t){return this.resize(this.$content.naturalWidth,this.$content.naturalHeight),e(t)},afterContent:function(e,t){var n=e(t);return this.onResize(t),n}}}),$.featherlight=e,$.fn.featherlight=function(t,n){return e.attach(this,t,n)},$(document).ready(function(){e._onReady()})}(jQuery);