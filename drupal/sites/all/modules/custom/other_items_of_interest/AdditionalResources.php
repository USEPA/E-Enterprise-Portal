<?php

/**
 * Created by PhpStorm.
 * User: bmatkin
 * Date: 7/5/2017
 * Time: 11:30 AM
 */
class AdditionalResources {
  // Array of additonal resources
  private $additional_resources;
  // Array of user locations;
  private $user_locations;

  public function __construct() {
    $this->additional_resources = node_load_multiple(array(), array('type' => 'state_resource'));
  }

  private function returnDatatableRows($nodes) {
    $rows = [];
    foreach ($nodes as $node) {
      $datatable_row = [];
      $url = $node->field_source_url[LANGUAGE_NONE][0]['safe_value'];
      $title = $node->field_source[LANGUAGE_NONE][0]['safe_value'];
      $topic = $node->field_topic[LANGUAGE_NONE][0]['value'];
      $datatable_row[] = $title;
      $resource_text = '<div class="interests-url-hyperlink"><a href="' . $url . '">' .
        $title . '</a></div><div class="interests-url-text" title="' . $url . '">' . $url . '</div>';
      $datatable_row[] = $resource_text;
      $datatable_row[] = $topic;
      $rows[] = $datatable_row;
    }
    return $rows;
  }

  public function allResources() {
    $nodes = [];
    foreach ($this->additional_resources as $nid => $node) {
      $nodes[] = $node;
    }
    return $this->returnDatatableRows($nodes);
  }

  public function userResources() {
    $nids = $this->loadUserResources();
    $nodes = $this->returnNodesFromNids($nids);
    return $this->returnDatatableRows($nodes);
  }

  public function titleBasedResources($title) {
    $nids = $this->mapResourceTitlesToNids($title);
    $nodes = $this->returnNodesFromNids($nids);
    return $this->returnDatatableRows($nodes);
  }

  private function returnNodesFromNids($nids) {
    $nodes = [];
    foreach ($this->additional_resources as $nid => $node) {
      if (in_array($nid, $nids)) {
        $nodes[] = $node;
      }
    }
    return $nodes;
  }


  /**
   * Searches for common locations with preferred names or state codes.
   * Will return Resources that match the location of Tribes as well
   * @param $title
   * @return mixed
   */
  private function mapResourceTitlesToNids($title) {
    //@see https://gist.github.com/keithmorris/4155220
    $commonWords = array('a', 'able', 'about', 'above', 'abroad', 'according', 'accordingly', 'across', 'actually', 'adj', 'after', 'afterwards', 'again', 'against', 'ago', 'ahead', 'ain\'t', 'all', 'allow', 'allows', 'almost', 'alone', 'along', 'alongside', 'already', 'also', 'although', 'always', 'am', 'amid', 'amidst', 'among', 'amongst', 'an', 'and', 'another', 'any', 'anybody', 'anyhow', 'anyone', 'anything', 'anyway', 'anyways', 'anywhere', 'apart', 'appear', 'appreciate', 'appropriate', 'are', 'aren\'t', 'around', 'as', 'a\'s', 'aside', 'ask', 'asking', 'associated', 'at', 'available', 'away', 'awfully', 'b', 'back', 'backward', 'backwards', 'be', 'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 'begin', 'behind', 'being', 'believe', 'below', 'beside', 'besides', 'best', 'better', 'between', 'beyond', 'both', 'brief', 'but', 'by', 'c', 'came', 'can', 'cannot', 'cant', 'can\'t', 'caption', 'cause', 'causes', 'certain', 'certainly', 'changes', 'clearly', 'c\'mon', 'co', 'co.', 'com', 'come', 'comes', 'concerning', 'consequently', 'consider', 'considering', 'contain', 'containing', 'contains', 'corresponding', 'could', 'couldn\'t', 'course', 'c\'s', 'currently', 'd', 'dare', 'daren\'t', 'definitely', 'described', 'despite', 'did', 'didn\'t', 'different', 'directly', 'do', 'does', 'doesn\'t', 'doing', 'done', 'don\'t', 'down', 'downwards', 'during', 'e', 'each', 'edu', 'eg', 'eight', 'eighty', 'either', 'else', 'elsewhere', 'end', 'ending', 'enough', 'entirely', 'especially', 'et', 'etc', 'even', 'ever', 'evermore', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'ex', 'exactly', 'example', 'except', 'f', 'fairly', 'far', 'farther', 'few', 'fewer', 'fifth', 'first', 'five', 'followed', 'following', 'follows', 'for', 'forever', 'former', 'formerly', 'forth', 'forward', 'found', 'four', 'from', 'further', 'furthermore', 'g', 'get', 'gets', 'getting', 'given', 'gives', 'go', 'goes', 'going', 'gone', 'got', 'gotten', 'greetings', 'h', 'had', 'hadn\'t', 'half', 'happens', 'hardly', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'hello', 'help', 'hence', 'her', 'here', 'hereafter', 'hereby', 'herein', 'here\'s', 'hereupon', 'hers', 'herself', 'he\'s', 'hi', 'him', 'himself', 'his', 'hither', 'hopefully', 'how', 'howbeit', 'however', 'hundred', 'i', 'i\'d', 'ie', 'if', 'ignored', 'i\'ll', 'i\'m', 'immediate', 'in', 'inasmuch', 'inc', 'inc.', 'indeed', 'indicate', 'indicated', 'indicates', 'inner', 'inside', 'insofar', 'instead', 'into', 'inward', 'is', 'isn\'t', 'it', 'it\'d', 'it\'ll', 'its', 'it\'s', 'itself', 'i\'ve', 'j', 'just', 'k', 'keep', 'keeps', 'kept', 'know', 'known', 'knows', 'l', 'last', 'lately', 'later', 'latter', 'latterly', 'least', 'less', 'lest', 'let', 'let\'s', 'like', 'liked', 'likely', 'likewise', 'little', 'look', 'looking', 'looks', 'low', 'lower', 'ltd', 'm', 'made', 'mainly', 'make', 'makes', 'many', 'may', 'maybe', 'mayn\'t', 'me', 'mean', 'meantime', 'meanwhile', 'merely', 'might', 'mightn\'t', 'mine', 'minus', 'miss', 'more', 'moreover', 'most', 'mostly', 'mr', 'mrs', 'much', 'must', 'mustn\'t', 'my', 'myself', 'n', 'name', 'namely', 'nd', 'near', 'nearly', 'necessary', 'need', 'needn\'t', 'needs', 'neither', 'never', 'neverf', 'neverless', 'nevertheless', 'new', 'next', 'nine', 'ninety', 'no', 'nobody', 'non', 'none', 'nonetheless', 'noone', 'no-one', 'nor', 'normally', 'not', 'nothing', 'notwithstanding', 'novel', 'now', 'nowhere', 'o', 'obviously', 'of', 'off', 'often', 'oh', 'ok', 'okay', 'old', 'on', 'once', 'one', 'ones', 'one\'s', 'only', 'onto', 'opposite', 'or', 'other', 'others', 'otherwise', 'ought', 'oughtn\'t', 'our', 'ours', 'ourselves', 'out', 'outside', 'over', 'overall', 'own', 'p', 'particular', 'particularly', 'past', 'per', 'perhaps', 'placed', 'please', 'plus', 'possible', 'presumably', 'probably', 'provided', 'provides', 'q', 'que', 'quite', 'qv', 'r', 'rather', 'rd', 're', 'really', 'reasonably', 'recent', 'recently', 'regarding', 'regardless', 'regards', 'relatively', 'respectively', 'right', 'round', 's', 'said', 'same', 'saw', 'say', 'saying', 'says', 'second', 'secondly', 'see', 'seeing', 'seem', 'seemed', 'seeming', 'seems', 'seen', 'self', 'selves', 'sensible', 'sent', 'serious', 'seriously', 'seven', 'several', 'shall', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'since', 'six', 'so', 'some', 'somebody', 'someday', 'somehow', 'someone', 'something', 'sometime', 'sometimes', 'somewhat', 'somewhere', 'soon', 'sorry', 'specified', 'specify', 'specifying', 'still', 'sub', 'such', 'sup', 'sure', 't', 'take', 'taken', 'taking', 'tell', 'tends', 'th', 'than', 'thank', 'thanks', 'thanx', 'that', 'that\'ll', 'thats', 'that\'s', 'that\'ve', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'thence', 'there', 'thereafter', 'thereby', 'there\'d', 'therefore', 'therein', 'there\'ll', 'there\'re', 'theres', 'there\'s', 'thereupon', 'there\'ve', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'thing', 'things', 'think', 'third', 'thirty', 'this', 'thorough', 'thoroughly', 'those', 'though', 'three', 'through', 'throughout', 'thru', 'thus', 'till', 'to', 'together', 'too', 'took', 'toward', 'towards', 'tried', 'tries', 'truly', 'try', 'trying', 't\'s', 'twice', 'two', 'u', 'un', 'under', 'underneath', 'undoing', 'unfortunately', 'unless', 'unlike', 'unlikely', 'until', 'unto', 'up', 'upon', 'upwards', 'us', 'use', 'used', 'useful', 'uses', 'using', 'usually', 'v', 'value', 'various', 'versus', 'very', 'via', 'viz', 'vs', 'w', 'want', 'wants', 'was', 'wasn\'t', 'way', 'we', 'we\'d', 'welcome', 'well', 'we\'ll', 'went', 'were', 'we\'re', 'weren\'t', 'we\'ve', 'what', 'whatever', 'what\'ll', 'what\'s', 'what\'ve', 'when', 'whence', 'whenever', 'where', 'whereafter', 'whereas', 'whereby', 'wherein', 'where\'s', 'whereupon', 'wherever', 'whether', 'which', 'whichever', 'while', 'whilst', 'whither', 'who', 'who\'d', 'whoever', 'whole', 'who\'ll', 'whom', 'whomever', 'who\'s', 'whose', 'why', 'will', 'willing', 'wish', 'with', 'within', 'without', 'wonder', 'won\'t', 'would', 'wouldn\'t', 'x', 'y', 'yes', 'yet', 'you', 'you\'d', 'you\'ll', 'your', 'you\'re', 'yours', 'yourself', 'yourselves', 'you\'ve', 'z', 'zero');
    $title = preg_replace('/\b(' . implode('|', $commonWords) . ')\b/', '', $title);
    $title_array = explode(',', $title);
    $query = db_select("node", 'n')
      ->fields('n', array('nid'))
      ->condition('type', 'state_resource')
      ->condition('status', 1);

    $db_or = db_or();
    foreach ($title_array as $word) {
      $db_or->condition('title', '%' . db_like(trim($word)) . '%', 'LIKE');
    }
    $query->condition($db_or);

    $nids = $query->execute()->fetchCol();
    return $nids;
  }

  private function loadUserResources() {
    global $user;
    $nids = array();
    $locations = array();

    $user_data = user_load($user->uid);
    $zip_codes = $user_data->field_zip_code[LANGUAGE_NONE];
    if (count($zip_codes) > 0) {
      foreach ($zip_codes as $elem) {
        $zip = $elem['field_field_zip_code'][LANGUAGE_NONE][0]['value'];
        $preferred = return_user_preferred_location($zip);
        if ($preferred) {
          $location = $preferred['preferred_name'];
        }
        else {
          $location = zip_code_lookup($zip)['state'];
        }
        if (!in_array($location, $locations)) {
          $locations[] = $location;
          $nids = array_merge($nids, $this->mapResourceTitlesToNids($location));
        }
      }
    }
    if (isset($_SESSION['default_location_zip'])) {
      $preferred = return_user_preferred_location($_SESSION['default_location_zip']);
      if ($preferred) {
        $location = $preferred['preferred_name'];
      }
      else {
        $location = zip_code_lookup($_SESSION['default_location_zip'])['state'];
      }
      $locations[] = $location;
      $nids = array_merge($nids, $this->mapResourceTitlesToNids($location));
    }

    /// Add users admin state if applicable
    if (in_array('state_admin', $user->roles)) {
      if (isset($user_data->field_admin_state[LANGUAGE_NONE])) {
        $admin_state = $user_data->field_admin_state[LANGUAGE_NONE][0]['safe_value'];
        // Reserve EPA for EPA tab
        if ($admin_state != 'US EPA' && !in_array($admin_state, $locations)) {
          $locations[] = $admin_state;
          $nids = array_merge($nids, $this->mapResourceTitlesToNids($admin_state));
        }
      }
    }
    return $nids;
  }
  
  private function returnStateFromLocationString($location) {
    
  }


}