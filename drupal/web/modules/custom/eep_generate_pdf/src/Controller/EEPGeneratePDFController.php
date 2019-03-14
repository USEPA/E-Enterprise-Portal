<?php

/**
 * @file
 * Contains \Drupal\eep_generate_pdf\Controller\EEPGeneratePDF.
 */

namespace Drupal\eep_generate_pdf\Controller;

use Drupal\Core\Controller\ControllerBase;


/**
 * Controller routines for test_api routes.
 */
class EEPGeneratePDFController extends ControllerBase {

  public function content() {

    return [
      '#theme' => 'eep_pdf_generate',
    ];

  }

  function pdf_generate() {
    $html = 'eep_pdf_generate';

    $descriptorspec = [
      0 => ['pipe', 'r'], // stdin
      1 => ['pipe', 'w'], // stdout
      2 => ['pipe', 'a'], // stderr
    ];
      $process = proc_open('c:\inetpub\wwwroot\eep2\drupal\web\sites\all\libraries\wkhtmltopdf\bin\wkhtmltopdf -q - -', $descriptorspec, $pipes);


    // Send the HTML on stdin
    fwrite($pipes[0], $html);
    fclose($pipes[0]);
    // Read the outputs
    $pdf = stream_get_contents($pipes[1]);
    $errors = stream_get_contents($pipes[2]);
    // Close the process
    fclose($pipes[1]);
    $return_value = proc_close($process);
    // Output the results
    if ($errors) {
      watchdog('be_well_informed', "wkhtmltopdf PDF Generation Failed! " . $errors, WATCHDOG_ERROR);
      return "PDF Generation Failed!!";
    }
    else {
      header('Content-Type: application/pdf');
      header('Cache-Control: public, must-revalidate, max-age=0'); // HTTP/1.1
      header('Pragma: public');
      header('Expires: Sat, 26 Jul 1997 05:00:00 GMT'); // Date in the past
      header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
      header('Content-Length: ' . strlen($pdf));
      echo $pdf;
    }
  }
}
