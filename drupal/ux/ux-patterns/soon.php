<?php
include_once "inc/header.php";
?>
    <!-- Begin page content -->
    <style>
        .example {position:relative;margin-bottom:20px;}
        .highlight {background-color:#f3f3f3;padding:10px;border:1px solid #eeeeee;}
        .clip_button {position:absolute;top:0;right:0;/* border:1px solid #cdcdcd;background-color: #ededed;padding:5px 10px; */}
        .clip_button:hover {background-color: #cdcdcd;}

    </style>
<?php
/*
$page_title = "Home";
$page_description = "e-Enterprise provides a central and unified place for businesses and individuals to report environmental measures and data to EPA and check on the latest developments."
$shortlink = "/node/3149";
$canonicalurl = "/toxics-release-inventory-tri-program";
$epachannel = "Laws &amp; Regulations";
$epatype = "Laws &amp; Regulations"; 
$date_review = "2016-04-19";
$date_modified = "2015-04-20";
$date_created = "2013-01-31";
$keywords ="information, reporting, annual, pollution prevention, TRI-MEweb, guidance, international, analysis";
*/
$page_title = "E-Enterprise for the Environment";

include_once "inc/main-nav.php";
?>

    <section id="main-content" class="main-content clearfix" role="main">
        <div class="region-preface clearfix">
            <div id="block-pane-epa-web-area-connect" class="block block-pane contextual-links-region">
                <ul class="menu utility-menu">
                    <li class="menu-item"><a href="{CONTACT URL}" class="menu-link contact-us">Contact Us</a></li>
                </ul>
            </div>
        </div>
        <div class="main-column clearfix">
            <!--googleon: all-->
            <h1 class="page-title"><?php echo $page_title;?></h1>
            <h2>We are currently working on this new site. Stay Tuned!</h2>
            <!--<h4>Enhancing service to the regulated community, environmental agencies, and the public</h4>-->
            <div class="panel-pane pane-node-content" >
                <div class="pane-content">
                    <div class="node node-page clearfix view-mode-full">
                        <?php include_once "widgets/features.php"; ?>

                    </div>
                </div>
            </div>
            <div id="block-epa-og-footer" class="block block-epa-og">
            </div>
            <!--googleoff: all-->
        </div>
    </section>
<?php
include_once "inc/footer.php";
?>