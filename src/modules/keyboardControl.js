/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable no-use-before-define */
/* eslint array-callback-return: ["error", { allowImplicit: true }] */

let virtualKeyboardState = {
	currentLanguage: 'en',
	capsLockActiv: false,
	outputText: '',
};

if (checkLocalStorage('virtualKeyboardState')) {
	const item = localStorage.getItem('virtualKeyboardState');
	virtualKeyboardState = JSON.parse(item);
}

const eventCodes = {
	Backquote: '`',
	Control: 'Ctrl',
	Backspace: 'bcsp',
	ShiftLeft: 'Shift',
	ShiftRight: 'Shift',
	ControlLeft: 'Ctrl',
	ControlRight: 'Ctrl',
	AltLeft: 'Alt',
	AltRight: 'Alt',
	Metaleft: 'win',
	MetaRight: 'win',
	ArrowUp: '↑',
	ArrowLeft: '←',
	ArrowDown: '↓',
	ArrowRight: '→',
	Minus: '-',
	Equal: '=',
	BracketLeft: '[',
	BracketRight: ']',
	Semicolon: ';',
	Quote: '"',
	Comma: ',',
	Period: '.',
	Slash: '/',
};

const info =
	// eslint-disable-next-line max-len
	'Keyboard created in Windows. To switch the language combination: left ( Shifr + Alt ). Double click on this text to clear LocalStorage and reload page.';

const htmlElements = {
	keyboard: document.querySelector('.grid-container'),
	keys: document.querySelectorAll('.key'),
	spanKeys: document.querySelectorAll('.key__text'),
	capsLock: document.querySelector('.KeyCapsLock'),
	shift: document.querySelector('.KeyShift'),
	output: document.querySelector('.textarea'),
	langugeStatus: document.querySelector('.current-languge'),
	infoText: document.querySelector('.info-container__text'),
};

htmlElements.infoText.innerText = info;

function initKeyboard(obj) {
	if (obj) {
		htmlElements.spanKeys.forEach((span) => {
			span.classList.add('hidden');
		});

		if (obj.capsLockActiv) {
			htmlElements.capsLock.classList.add('active');
			document
				.querySelectorAll(`.lang-${obj.currentLanguage} > .capsLock`)
				.forEach((span) => span.classList.remove('hidden'));
		} else {
			htmlElements.capsLock.classList.remove('active');
			document
				.querySelectorAll(`.lang-${obj.currentLanguage} .lowerCase`)
				.forEach((span) => span.classList.remove('hidden'));
		}

		htmlElements.langugeStatus.innerText = obj.currentLanguage.toUpperCase();
		htmlElements.output.value = obj.outputText;
	}
}

initKeyboard(virtualKeyboardState);

function addListeners() {
	htmlElements.keyboard.addEventListener('mousedown', keyboardClicked);
	htmlElements.keyboard.addEventListener('mouseup', keyboardClicked);
	document.addEventListener('keydown', pressKey);
	document.addEventListener('keyup', lowerKey);
	htmlElements.infoText.addEventListener('dblclick', removeFromLocalStorage);
}

addListeners();

const specificKeysKeyboard = {
	Enter: (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			htmlElements.output.value += '\n';
		}
	},
	Tab: (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			htmlElements.output.value += '\t';
		}
	},
	Space: (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			htmlElements.output.value += '\x20';
		}
	},
	bcsp: (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			htmlElements.output.value = htmlElements.output.value.slice(0, -1);
		}
	},

	CapsLock: (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			htmlElements.spanKeys.forEach((span) => {
				span.classList.add('hidden');
			});

			if (virtualKeyboardState.capsLockActiv) {
				virtualKeyboardState.capsLockActiv = false;
				htmlElements.capsLock.classList.remove('active');
				document
					.querySelectorAll(
						`.lang-${virtualKeyboardState.currentLanguage} .lowerCase`,
					)
					.forEach((span) => span.classList.remove('hidden'));
				return;
			}

			virtualKeyboardState.capsLockActiv = true;
			htmlElements.capsLock.classList.add('active');
			document
				.querySelectorAll(
					`.lang-${virtualKeyboardState.currentLanguage} .capsLock`,
				)
				.forEach((span) => span.classList.remove('hidden'));
		}
	},

	Shift: (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			htmlElements.spanKeys.forEach((span) => {
				span.classList.add('hidden');
			});

			if (virtualKeyboardState.capsLockActiv) {
				document
					.querySelectorAll(
						`.lang-${virtualKeyboardState.currentLanguage} .shift-capsLock`,
					)
					.forEach((span) => span.classList.remove('hidden'));
			} else {
				document
					.querySelectorAll(
						`.lang-${virtualKeyboardState.currentLanguage} .upperCase`,
					)
					.forEach((span) => span.classList.remove('hidden'));
			}
		}

		if (event.type === 'mouseup' || event.type === 'keyup') {
			htmlElements.spanKeys.forEach((span) => {
				span.classList.add('hidden');
			});
			if (virtualKeyboardState.capsLockActiv) {
				document
					.querySelectorAll(
						`.lang-${virtualKeyboardState.currentLanguage} .capsLock`,
					)
					.forEach((span) => span.classList.remove('hidden'));
			} else {
				document
					.querySelectorAll(
						`.lang-${virtualKeyboardState.currentLanguage} .lowerCase`,
					)
					.forEach((span) => span.classList.remove('hidden'));
			}
		}
	},

	'Shift+Alt': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			htmlElements.spanKeys.forEach((span) => {
				span.classList.add('hidden');
			});

			// eslint-disable-next-line no-unused-expressions
			virtualKeyboardState.currentLanguage === 'en'
				? (virtualKeyboardState.currentLanguage = 'ru')
				: (virtualKeyboardState.currentLanguage = 'en');
			initKeyboard(virtualKeyboardState);
		}
	},
	Ctrl: () => {},
	win: () => {},
	Alt: () => {},

	'↑': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			htmlElements.output.value += '↑';
		}
	},
	'←': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			htmlElements.output.value += '←';
		}
	},
	'↓': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			htmlElements.output.value += '↓';
		}
	},
	'→': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			htmlElements.output.value += '→';
		}
	},
	'-': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			if (event.shiftKey) {
				htmlElements.output.value += document.querySelector(
					`.row_1 > .key:nth-child(12) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			} else {
				htmlElements.output.value += document.querySelector(
					`.row_1 > .key:nth-child(12) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			}
		}
	},
	'=': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			if (event.shiftKey) {
				htmlElements.output.value += document.querySelector(
					`.row_1 > .key:nth-child(13) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			} else {
				htmlElements.output.value += document.querySelector(
					`.row_1 > .key:nth-child(13) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			}
		}
	},
	'\\': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			if (event.shiftKey) {
				htmlElements.output.value += document.querySelector(
					`.row_1 > .key:nth-child(14) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			} else {
				htmlElements.output.value += document.querySelector(
					`.row_1 > .key:nth-child(14) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			}
		}
	},
	'[': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			if (event.shiftKey) {
				htmlElements.output.value += document.querySelector(
					`.row_2 > .key:nth-child(12) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			} else {
				htmlElements.output.value += document.querySelector(
					`.row_2 > .key:nth-child(12) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			}
		}
	},
	']': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			if (event.shiftKey) {
				htmlElements.output.value += document.querySelector(
					`.row_2 > .key:nth-child(13) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			} else {
				htmlElements.output.value += document.querySelector(
					`.row_2 > .key:nth-child(13) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			}
		}
	},
	';': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			if (event.shiftKey) {
				htmlElements.output.value += document.querySelector(
					`.row_3 > .key:nth-child(11) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			} else {
				htmlElements.output.value += document.querySelector(
					`.row_3 > .key:nth-child(11) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			}
		}
	},
	'"': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			if (event.shiftKey) {
				htmlElements.output.value += document.querySelector(
					`.row_3 > .key:nth-child(12) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			} else {
				htmlElements.output.value += document.querySelector(
					`.row_3 > .key:nth-child(12) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			}
		}
	},
	',': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			if (event.shiftKey) {
				htmlElements.output.value += document.querySelector(
					`.row_4 > .key:nth-child(9) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			} else {
				htmlElements.output.value += document.querySelector(
					`.row_4 > .key:nth-child(9) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			}
		}
	},
	'.': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			if (event.shiftKey) {
				htmlElements.output.value += document.querySelector(
					`.row_4 > .key:nth-child(10) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			} else {
				htmlElements.output.value += document.querySelector(
					`.row_4 > .key:nth-child(10) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			}
		}
	},
	'/': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			if (event.shiftKey) {
				htmlElements.output.value += document.querySelector(
					`.row_4 > .key:nth-child(11) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			} else {
				htmlElements.output.value += document.querySelector(
					`.row_4 > .key:nth-child(11) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			}
		}
	},
	'`': (event) => {
		if (event.type === 'mousedown' || event.type === 'keydown') {
			if (event.shiftKey) {
				htmlElements.output.value += document.querySelector(
					`.row_1 > .key:nth-child(1) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			} else {
				htmlElements.output.value += document.querySelector(
					`.row_1> .key:nth-child(1) > .lang-${virtualKeyboardState.currentLanguage}`,
				).innerText;
			}
		}
	},
};

function keyboardClicked(event) {
	if (event.target.className.includes('key')) {
		event.stopPropagation();
		if (Object.keys(specificKeysKeyboard).includes(event.target.innerText)) {
			specificKeysKeyboard[event.target.innerText](event);
			virtualKeyboardState.outputText = htmlElements.output.value;
			saveInLocalStorage(virtualKeyboardState);
			return;
		}
		if (event.type === 'mousedown') {
			htmlElements.output.value += event.target.innerText;
			virtualKeyboardState.outputText = htmlElements.output.value;
			saveInLocalStorage(virtualKeyboardState);
		}
	}
}

function pressKey(event) {
	event.preventDefault();
	let eventCode = event.code;

	if (eventCodes[eventCode]) {
		eventCode = eventCodes[eventCode];
	}

	[...htmlElements.keys].some((key) => {
		if (
			key.className.slice(7, 15) === eventCode &&
			key.className.slice(7, 15) === 'Shift' &&
			event.altKey
		) {
			specificKeysKeyboard['Shift+Alt'](event);
			key.classList.add('pressed');
			saveInLocalStorage(virtualKeyboardState);
			return key;
		}

		if (
			key.className.slice(7, 15) === eventCode &&
			Object.keys(specificKeysKeyboard).includes(eventCode)
		) {
			specificKeysKeyboard[eventCode](event);
			key.classList.add('pressed');
			virtualKeyboardState.outputText = htmlElements.output.value;
			saveInLocalStorage(virtualKeyboardState);
			return false;
		}

		if (
			[...key.classList].includes(event.code) ||
			[...key.classList].includes(`Key${event.code[event.code.length - 1]}`)
		) {
			key.classList.add('pressed');
			htmlElements.output.value += key.innerText;
			saveInLocalStorage(virtualKeyboardState);
		}
	});
}

function lowerKey(event) {
	event.preventDefault();

	htmlElements.keys.forEach((key) => {
		key.classList.remove('pressed');
	});
	if (event.key === 'Shift') {
		specificKeysKeyboard[event.key](event);
		saveInLocalStorage(virtualKeyboardState);
	}
}
function removeFromLocalStorage() {
	localStorage.removeItem('virtualKeyboardState');
	window.location.reload();
}

function checkLocalStorage(obj) {
	return localStorage.getItem(obj);
}

function saveInLocalStorage(obj) {
	virtualKeyboardState.outputText = htmlElements.output.value;
	localStorage.setItem('virtualKeyboardState', JSON.stringify(obj));
}
