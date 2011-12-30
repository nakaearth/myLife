(function(a,b){var c;a.rails=c={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not(button[type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input:file",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(b){var c=a('meta[name="csrf-token"]').attr("content");c&&b.setRequestHeader("X-CSRF-Token",c)},fire:function(b,c,d){var e=a.Event(c);return b.trigger(e,d),e.result!==!1},confirm:function(a){return confirm(a)},ajax:function(b){return a.ajax(b)},handleRemote:function(d){var e,f,g,h=d.data("cross-domain")||null,i=d.data("type")||a.ajaxSettings&&a.ajaxSettings.dataType,j;if(c.fire(d,"ajax:before")){if(d.is("form")){e=d.attr("method"),f=d.attr("action"),g=d.serializeArray();var k=d.data("ujs:submit-button");k&&(g.push(k),d.data("ujs:submit-button",null))}else d.is(c.inputChangeSelector)?(e=d.data("method"),f=d.data("url"),g=d.serialize(),d.data("params")&&(g=g+"&"+d.data("params"))):(e=d.data("method"),f=d.attr("href"),g=d.data("params")||null);return j={type:e||"GET",data:g,dataType:i,crossDomain:h,beforeSend:function(a,e){return e.dataType===b&&a.setRequestHeader("accept","*/*;q=0.5, "+e.accepts.script),c.fire(d,"ajax:beforeSend",[a,e])},success:function(a,b,c){d.trigger("ajax:success",[a,b,c])},complete:function(a,b){d.trigger("ajax:complete",[a,b])},error:function(a,b,c){d.trigger("ajax:error",[a,b,c])}},f&&(j.url=f),c.ajax(j)}return!1},handleMethod:function(c){var d=c.attr("href"),e=c.data("method"),f=c.attr("target"),g=a("meta[name=csrf-token]").attr("content"),h=a("meta[name=csrf-param]").attr("content"),i=a('<form method="post" action="'+d+'"></form>'),j='<input name="_method" value="'+e+'" type="hidden" />';h!==b&&g!==b&&(j+='<input name="'+h+'" value="'+g+'" type="hidden" />'),f&&i.attr("target",f),i.hide().append(j).appendTo("body"),i.submit()},disableFormElements:function(b){b.find(c.disableSelector).each(function(){var b=a(this),c=b.is("button")?"html":"val";b.data("ujs:enable-with",b[c]()),b[c](b.data("disable-with")),b.prop("disabled",!0)})},enableFormElements:function(b){b.find(c.enableSelector).each(function(){var b=a(this),c=b.is("button")?"html":"val";b.data("ujs:enable-with")&&b[c](b.data("ujs:enable-with")),b.prop("disabled",!1)})},allowAction:function(a){var b=a.data("confirm"),d=!1,e;return b?(c.fire(a,"confirm")&&(d=c.confirm(b),e=c.fire(a,"confirm:complete",[d])),d&&e):!0},blankInputs:function(b,c,d){var e=a(),f,g=c||"input,textarea";return b.find(g).each(function(){f=a(this);if(d?f.val():!f.val())e=e.add(f)}),e.length?e:!1},nonBlankInputs:function(a,b){return c.blankInputs(a,b,!0)},stopEverything:function(b){return a(b.target).trigger("ujs:everythingStopped"),b.stopImmediatePropagation(),!1},callFormSubmitBindings:function(c,d){var e=c.data("events"),f=!0;return e!==b&&e.submit!==b&&a.each(e.submit,function(a,b){if(typeof b.handler=="function")return f=b.handler(d)}),f},disableElement:function(a){a.data("ujs:enable-with",a.html()),a.html(a.data("disable-with")),a.bind("click.railsDisable",function(a){return c.stopEverything(a)})},enableElement:function(a){a.data("ujs:enable-with")!==b&&(a.html(a.data("ujs:enable-with")),a.data("ujs:enable-with",!1)),a.unbind("click.railsDisable")}},a.ajaxPrefilter(function(a,b,d){a.crossDomain||c.CSRFProtection(d)}),a(document).delegate(c.linkDisableSelector,"ajax:complete",function(){c.enableElement(a(this))}),a(document).delegate(c.linkClickSelector,"click.rails",function(d){var e=a(this),f=e.data("method"),g=e.data("params");if(!c.allowAction(e))return c.stopEverything(d);e.is(c.linkDisableSelector)&&c.disableElement(e);if(e.data("remote")!==b)return(d.metaKey||d.ctrlKey)&&(!f||f==="GET")&&!g?!0:(c.handleRemote(e)===!1&&c.enableElement(e),!1);if(e.data("method"))return c.handleMethod(e),!1}),a(document).delegate(c.inputChangeSelector,"change.rails",function(b){var d=a(this);return c.allowAction(d)?(c.handleRemote(d),!1):c.stopEverything(b)}),a(document).delegate(c.formSubmitSelector,"submit.rails",function(d){var e=a(this),f=e.data("remote")!==b,g=c.blankInputs(e,c.requiredInputSelector),h=c.nonBlankInputs(e,c.fileInputSelector);if(!c.allowAction(e))return c.stopEverything(d);if(g&&e.attr("novalidate")==b&&c.fire(e,"ajax:aborted:required",[g]))return c.stopEverything(d);if(f)return h?c.fire(e,"ajax:aborted:file",[h]):!a.support.submitBubbles&&a().jquery<"1.7"&&c.callFormSubmitBindings(e,d)===!1?c.stopEverything(d):(c.handleRemote(e),!1);setTimeout(function(){c.disableFormElements(e)},13)}),a(document).delegate(c.formInputClickSelector,"click.rails",function(b){var d=a(this);if(!c.allowAction(d))return c.stopEverything(b);var e=d.attr("name"),f=e?{name:e,value:d.val()}:null;d.closest("form").data("ujs:submit-button",f)}),a(document).delegate(c.formSubmitSelector,"ajax:beforeSend.rails",function(b){this==b.target&&c.disableFormElements(a(this))}),a(document).delegate(c.formSubmitSelector,"ajax:complete.rails",function(b){this==b.target&&c.enableFormElements(a(this))})})(jQuery),function(a){function c(b){var c=[].slice.call(arguments,1),d=0,e=!0;return b=a.event.fix(b||window.event),b.type="mousewheel",b.wheelDelta&&(d=b.wheelDelta/120),b.detail&&(d=-b.detail/3),c.unshift(b,d),a.event.handle.apply(this,c)}var b=["DOMMouseScroll","mousewheel"];a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],c,!1);else this.onmousewheel=c},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],c,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})}(jQuery),typeof lds=="undefined"&&(lds={}),function(a){function b(a,b,c){var d=c/2;while(a>b+d)a-=c;while(a<b-d)a+=c;return a}function c(a,b){a%=b;while(a<0)a+=b;return a}var d=function(a,b){if(!b)return a;var c=typeof b;switch(c){case"function":return b.apply(a);case"string":case"number":var e=a[b],f=typeof e;switch(f){case"function":return e();default:return e}break;case"object":switch(b.constructor){case Array:return b.length==0?a:d(d(a,b[0]),b.slice(1));default:throw"unknown object is not supported as a getter"}break;default:throw c+" is not supported as a getter"}},e=function(a,b,c){if("addEventListener"in a)a.addEventListener(b,c,!1);else if("attachEvent"in a)a.attachEvent("on"+b,c);else throw""+b+" event could not be bound"},f=function(a,b,c){if("removeEventListener"in a)a.removeEventListener(b,c,!1);else if("detachEvent"in a)a.detachEvent("on"+b,c);else throw""+b+" event could not be unbound"},g=0,h={},i=function(a,b,c,d,e,f){var i=++g,j=b-a,k=(new Date).getTime(),l=function(){var g=(new Date).getTime(),m=g-k;if(m<e){var n=d(a,b,j,m,e);c(n,!1),h[i]=window.setTimeout(l,f)}else delete h[i],c(b,!0)};return l(),i},j=function(a){window.clearTimeout(h[a]),delete h[a]},k=function(a,b,c,d){var e=a.canvas.width,f=a.canvas.height,g=b.width,h=b.height;d=d||e;for(var i=0;i<d;i++){var j=Math.floor(g*i/d),k=Math.ceil(g*(i+1)/d),l=Math.floor(e*i/d),m=Math.ceil(e*(i+1)/d),n=c*f*(d-i-1)/(d-1);a.drawImage(b,j,0,k-j,h,l,n/2,m-l,f-n)}},l=function(a,b,c,d){var e=a.canvas.width,f=a.canvas.height,g=b.width,h=b.height;d=d||e;for(var i=0;i<d;i++){var j=Math.floor(g*i/d),k=Math.ceil(g*(i+1)/d),l=Math.floor(e*i/d),m=Math.ceil(e*(i+1)/d),n=c*f*i/(d-1);a.drawImage(b,j,0,k-j,h,l,n/2,m-l,f-n)}};a.Coulisse=function(a,g){var h=this,m=g.cyclic||!1,n=g.duration||800,o=g.interval||20,p=g.sliceCount||10,q=g.area||.5,r=g.pinch||.2,s=g.scale||.4,t=g.activeSize||800,u=g.inactiveSize||400,v=g.activateEvent||"click",w=g.onActivateIndex||null,x=g.onIndexChange||null,y=g.onIndexChanging||null,z=g.onIndexChanged||null,A=g.imageSrcGetter||null,B=g.linkHrefGetter||null,C=[],D=function(b,d,g){var i=this,j=null,m=document.createElement("img"),n=g?document.createElement("a"):null,o=typeof HTMLCanvasElement=="undefined"?null:document.createElement("canvas"),x=o?o.getContext("2d"):null,y=!1,z=o||m,A=n||z,B=A.style,D=function(a){if(L!=b)return(!w||w({index:c(b,C.length)})!==!1)&&h.setIndex(b),"preventDefault"in a&&a.preventDefault(),!1},F=function(b){var c=m.width*m.width,d=m.height*m.height,e=c+d,f=Math.sqrt(e);i.activePanelWidth=m.width*t/f,i.activePanelHeight=m.height*t/f,i.inactivePanelWidth=s*m.width*u/f,i.inactivePanelHeight=m.height*u/f,i.deltaWidth=i.activePanelWidth-i.inactivePanelWidth,i.deltaHeight=i.activePanelHeight-i.inactivePanelHeight,n&&n.appendChild(z),a.appendChild(A),y=!0,E(!0)};this.update=function(c,d){var e=!0;if(!y)return e;var f=!0,g=c.panelCount-Math.abs(Math.round(d));if(d<0){if(d>-1){var h=C[(b+1)%c.panelCount];z.width=i.inactivePanelWidth+i.deltaWidth*c.realIndexModInv,z.height=i.inactivePanelHeight+i.deltaHeight*c.realIndexModInv,x&&l(x,m,r*c.realIndexMod,p),c.panelLeft=(a.offsetWidth-i.activePanelWidth)/2,c.panelLeft-=i.inactivePanelWidth*q*c.realIndexMod,c.panelLeft-=(h.activePanelWidth-i.activePanelWidth)/2*c.realIndexMod}else j>-1&&(z.width=i.inactivePanelWidth,z.height=i.inactivePanelHeight,x&&l(x,m,r)),f=c.panelLeft>=0-z.width,c.panelLeft-=z.width*q;f&&(B.left=c.panelLeft+"px",B.right="")}else if(d>0){if(d<1){var h=C[(b+c.panelCount-1)%c.panelCount];z.width=i.inactivePanelWidth+i.deltaWidth*c.realIndexMod,z.height=i.inactivePanelHeight+i.deltaHeight*c.realIndexMod,x&&k(x,m,r*c.realIndexModInv,p),c.panelRight=(a.offsetWidth-i.activePanelWidth)/2,c.panelRight-=i.inactivePanelWidth*q*c.realIndexModInv,c.panelRight-=(h.activePanelWidth-i.activePanelWidth)/2*c.realIndexModInv}else j<1&&(z.width=i.inactivePanelWidth,z.height=i.inactivePanelHeight,x&&k(x,m,r)),f=c.panelRight>=0-z.width,c.panelRight-=z.width*q;f&&(B.left="",B.right=c.panelRight+"px")}else z.width=i.activePanelWidth,z.height=i.activePanelHeight,x&&x.drawImage(m,0,0,m.width,m.height,0,0,z.width,z.height),c.panelLeft=(a.offsetWidth-i.activePanelWidth)/2,c.panelRight=(a.offsetWidth-i.activePanelWidth)/2,f&&(B.left=c.panelLeft+"px",B.right=c.panelRight+"px");return f?(B.zIndex=g,B.top=B.bottom=(a.offsetHeight-z.height)/2+"px",B.display="block"):(e=B.display!="none",B.display="none"),j=d,e},this.destruct=function(){f(A,v,D),f(m,"load",F),a.removeChild(A),delete A,delete m,delete o},e(A,v,D),e(m,"load",F),B.display="none",B.position="absolute",n&&(n.href=g),m.src=d},E=function(a){var b=C.length;if(!b)return;var d=c(M,b),e={panelLeft:null,panelRight:null,panelCount:b,realIndexInt:parseInt(M),realIndexMod:d%1,realIndexModInv:1-d%1},d=parseInt(d);if(m){var f=parseInt(b/2),g=b-f;for(var h=0;h<f;h++){var i=d;i-=h;if(!m&&i<0)break;while(b&&i<0)i+=b;var j=C[i],k=i-M;while(k<0-f)k+=b;while(k>0+g)k-=b;if(!j.update(e,k)&&!a)break}for(var l=1;l<g;l++){var i=d;i+=l;if(!m&&i>=b)break;while(i>=b)i-=b;var j=C[i],k=i-M;while(k<0-f)k+=b;while(k>0+g)k-=b;if(!j.update(e,k)&&!a)break}}else{for(var i=e.realIndexInt;i>=0;i--){var j=C[i];if(j&&!j.update(e,i-M)&&!a)break}for(var i=e.realIndexInt+1;i<e.panelCount;i++){var j=C[i];if(j&&!j.update(e,i-M)&&!a)break}}},F=function(){E(!0)},G=function(a,b){var d=Math.round(a);L!=d&&(L=d,y&&y({index:c(L,C.length)})),M!=a&&(M=a,E(!1)),b&&K()},H=g.animationCalculate||function(a,b,c,d,e){return a+c*Math.sin(Math.PI*d/e/2)},I,J=function(a){var b=Math.round(a);x&&x({index:c(b,C.length)}),I=i(M,b,G,H,n,o)},K=function(){I&&(j(I),I=null,z&&z({index:c(L,C.length)}))},L=g.index||0,M=L;this.setIndex=function(a){K(),J(m?b(a,M,C.length):c(a,C.length))},this.getIndex=function(){return c(L,C.length)},this.destruct=function(){K(),f(window,"resize",F);for(var a=C.pop();a;a=C.pop())a.destruct(),delete a},this.addImages=function(a){for(var b=0,c=a.length;b<c;b++){var e=a[b],f=d(e,A),h=g.linkHrefGetter?d(e,B):null,i=C.length,j=new D(i,f,h);C[i]=j}},this.countImages=function(a){return C.length},g.images&&this.addImages(g.images),e(window,"resize",F),delete g}}(lds),typeof jQuery!="undefined"&&typeof jQuery.ui!="undefined"&&function(a){a.widget("lds.coulisse",{widgetEventPrefix:"coulisse",options:{duration:null,area:.5,pinch:.5,scale:.5,sliceCount:20,activeSize:800,inactiveSize:400,index:0},_coulisse:null,_create:function(){var b=this,c=this.options,d=new lds.Coulisse(this.element[0],{duration:a.fx.off?0:typeof c.duration=="number"?c.duration:c.duration in a.fx.speeds?a.fx.speeds[c.duration]:a.fx.speeds._default,interval:a.fx.interval,sliceCount:c.sliceCount,area:c.area,pinch:c.pinch,scale:c.scale,activeSize:c.activeSize,inactiveSize:c.inactiveSize,images:c.images,imageSrcGetter:c.imageSrcGetter,linkHrefGetter:c.linkHrefGetter,index:c.index,onActivateIndex:function(a){return b._trigger("activateIndex",null,a)},onIndexChange:function(a){return b._trigger("indexChange",null,a)},onIndexChanging:function(a){return b._trigger("indexChanging",null,a)},onIndexChanged:function(a){return b._trigger("indexChanged",null,a)},animationCalculate:null,cyclic:c.cyclic,activateEvent:c.activateEvent});this._coulisse=d,this.element.addClass("lds-coulisse"),a.Widget.prototype._create.apply(this,arguments)},destroy:function(){this.element.removeClass("lds-coulisse"),this._coulisse.destruct(),delete this._coulisse,a.Widget.prototype.destroy.apply(this,arguments)},_setOption:function(a,b){switch(a){case"index":this._coulisse.setIndex(b);break;case"images":this._coulisse.addImages(b);break;default:}},_getOption:function(a){switch(a){case"index":return this._coulisse.getIndex();case"images":return this._coulisse.countImages();default:return null}}})}(jQuery),function($){$.fn.twitterFriends=function(allOptions){var defaults={debug:0,username:"",friends:0,users:20,users_max:100,loop:0,user_link:0,user_image:48,user_animate:"opacity",user_change:200,user_swap:5e3,user_append:1,header:"",tweet:0,tweet_avatar:1,tweet_author:0,tweet_date:1,tweet_source:1,tweet_image:48,tweet_stay:5e3,tweet_change:200,tweet_animate:"opacity",info:""};return allOptions=$.extend({},defaults,allOptions),this.each(function(){var wasOutput=0,rs=[],vp=-1,ai=-1,si=-1,div=$(this),usrsDiv=null,stsDiv=null,hdDiv=null,op=allOptions;if(div.attr("options")){try{op=eval("("+div.attr("options")+")")}catch(e){div.html('<b style="color:red">'+e+"</b>");return}op=$.extend({},defaults,op)}var requestUsers=function(){var a=op.friends?"http://api.twitter.com/1/statuses/friends.json":"http://api.twitter.com/1/statuses/followers.json",b={screen_name:op.username,cursor:-1};$.ajax({url:a,data:b,success:requestedUsers,dataType:"jsonp",cache:!0})},requestedUsers=function(a){if(!a.users){op.debug&&div.html('<b style="color:red">Error:'+(a.error?a.error:"unkown")+"</b>");return}rs=a.users;if(rs.length==0)return;rs.length>op.users_max&&(rs.length=op.users_max),rs=rs.reverse(),output(),vp=-1,addUsers()},addUsers=function(){if((vp+1)*op.users>=rs.length)if(op.loop)vp=-1;else return;usrsDiv.html(""),vp++;for(var a=vp*op.users;a<(vp+1)*op.users;a++){if(a>=rs.length)break;addUser(rs[a],a)}ai=op.user_append?-1:$("a",usrsDiv).length,showUser(),si=-1,op.tweet&&hideStatus()},addUser=function(a,b){var c=op.user_link&&a.url?a.url:"http://twitter.com/"+a.screen_name,d=a.name+(a.status&&op.tweet?": "+a.status.text:"");d=d.replace(/"/g,"&quot;").replace(/'/g,"&#39;"),$('<a style="display:none;height:'+op.user_image+'px" href="'+c+'" title="'+d+'">'+'<img src="'+a.profile_image_url+'" border="0" height="'+op.user_image+'" width="'+op.user_image+'"/>'+"</a>").appendTo(usrsDiv)},showUser=function(){ai=op.user_append?ai+1:ai-1;var a=$("a:eq("+ai+")",usrsDiv);if(!a.length){op.tweet||usrsDiv.animate({opacity:1},op.user_swap,"linear",addUsers);return}var b=new Object;b[op.user_animate]="show",a.animate(b,op.user_change,"linear",showUser)},addStatus=function(a,b){var c=op.user_link&&a.url?a.url:"http://twitter.com/"+a.screen_name,d=a.name;stsDiv.html('<div style="display:none;">'+(op.tweet_avatar?'<span class="tf-avatar"><a href="'+c+'" title="'+d+'">'+'<img src="'+a.profile_image_url+'" height="'+op.tweet_image+'" width="'+op.tweet_image+'" border="0"/>'+"</a>"+"</span>":"")+'<span class="tf-body">'+(op.tweet_author?'<strong><a href="'+c+'" title="'+d+'">'+a.screen_name+"</a>"+"</strong>":"")+'<span class="tf-content">'+linkify(b.text)+"</span>"+'<span class="tf-meta">'+(op.tweet_date?'<a class="tf-date" href="http://twitter.com/'+a.screen_name+"/status/"+b.id+'">'+formatDate(b.created_at)+"</a>":"")+(op.tweet_source?'<span class="tf-source"> from '+decodeHTML(b.source)+"</span>":"")+"</span>"+"</span>"+"</div>")},hideStatus=function(){si>-1?$("div",stsDiv).fadeOut(op.tweet_change,showStatus):showStatus()},showStatus=function(){var a=null,b=null;while(!b){si++;if(si>=$("a",usrsDiv).length){addUsers();return}a=rs[vp*op.users+si],b=a.status}addStatus(a,b);var c=new Object;c[op.tweet_animate]="show",$("div",stsDiv).animate(c,op.tweet_change,"linear",stayStatus)},stayStatus=function(){$("div",stsDiv).animate({opacity:1},op.tweet_stay,"linear",hideStatus)},linkify=function(a){return a.replace(/\bhttps?\:\/\/\S+/gi,function(a){var b="";return a=a.replace(/(\.*|\?*|\!*)$/,function(a,d){return b=d,""}),'<a class="tf-link" href="'+a+'">'+(a.length>25?a.substr(0,24)+"...":a)+"</a>"+b}).replace(/\B\@([A-Z0-9_]{1,15})/gi,'@<a class="tf-at" href="http://twitter.com/$1">$1</a>').replace(/\B\#([A-Z0-9_]+)/gi,'<a class="tf-hashtag" href="http://search.twitter.com/search?q=%23$1">#$1</a>')},decodeHTML=function(a){return a.replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,'"')},formatDate=function(a){/^(\w\w\w) (\w\w\w) (\d\d?) (\d\d?:\d\d?:\d\d?) ([\+\-]\d+) (\d\d\d\d)$/i.test(a)&&(a=a.replace(/^(\w\w\w) (\w\w\w) (\d\d?) (\d\d?:\d\d?:\d\d?) ([\+\-]\d+) (\d\d\d\d)$/i,"$1, $3 $2 $6 $4 $5"));var b=new Date,c=new Date;b.setTime(Date.parse(a));var d=c.getDate(),e=c.getMonth()+1,f=c.getFullYear(),g=c.getHours(),h=c.getMinutes(),i=c.getSeconds(),j=b.getDate(),k=b.getMonth()+1,l=b.getFullYear(),m=b.getHours(),n=b.getMinutes(),a=b.getSeconds();if(l==f&&k==e&&j==d){var o=g-m;if(o>0)return o+" hour"+(o>1?"s":"")+" ago";var p=h-n;if(p>0)return p+" minute"+(p>1?"s":"")+" ago";var q=i-a;return q+" second"+(q>1?"s":"")+" ago"}return k+"/"+j+"/"+l},requestMe=function(){$.ajax({url:"http://api.twitter.com/1/users/show.json",data:{screen_name:op.username},success:requestedMe,dataType:"jsonp",cache:!0})},requestedMe=function(a){output();if(!a.screen_name){op.debug&&hdDiv.html('<b style="color:red">Error:'+(a.error?a.error:"unkown")+"</b>");return}hdDiv.html(op.header.replace(/_tp_/g,"http://twitter.com/"+a.screen_name).replace(/_fr_/g,a.friends_count).replace(/_fo_/g,a.followers_count).replace(/_ti_/g,a.profile_image_url))},init=function(){op.header&&requestMe(),requestUsers()},output=function(){if(wasOutput)return;wasOutput=1,div.html(""),op.info&&div.append(op.info),op.header&&(hdDiv=$('<div class="tf-header"></div>').appendTo(div)),usrsDiv=$('<div class="tf-users"></div>').appendTo(div),op.tweet&&(stsDiv=$('<div class="tf-tweet"></div>').appendTo(div))};init()})}}(jQuery),jQuery(document).ready(function(){jQuery("div.twitter-friends").twitterFriends()})