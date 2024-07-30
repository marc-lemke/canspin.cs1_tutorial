const currentCS1version = '1.0.0';

function addEventListener_accordions() {
  const accordionList = document.getElementsByClassName("accordion");

  for (const accordion of accordionList) {
    accordion.addEventListener('click', function(e) {
      const panel = this.children[1];
      panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + 'px';
    });
  }
}

function addEventListener_beispieltextBtns() {
  const btnsList = [...document.querySelectorAll('#beispieltextBtns > div')];
  
  for (const btn of btnsList) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const category = e.currentTarget.id.split('_')[1];
      const colorClass = 'farbe-' + category;
      
      e.currentTarget.classList.toggle('w3-white');
      e.currentTarget.classList.toggle(colorClass);

      const spanList = [...document.querySelectorAll(`[class^=${category}]`)];
      for (const span of spanList) {
        span.classList.toggle(colorClass);
      }
    });
  }
}

function addEventListener_mediaQueries() {
  function _executeMediaQueries() {
    const currentWidth = Math.max(document.documentElement['clientWidth'], document.body['scrollWidth'], document.documentElement['scrollWidth'], document.body['offsetWidth'], document.documentElement['offsetWidth']);
    const languageSelectorElement = document.getElementById('languageSelector')

    if (currentWidth > 900) {
      languageSelectorElement.classList.replace('w3-container', 'w3-display-bottomright');
    } else {
      languageSelectorElement.classList.replace('w3-display-bottomright', 'w3-container');
    }
  }

  ['load', 'resize'].forEach(function(value) {
    window.addEventListener(value, _executeMediaQueries)
  });
}

function addEventListener_insertValuesOnLoad() {
  window.addEventListener('load', function(e) {
    // current cs1 version
    const headerTitleElement = document.querySelector('header > h1');
    const currentCS1versionText = `CANSpiN.CS1 ${currentCS1version} Tutorial`;
    document.title = headerTitleElement.textContent = currentCS1versionText;
  });
}

addEventListener_mediaQueries();
addEventListener_accordions();
addEventListener_beispieltextBtns();
addEventListener_insertValuesOnLoad();
