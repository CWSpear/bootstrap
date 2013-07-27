var fs = require('fs');

module.exports = function(grunt) {

  grunt.initConfig({
    ngversion: '1.1.5',
    pkg: grunt.file.readJSON('package.json'),
    dist: 'dist',
    project: 'bootstrap',
    templateRoot: 'template',
    meta: {
      banner: '(function() {',
      module: readModuleJs,
      footer: '}());'
    },

    clean: ['.tmp'],

    watch: {
      html: {
        files: ['src/**/*.html'],
        tasks: ['html2js', 'karma:watch:run']
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['karma:watch:run']
      }
    },

    concat: {
      js: {
        options: {
          banner: '<%= meta.banner + meta.module() %>',
          footer: '<%= meta.footer %>'
        },
        src: ['src/*/*.js', 'src/*/<%= framework %>/*.js', '!src/**/*.spec.js'],
        dest: '<%=dist%>/<%= project %>-<%= framework %>-<%= pkg.version %>.js'
      },
      html: {
        options: {
          banner: '<%= meta.banner %>',
          footer: '<%= meta.footer %>'
        },
        src: ['.tmp/**/*.html.js'],
        dest: '<%=dist%>/<%= project %>-<%= framework %>-<%= pkg.version %>-html.js'
      },
      bundle: {
        options: {
          banner: '<%= meta.banner %>',
          footer: '<%= meta.footer %>'
        },
        src: ['<%= concat.js.dest %>', '<%= concat.html.dest %>'],
        dest: '<%=dist%>/<%= project %>-<%= framework %>-<%= pkg.version%>-bundle.js'
      }
    },

    copy: {
    },

    uglify: {
    },

    html2js: {
      dist: {
        options: {
          module: null,
          base: 'src',
          rename: html2jsTemplateRename,
        },
        //Put compiled .html.js files in .tmp (will be picked up for concat,
        //and karma will also read from there)
        files: [{
          expand: true,
          src: ['*/<%= framework %>/*.html'],
          dest: '.tmp/',
          cwd: 'src/',
          ext: '.html.js'
        }]
      }
    },

    jshint: {
      files: ['Gruntfile.js','src/**/*.js'],
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globals: {
          angular: true
        }
      }
    },

    karma: {
      options: {
        configFile: 'config/karma.conf.js'
      },
      watch: {
        background: true
      },
      continuous: {
        singleRun: true
      },
      travis: {
        reporters: ['dots'] //dots look better on travis
      }
    },

    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    },

    ngdocs: {
      options: {
        dest: 'dist/docs',
        scripts: [
          'angular.js',
          '<%= concat.dist.dest %>',
        ],
        styles: [
          'docs/css/style.css'
        ],
        navTemplate: [
          'docs/nav.html'
        ],
        title: '<%= pkg.name %>',
        html5Mode: false
      },
      api: {
        src: ['src/**/*.js', 'src/**/*.ngdoc'],
        title: 'API Documentation'
      }
    }
  });

  grunt.registerTask('build', function(framework) {
    grunt.config('framework', framework);
    grunt.task.run(['clean', 'html2js', 'concat']);
  });

  grunt.registerTask('dev', ['html2js', 'karma:watch', 'watch']);

  fs.readdirSync('./node_modules').forEach(function(file) {
    if (file.match(/^grunt-/)) { grunt.loadNpmTasks(file); }
  });
  grunt.loadTasks('config/grunt');

  function html2jsTemplateRename(path) {
    //eg tabs/bootstrap/tabset.html is spit out as template/tabs/tabset.html
    return grunt.config('templateRoot') + '/' + 
      path.replace('/' + grunt.config('framework'), '');
  }

  function readModuleJs() { 
    return grunt.template.process(grunt.file.read('build/module.js'));
  }
};


