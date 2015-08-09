// Generated on 2015-05-13 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-exec');

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  var config = {
    app: 'app',
    temp: 'temp',
    dist: 'dist',
    tmp: 'buildTmp',
    resources: 'resources'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

     // Project settings
    yeoman: appConfig,

    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:copy:app', 'newer:jshint:all --force'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/app/lib',
                connect.static('./app/lib')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/app/lib',
                connect.static('./app/lib')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },
    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
      },
      // Environment targets
      dev: {
        options: {
          dest: '<%= yeoman.app %>/scripts/config.js'
        },
        constants:{
          ENV: grunt.file.readJSON('app/scripts/conf/dev.json')
        }
      },
      prod: {
        options: {
          dest: '<%= config.temp %>/scripts/config.js'
        },
        constants: {
          ENV: grunt.file.readJSON('app/scripts/conf/prod.json')
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      temp: {
        files: [{
          dot: true,
          src: [
            '<%= config.temp %>'
          ]
        }]
      },
      postTemp: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.app %>/styles',
            '<%= config.temp %>/styles/{,*/}*.{css, css.map}',
            '<%= config.temp %>/styles/*',
            '!<%= config.temp %>/styles/main.css',
            '<%= config.temp %>/sass',
            '<%= config.temp %>/scripts/*',            
            '!<%= config.temp %>/scripts/app.js',      
            '!<%= config.temp %>/scripts/i18n',
            '<%= config.tmp %>/*'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*',
            '<%= yeoman.app %>/{,*/}*.{css,css.map}',
            '<%= config.temp %>/*'
          ]
        }]
      },
      postDist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.app %>/{,*/}*.{css, css.map}',
            '<%= config.temp %>'
          ]
        }]
      },
      server: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.app %>/scripts/config.js',
            '<%= yeoman.app %>/styles/{,*/}*.{css,css.map}'
          ]
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}app\/lib\//
      }
    },
    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                '<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/sass/main.scss'
            }
        }
    },
    

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= config.temp %>/',
        flow: {
          html: {
            steps: {
              js: ['concat'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= config.temp %>/{,*/}*.html'],
      css: ['<%= config.temp %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= config.temp %>/',
          '<%= config.temp %>/images',
          '<%= config.temp %>/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    cssmin: {
      dist: {
        files: {
          '<%= config.temp %>/styles/main.css': [
            '<%= config.temp %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    uglify: {
          options: {
              mangle: false
          },
        dist: {
          files: {
            '<%= config.temp %>/scripts/app.js': [
              '<%= config.temp %>/scripts/{,*/}*.js'
            ]
          }
        }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: '<%= config.temp %>/scripts/{,*/}*.js',
        dest: '<%= config.temp %>/scripts/app.js'
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.temp %>',
          src: ['*.html', '{,*/}*.html'],
          dest: '<%= config.temp %>/'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      temp: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.temp %>/',
          src: '**'
        }]
      },
      dist: {
         files: [{
          expand: true,
          cwd: '<%= config.temp %>',
          dest: '<%= config.dist %>',
          src: '**'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
      ],
      test: [
      ],
      dist: [
        /*,
        'imagemin',
        'svgmin'*/
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'ngconstant:dev', 
      'wiredep',
      'sass:dist',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'sass:dist',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('styles', [
    'sass:dist'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'clean:temp',
    'wiredep',
    'useminPrepare',
    'sass:dist',
    'autoprefixer:dist',
    'copy:temp',
    'ngconstant:prod', 
    'cssmin:dist',
    'uglify:dist',
    'usemin',
    //'htmlmin:dist',
    'clean:postTemp',
    'copy:dist',
    'clean:postDist'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
   
  grunt.registerTask('check', [
    'jshint'
  ]);

};
