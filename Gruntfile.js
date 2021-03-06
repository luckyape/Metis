/**
 * Created by bantonides on 11/27/13.
 */
module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'public/assets/css/app.css': 'public/assets/css/app.scss'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      html: {
        files: '**/*.html',
        options: {
          livereload: true
        }
      },
      js: {
        files: 'public/**/*.js',
        tasks: ['gjslint']
      }

    },
    gjslint: {
      options: {
        flags: [
          '--disable 220', //ignore error code 220 from gjslint
          '--max_line_length 120'//,
          //'--jslint_error all'
        ],
        reporter: {
          name: 'console'
        }
      },
      all: {
        src: ['*.js',
          'public/assets/js/app/**/*.js']
      }
    },
    // start the app, instead of typing `node app.js`
    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          ignoredFiles: ['public/**', '.sass-cache/**', '.git/**']
        }
      }
    },
    shell: {
      mongod: {
        options: {
        stdout: true
      },
        command: 'mongod'
      }
    },
    bower: {
      install: {
        // copy dependent packages from bower.json
      }
    },
    // Run blocking grunt tasks concurrently
    concurrent: {
      dev: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['bower:install', 'shell:mongod', 'watch', 'nodemon:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('default', ['concurrent:dev']);
};
