<template>
  <div class="home">
    <b-carousel
      id="home-carousel"
      controls
      indicators
      background="#ababab"
      :interval="0"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">
      <!-- Text slides with image -->
      <b-carousel-slide
        class="col"
        img-blank>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h2>Customize your information</h2>
              <p>
                The E-Enterprise Portal provides an important new means by which
                users can customize the types of information presented to them,
                find and select tools and other resources, and conduct
                transactions with EPA, Tribes, and States.
              </p>
              <p>See the video <span aria-hidden="true">&gt;&gt;</span></p>
              <router-link to="/workbench">
                <b-button
                  id="try-it-carousel-button"
                  class="btn btn-md float-right"
                  variant="primary"
                  :title="tryitTitle"
                  v-if='!authenticated'>
                  <i class="fas fa-arrow-circle-right"></i>Try It
                </b-button>
              </router-link>
            </div>
            <div class="col-md align-self-end">
              <b-embed
                type="iframe"
                aspect="16by9"
                src="https://www.youtube.com/embed/iFv0DYnW1-A?rel=0"
                allowfullscreen
                frameborder="0"/>
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
            <div class="slide-details col-md-7">
              <h2>Access Your State and EPA Accounts</h2>
              <p>
                Personalize your E-Enterprise experience by logging in with your state or EPA
                account. You'll have access to valuable content and tools like My Facility Manager,
                My Reporting, permits, and more.
                We will continue to add partners in the future.
              </p>
              <router-link
                to="/login"
                class="btn btn-md btn-outline-primary pl-1 float-right account-auth"
                ref="loginBtn"
                v-if='!authenticated'>
                <i class="fas fa-lock"></i>&nbsp;
                Login
              </router-link>
            </div>
            <div class="col-md-5">
              <img
                fluid
                id="my-reporting-img"
                src="../assets/images/my_reporting.png"
                alt="My Reporting">
              <div class="w-100 h-5"></div>
              <img
                fluid
                id="progress-tracker-img"
                src="../assets/images/progress_tracker.png"
                alt="Progress Tracker">
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
            <div class="slide-image col-md-6 align-self-start">
              <img
                class="lgc-roles"
                alt="Through our What Matters to You screen, you can select locations,
              organizations, and roles that matter to you to see relevant content,
              including local government resources."
                src="../assets/images/lgc-select-role-magnified.png">
              <img
                class="lgc-highlight"
                alt="You can see and update topics that matter to you in our Resources for Local
                  Communities widget also."
                src="../assets/images/my-topics-large.png">
            </div>
            <div class="slide-details col-md-6 align-self-end">
              <h2>Find Local Government Resources</h2>
              <p>
                The local government component will provide powerful, easy-to-use
                tools that will enable local governments to make better
                decisions, save staff time and money, and provide higher levels
                of service to community members.
              </p>
            </div>
            <p class="lgc-calltoaction">Select your location, organization, and role to find
              resources.</p>
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
        this.sliding = true;
      },
      onSlideEnd() {
        this.sliding = false;
      },
    },
    mounted() {
    },
  };
</script>


<style lang="scss">
  // @TODO - Move non scoped styles to the appropriate sass file
  @import '../styles/bootstrap-mixins-cheatsheet.scss';
  #home-carousel {

    h1, h2, h3, h4, h5, h6 {
      font-weight: 300;
    }

    p {
      // font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
      font-weight: 300;
    }

    .carousel-caption {
      position: relative;
      text-align: left;
      right: auto;
      bottom: auto;
      left: auto;
      z-index: 10;
      padding-top: 20px;
      padding-bottom: 20px;
      color: #fff;
    }
    .carousel-item {
      background-color: #575757;
      min-height: 40rem;

      & > img:first-child {
        display: none !important;
      }
    }

    .carousel-control-prev, .carousel-control-next {
      width: 2rem;
    }

    // Slide 1

    // Slide 2

    #my-reporting-img {
      max-width: 55%;
      padding-bottom: 1rem;
    }

    #progress-tracker-img {
      max-width: 62%;
      float: right;
    }
    .account-auth {
      align-self: flex-end;
    }
    @media only screen and (min-width: 576px) and (max-width: 767px) {
      #progress-tracker-img {
        max-width: 40%;
        position: absolute;
        right: 0;
        top: 8.75rem;
      }
    }

    // Slide 3
    .slide-image {
      position: relative;
      margin-bottom: 1rem;
    }
    .lgc-roles {
      width: 85%;
      max-width: 100%;
    }
    .lgc-highlight {
      border: #1c9b97 solid 7px;
      border-radius: 5px;
      width: 43%;
      position: absolute;
      right: 40px;
      top: 30px;
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
</style>
