/**
 * Created by smolinsk on 7/18/2016.
 */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapName: function(dest){
          return dest.replace(/(\/js\/*)/, "/js/src/").replace(/(\.[^\/\.]*)?$/, ".js.map");
        }
      },
      theme: {
        files: [{
          expand: true,
          src: ['**/*.js', '!*min.js'],
          cwd:  '<%= pkg.path.theme %>js/src',
          dest:  '<%= pkg.path.theme %>js'
        }],
      },
      /*add_map_set: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>add_map_set/js/src',
          dest:  '<%= pkg.path.modules %>add_map_set/js'
        }]
      },*/
      agency_map_list: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>agency_map_list/js/src',
          dest:  '<%= pkg.path.modules %>agency_map_list/js',
        }]
      },
      cdx_facility_management: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>cdx_facility_management/js/src',
          dest:  '<%= pkg.path.modules %>cdx_facility_management/js'
        }]
      },
      eenterprise_api: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>eenterprise_api/js/src',
          dest:  '<%= pkg.path.modules %>eenterprise_api/js'
        }]
      },
      favorite_links: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>favorite_links/js/src',
          dest:  '<%= pkg.path.modules %>favorite_links/js'
        }]
      },
      my_air_quality_chart_view: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>features/my_air_quality_chart_view/js/src',
          dest:  '<%= pkg.path.modules %>features/my_air_quality_chart_view/js'
        }]
      },
      environment_mapper: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>environment_mapper/js/src',
          dest:  '<%= pkg.path.modules %>environment_mapper/js'
        }]
      },
      my_maps_view: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>features/my_maps_view/js/src',
          dest:  '<%= pkg.path.modules %>features/my_maps_view/js'
        }]
      },
      suggestion_box: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>features/suggestion_box/js/src',
          dest:  '<%= pkg.path.modules %>features/suggestion_box/js'
        }]
      },
      village_green_block: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>features/village_green_block/js/src',
          dest:  '<%= pkg.path.modules %>features/village_green_block/js'
        }]
      },
      frs_location_services: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>frs_location_services/js/src',
          dest:  '<%= pkg.path.modules %>frs_location_services/js'
        }]
      },
      other_items_of_interest: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd:  '<%= pkg.path.modules %>other_items_of_interest/js/src',
          dest:  '<%= pkg.path.modules %>other_items_of_interest/js'
        }]
      },
      recommended_resources: {
        files: [
          {
            expand: true,
            src: ['**/*.js', '!*min.js'],
            dest:  '<%= pkg.path.modules %>recommended_resources/js',
            cwd:  '<%= pkg.path.modules %>recommended_resources/js/src'
          }
        ]
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        sourceMap: true
      },
      theme: {
        files: [{
          expand: true,
          src: ['**/*.css', '!*min.css'],
          cwd:  '<%= pkg.path.theme %>css/src',
          dest:  '<%= pkg.path.theme %>css'
        }]
      },
      add_map_set: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd:  '<%= pkg.path.modules %>add_map_set/css/src',
          dest:  '<%= pkg.path.modules %>add_map_set/css'
        }]
      },
      agency_map_list: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd:  '<%= pkg.path.modules %>agency_map_list/css/src',
          dest:  '<%= pkg.path.modules %>agency_map_list/css'
        }]
      },
      cdx_facility_management: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd:  '<%= pkg.path.modules %>cdx_facility_management/css/src',
          dest:  '<%= pkg.path.modules %>cdx_facility_management/css'
        },{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd:  '<%= pkg.path.modules %>cdx_facility_management/css/jquery_fancybox/src',
          dest:  '<%= pkg.path.modules %>cdx_facility_management/css/jquery_fancybox'
        }]
      },
      /*eenterprise_api: {
       files: [{
       expand: true,
       src: ['*.css', '!*.min.css'],
       cwd:  '<%= pkg.path.modules %>eenterprise_api/css/src',
       dest:  '<%= pkg.path.modules %>eenterprise_api/css',
       ext: '.css'
       }]
       },*/
      /*favorite_links: {
       files: [{
       expand: true,
       src: ['*.css', '!*.min.css'],
       cwd:  '<%= pkg.path.modules %>favorite_links/css/src',
       dest:  '<%= pkg.path.modules %>favorite_links/css',
       ext: '.css'
       }]
       },*/
      my_air_quality_chart_view: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd:  '<%= pkg.path.modules %>features/my_air_quality_chart_view/css/src',
          dest:  '<%= pkg.path.modules %>features/my_air_quality_chart_view/css'
        }]
      },
      environment_mapper: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd:  '<%= pkg.path.modules %>environment_mapper/css/src',
          dest:  '<%= pkg.path.modules %>environment_mapper/css'
        }]
      },
      my_maps_view: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd:  '<%= pkg.path.modules %>features/my_maps_view/css/src',
          dest:  '<%= pkg.path.modules %>features/my_maps_view/css'
        }]
      },
      suggestion_box: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd:  '<%= pkg.path.modules %>features/suggestion_box/css/src',
          dest:  '<%= pkg.path.modules %>features/suggestion_box/css'
        }]
      },
      village_green_block: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd:  '<%= pkg.path.modules %>features/village_green_block/css/src',
          dest:  '<%= pkg.path.modules %>features/village_green_block/css'
        }]
      },
      frs_location_services: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd:  '<%= pkg.path.modules %>frs_location_services/css/src',
          dest:  '<%= pkg.path.modules %>frs_location_services/css'
        }]
      },
      other_items_of_interest: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd:  '<%= pkg.path.modules %>other_items_of_interest/css/src',
          dest:  '<%= pkg.path.modules %>other_items_of_interest/css'
        }]
      },
      recommended_resources: {
        files: [
          {
            expand: true,
            src: ['**/*.css', '!*min.css'],
            dest:  '<%= pkg.path.modules %>recommended_resources/css',
            cwd:  '<%= pkg.path.modules %>recommended_resources/css/src',
            ext: '.css'
          }
        ]
      }
    },
    watch: {
      theme: {
        files: ['<%= pkg.path.theme %>js/src/*.js'],
        tasks: ['uglify:theme']
      },
      /*add_map_set: {
       files: ['<%= pkg.path.modules %>add_map_set/js/src/*.js'],
       tasks: ['uglify:add_map_set']
       },*/
      agency_map_list: {
        files: ['<%= pkg.path.modules %>agency_map_list/js/src/*.js'],
        tasks: ['uglify:agency_map_list']
      },
      cdx_facility_management: {
        files: ['<%= pkg.path.modules %>cdx_facility_management/js/src/*.js'],
        tasks: ['uglify:cdx_facility_management']
      },
      eenterprise_api: {
        files: ['<%= pkg.path.modules %>eenterprise_api/js/src/*.js'],
        tasks: ['uglify:eenterprise_api']
      },
      favorite_links: {
        files: ['<%= pkg.path.modules %>favorite_links/js/src/*.js'],
        tasks: ['uglify:favorite_links']
      },
      my_air_quality_chart_view: {
        files: ['<%= pkg.path.modules %>my_air_quality_chart_view/js/src/*.js'],
        tasks: ['uglify:my_air_quality_chart_view']
      },
      environment_mapper: {
        files: ['<%= pkg.path.modules %>environment_mapper/js/src/*.js'],
        tasks: ['uglify:environment_mapper']
      },
      my_maps_view: {
        files: ['<%= pkg.path.modules %>my_maps_view/js/src/*.js'],
        tasks: ['uglify:my_maps_view']
      },
      suggestion_box: {
        files: ['<%= pkg.path.modules %>suggestion_box/js/src/*.js'],
        tasks: ['uglify:suggestion_box']
      },
      village_green_block: {
        files: ['<%= pkg.path.modules %>village_green_block/js/src/*.js'],
        tasks: ['uglify:village_green_block']
      },
      frs_location_services: {
        files: ['<%= pkg.path.modules %>frs_location_services/js/src/*.js'],
        tasks: ['uglify:frs_location_services']
      },
      other_items_of_interest: {
        files: ['<%= pkg.path.modules %>other_items_of_interest/js/src/*.js'],
        tasks: ['uglify:other_items_of_interest']
      },
      recommended_resources: {
        files: ['<%= pkg.path.modules %>recommended_resources/js/src/*.js'],
        tasks: ['uglify:recommended_resources']
      }
    }
    /*imagemin: {
      dist: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['**!/!*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    }*/
  });

  // Load the plugin that provides the task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'uglify']);
  grunt.registerTask('theme', ['cssmin:theme', 'uglify:theme']);
  grunt.registerTask('add_map_set', ['cssmin:add_map_set']);
  grunt.registerTask('agency_map_list', ['cssmin:agency_map_list', 'uglify:agency_map_list']);
  grunt.registerTask('cdx_facility_management', ['cssmin:cdx_facility_management', 'uglify:cdx_facility_management']);
  grunt.registerTask('eenterprise_api', ['uglify:eenterprise_api']);
  grunt.registerTask('favorite_links', ['uglify:favorite_links']);
  grunt.registerTask('my_air_quality_chart_view', ['cssmin:my_air_quality_chart_view', 'uglify:my_air_quality_chart_view']);
  grunt.registerTask('environment_mapper', ['cssmin:environment_mapper', 'uglify:environment_mapper']);
  grunt.registerTask('my_maps_view', ['cssmin:my_maps_view', 'uglify:my_maps_view']);
  grunt.registerTask('suggestion_box', ['cssmin:suggestion_box', 'uglify:suggestion_box']);
  grunt.registerTask('village_green_block', ['cssmin:village_green_block', 'uglify:village_green_block']);
  grunt.registerTask('frs_location_services', ['cssmin:frs_location_services', 'uglify:frs_location_services']);
  grunt.registerTask('other_items_of_interest', ['cssmin:other_items_of_interest', 'uglify:other_items_of_interest']);
  grunt.registerTask('recommended_resources', ['cssmin:recommended_resources', 'uglify:recommended_resources']);
  grunt.registerTask('other_items_of_interest', ['cssmin:other_items_of_interest', 'uglify:other_items_of_interest']);
  grunt.registerTask('recommended_resources', ['cssmin:recommended_resources', 'uglify:recommended_resources']);
};