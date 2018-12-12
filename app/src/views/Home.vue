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
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
              class="col"
              img-blank>
        <div class="container">
          <div class="row col-md-12">
            <div class="slide-details col-md-6 align-self-end">
              <h2>Access Your State and EPA Accounts</h2>

              <p>
                Personalize your E-Enterprise experience by logging in with your state or EPA account.
                You'll have access to valuable content and tools like My Facility Manager, My Reporting, permits, and
                more.
                We will continue to add partners in the future.
              </p>
              <router-link
                      to="/login"
                      class="btn btn-md btn-outline-primary pl-1 float-right account-auth"
                      ref="loginBtn">
                <i class="fas fa-lock"></i>&nbsp;
                Login
              </router-link>
            </div>
            <div class="col-md-6">
              <img id="my-reporting-img" src="../assets/images/my_reporting.png" alt="My Reporting">
              <img id="progress-tracker-img" src="../assets/images/progress_tracker.png" alt="Progress Tracker">
            </div>
          </div>
        </div>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide
        class="col"
        img-blank>
        <div class="container">
          <h2>What's Included</h2>
          <div class="row">
            <ul class="including_items col-md-6">
              <li>
                <img
                  alt=""
                  src="../assets/images/environment.png">
                <div><h5>Environmental Reporting</h5>
                  <p>New ways to submit information.</p>
                </div>
              </li>
              <li>
                <img
                  alt=""
                  src="../assets/images/settings.png">
                <div><h5>Developer Community (Future)</h5>
                  <p>New ways to submit information.</p>
                </div>
              </li>
            </ul>
            <ul class="including_items col-md-6">
              <li>
                <img
                  alt=""
                  src="../assets/images/workbench.png">
                <div>
                  <h5>Workbench</h5>
                  <p>Tools, data, and resources to help you.</p>
                </div>
              </li>
              <li>
                <img
                  alt=""
                  src="../assets/images/headline.png">
                <div><h5>Maps &amp; Dashboard</h5>
                  <p>Learn more about the environment thru maps and data mashups.</p>
                </div>
              </li>
            </ul>
          </div>
          <p class="learn-more">…<a href="/about">and more</a></p>
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
            <p class="lgc-calltoaction">Select your location, organization, and role
              to find resources.</p>
          </div>
        </div>

      </b-carousel-slide>

    </b-carousel>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'Home',
    components: {},
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

  //Slide

  1

    #my-reporting-img {
      width: 55%;
      height: 62%;
    }

    #progress-tracker-img {
      width: 62%;
      height: 35%;
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: 7%;
    }

    // Slide 2
    .including_items {
      padding: 0;

      img {
        width: 2rem;
        height: 2rem;
        vertical-align: top;
      }
      li {
        list-style: none;

        &:not(:last-child) {
          margin-bottom: 1rem;
        }

        & > div {
          width: 80%;
          display: inline-block;
          margin-left: 5%;
        }
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

  .login-btn-wrapper{
    padding-left: 40%;
  }
</style>
