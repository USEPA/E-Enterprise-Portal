<template>
  <div class="workbench">
    <!-- @TODO - Dynamically load workbench apps -->
    <BeWellInformed/>
    <TrendingAir/>
    <FavoriteLinks/>
    <MyReporting/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import BeWellInformed from '@/modules/BeWellInformed/BeWellInformed.vue';
  import TrendingAir from '@/modules/TrendingAir/TrendingAir.vue';
  import FavoriteLinks from '@/modules/FavoriteLinks/FavoriteLinks.vue'
  import MyReporting from '@/modules/MyReporting/MyReporting.vue'

  export default {
    name: 'Workbench',
    components: {
      BeWellInformed,
      TrendingAir,
      FavoriteLinks,
      MyReporting,

    },
  };
</script>
