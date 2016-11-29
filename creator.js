if(!window.console.error) {
	window.console.error = window.console.log;
}
if(!window.console.warn) {
	window.console.warn = window.console.log;
}

function _isType(variable, type) {
	if(variable.constructor.toString().indexOf(type) != -1) {
		return true;
	} else {
		return false;
	}
}

var creator = {
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
				for(i = 0; i < arguments.length; i++) {
					if(_isType(arguments[i], 'String')) {
						this._inDom.classList.add(arguments[i]);
					} else {
						console.error('Error: <<className>> must be a String!');
						return false;
					}
				}
			}
			return true;
		}.bind(this);
		this._inDom.removeClass = function(className) {
			if(!className) {
				console.error('Error: you must specify a class name(s)!');
				return false;
			} else {
				if(_isType(className, 'String')) {
					this._inDom.classList.remove('')
				}
			}
		}
		this._inDom.setId = function(id) {
			if(!id) {
				console.error('Error: you must specify an id name!');
				return false;
			} else {
				if(_isType(id, 'String')) {
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
	elements: [],
	addClass: function(elem, className) {

	},
	create: function(tag, options) {
		var elem;
		if(tag) {
			if(_isType(tag, 'String')) {
				elem = new this.Elem(tag);
			} else {
				console.error('Error: <<tag>> must be a string!');
				return false;
			}
		} else {
			console.error('Error: You must specify the tag name!');
			return false;
		}
		if(options) {
			if(_isType(options, 'Object')) {
				if(options.id) {
					elem.setId(options.id);
				}
				if(options.className) {
					elem.addClass(options.className);
				}
				if(options.attr) {
					let attr = options.attr;
					if(_isType(attr, 'Object')) {
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
						console.error('Error: <<attr>> must be an object!');
							return false;
					}
				}
			} else if(_isType(options, 'String')) {
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
			}
		}
		this.elements.push(elem);
		return elem;
	}
}
