'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

function randomAttribute(array) {  // функция выбора случайного элемента массива
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
}

function createWizardsArray(length) {  // функция создания массива JS-объектов
  var array = [];
  for (var i = 0; i < length; i++) {
    var randomWizard = {
      name: randomAttribute(WIZARD_NAMES) + ' ' + randomAttribute(WIZARD_SURNAMES),
      coatColor: randomAttribute(COAT_COLORS),
      eyesColor: randomAttribute(EYES_COLORS)
    };
    array.push(randomWizard);
  }
  return array;
}

function createWizard(wizard) {  // функция создания DOM-элемента на основе шаблона и JS-объекта

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function fillFragment(wizardsArray) {  // функция заполнения блока DOM-элементами на основе массива JS-объектов
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsArray.length; i++) {
    fragment.appendChild(createWizard(wizardsArray[i]));
  }
  return fragment;
}

function openPopup() {  // функция открытия окна персонажа с обработчиком нажатия 'Esc'
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {  // функция закрытия окна персонажа с удалением обработчика нажатия 'Esc'
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

function onPopupEscPress(evt) {  // функция обработки нажатия 'Esc' при открытом окне персонажа
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');

var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardName = setup.querySelector('.setup-user-name');

var similarListElement = document.querySelector('.setup-similar-list');
var wizards = createWizardsArray(4);

similarListElement.appendChild(fillFragment(wizards));
document.querySelector('.setup-similar').classList.remove('hidden');

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupSubmit.addEventListener('click', function () {
  closePopup();
});

setupSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardName.addEventListener('keydown', function (evt) {  // если фокус находится на форме ввода имени, то 'Esc' не закрывает диалог
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

// обработчики нажатий на элементы персонажа
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = randomAttribute(COAT_COLORS);
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = randomAttribute(EYES_COLORS);
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.background = randomAttribute(FIREBALL_COLORS);
});
