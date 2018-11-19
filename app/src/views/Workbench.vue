<template>
  <div class="workbench">
    <!-- @TODO - Dynamically load workbench apps -->
    <BeWellInformed/>
    <TrendingAir/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import BeWellInformed from '@/modules/BeWellInformed/BeWellInformed.vue';
  import TrendingAir from '@/modules/TrendingAir/TrendingAir.vue'

  export default {
    name: 'Workbench',
    components: {
      BeWellInformed,
      TrendingAir
    },
  };
</script>
