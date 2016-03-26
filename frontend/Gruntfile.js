/* globals module, require */

module.exports = function(grunt) {
    'use strict';

    // To add new components add to the "browserify" section below. Subsequent
    // tasks will be applied to all files that have been processed by that
    // tasks.

    // Uncomment this to see how long each task takes.
    //require('time-grunt')(grunt);

    // This will dynamically load modules, so you don't have to manually do
    // so.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Some path settings to make things easier to reference later.
        settings: {
            appScriptPath: 'scripts',
            appStylePath: 'styles',
            backendAppPath: '../backend',
            distLibPath: 'dist/libs',
            distScriptPath: 'dist/scripts',
            distStylePath: 'dist/styles'
        },

        // Note: Tried to keep these in roughly the order they're called.

        // Cleans a directory. By default it will only work on this directory
        // and below, if you want to do something outside of the current
        // structure there should be an option to force it.
        clean: {
            common: [
                '<%= settings.distLibPath %>'
            ],
            scripts: [
                '<%= settings.distScriptPath %>'
            ],
            styles: [
                '<%= settings.distStylePath %>'
            ]
        },

        // Handles "require" statements, as well as babelify.
        browserify: {
            // Builds all non-application files, this way you can run this
            // in a "watch" task where it will take the most time up front
            // and any subsequent build of just application code will
            // be much quicker.
            common: {
                src: ['.'],
                dest: '<%= settings.distLibPath %>/gen/common.js',
                options: {
                    debug: false,
                    alias: [
                        'jquery',
                        'react',
                        'react-dom',
                        'react-redux',
                        'redux-thunk',
                        'redux',
                        'spin'
                    ]
                }
            },
            build: {
                options: {
                    //transform: browserifyTransform,
                    transform: [
                        [ // Converts react jsx to normal js
                            'babelify',
                            {
                                presets: [
                                    'es2015',
                                    'react'
                                ]
                            }
                        ]
                    ],
                    // Should match the "common" task above.
                    external: [
                        'jquery',
                        'react',
                        'react-dom',
                        'react-redux',
                        'redux-thunk',
                        'redux',
                        'spin'
                    ],
                    browserifyOptions: {
                        '--fast': true
                    }
                },
                // Add new components here.
                files: [
                    {
                        src: '<%= settings.appScriptPath %>/todo/**/*.js',
                        dest: '<%= settings.distScriptPath %>/gen/todo.js'
                    }
                ]
            },
            deploy: {
                options: {
                    transform: '<%= browserify.build.options.transform %>',
                    external: '<%= browserify.build.options.external %>'
                },
                files: '<%= browserify.build.files %>'
            }
        },

        // Merges/minifies javascript
        // Assumes babel task has already been run.
        // Again the common files should be handled separately to speed this up.
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                preserveComments: false,
                wrap: true,
                sourceMap: true
            },
            common: {
                expand: true,
                flatten: true,
                src: '<%= settings.distLibPath %>/gen/*.js',
                dest: '<%= settings.distLibPath %>/gen/',
                ext: '.min.js'
            },
            build: {
                expand: true,
                flatten: true,
                src: '<%= settings.distScriptPath %>/gen/*.js',
                dest: '<%= settings.distScriptPath %>/gen/',
                ext: '.min.js'
            }
        },

        // Generates less files here.
        // This project does not use less, here for examle purposes only.
        less: {
            // For each .less file create a similarly named .css file.
            // TODO - separated these under the assumption that deploy might
            // want to further process them, but that's not in place yet.
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                expand: true,
                flatten: true,
                src: '<%= settings.appStylePath %>/*.less',
                dest: '<%= settings.distStylePath %>/css/',
                ext: '.css'
            },
            deploy: { // TODO - less-plugin-autoprefix or less-plugin-clean-css?
                expand: true,
                flatten: true,
                src: '<%= settings.appStylePath %>/*.less',
                dest: '<%= settings.distStylePath %>/css/',
                ext: '.css'
            }
        },

        // Copies files to backend static directory.
        copy: {
            // Copy everything to make debugging easier in dev.
            develop: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            '<%= settings.distScriptPath %>/gen/*',
                            '<%= settings.distLibPath %>/gen/*'
                        ],
                        dest: '<%= settings.backendAppPath %>/static/js/'
                    }
                ]
            },
            // Only the min.js file for deploy.
            deploy: {
                files: [
                    {
                        // Map files don't work unless original is there, too,
                        // So don't bother with them when delpoying.
                        expand: true,
                        flatten: true,
                        src: [
                            '<%= settings.distScriptPath %>/gen/*min.js',
                            '<%= settings.distLibPath %>/gen/*min.js'
                        ],
                        dest: '<%= settings.backendAppPath %>/static/js/'
                    }
                ]
            },
            styles: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= settings.distStylePath %>/css/*.css',
                        dest: '<%= settings.backendAppPath %>/static/css/'
                    }
                ]
            }
        },

        // Watches for changes, if found runs the task.
        //
        // For Javascript you probably don't want to just run
        // this (as "grunt watch") because the javascript part does
        // preprocessing before the watch. Run "grunt watchJs" instead.
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: '<%= settings.appScriptPath %>/**/*.js',
                tasks: [
                    'clean:scripts',
                    'browserify:build',
                    'uglify:build',
                    'less:build',
                    'copy:develop'
                ]
            },
            styles: {
                files: '<%= settings.appStylePath %>/**/*.less',
                tasks: [
                    'clean:styles',
                    'less:build',
                    'copy:styles'
                ]
            }
        },

        // Using this instead of jslint/jshint because it has a react plugin.
        // Check .eslintrc.json for settings.
        eslint: {
            target: [
                'Gruntfile.js',
                '<%= settings.appScriptPath %>/**/*js'
            ]
        }

    });

    // Run when you use just "grunt"
    grunt.registerTask('default', [
        'clean',
        'browserify:common',
        'browserify:build',
        'uglify',
        'less:build',
        'copy:develop',
        'copy:styles'
    ]);

    // Build files in the "dist" directory, but do not copy them to the
    // backend directory. Useful to see the results of the build.
    grunt.registerTask('build', [
        'clean',
        'browserify:common',
        'browserify:deploy',
        'uglify',
        'less:deploy'
    ]);

    // Run the build process and copy the restuls to the backend section.
    grunt.registerTask('deploy', [
        'clean',
        'browserify:common',
        'browserify:deploy',
        'uglify',
        'less:deploy',
        'copy:deploy',
        'copy:styles'
    ]);

    // As currently setup you can't watch both scripts and styles at once.
    // That is a specific design decision to ensure that each task is as quick
    // as possible.
    //
    // Bundle all "common" files initially, and then watch for changes in the
    // local application.
    grunt.registerTask('watchJs', [
        'clean:common',
        'browserify:common',
        'uglify:common',
        'watch:scripts'
    ]);
    // Watch just for style changes.
    grunt.registerTask('watchLess', ['watch:styles']);

    // Lint the project files.
    grunt.registerTask('lint', ['eslint']);
};
