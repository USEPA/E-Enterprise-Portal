<template>
  <div class="workbench">
    <!-- @TODO - Dynamically load workbench apps -->
    <BeWellInformed/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import BeWellInformed from '@/modules/BeWellInformed/BeWellInformed.vue';

  export default {
    name: 'Workbench',
    components: {
      BeWellInformed,
    },
  };
</script>
