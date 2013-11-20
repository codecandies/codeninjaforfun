module.exports = function(grunt) {



	// configuration
	grunt.initConfig({

		// read from package.json
		pkg: grunt.file.readJSON('package.json'),

		//concat files
		concat: {
			js: {
				src: ['bower_components/jquery/jquery.min.js', 'src/javascript/**/*.js'],
				dest: 'dist/<%= pkg.name %>-<%= pkg.version%>.js'
			}
		},

		uglify: {
			options: {
				mangle: {
					except: ['jQuery']
				}
			},
			default: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
				}
			}
		},

		// project wide javascript hinting rules
		jshint: {
			options: {
				browser: true, // set browser enviroment
				curly: true, // require curly braces around control structure
				eqeqeq: true, // prohibits the use of == and != in favor of === and !==
				forin: true, // requires all for in loops to filter object's items
				indent: 4, // tabsize should be 4 spaces
				jquery: true, // set jquery globals
				latedef: true, // never use vars before they are defined
				loopfunc: true, // no warnings about functions in loops
				trailing: true // makes it an error to leave a trailing whitespace
			},
			target: {
				src : ['src/javascript/**/*.js']
			}
		},
		watch: {
			js: {
				files: ['<%= jshint.target.src %>'],
				tasks: ['jshint','concat'],
			}
		}
	});


	// load node modules
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// register tasks here
	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
