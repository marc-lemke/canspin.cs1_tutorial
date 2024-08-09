const currentCS1version = '1.0.0';

function addEventListener_accordions() {
  const accordionList = document.querySelectorAll('div[data-id="accordion"]');
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
        // reset annotation class tags css and annotation class infos css
        const annotationClassTags = accordion.querySelector('.annotation-class-tags').children;
        for (const tag of annotationClassTags) {
          tag.classList.remove('active-class-tag');
        }
        const annotationClassInfos = [...accordion.querySelector('.annotation-class-infos').children];
        for (const [annotationInfoIndex, annotationInfo] of annotationClassInfos.entries()) {
          if (annotationInfoIndex === 0) {
            annotationInfo.classList.remove('w3-hide');
          } else {
            annotationInfo.classList.add('w3-hide');
          }
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
      addEventListener_annotationClassInfos(this);
    });
  }
}

function addEventListener_annotationClassInfos(_this) {
  const annotationClassTags = [..._this.querySelector('.annotation-class-tags').children];
  for (const [tagIndex, tag] of annotationClassTags.entries()) {
    tag.addEventListener('click', function getTagInfo(e) {
      // do something after clicking on a tag only when the tag clicked is not the already activated one
      if (!(tag.classList.contains('active-class-tag'))) {
        // remove activate-class-tag class from any tag
        for (const _tag of annotationClassTags) {
          _tag.classList.remove('active-class-tag');
        }
        // add activate-class-tag class to tag currently clicked on
        this.classList.add('active-class-tag');
        // set display of info div corresponding to the tag currently clicked on ...
        const annotationClassInfos = [...this.parentElement.parentElement.querySelector('.annotation-class-infos').children];
        // ... by hiding all classInfo divs ...
        for (const [classInfoIndex, classInfo] of annotationClassInfos.entries()) {
          classInfo.classList.add('w3-hide');
        }
        // ... and displaying the classInfo div corresponding to the tag currently clicked on; the order of tag elements equals the order of classInfo elements in DOM, beside the fact, that there is an additional placeholer element on index 0 in the classInfo element list
        annotationClassInfos[tagIndex + 1].classList.remove('w3-hide');
        // refresh panel height
        const panel = this.parentElement.parentElement;
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  }
}

function addEventListener_beispieltextBtns() {
  const btnsList = [...document.querySelectorAll('[data-id="beispieltextBtns"] > div')];
  for (const btn of btnsList) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const category = e.currentTarget.dataset.id.split('_')[1];
      const colorClass = 'farbe-' + category;
      
      e.currentTarget.classList.toggle('w3-white');
      e.currentTarget.classList.toggle(colorClass);

      const spanList = [...document.querySelectorAll(`blockquote[data-id="beispieltextText"] > p > span[class^="${category}"]`)];
      for (const span of spanList) {
        span.classList.toggle(colorClass);
      }
    });
  }
}

function addEventListener_languageSelect() {
  const languageButtonsList = [...document.querySelectorAll('#languageSelector > div > button')];
  for (const btn of languageButtonsList) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // button controls
      const clickedLanguageButton = e.currentTarget;
      const otherLanguageButton = (e.currentTarget.nextElementSibling || e.currentTarget.previousElementSibling);
      clickedLanguageButton.classList.add('active');
      otherLanguageButton.classList.remove('active');

      // language controls
      if (clickedLanguageButton.id === 'german_lang') {
        // main
        /* todo */

        // footer
        [...document.getElementsByTagName('footer')][0].innerHTML = "<p>Gebaut mit <a href='https://www.w3schools.com/w3css/w3css_downloads.asp'>W3.CSS 4.15</a>, <a href='https://fontawesome.com/v4/icons/'>Font Awesome 4.7.0</a> und <a href='https://www.favicon-generator.org/'>Favicon.ico & App Icon Generator</a>.</p>";
      } else {
        // main
        /* todo */
        
        // footer
        [...document.getElementsByTagName('footer')][0].innerHTML = "<p>Created with <a href='https://www.w3schools.com/w3css/w3css_downloads.asp'>W3.CSS 4.15</a>, <a href='https://fontawesome.com/v4/icons/'>Font Awesome 4.7.0</a>, and <a href='https://www.favicon-generator.org/'>Favicon.ico & App Icon Generator</a>.</p>";
      }
    });
  }
}

function addEventListener_mediaQueries() {
  function _executeMediaQueries() {
    const currentWidth = Math.max(document.documentElement['clientWidth'], document.body['scrollWidth'], document.documentElement['scrollWidth'], document.body['offsetWidth'], document.documentElement['offsetWidth']);
    
    // language selector position
    const languageSelectorElement = document.getElementById('languageSelector')

    if (currentWidth > 900) {
      languageSelectorElement.classList.replace('w3-container', 'w3-display-bottomright');
    } else {
      languageSelectorElement.classList.replace('w3-display-bottomright', 'w3-container');
    }

    // beispieltextText font size
    const exampleTextParagraph = document.querySelector('[data-id="beispieltextText"]').children[0];
    const exampleTextReferenceParagraph = document.querySelector('[data-id="beispieltextText"]').children[1];

    if (currentWidth > 399) {
      exampleTextParagraph.classList.add('w3-large');
      exampleTextReferenceParagraph.classList.remove('w3-small');
    } else {
      exampleTextParagraph.classList.remove('w3-large');
      exampleTextReferenceParagraph.classList.add('w3-small');
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
addEventListener_languageSelect();
addEventListener_accordions();
addEventListener_beispieltextBtns();
addEventListener_insertValuesOnLoad();
