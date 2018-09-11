<template>
  <footer class="footer fixed-bottom">
    <div class="container py-2">
      <div class="row justify-content-center small">
        <div class="col-auto">
          <a
            href="http://www2.epa.gov/e-enterprise/about-e-enterprise-environment"
            target="_blank"
            class="">E-Enterprise Home</a>
        </div>
        <div class="col-auto">
          <a
            href="http://www2.epa.gov/home/privacy-and-security-notice"
            target="_blank"
            class="">Privacy and Security Notice</a>
        </div>
        <div class="col-auto">
          <a
            href="http://www2.epa.gov/accessibility"
            target="_blank"
            class="">Accessibility</a>
        </div>
        <div class="col-auto">
          <a
            href="https://github.com/USEPA/E-Enterprise-Portal/"
            class="github"
            target="_blank">GitHub</a>
        </div>
      </div>
      <div class="row">
        <div class="col wd-100"></div>
      </div>
      <div class="row justify-content-center small">
        <div class="col-auto text-align-center small">Version 2.0.1</div>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    name: 'MainFooter',
  };
</script>

<style scoped
  lang="scss">
  @import '../styles/bootstrap-mixins-cheatsheet.scss';

  footer {
    color: #fefefe;
    background-color: #323a45;

    a {
      color: #fefefe;

      &:hover, &:active {
        text-decoration: underline;
      }
    }
  }

  @include media-breakpoint-down(xs) {
    footer.fixed-bottom {
      position: relative;
      right: auto;
      bottom: auto;
      left: auto;
      z-index: auto;
    }
  }
</style>
