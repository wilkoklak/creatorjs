if(!window.console.error) {
	window.console.error = window.console.log;
}
if(!window.console.warn) {
	window.console.warn = window.console.log;
}
var creator = {
	_isType: function(variable, type) {
		if(variable && type && variable.constructor.toString().indexOf(type) != -1) {
			return true;
		} else {
			return false;
		}
	},
	_GLOBAL_ATTRIBUTES: [
		'accesskey',
		'class',
		'contenteditable',
		'contextmenu',
		'dir',
		'draggable',
		'dropzone',
		'hidden',
		'id',
		'lang',
		'spellcheck',
		'style',
		'tabindex',
		'title',
		'translate'
	],
	Elem: function(tag) {
		this._inDom = document.createElement(tag);
		this._inDom.addClass = function() {
			if(arguments.length == 0) {
				console.error('Error: you must specify class name(s)!');
				return false;
			} else {
				for(let i = 0, len = arguments.length; i < len; i++) {
					if(creator._isType(arguments[i], 'String')) {
						if(this._inDom.classLis) {
							this._inDom.classList.add(arguments[i]);
						} else {
							let classes = this._inDom.className;
							if(classes.indexOf(arguments[i]) == -1) {
								if(classes != '') {
									this._inDom.className += ' ' + arguments[i];
								} else {
									this._inDom.className = arguments[i];
								}
							}
						}
					} else {
						console.error('Error: <<className>> must be a String!');
						return false;
					}
				}
			}
			return true;
		}.bind(this);
		this._inDom.removeClass = function() {
			if(arguments.length == 0) {
				console.error('Error: you must specify class name(s)!');
				return false;
			} else {
				for(let i = 0, len = arguments.length; i < len; i++) {
					if(creator._isType(arguments[i], 'String')) {
						if(this._inDom.classLis) {
							this._inDom.classList.remove(arguments[i]);
						} else {
							var classes = this._inDom.className.split(' ');
							var index = classes.indexOf(arguments[i]);
							if(index > -1) {
								classes.splice(index, 1);
							}
							this._inDom.className = classes.join(' ');
						}
					} else {
						console.error('Error: <<className>> must be a String!');
						return false;
					}
				}
				return true;
			}
		}.bind(this);
		this._inDom.setId = function(id) {
			if(!id) {
				console.error('Error: you must specify an id name!');
				return false;
			} else {
				if(creator._isType(id, 'String')) {
					this._inDom.id = id;
				} else {
					console.error('Error: <<id>> must be a String!');
					return false;
				}
			}
			return true;
		}.bind(this);
		this._inDom.removeId = function() {
			this._inDom.removeAttribute('id');
			return true;
		}.bind(this);
		return this._inDom;
	},
	create: function(tag, options) {
		var elem;
		if(tag) {
			if(creator._isType(tag, 'String')) {
				elem = new this.Elem(tag);
			} else {
				console.error('Error: <<tag>> must be a String!');
				return false;
			}
		} else {
			console.error('Error: You must specify the tag name!');
			return false;
		}
		if(options) {
			if(creator._isType(options, 'Object')) {
				if(options.id) {
					elem.setId(options.id);
				}
				if(options.className) {
					if(creator._isType(options.className, 'String')) {
						elem.addClass(options.className);
					} else if(creator._isType(options.className, 'Array')) {
						for(let i = 0, len = options.className.length; i < len; i++) {
							elem.addClass(options.className[i]);
						}
					}
				}
				if(options.attributes) {
					let attr = options.attributes;
					if(creator._isType(attr, 'Object')) {
						for(var key in attr) {
							if(attr.hasOwnProperty(key)) {
								if(
									creator._GLOBAL_ATTRIBUTES.indexOf(key) == -1 &&
									key.indexOf('data-') == -1
								) {
									console.warn(
										key,
										"isn't in the global attributes list.",
										"make sure you know what you're doing :)"
									);
								}
								elem.setAttribute(key, attr[key]);
							}
						}
					} else {
						console.error('Error: <<attributes>> must be an object!');
							return false;
					}
				}
			} else if(creator._isType(options, 'String')) {
				if(options[0] == '.') {
					elem.addClass(options.slice(1));
				} else if(options[0] == '#') {
					elem.setId(options.slice(1));
				} else {
					console.warn(
						"Warning: You didn't specify if it's class or id!",
						"Add '.' or '#' prefix!",
						"\nContinuing, but your code might not work!"
					);
				}
			} else {
				console.error('Error: <<options>> must be an Object or a String!');
				return false;
			}
		}
		return elem;
	}
}
