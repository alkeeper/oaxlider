module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
 
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					$: true,
					console: true
				}
			},
			'<%= pkg.name %>': {
				src: [ 'src/*.js' ]
			}
		},
 
		concat: {
			dist: {
				src: ['src/jquery.oaxlider.js'],
				dest: 'jquery.oaxlider.min.js'
			}
		},
 
		uglify: {
			options: {
				stripBanners: true,
				banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
 
			build: {
				src: 'src/jquery.oaxlider.js',
				dest: 'jquery.oaxlider.min.js'
			}
		},
 
		cssmin: {
			with_banner: {
				options: {
					banner: '/* Oaxlider minified CSS */'
				},
 
				files: {
					'oaxlider.min.css' : [
						'css/oaxlider.css'
					]
				}
			}
		},
 
		watch: {
			scripts: {
				files: ['src/*.js'],
				tasks: ['jshint', 'concat', 'removelogging', 'uglify']
			},
			css: {
				files: ['css/*.css'],
				tasks: ['cssmin']
			}
		},

		removelogging: {
			dist: {
				src: "oaxlider.min.js",
				dest: "oaxlider.min.js"
			}
		}
	});

	// grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-remove-logging');
	grunt.loadNpmTasks('grunt-daemon');
 
	grunt.registerTask('default', ['jshint', 'concat', 'removelogging', 'uglify', 'cssmin', 'watch', 'daemonize']); //задача по умолчанию, просто grunt
};