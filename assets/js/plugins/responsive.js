function updateStyles() {
  let windowWidth = window.innerWidth;

  let baseFontSizeFor1440 = 10; 
  let scaleFactor = 1;

  if (windowWidth <= 640) {
    document.documentElement.style.fontSize = '10px';
  } else if (windowWidth <= 1024) {
    document.documentElement.style.fontSize = '10px';
  } else if (windowWidth <= 1200) {
    scaleFactor = windowWidth / 1200;
  } else if (windowWidth <= 1440) {
    scaleFactor = windowWidth / 1440;
  } else {
    scaleFactor = 1 + (windowWidth - 1440) / (1920 - 1440) * 0.35;
  }

  document.documentElement.style.fontSize = (baseFontSizeFor1440 * scaleFactor) + 'px';
}

window.addEventListener('resize', function() {
  updateStyles();
});

document.addEventListener('DOMContentLoaded', function() {
  localStorage.setItem('applyRemCalc', 'true');
  updateStyles();
});

