const currentCS1version = '1.0.0';

function addEventListener_accordions() {
  const accordionList = document.getElementsByClassName("accordion");

  for (const accordion of accordionList) {
    accordion.addEventListener('click', function openAccordion(e) {
      // open accordion
      const panel = this.children[1];
      panel.style.maxHeight = panel.scrollHeight + 'px';
      // deactivate pointer
      this.style.cursor = 'default';
      // show closeChevronDiv
      const closeChevronDiv = this.children[0].querySelector('.close-accordion-chevron');
      closeChevronDiv.style.display = 'block';
      // change eventlistener attachment
      this.removeEventListener('click', openAccordion);
      closeChevronDiv.addEventListener('click', function closeAccordion(e) {
        // prevent activating openAccordion function after clicking closeChevronDiv
        e.stopPropagation();
        // change eventlistener attachment (deattachement of annotation class tag click handler is not necessary here: multiple attachement attempts have no effect)
        this.removeEventListener('click', closeAccordion);
        const accordion = this.parentElement.parentElement;
        accordion.addEventListener('click', openAccordion);
        // reset annotation class tags css
        const annotationClassTags = accordion.querySelector('.annotation-class-tags').children;
        for (const tag of annotationClassTags) {
          tag.classList.remove('w3-border', 'w3-border-black');
          tag.style.cursor = '';
        }
        // close accordion
        const panel = this.parentElement.nextElementSibling;
        panel.style.maxHeight = null;
        // hide closeChevronDiv
        this.style.display = 'none';
        // activate pointer
        accordion.style.cursor = '';
      });
      // add eventlistener for annotation class tags
      const annotationClassTags = this.querySelector('.annotation-class-tags').children;
      for (const tag of annotationClassTags) {
        tag.addEventListener('click', function getTagInfo(e) {
          this.classList.add('w3-border', 'w3-border-black');
          this.style.cursor = 'default';
          // todo: add check, whether another tag button is active (change current classlist command to one that uses just an 'active' class, which controls border and cursor settings)
        });
      }
    });
  }
}

function addEventListener_annotationClassInfos() {

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
