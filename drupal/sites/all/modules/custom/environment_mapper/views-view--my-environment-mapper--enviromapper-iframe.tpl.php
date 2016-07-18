<?php
  $iframe_url = "https://map11.epa.gov/myem/envmapEEP/mainmap.html?pTheme=all&pLayers=afs,triair,triwater,rcra,tsca&ve=11,32.8442,-96.70149";
?>

<p class="widget-note">For more information, like water quality and <abbr class="ee-bootstrap-tooltip" data-toggle="tooltip" data-placement="top" title="Ultraviolet">UV</abbr> index, visit <a href='' id="myEnvMoreInfo" rel="external" target="_blank">MyEnvironment</a>.</p>
<div class="embedMyEnv-container">
<iframe id="myEnviFrame" src='<?php echo $iframe_url; ?>' title='My EnviroMapper map from EPA.gov' width='800' height='500' style='border:0'></iframe>

