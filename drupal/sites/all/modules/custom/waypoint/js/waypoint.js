function createWayPoint(id,func){var $=jQuery;var $obj=$("#"+id);$("body").on("grid_stack_initialized",function(){if($obj.visible(true)){console.log(id+" was visible");func()}else{var cachedHtml=$obj.html();$obj.html('<div class="text-align-center"><i class="fa fa-spinner font-5-rem" aria-hidden="true"></i></div>');var waypoint=new Waypoint({element:document.getElementById(id),offset:"bottom-in-view",handler:function(direction){console.log("Waypoint for "+id+" was called");$obj.html(cachedHtml);func();this.destroy()}})}})}
//# sourceMappingURL=src/waypoint.js.map