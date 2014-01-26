module.exports = function(grunt) {
  grunt.initConfig({
    jsvalidate: {
      options: {
        globals: {},
        esprimaOptions: {},
        verbose: false
      },
      all: {
        files: {
          src: ['<%=jshint.all%>']
        }
      }
    },
    jshint: {
      options: {
        node: true,
        globalstrict: true
      },
      all: ['tasks/**/*.js']
    }
  });
  
  grunt.loadNpmTasks('grunt-jsvalidate');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};