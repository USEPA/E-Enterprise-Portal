<template>
  <footer class="footer fixed-bottom">
    <div
      class="alert alert-info"
      role="alert"
      v-show="['workbench'].indexOf($route.name) > -1">
      <div
        id="terms-conditions"
        class="container w-100 d-flex text-dark">
        <div class="row align-self-center w-100">
          <div class="col-12 text-center">
            <span>By using the E-Enterprise Portal, you agree to the </span>
            <span class="text-decoration-underline cursor-pointer">
              <a
                class="text-dark"
                href="https://e-enterprise.gov/ee_disclaimer"
                target="_blank">
                Terms and Conditions.
              </a>
            </span>
            &nbsp;&nbsp;
            <span
              class="text-decoration-underline cursor-pointer"
              data-dismiss="alert">
              Continue »
            </span>
          </div>
        </div>
      </div>
    </div>
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
    <div
      class="alert alert-success px-3"
      role="alert"
      v-if="['workbench'].indexOf($route.name) > -1">
      <div class="col-12 text-center p-2">While we do not share user credentials, <strong>we can use a cookie to remember your login preferences.<br > Would you like us to remember which login option you chose next time?</strong>  <a
        href="https://www.epa.gov/privacy/privacy-and-security-notice#cookies"
        target="_blank"
        class="text-dark text-decoration-underline pl-2">See our cookie policy</a>.</div>
      <div class="col-12 text-right p-2 w-75"><a
        href="#"
        data-dismiss="alert"
        class="text-dark text-decoration-underline pr-2"
      >No Thanks</a><button
        class="btn btn-primary"
        data-dismiss="alert">Yes, Please</button></div>
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

  #terms-conditions {
    min-height: 5em;
    max-width: none;
    z-index: 1200;
  }
</style>
