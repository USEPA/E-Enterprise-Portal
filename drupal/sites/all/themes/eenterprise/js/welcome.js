!function(a){a(function(){function b(){var b=a("body").find(".jcarousel"),c=a(".jcarousel-control-next"),e=a(".jcarousel-control-prev"),f=b.find(".slides > li"),g=f.eq(0).index(),h=b.jcarousel("last").index(),i=f.length-1;f.removeClass("active"),g===h?(e.addClass("inactive"),c.hasClass("inactive")&&c.removeClass("inactive")):h!==i?(e.removeClass("inactive"),c.removeClass("inactive")):(e.hasClass("inactive")&&e.removeClass("inactive"),c.addClass("inactive")),"true"!==d&&b.focus(),f.eq(h).addClass("active")}var c=window.location.pathname.split("/")[1],d="true";"eenterprise-new"===c&&(a(document).on("ready",function(){var c=a(".jcarousel");c.jcarousel();var d=a(".jcarousel-control-next"),e=a(".jcarousel-control-prev");c.on("jcarousel:reload",function(){var b=a(this),c=a("body").find(".jcarousel-wrapper").innerWidth();b.jcarousel("items").css("width",Math.ceil(c)+"px")}),e.jcarouselControl({target:"-=1"}).on("click",function(){b()}),d.jcarouselControl({target:"+=1"}).on("click",function(){b()}),a(".jcarousel-pagination").on("jcarouselpagination:active","a",function(){a(this).addClass("active")}).on("jcarouselpagination:inactive","a",function(){a(this).removeClass("active")}).on("click",function(a){a.preventDefault(),b()}).jcarouselPagination({perPage:1,item:function(a){return'<a href="#'+a+'">'+a+"</a>"}}),c.on("keyup",function(a){var c=a.which||a.keyChar||a.keyCode;if(37===c)a.stopImmediatePropagation(),e.hasClass("inactive")||e.trigger("click");else{if(39!==c)return!1;a.stopImmediatePropagation(),d.hasClass("inactive")||d.trigger("click")}b()})}),a(window).load(function(){var c=a("body").find(".jcarousel"),e=a("body").find(".jcarousel-wrapper").innerWidth();c.jcarousel("items").css("width",Math.ceil(e)+"px"),b(),d="false"}))})}(jQuery);
//# sourceMappingURL=src/welcome.js.map