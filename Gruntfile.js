module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: ['src/jquery.oaxlider.js'],
				dest: 'jquery.oaxlider.min.js'
			}
		},
		babel: {
			options: {
				sourceMap: true,
				presets: ['@babel/preset-env']
			},
			dist: {
				files: {
					'src/jquery.oaxlider.js' : 'src/jquery.oaxlider.es6.js'
				}
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
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-remove-logging');
	// grunt.loadNpmTasks('grunt-daemon');
 
	grunt.registerTask('default', ['concat', 'removelogging', 'babel', 'uglify', 'cssmin', 'watch' /* , 'daemonize' */]);
};