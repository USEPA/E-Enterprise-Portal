<?php 
	$view = views_get_view('ee_program_services');
	
	$num_views = count($view->display);
	$i = 1;
	foreach ($view->display as $name => $v) {
		$custom_block = module_invoke('block','block_view', $name);
		$whole_block = block_load('block', $name); // not really the whole block until render
		$views_block = module_invoke('views','block_view', $name);
		      
		print render($custom_block['content']);
		print drupal_render(_block_get_renderable_array(_block_render_blocks(array($whole_block))));
		print render($views_block);
	}
	// add a container to hold your tabs
	$tabs = '<div id="app-connect-tabs"><ul>';
	$content = '';

	$num_views = count($view->display);
	$i=1;
	foreach ($view->display as $name => $v) {
	// we don't want the default block included here
		if ($name != 'default' && $name != 'page_1') {
       // this will allow us to add a class to the very last tab for theming purposes
       $last = ($num_views == $i) ? " class='last' " : "";
       // build the tab
       $tabs .= "<li><a href='#tabs-$name'$last>$v->display_title</a></li>";
			 
			 $block_name = 'ee_program_services-'.$name;
			 //$block = block_load('views', $block_name);      
			 //$embed_view = drupal_render(_block_get_renderable_array(_block_render_blocks(array($block)))); 
			 $block_view = views_embed_view('ee_program_services', $block_name);
			 //$embed_view = render(module_invoke('views', 'block_view', $block_name));

			 //$block = module_invoke('views', 'block_view', $block_name);
			 //$embed_view = render($block_view);

			 //$embed_view = views_embed_view('ee_program_services' , $name);
			 //$embed_view = render($block);
			 
			 // get the content for this view.
			 //$block_view = views_embed_view('ee_program_services', $block_name);
			 //$embed_view = render($block_view);
       $content .= "<div id='tabs-$name'>" . $block_view . "</div>";
    }   
    $i++;
    //print "i is: " . $i . " and name is: " . $name . "<br>";
	}   

	$tabs .= '</ul>';
	$tabs .= $content;
	$tabs .= '</div>';
	
	print $tabs;
	 
	 // and add the js to handle these tabs
	drupal_add_css("sites/all/libraries/jqueryui/themes/base/jquery.ui.tabs.css", "file");
	drupal_add_js("sites/all/libraries/jqueryui/ui/jquery.ui.tabs.js", "file");
	drupal_add_js('jQuery(document).ready(function(){jQuery("#app-connect-tabs").tabs();});', 'inline');
	
?>
