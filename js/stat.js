'use strict';

function arrayMax(array) {
  var max = array[0];
  for (var i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

function getColor(name) {
  return (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 200, ' + Math.random().toFixed(2) + ')';
}

function columnDraw(ctx, initialX, initialY, width, height) {
  ctx.fillRect(initialX, initialY, width, height);
}

function textDraw(ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = arrayMax(times);
  var histogramHeight = 150;
  var step = histogramHeight / (max - 0);
  var barWidth = 40;
  var indent = 50;
  var initialX = 140;
  var initialY = 260;
  var initialIndent = 20;
  var initialColor = 'black';

  ctx.textBaseline = 'bottom'; // от левого нижнего угла
  for (var i = 0; i < times.length; i++) {
    textDraw(ctx, names[i], initialX + (indent + barWidth) * i, initialY, initialColor);  // нижняя подпись
    textDraw(ctx, times[i].toFixed(0), initialX + (indent + barWidth) * i, initialY - times[i] * step - initialIndent, initialColor);  // верхняя подпись

    ctx.fillStyle = getColor(names[i]);

    columnDraw(ctx, initialX + (indent + barWidth) * i, initialY - initialIndent, barWidth, times[i] * -step);  // столбец статистики
  }
};
