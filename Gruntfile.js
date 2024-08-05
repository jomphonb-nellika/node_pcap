module.exports = function(grunt) {
    var src = ["*.js", "decode/**/*.js"];
    var tests = ["spec/**/*.js"];
    var supportingFiles = ["Gruntfile.js"];
    var allJs = tests.concat(src);
    grunt.initConfig({
        eslint: {
            target: "*.js"
        },
        mochaTest: {
            test: {
                src: allJs,
            }
        },
        mocha_istanbul: {
            coverage: {
                src: allJs,
                options: {
                    reportFormats: ["text", "html", "lcov"],
                    excludes: tests.concat(supportingFiles)
                }
            }
        },
        coveralls: {
            options: {
                force: true
            },
            src: {
                src: "coverage/lcov.info"
            }
        },
    });

    grunt.loadNpmTasks("grunt-coveralls");
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-mocha-istanbul");

    //The travis ci build
    grunt.registerTask("travis", ["eslint", "mocha_istanbul:coverage", "coveralls:src"]);

    //Check code coverage with grunt cover
    grunt.registerTask("cover", ["mocha_istanbul:coverage"]);

    //Just run grunt for day to day work
    grunt.registerTask("default", ["eslint", "mochaTest:test"]);
};
