module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * Carpet.js v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' */\n',

    clean: {
      docs  : ['_docs'],
      dist  : ['dist']
    },

    jshint: {

      carpet: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'src/*.js'
        ]
      },
      components: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'src/components/*.js'
        ]
      },
      tests: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'tests/spec/*.js'
        ]
      }

    },

    jasmine: {
      pivotal: {
        src: ['src/carpet.js', 'src/components/*'],
        options: {
          specs: ['tests/spec/*.js', 'tests/spec/components/*.js']
        }
      }
    },

    jsdoc : {
      carpet : {
        src: ['src/*.js', 'src/components/*.js', 'README.md'],
        options: {
          destination: '_docs/'
        }
      }
    },


    jscs: {
      options: {
        config: 'src/.jscsrc'
      },
      src: {
        src: '<%= jshint.carpet.src %>'
      },
      tests: {
        src: '<%= jshint.tests.src %>'
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      carpet: {
        src: [
          'src/carpet.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        preserveComments: false,
        banner: '<%= banner %>'
      },
      carpet: {
        src: '<%= concat.carpet.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      components: {
        expand: true,
        cwd: 'src/components/',
        src: '*.js',
        dest: 'dist/components'
      }
    }

  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  /**
   * Register available tasks
   */
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('dist', ['clean:dist', 'jshint', 'jscs', 'concat', 'uglify']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('dist-dev', ['clean:dist', 'concat', 'uglify']);
  grunt.registerTask('docs', ['clean:docs', 'jsdoc']);
};
