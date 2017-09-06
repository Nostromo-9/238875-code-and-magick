'use strict';

(function () {
  function openPopup() {  // функция открытия окна персонажа с обработчиком нажатия 'Esc'
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }
  // функция закрытия окна персонажа с удалением обработчика нажатия 'Esc' и обновлением начальных координат окна диалога
  function closePopup() {
    setup.classList.add('hidden');

    setup.style.top = 100 + 'px';
    setup.style.left = 50 + '%';

    document.removeEventListener('keydown', onPopupEscPress);
  }

  function onPopupEscPress(evt) {  // функция обработки нажатия 'Esc' при открытом окне персонажа
    window.util.isEscEvent(evt, closePopup);
  }

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupSubmit = setup.querySelector('.setup-submit');

  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var wizardName = setup.querySelector('.setup-user-name');

  var dialogHandle = setup.querySelector('.setup-user-pic');

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  setupSubmit.addEventListener('click', function () {
    closePopup();
  });

  setupSubmit.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  wizardName.addEventListener('keydown', function (evt) {  // если фокус находится на форме ввода имени, то 'Esc' не закрывает диалог
    window.util.isEscEvent(evt, evt.stopPropagation());
  });

  // обработчики нажатий на элементы персонажа
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = window.setup.randomAttribute(window.setup.COAT_COLORS);
  });

  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = window.setup.randomAttribute(window.setup.EYES_COLORS);
  });

  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.background = window.setup.randomAttribute(window.setup.FIREBALL_COLORS);
  });

  dialogHandle.addEventListener('mousedown', function (evt) {  // обработчик перетаскивания окна диалога
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {  // функция обработки движения мыши
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {  // фукция обработки отпускания кнопки мыши
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
