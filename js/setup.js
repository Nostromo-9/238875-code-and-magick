'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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

  // функция изменения заливки элемента
  function fillElement(element, color) {
    element.style.fill = color;
  }

  // функция изменения заливки элемента #2
  function changeElementBackground(element, color) {
    element.style.backgroundColor = color;
  }

  var setup = document.querySelector('.setup');

  var similarListElement = document.querySelector('.setup-similar-list');
  var wizards = createWizardsArray(4);

  similarListElement.appendChild(fillFragment(wizards));
  setup.querySelector('.setup-similar').classList.remove('hidden');

  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  var shopElement = setup.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var inventory = setup.querySelector('.setup-artifacts');
  var inventoryCells = inventory.querySelectorAll('.setup-artifacts-cell');

  // обработчики нажатий на элементы персонажа с использованием callback-функций
  wizardCoat.addEventListener('click', function () {
    window.colorize(wizardCoat, randomAttribute(COAT_COLORS), fillElement);
  });

  wizardEyes.addEventListener('click', function () {
    window.colorize(wizardEyes, randomAttribute(EYES_COLORS), fillElement);
  });

  wizardFireball.addEventListener('click', function () {
    window.colorize(wizardFireball, randomAttribute(FIREBALL_COLORS), changeElementBackground);
  });

  // обработчики drag-n-drop'а
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }

    inventoryCells.forEach(function (cell) {
      cell.style = 'outline: 2px dashed red';
    });
  });

  inventory.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  inventory.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();

    inventoryCells.forEach(function (cell) {
      cell.style = '';
    });
  });

  inventory.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();

    inventoryCells.forEach(function (cell) {
      cell.style = 'outline: 2px dashed red';
    });
  });

  inventory.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
