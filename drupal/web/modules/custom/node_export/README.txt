
Node export README

CONTENTS OF THIS FILE
----------------------

  * Introduction
  * Installation
  * Usage


INTRODUCTION
------------
This module allows users to export nodes and then import it into another
Drupal installation, or on the same site.

This module allows user to export/import nodes if they have the 'export nodes'
or 'export own nodes' permission, have node access to view the node and create
the node type, and the node type is not omitted in node export's settings. The
module does not check access to the filter formats used by the node's fields,
please keep this in mind when assigning permissions to user roles.

Maintainer: Anmol Goel (http://drupal.org/u/anmolgoyal74)


INSTALLATION
------------
1. Copy node_export folder to modules directory (usually /modules/).
2. At admin/Extend/modules enable the Node export module in the Node export
   package.

USAGE
-----
1. To export nodes, either:
   a) Use the 'Node export' tab on a node page.
   b) Use the content tab (admin/content) and select the Export Option and then
      there are two ways:
       1) You can export all nodes of a particular content type.
       2) You can provide all the node ids you want to export
           wish to export and then choose 'Node export' under the 'Update options'.

2. To import nodes that were exported with Node export, either:
   a) Use the form at 'Node export: import' under 'Admin/content'.
      Paste the export code you generated in export function and just click submit.

3. You can also export the nodes using drush command.
      $ drush ne-export 'nid' > 'filename'

      a) For eg. If you want to export node with node id 10 and the filename is
          node.json then the command will be like:
          $drush ne-export 10 > node.json

      b) For more than one nodes, you can write their nids seprated by space.
          $drush ne-export  1  3  4 > node.json
