/**
@fileOverview jQuery-ui wrapper for LuvDaSun Coulisse
@author <a href="mailto:elmerbulthuis@gmail.com">Elmer Bulthuis</a>
@version 0.3.1
@license jQuery-ui wrapper for LuvDaSun Coulisse - v0.3.2 - 2011-11-16
http://coulisse.luvdasun.com/

Copyright 2010-2011 "Elmer Bulthuis" <elmerbulthuis@gmail.com>
Dual licensed under the MIT and GPL licenses.
*/
typeof jQuery!="undefined"&&typeof jQuery.ui!="undefined"&&function(a){a.widget("lds.coulisse",{widgetEventPrefix:"coulisse",options:{duration:null,area:.5,pinch:.5,scale:.5,sliceCount:20,activeSize:800,inactiveSize:400,index:0},_coulisse:null,_create:function(){var b=this,c=this.options,d=new lds.Coulisse(this.element[0],{duration:a.fx.off?0:typeof c.duration=="number"?c.duration:c.duration in a.fx.speeds?a.fx.speeds[c.duration]:a.fx.speeds._default,interval:a.fx.interval,sliceCount:c.sliceCount,area:c.area,pinch:c.pinch,scale:c.scale,activeSize:c.activeSize,inactiveSize:c.inactiveSize,images:c.images,imageSrcGetter:c.imageSrcGetter,linkHrefGetter:c.linkHrefGetter,index:c.index,onActivateIndex:function(a){return b._trigger("activateIndex",null,a)},onIndexChange:function(a){return b._trigger("indexChange",null,a)},onIndexChanging:function(a){return b._trigger("indexChanging",null,a)},onIndexChanged:function(a){return b._trigger("indexChanged",null,a)},animationCalculate:null,cyclic:c.cyclic,activateEvent:c.activateEvent});this._coulisse=d,this.element.addClass("lds-coulisse"),a.Widget.prototype._create.apply(this,arguments)},destroy:function(){this.element.removeClass("lds-coulisse"),this._coulisse.destruct(),delete this._coulisse,a.Widget.prototype.destroy.apply(this,arguments)},_setOption:function(a,b){switch(a){case"index":this._coulisse.setIndex(b);break;case"images":this._coulisse.addImages(b);break;default:}},_getOption:function(a){switch(a){case"index":return this._coulisse.getIndex();case"images":return this._coulisse.countImages();default:return null}}})}(jQuery)