<div id="manage-my-topics">
  <div id="high-level-interests">
    <div class="view-content">
      <?php foreach ($topics as $tid => $topic): ?>
        <li class="usa-width-one-whole">
          <input id="manage-lgc-<?php echo $tid; ?>" aria-label="<?php echo $topic['name']; ?>"
                 class="term-name-checkboxes" type="checkbox" name="<?php echo $topic['name']; ?>"
                 value="<?php echo $tid; ?>"
            <?php if ($topic['checked']): ?>
              checked
            <?php endif; ?>
          >
          <label class="ck-button lgc-topics-of-interest" for="manage-lgc-<?php echo $tid; ?>">
            <?php echo $topic['name']; ?> </label>
        </li>
      <?php endforeach; ?>
    </div>
  </div>
</div>
