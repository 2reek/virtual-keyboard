/* eslint-disable no-use-before-define */
import data from './keyboardData.js';

const keyboardData = data;
const keyLang = ['lang-en', 'lang-ru'];
const keySpanClassNames = [
	'lowerCase',
	'upperCase',
	'capsLock',
	'shift-capsLock',
];

document.body.innerHTML = '';

// create textarea
const outputBlock = createAnElementClassed('div', 'output-container');
const textaArea = createAnElementClassed('textarea', 'textarea');
const currentLangugeInfo = createAnElementClassed('div', 'current-languge');
currentLangugeInfo.innerText = 'RU'; // тeed to remove

outputBlock.append(textaArea);
outputBlock.append(currentLangugeInfo);
document.body.append(outputBlock);

// create grid
const grid = createAnElementClassed('div', 'grid-container');

for (let i = 1; i < 6; i++) {
	const row = createAnElementClassed('div', 'row', `row_${i}`);
	grid.append(row);
}

document.body.append(grid);

const rows = document.querySelectorAll('.row');

for (let i = 1; i < 6; i++) {
	const row = `row_${i}`;
	keyboardData[row].forEach((array) => {
		rows[i - 1].append(createKey(array, array[0][2]));
	});
}

// create info

const infoBlock = createAnElementClassed('div', 'info-container');
const infoText = createAnElementClassed('p', 'info-container__text');
infoBlock.append(infoText);
document.body.append(infoBlock);

// create key
function createKey(array, keySelector) {
	const key = createAnElementClassed('div', 'key', `Key${keySelector}`);
	array.forEach((subArray, index) => {
		const spanLang = createAnElementClassed('span', keyLang[index]);
		subArray.forEach((elem, ind) => {
			const span = createAnElementClassed(
				'span',
				'key__text',
				keySpanClassNames[ind],
				'hidden',
			);
			span.innerText = elem;
			spanLang.append(span);
		});
		key.append(spanLang);
	});

	return key;
}

// create DOMElement with className
function createAnElementClassed(elementName, ...className) {
	const element = document.createElement(elementName);

	className.forEach((name) => {
		element.classList.add(name);
	});
	return element;
}
