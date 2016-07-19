/**
 * Created by smolinsk on 7/18/2016.
 */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('../package.json'),
    uglify: {
      options: {
        sourceMap: true,
      },
      theme: {
        files: [{
          expand: true,
          src: ['**/*.js', '!*min.js'],
          cwd: 'sites/all/themes/eenterprise/js/src',
          dest: 'sites/all/themes/eenterprise/js'
        }],
      },
      /*add_map_set: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/add_map_set/js/src',
          dest: 'sites/all/modules/custom/add_map_set/js',
          ext: '.js'
        }]
      },*/
      agency_map_list: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/agency_map_list/js/src',
          dest: 'sites/all/modules/custom/agency_map_list/js',
          ext: '.js'
        }]
      },
      cdx_facility_management: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/cdx_facility_management/js/src',
          dest: 'sites/all/modules/custom/cdx_facility_management/js',
          ext: '.js'
        }]
      },
      eenterprise_api: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/eenterprise_api/js/src',
          dest: 'sites/all/modules/custom/eenterprise_api/js',
          ext: '.js'
        }]
      },
      favorite_links: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/favorite_links/js/src',
          dest: 'sites/all/modules/custom/favorite_links/js',
          ext: '.js'
        }]
      },
      my_air_quality_chart_view: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/features/my_air_quality_chart_view/js/src',
          dest: 'sites/all/modules/custom/features/my_air_quality_chart_view/js',
          ext: '.js'
        }]
      },
      my_environment_mapper: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/features/my_environment_mapper/js/src',
          dest: 'sites/all/modules/custom/features/my_environment_mapper/js',
          ext: '.js'
        }]
      },
      my_maps_view: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/features/my_maps_view/js/src',
          dest: 'sites/all/modules/custom/features/my_maps_view/js',
          ext: '.js'
        }]
      },
      suggestion_box: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/features/suggestion_box/js/src',
          dest: 'sites/all/modules/custom/features/suggestion_box/js',
          ext: '.js'
        }]
      },
      village_green_block: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/features/village_green_block/js/src',
          dest: 'sites/all/modules/custom/features/village_green_block/js',
          ext: '.js'
        }]
      },
      frs_location_services: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/frs_location_services/js/src',
          dest: 'sites/all/modules/custom/frs_location_services/js',
          ext: '.js'
        }]
      },
      other_items_of_interest: {
        files: [{
          expand: true,
          src: ['*.js', '!*.min.js'],
          cwd: 'sites/all/modules/custom/other_items_of_interest/js/src',
          dest: 'sites/all/modules/custom/other_items_of_interest/js',
          ext: '.js'
        }]
      },
      recommended_resources: {
        files: [
          {
            expand: true,
            src: ['**/*.js', '!*min.js'],
            dest: 'sites/all/modules/custom/recommended_resources/js',
            cwd: 'sites/all/modules/custom/recommended_resources/js/src',
            ext: '.css'
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
          cwd: 'sites/all/themes/eenterprise/css/src',
          dest: 'sites/all/themes/eenterprise/css'
        }]
      },
      add_map_set: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'sites/all/modules/custom/add_map_set/css/src',
          dest: 'sites/all/modules/custom/add_map_set/css',
          ext: '.css'
        }]
      },
      agency_map_list: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'sites/all/modules/custom/agency_map_list/css/src',
          dest: 'sites/all/modules/custom/agency_map_list/css',
          ext: '.css'
        }]
      },
      cdx_facility_management: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'sites/all/modules/custom/cdx_facility_management/css/src',
          dest: 'sites/all/modules/custom/cdx_facility_management/css',
          ext: '.css'
        },{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'sites/all/modules/custom/cdx_facility_management/css/jquery_fancybox/src',
          dest: 'sites/all/modules/custom/cdx_facility_management/css/jquery_fancybox',
          ext: '.css'
        }]
      },
      /*eenterprise_api: {
       files: [{
       expand: true,
       src: ['*.css', '!*.min.css'],
       cwd: 'sites/all/modules/custom/eenterprise_api/css/src',
       dest: 'sites/all/modules/custom/eenterprise_api/css',
       ext: '.css'
       }]
       },*/
      /*favorite_links: {
       files: [{
       expand: true,
       src: ['*.css', '!*.min.css'],
       cwd: 'sites/all/modules/custom/favorite_links/css/src',
       dest: 'sites/all/modules/custom/favorite_links/css',
       ext: '.css'
       }]
       },*/
      my_air_quality_chart_view: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'sites/all/modules/custom/features/my_air_quality_chart_view/css/src',
          dest: 'sites/all/modules/custom/features/my_air_quality_chart_view/css',
          ext: '.css'
        }]
      },
      my_environment_mapper: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'sites/all/modules/custom/features/my_environment_mapper/css/src',
          dest: 'sites/all/modules/custom/features/my_environment_mapper/css',
          ext: '.css'
        }]
      },
      my_maps_view: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'sites/all/modules/custom/features/my_maps_view/css/src',
          dest: 'sites/all/modules/custom/features/my_maps_view/css',
          ext: '.css'
        }]
      },
      suggestion_box: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'sites/all/modules/custom/features/suggestion_box/css/src',
          dest: 'sites/all/modules/custom/features/suggestion_box/css',
          ext: '.css'
        }]
      },
      village_green_block: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'sites/all/modules/custom/features/village_green_block/css/src',
          dest: 'sites/all/modules/custom/features/village_green_block/css',
          ext: '.css'
        }]
      },
      frs_location_services: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'sites/all/modules/custom/frs_location_services/css/src',
          dest: 'sites/all/modules/custom/frs_location_services/css',
          ext: '.css'
        }]
      },
      other_items_of_interest: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'sites/all/modules/custom/other_items_of_interest/css/src',
          dest: 'sites/all/modules/custom/other_items_of_interest/css',
          ext: '.css'
        }]
      },
      recommended_resources: {
        files: [
          {
            expand: true,
            src: ['**/*.css', '!*min.css'],
            dest: 'sites/all/modules/custom/recommended_resources/css',
            cwd: 'sites/all/modules/custom/recommended_resources/css/src',
            ext: '.css'
          }
        ]
      }
    },
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

  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'uglify']);
  grunt.registerTask('theme', ['cssmin:theme', 'uglify:theme']);
  grunt.registerTask('add_map_set', ['cssmin:add_map_set']);
  grunt.registerTask('agency_map_list', ['cssmin:agency_map_list', 'uglify:agency_map_list']);
  grunt.registerTask('cdx_facility_management', ['cssmin:cdx_facility_management', 'uglify:cdx_facility_management']);
  grunt.registerTask('eenterprise_api', ['uglify:eenterprise_api']);
  grunt.registerTask('favorite_links', ['uglify:favorite_links']);
  grunt.registerTask('my_air_quality_chart_view', ['cssmin:my_air_quality_chart_view', 'uglify:my_air_quality_chart_view']);
  grunt.registerTask('my_environment_mapper', ['cssmin:my_environment_mapper', 'uglify:my_environment_mapper']);
  grunt.registerTask('my_maps_view', ['cssmin:my_maps_view', 'uglify:my_maps_view']);
  grunt.registerTask('suggestion_box', ['cssmin:suggestion_box', 'uglify:suggestion_box']);
  grunt.registerTask('village_green_block', ['cssmin:village_green_block', 'uglify:village_green_block']);
  grunt.registerTask('frs_location_services', ['cssmin:frs_location_services', 'uglify:frs_location_services']);
  grunt.registerTask('other_items_of_interest', ['cssmin:other_items_of_interest', 'uglify:other_items_of_interest']);
  grunt.registerTask('recommended_resources', ['cssmin:recommended_resources', 'uglify:recommended_resources']);
  grunt.registerTask('other_items_of_interest', ['cssmin:other_items_of_interest', 'uglify:other_items_of_interest']);
  grunt.registerTask('recommended_resources', ['cssmin:recommended_resources', 'uglify:recommended_resources']);

};