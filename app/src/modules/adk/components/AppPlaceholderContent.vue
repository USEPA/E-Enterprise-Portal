<template>
  <div class="placeholder container">
    <slot>
      <template v-for="i in repeatitions">
        <div
          :key="i"
          class="row my-4"
        >
          <h3 :class="`col-${getRandomDistro()} pulse`">&nbsp;</h3>
          <div class="w-100"></div>
          <template v-for="j in getRandomDistro()">
            <p
              :key="j"
              :class="`col-${getRandomDistro()} pulse`">&nbsp;</p>
            <div class="w-100"></div>
          </template>
        </div>
      </template>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'AppPlaceholderContent',
    props: {
      repeatitions: {
        type: Number,
        default: 3,
        required: false,
      },
    },
    computed: {

    },
    methods: {
      getRandomDistro(min = 2, max = 10) {
        // Standard Normal variate using Box-Muller transform for natural looking text
        let u = 0;
        let v = 0;
        while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
        while (v === 0) v = Math.random();

        const distribution = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        // distribution /= 10.5; // Translate to 0 -> 1

        // resample between 0 and 1 if needed
        if (distribution > 1 || distribution < 0) return this.getRandomDistro(min, max);
        const r = Math.round(distribution * (max - min)) + min;
        return r;
      },
    },
  };
</script>

<style scoped lang="scss">
  .pulse {
    &::before { content: '\00a0'; }

    animation: pulse 1s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      background-color: rgba(165, 165, 165, 0.1)
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3)
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1)
    }
  }
</style>
