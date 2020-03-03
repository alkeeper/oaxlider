module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
				tasks: ['concat', 'removelogging', 'uglify']
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

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-remove-logging');
	grunt.loadNpmTasks('grunt-daemon');
 
	grunt.registerTask('default', ['concat', 'removelogging', 'uglify', 'cssmin', 'watch', 'daemonize']);
};