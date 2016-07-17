module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      test: ['tmp']
    },
    image: {
      static: {
        options: {},
        files: {
          'tmp/test.png': 'test/fixtures/test.png',
          'tmp/test.jpg': 'test/fixtures/test.jpg',
          'tmp/test.gif': 'test/fixtures/test.gif',
          'tmp/test.svg': 'test/fixtures/test.svg'
        }
      }
    },
    nodeunit: {
      tests: ['test/test.js']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('mkdir', grunt.file.mkdir);
  grunt.registerTask('test', [
    'clean',
    'mkdir:tmp',
    'image',
    'nodeunit',
    'clean'
  ]);
};
