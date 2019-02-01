<template>
  <div class="workbench">
    <!-- @TODO - Dynamically load workbench apps -->
    <Grid/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Grid from '@/modules/Grid/Grid.vue';

  export default {
    name: 'Workbench',
    components: {
      Grid,
    },
  };
</script>