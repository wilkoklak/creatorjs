# CreatorJS
A JavaScript library for creating HTML nodes

## Installation
Just place creator.js inside your project folder and add it to your ``html`` file.
For now it's not minified since Uglify doesn't support ``let``... Maybe I'll change
my code.

## Usage
You will have a global variable named ``creator``. This is the heart of this lib.

This is an example taken from ``index.htm``:
``` js
var container = document.querySelector('#container');

// Correct examples
var p = creator.create('p', {
	className: ['para', 'bold'],
	attributes: {
		'data-test': 'test_value'
	}
});

// You can still use vanilla functions and values
p.innerText = 'This is a demo paragraph!';

var img = creator.create('img', {
	id: 'image',
	attributes: {
		// src is not in global attributes list, so creator will throw a warning
		src: 'http://i.imgur.com/MHMpQVY.jpg',
		title: 'Some image from imgur...'
	}
})

// This is a shorthand creation
var red = creator.create('p', '.red'); // "." for class, "#" for id
red.innerHTML = '<i>This text is red!</i>';

setTimeout(function() {
	red.innerHTML = "<i>It's no longer red :(</i>";
	red.removeClass('red'); // you can remove specific classes
}, 5000)

setTimeout(function() {
	red.innerText = "Now, I'm green and bigger!!!11!1";
	red.addClass('green', 'bigger'); // you can add multiple classes at once
}, 10000)

container.appendChild(p);
container.appendChild(img);
p.appendChild(red);

// Wrong examples
var wrong = creator.create('p', 123); //will throw an error
var another_wrong = creator.create(456, '.class'); //will throw an error

// wrong and another_wrong now contain a false value
container.appendChild(wrong); //will throw an error
```
As you can see, CreatorJS makes it faster to add new nodes to your DOM and provides
some functions that make it easier to add and remove classes. It's also "idiot proof"
and throws warnings and errors if you do something wrong.

It ain't much, but I plan to add more features in future.

# API

## ``creator.config``:
It's an object containing configuration for creator.

Currently there are two variables inside:
* ``errors`` - ``true`` if you want to display errors. Default is ``true``
* ``warnings`` - ``true`` if you want to display warnings. Default is ``true``

## ``creator.create(tagName, className/idName/options)``:
It's a function for creating a DOM node.

Arguments:
* ``tagName`` - name of the new node/tag/element. It can be pretty much anything
that is supported by browsers.
* ``className/idName/options`` - this variable depends on context. If it's a string
then there are two options: if it has ``#`` in the begining, creator will add an id.
If it has ``.`` in the begining, creator will add a class. If it's an object, creator
will search for specific variables. See ``options`` for more.

## ``options``:
An object containing configuration for creation of new node.
### ``options.className``:
It can be a string containing single class or an array of classes to add
### ``options.id``:
A string containing an id name
### ``options.attributes``:
It's an object containing list of attributes.
The structure goes like this:
``` js
{
	firstAttribName: 'firsAttribValue',
	'secondAttribName': 'secondAttribValue',
	[...]
}
```
``creator.create()`` returns DOMNode just like ``document.createElement()``, but
with few bonus functions.

## Functions:
### ``elem.addClass(className[, anotherClassNames])``:
This function adds classes specified in arguments. It can be only one, but it can
also be ten at once (which is not recommended though...).
### ``elem.removeClass(className[, anotherClassNames])``:
This function removes one class or multiple classes.
### ``elem.setId(idName)``:
This function will set an element's id. It will overwrite any previous id.
### ``elem.removeId()``:
This function removes element's id.

The rest of the funcions are from vanilla JavaScript.

## TODO:
* functions for safe text appending
* setting element's style like in jQuery
