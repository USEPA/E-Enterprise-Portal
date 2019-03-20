<?php

/**
 * @file
 * Contains \Drupal\eep_generate_pdf\Controller\EEPGeneratePDF.
 */

namespace Drupal\eep_generate_pdf\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;


/**
 * Controller routines for test_api routes.
 */
class EEPGeneratePDFController extends ControllerBase {

  private $treatments = [
    [
      'icon' => '',
      'boxes' => [
        [
          'icon' => 'home',
          'action' => 'Whole House Anion Exchange Water Treatment System followed by an Acid Neutralizer'
        ],
        [
          'icon' => 'facet',
          'action' => 'Point-of-Use (POU) Arsenic Adsorption Media Filter System'
        ],
      ]
    ],
    [
      'icon' => 'home',
      'boxes' => [
        [
          'icon' => '',
          'action' => 'Whole House Oxidizing Filter System'
        ],
        [
          'icon' => '',
          'action' => 'Whole House Cation Exchange Water Softener'
        ],
      ]
    ],
    [
      'icon' => '',
      'boxes' => [
        [
          'icon' => 'home',
          'action' => 'Whole House Anion Exchange Water Treatment System followed by an Acid Neutralizer'
        ],
        [
          'icon' => 'facet',
          'action' => 'Point-of-Use (POU) Arsenic Adsorption Media Filter System'
        ],
      ]
    ],
    [
      'text' => 'Depending on the radon levels in the air, treatment of water may be advisable between 2,000 pCi/L and 10,000 pCi/L. Above 10,000 pCi/L, treatment is recommended regardless of radon level in air.',
      'icon' => 'home',
      'boxes' => [
        [
          'action' => 'Whole House Aeration Device'
        ],
        [
          'action' => 'Whole House Granular Activated Carbon (GAC) Filter'
        ],
      ]
    ],
    [
      'icon' => 'home',
      'boxes' => [
        [
          'icon' => '',
          'action' => 'Whole House Acid Neutralizer System'
        ],
      ]
    ],
    [
      'icon' => 'facet',
      'boxes' => [
        [
          'icon' => '',
          'action' => 'Point-of-Use (POU) Arsenic Adsorption Media Filter System'
        ],
        [
          'icon' => '',
          'action' => 'Point-of-Use (POU) Reverse Osmosis (RO) System'
        ],
        [
          'icon' => '',
          'action' => 'Point-of-Use (POU) Activated Alumina Filter System'
        ],
      ]
    ],
  ];


  private function processGuidelineIcon($icon_text) {
    switch ($icon_text) {
      case 'Images/water/check4.png':
        $r = 'MeetsLimit';
        break;
      case 'Images/water/exclamation.png':
        $r = 'CloseToLimit';
        break;
      case 'Images/water/orange.png':
        $r = 'Factsheet';
        break;
      case 'Images/water/false4.png':
        $r = 'AboveLimit';
        break;
      case 'Images/water/blank.png':
        $r = 'ReferToOther';
        break;
      default:
        $r = 'NoInput';
    }
    return $r;
  }

  private function render_html($payload) {
    if (isset($payload)) {
      $payload = \GuzzleHttp\json_decode($payload, true);
    }
    $state_code = array_keys($payload['info'])[0];
    foreach ($payload['results'][0]['ResultEvaluations'] as $rk => $result) {
      foreach ($result as $key => $value) {
        if ($key === 'GuidelineIcon') {
          $payload['results'][0]['ResultEvaluations'][$rk][$key] = $this->processGuidelineIcon($value);
        } else {
          $payload['results'][0]['ResultEvaluations'][$rk][$key] = htmlspecialchars_decode($value);
        }
      }
    }
    $step_html = $this->render_step_html($payload['results'][0]);
    // Set up email template
    $body_data = array(
      '#theme' => 'eep_generate_pdf',
      '#infoXmlResults' => $payload['info'][$state_code]['info']['Partner']['Results'],
      '#waterAnalysisResults' => $payload['results'][0],
      '#state_code' => $state_code,
      '#base_path' => \Drupal::root(),
      '#treatment_title' => $payload['treatment_title'],
      '#step_html' => $step_html,
    );

    return \Drupal::service('renderer')->render($body_data);
  }

  function generate_pdf() {
    $response = new Response();
    if (isset($_POST['payload'])) {
      $html = $this->render_html($_POST['payload']);
      $descriptorspec = [
        0 => ['pipe', 'r'], // stdin
        1 => ['pipe', 'w'], // stdout
        2 => ['pipe', 'a'], // stderr
      ];
      $process = proc_open(\Drupal::root() . '\sites\all\libraries\wkhtmltopdf\bin\wkhtmltopdf -q - -', $descriptorspec, $pipes);

      // Send the HTML on stdin
      fwrite($pipes[0], $html);
      fclose($pipes[0]);
      // Read the outputs
      $pdf = stream_get_contents($pipes[1]);
      $errors = stream_get_contents($pipes[2]);
      // Close the process
      fclose($pipes[1]);
      proc_close($process);
      // Output the results
      if (!$errors) {
        $response->headers->set('Content-Type', 'application/pdf');
        $response->headers->set('Cache-Control', 'public, must-revalidate, max-age=0');
        $response->headers->set('Pragma', 'public');
        $response->headers->set('Expires', 'Sat, 26 Jul 1997 05:00:00 GMT');
        $response->headers->set('Last-Modified', gmdate('D, d M Y H:i:s') . ' GMT');
        $response->headers->set('Content-Length', strlen($pdf));
        $response->setContent($pdf);
      }
    }
    return $response;
  }


  private function render_step_html($results) {
    $toShow = [];
    foreach ($results['TreatmentSteps'] as $key => $value) {
      array_push($toShow, $key);
    }
    $count = count($toShow);
    $system_type = [];
    $stepLabel = 1;
    $html = '';
    foreach ($this->treatments as $c => $t) {
      if (in_array($c, $toShow)) {
        array_push($system_type, strtolower($t['icon']));
        $html .= '
        <div class="clearfix treatment-step">
          <div class="caret"></div>
          <div class="step">
            <h4 class="';
        if (isset($t['icon'])) {
          $html .= 'treatment-icon' . $t['icon'] . '-icon ';
        }
        $html .= ' of-' . $count . ' step-icon">Step ' . $stepLabel . '</h4>
        </div>
        <div class="float-center">
          <div class="step-boxes text-center clearfix">';
        if (isset($t['text'])) {
          $html .= "<div class='additional-text'>{$t['text']}</div>";
        }
        $or_count = 1;
        $total_items = count($results['TreatmentSteps'][$c]['OrInstructions']);
        foreach ($results['TreatmentSteps'][$c]['OrInstructions'] as $ix => $bx) {
          array_push($system_type, strtolower($bx['SystemType']));
          $html .= '<div class="box-main"
               title="' . $bx['Recommendation'] . '">' . $bx['Recommendation'] . '</div>';
          if ($total_items != $or_count) {
            $html .= "<div class='or'>Or</div>";
            $or_count++;
          }
        }
        $html .= '</div>
        </div>
        </div>';
        $stepLabel++;
      }
    }
    if (in_array('house', $system_type) || in_array('home', $system_type)) {

      $html .= '</div><p class="step-class system-type-house hide">
          <span>Regardless of water treatment technology, it is essential that system maintenance be
                            performed on schedule to maintain system effectiveness.
                            </span><br>
        <br><span>
                            </span><br>
                  <span><b>What does “whole house” mean?</b> The term whole house indicates that the treatment
                            technology is installed at the point where water enters your home to treat all of
                            the water used in your home.
                            </span>
      </p>';
    }
    return $html;
  }
}
