<?php
header('Content-Type: application/json');
header("Expires: Tue, 01 Jan 1990 00:00:00 GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$error = "false";
$tz = $_GET['tz'];

if ( !in_array($tz, DateTimeZone::listIdentifiers())) {
   $error = 'invalid time zone';
   $tz = 'UTC';
}

date_default_timezone_set($tz);

?>
{
 "tz": "<?php echo $tz ?>",
 "fyear": <?php echo date('Y'); ?>,
 "fmonth": <?php echo date('n'); ?>,
 "fdate": <?php echo date('j'); ?>,
 "fday": <?php echo date('N'); ?>,
 "fhour": <?php echo date('G'); ?>,
 "fsecond": <?php echo intval(date('s')); ?>,
 "error": "<?php echo $error; ?>",
 "fminute": <?php echo intval(date('i')); ?>
}