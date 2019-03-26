<template>
  <div class="home mt-2">
    <b-carousel
      id="home-carousel"
      background="#575757"
      :interval="0"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">
      <!-- customised numbered indicators -->
      <ol class="carousel-indicators carousel-indicators-numbers mt-1">
        <li
          data-target="#home-carousel"
          data-slide-to="0"
          class="active">1</li>
        <li
          data-target="#home-carousel"
          data-slide-to="1">2</li>
        <li
          data-target="#home-carousel"
          data-slide-to="2">3</li>
      </ol>
      <!-- controllers linked to customised indicators -->
      <a
        class="carousel-control-prev"
        href="#home-carousel"
        role="button"
        data-slide="prev">
        <span
          class="carousel-control-prev-icon"
          aria-hidden="true"/>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#home-carousel"
        role="button"
        data-slide="next">
        <span
          class="carousel-control-next-icon"
          aria-hidden="true"/>
        <span class="sr-only">Next</span>
      </a>
      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide
        class="col"
        img-blank>
        <div class="container">
          <div class="row">
            <div class="slide-details col-md-7 align-self-center">
              <div class="pt-2">
                <h2>A Tool Suite for Your Environmental Needs</h2>
                <p>
                  E-Enterprise for the Environment is a new model for collaborative leadership
                  among environmental co-regulators, engaging with all interested and affected parties,
                  to achieve positive environmental, human health, and economic outcomes.
                </p>
              </div>
              <div class="align-self-center pt-5">
                <router-link to="/workbench">
                  <button
                    id="try-it-carousel-button"
                    class="usa-button float-right"
                    variant="primary"
                    :title="tryitTitle"
                    v-if='!authenticated'>
                    <i class="fas fa-arrow-circle-right pr-1"/>Try It
                  </button>
                </router-link>
              </div>
            </div>
            <div class="slide-image col-md-5 align-self-center">
              <div class="row pt-5">
                <img
                  class="widget-button"
                  alt="Environment."
                  src="../assets/images/environment.png">
                <div>
                  <h5>Environment Reporting</h5>
                  <span class="list-caption">
                    New ways to submit information.
                  </span>
                </div>
              </div>
              <div class="row pt-3">
                <img
                  class="widget-button"
                  alt="Workbench."
                  src="../assets/images/workbench.png">
                <div>
                  <h5>Workbench</h5>
                  <span class="list-caption">
                    Tools, data, and resources to help you
                  </span>
                </div>
              </div>
              <div class="row pt-3">
                <img
                  class="widget-button"
                  alt="Maps & Dashboard."
                  src="../assets/images/headline.png">
                <div>
                  <h5>Maps & Dashboard</h5>
                  <span class="list-caption">
                    Learn more about the environment through <br/>maps and data mashups
                  </span>
                  </div>
              </div>
              <div>
                <router-link to="/about">
                  <a href="" class="float-right pr-4 text-white">..and more</a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </b-carousel-slide>
      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide
        class="col"
        img-blank>
        <div class="container">
          <div class="row">
            <div class="slide-details col-md-7 align-self-center">
              <h2>Access Your State and EPA Accounts</h2>
              <p>
                Personalize your E-Enterprise experience by logging in with your state or EPA
                account. You'll have access to valuable content and tools like My Facility Manager,
                My Reporting, permits, and more.
                We will continue to add partners in the future.
              </p>
              <router-link
                to="/login"
                class="usa-button float-right"
                ref="loginBtn"
                :title="loginTitle"
                v-if='!authenticated'>
                <i class="fas fa-lock pr-1"/>
                Login
              </router-link>
            </div>
            <div class="col-md-5 align-self-center">
              <img
                fluid
                id="my-reporting-img"
                src="../assets/images/carousel-my-reporting.png"
                alt="My Reporting">
              <div class="w-100 h-5"/>
              <img
                fluid
                id="construction-permits-img"
                src="../assets/images/carousel-construction-permits.png"
                alt="Construction Permits">
              <div class="w-100 h-5"/>
              <img
                fluid
                id="my-certifications-img"
                src="../assets/images/carousel-my-certifications.png"
                alt="My Certification">
            </div>
          </div>
        </div>
      </b-carousel-slide>
      <!-- Text slides with image -->
      <b-carousel-slide
        class="col"
        img-blank>
        <div class="container">
          <div class="row">
            <div class="slide-image col-md-4 align-self-center">
                <img
                  class="lg-carousel-highlight"
                  id="regular-finder-img"
                  src="../assets/images/carousel-regulation-finder.png"
                  alt="Regualtion Finder">
                <div class="w-100 h-5"/>
                <img
                  id="regular-finder-results-img"
                  src="../assets/images/carousel-regulation-finder-results.png"
                  alt="Regulation Finder Results">
              </div>
            <div class="slide-details col-md mb-5 align-self-center">
              <span class="coming-soon">coming soon…</span>
              <h2>Find Federal Regulations That Apply</h2>
              <p>
                The Regulation Finder tool pulls in content from several different environmental and
                legislative websites to make it easier to look up a chemical or topic and see what
                rules may apply. Enter a chemical or keyword and find a list of federal regulations
                that may apply, as well as proposed and recently finalized rules.
              </p>
            </div>
        </div>
        </div>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapGetters } from 'vuex';

  export default {
    name: 'Home',
    components: {},
    computed: {
      ...mapGetters({
        authenticated: 'getIsLoggedIn',
      }),
      tryitTitle() {
        return 'Want to just try it? No log in needed.';
      },
      loginTitle() {
        return this.$store.state.loginBtnHoverMessage;
      },
    },
    data() {
      return {
        slide: 0,
        sliding: null,
        fixedHeight: 'auto',
      };
    },
    methods: {
      onSlideStart() {
        this.sliding = false;
      },
      onSlideEnd() {
        this.sliding = false;
      },
    },
  };
</script>


<style lang="scss">
  // @TODO - Move non scoped styles to the appropriate sass file
  @import '../styles/bootstrap-mixins-cheatsheet.scss';
  #home-carousel {
    h1, h2, h3, h4, h5 {
      font-family: "Merriweather", "Georgia", "Cambria", "Times New Roman", "Times", serif;
      font-weight: 300;
    }

    .list-caption{
      font-family: "Source Sans Pro Web", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
      font-weight: 300;
    }

    a {
      text-decoration: none;
    }

    p, .coming-soon {
      font-family: "Source Sans Pro Web", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
      font-weight: 300;
      max-width: 90%;
    }
    .carousel-indicators-numbers {
      li {
        text-indent: 0;
        text-align: center;
        margin: 0 0.125rem;
        width: 1.875rem;
        height: 1.875rem;
        border: none;
        border-radius: 100%;
        line-height: 1.875rem;
        color: #FFFFFF;
        background-color: #999;
        transition: all 0.25s ease;
        &.active,
        &:hover {
          margin: 0 0.125rem;
          width: 1.875rem;
          height: 1.875rem;
          color:#000000;
          background-color: #ffffff;
        }
      }
    }
    .carousel-controls {
      position: relative;
      width: 18.75rem;
      margin: 0 auto;
    }

    .carousel-caption {
      position: relative;
      text-align: left;
      right: auto;
      bottom: auto;
      left: auto;
      z-index: 10;
      padding-top: 1.25rem;
      padding-bottom: 1.25rem;
      color: #fff;
    }
    .carousel-item {
      & > img:first-child {
        display: none !important;
      }
    }

    .carousel-control-prev, .carousel-control-next {
      width: 2rem;
    }

    // Slide 1
  .widget-button {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

    // Slide 2
    #my-reporting-img,
    #my-certifications-img,
    #construction-permits-img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    #my-reporting-img {
      width: 65%;
      height: 13.5rem;
      max-width: 100%;
      padding-bottom: 1rem;
    }

    #my-certifications-img{
      width: 45%;
      max-width: 100%;
    }
    #construction-permits-img{
      width: 45%;
      max-width: 100%;
      padding-bottom: 1rem;
      float:right;
    }
    // Slide 3
    #regular-finder-img {
      max-width: 55%;
    }

    #regular-finder-results-img {
      width: 85%;
      max-width: 100%;
      height: auto;
    }


    .slide-image {
      position: relative;
      margin-bottom: 1rem;
    }

    .lg-carousel-highlight {
      border: #1c9b97 solid 0.4375rem;
      border-radius: 0.3125rem;
      width: 43%;
      position: absolute;
      right: 2.5rem;
      top: 1.875rem;
    }

    // General slider media queries
    @include media-breakpoint-up(sm) {
      .carousel-item {
        min-height: 33rem;
      }
    }
    @include media-breakpoint-up(md) {
      .carousel-item {
        min-height: 24rem;
      }
    }
    @include media-breakpoint-up(lg) {
      .carousel-item {
        min-height: 22rem;
      }
    }
  }
  .account-auth {
    background-color: #0071bc;
    color: white;
  }

  .login-btn-wrapper {
    padding-left: 40%;
  }

  // allows for carousel nav buttons to be clicked properly
  .carousel-item {
    padding: 2rem;
  }

  // fixes height of carousel
  .carousel-inner {
    min-height: 28rem;
  }

  // usa-buttons in carousel styles fixes for mobile
  @media all and (max-width: 479px){
    #home-carousel .usa-button {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }

  // fix carousel heights and provide space between footer and carousel
  @media all and (max-width: 767px){
    .carousel-inner {
      min-height: 41rem;
    }
    .slide-details {
      padding-bottom: 2rem;
    }
    .slide-image {
      padding-bottom: 2rem;
    }
  }
  .home {
    padding-bottom: 1.25rem;
  }

  #home-carousel {
    background-color: #5d67ff;
    &:before {
       content: '';
       display: block;
       position: absolute;
       background-color: rgb(87, 87, 87);;
       height: 100%;
       width: 100%;
       left: 0;
       margin-left: -100%;
     }
  &:after {
     content: '';
     display: block;
     position: absolute;
     background-color: rgb(87, 87, 87);;
     height: 100%;
     width: 100%;
     right: 0;
     margin-right: -100%;
     top:0;
   }
  }
</style>
