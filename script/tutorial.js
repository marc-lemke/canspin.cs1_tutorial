const currentCS1version = '0.5.0';

function addEventListener_beispieltextBtns() {
  let btnsList = [...document.querySelectorAll('#beispieltextBtns > div')];
  if (btnsList.length === 5) {
    for (const btn of btnsList) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const colorClass = 'farbe-' + e.currentTarget.id.split('_')[1];
        e.currentTarget.classList.toggle('w3-grey');
        e.currentTarget.classList.toggle(colorClass);
      });
    }
  }
}

function addEventListener_mediaQueries() {
  function _executeMediaQueries() {
    const currentWidth = Math.max(document.documentElement["clientWidth"], document.body["scrollWidth"], document.documentElement["scrollWidth"], document.body["offsetWidth"], document.documentElement["offsetWidth"]);
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
addEventListener_beispieltextBtns();
addEventListener_insertValuesOnLoad();
