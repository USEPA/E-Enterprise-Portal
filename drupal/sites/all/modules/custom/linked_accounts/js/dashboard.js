(function($){var links=$.get(window.location.href+"/links");links.done(function(links_return){var $link_holder=$("#dashboard-links");if(links_return.links.length>0){$link_holder.html("");$.each(links_return.links,function(k,o){$link_holder.append('<div><a target="_blank" href="'+o.url+'">'+o.name+"</a></div>")})}})})(jQuery);
//# sourceMappingURL=src/dashboard.js.map
