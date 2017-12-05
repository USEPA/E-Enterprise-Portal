<table class="table eportal-responsive-table">
  <thead>
  <th>Service</th>
  <th>Partner</th>
  <th>Type</th>
  <th>Use</th>
  <th>Purpose</th>
  <th>Instructions</th>
  <th>Options</th>
  <th>Go Live</th>
  </thead>
  <tbody>
  <?php foreach ($service_providers as $sp): ?>
    <tr>
      <?php foreach ($sp as $cell): ?>
        <td><?php print $cell; ?></td>
      <?php endforeach; ?>
    </tr>
  <?php endforeach; ?>
  </tbody>
</table>