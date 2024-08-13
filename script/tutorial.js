const currentCS1version = '1.0.0';
const exampleSettings = {
  'ort': false,
  'bewegung': false,
  'dimensionierung': false,
  'positionierung': false,
  'richtung': false
};

function refreshBeispieltextDisplay() {
  for (const [category, categoryIsDisplayed] of Object.entries(exampleSettings)) {
    const colorClass = 'farbe-' + category;
    const beispieltextBtn = document.querySelector(`div[data-id="beispieltextBtns_${category}"]`)

    if (categoryIsDisplayed) {
      beispieltextBtn.classList.remove('w3-white');
      beispieltextBtn.classList.add(colorClass);
      const spanList = [...document.querySelectorAll(`blockquote[data-id="beispieltextText"] > p > span[class^="${category}"]`)];
      for (const span of spanList) {
        span.classList.add(colorClass);
      }
    } else {
      beispieltextBtn.classList.add('w3-white');
      beispieltextBtn.classList.remove(colorClass);
      const spanList = [...document.querySelectorAll(`blockquote[data-id="beispieltextText"] > p > span[class^="${category}"]`)];
      for (const span of spanList) {
        span.classList.remove(colorClass);
      }
    }
  }
}

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
      exampleSettings[category] = !(exampleSettings[category]);
      refreshBeispieltextDisplay();
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
      const languageDict = {
        'german_lang': {
          'main': 'de',
          'h2_headings': {
            'categories': 'Kategorien',
            'example': 'Beispieltext'
          },
          'h3_headings': [
            'Ort',
            'Bewegung',
            'Dimensionierung',
            'Positionierung',
            'Richtung'
          ],
          'h4_headings': [
            'Annotationsklassen',
            'Annotieren'
          ],
          'accordion_initial_examples': [
            `
            <p>Sie saß in ihrem <span class="w3-tooltip w3-tag">Zimmer<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">Container für Figuren</span></span> in <span class="w3-tooltip w3-tag">Köln<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">geografischer Container für Figuren</span></span>.</p>
            <p>Plötzlich merkte er, dass er schon wieder an der <span class="w3-tooltip w3-tag">Schiller-Statue<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">geografisches Objekt</span></span> vorbeilief.</p>
            <p><span class="w3-tooltip w3-tag">Fenster<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">raum-strukturelles Objekt</span></span> und <span class="w3-tooltip w3-tag">Türen<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">raum-strukturelles Objekt</span></span> sollten immer fest verschlossen sein.</p>
            <p>»In der <span class="w3-tooltip w3-tag">Mitte<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">abstrakter räumlicher Punkt</span></span> des Tischs lag das verschollene Buch«, las er laut aus der Mitte des Buches vor.</p>
            `,
            `
            <p>Im Traum <span class="w3-tooltip w3-tag">spazierte<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">gerichtete Bewegung</span></span> sie einfach in das Restaurant.</p>
            `,
            `
            <p>Vor ihnen lag eine <span class="w3-tooltip w3-tag">riesige<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">Größe des Raums</span></span> Halle.</p>
            `,
            `
            <p><span class="w3-tooltip w3-tag">Im<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positioniert die Person im Saal</span></span> Saal mit den Impressionisten blickte sie lange auf den Renoir.</p>
            `,
            `
            <p>Im Saal mit den Impressionisten blickte sie lange <span class="w3-tooltip w3-tag">auf<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">Richtung des Blicks</span></span> den Renoir.</p>
            `
          ],
          'annotation_classes_tags': [
            [
              'ORT-CONTAINER',
              'ORT-CONTAINER-BK',
              'ORT-OBJEKT',
              'ORT-OBJEKT-BK',
              'ORT-ABSTRAKT',
              'ORT-ABSTRAKT-BK',
              'ORT-UE-RX',
              'ORT-UE-XR',
              'ORT-UE-RR'
            ],
            [
              'BEWEGUNG-SUBJEKT',
              'BEWEGUNG-OBJEKT',
              'BEWEGUNG-LICHT',
              'BEWEGUNG-SCHALL',
              'BEWEGUNG-GERUCH',
              'BEWEGUNG-UE-RX',
              'BEWEGUNG-UE-XR',
              'BEWEGUNG-UE-RR'
            ],
            [
              'DIMENSIONIERUNG-GROESSE',
              'DIMENSIONIERUNG-MENGE',
              'DIMENSIONIERUNG-ABSTAND',
              'DIMENSIONIERUNG-UE-RX',
              'DIMENSIONIERUNG-UE-XR',
              'DIMENSIONIERUNG-UE-RR'
            ],
            [
              'POSITIONIERUNG',
              'POSITIONIERUNG-UE-RX',
              'POSITIONIERUNG-UE-XR',
              'POSITIONIERUNG-UE-RR'
            ],
            [
              'RICHTUNG',
              'RICHTUNG-UE-RX',
              'RICHTUNG-UE-XR',
              'RICHTUNG-UE-RR'
            ]
          ],
          'footer': '<p>Gebaut mit <a href="https://www.w3schools.com/w3css/w3css_downloads.asp">W3.CSS 4.15</a>, <a href="https://fontawesome.com/v4/icons/">Font Awesome 4.7.0</a> und <a href="https://www.favicon-generator.org/">Favicon.ico & App Icon Generator</a>.</p>'
        },
        'english_lang': {
          'main': 'en-US',
          'h2_headings': {
            'categories': 'Categories',
            'example': 'Example text'
          },
          'h3_headings': [
            'Place',
            'Movement',
            'Dimensioning',
            'Positioning',
            'Direction'
          ],
          'h4_headings': [
            'Annotation classes',
            'Annotate'
          ],
          'accordion_initial_examples': [
            `
            <p>She was sitting in her <span class="w3-tooltip w3-tag">room<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">container for characters</span></span> in <span class="w3-tooltip w3-tag">Cologne<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">geographical container for characters</span></span>.</p>
            <p>Suddenly he realized that he was walking past the <span class="w3-tooltip w3-tag">Schiller statue<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">geographical object</span></span> again.</p>
            <p><span class="w3-tooltip w3-tag">Windows<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">space-structural object</span></span> and <span class="w3-tooltip w3-tag">doors<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">space-structural object</span></span> should always be tightly closed.</p>
            <p>»In the <span class="w3-tooltip w3-tag">middle<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">abstract spatial point</span></span> of the table lay the lost book«, he read aloud from the middle of the book.</p>
            `,
            '',
            '',
            '',
            ''
          ],
          'annotation_classes_tags': [
            [
              'PLACE-CONTAINER',
              'PLACE-CONTAINER-MC',
              'PLACE-OBJECT',
              'PLACE-OBJECT-MC',
              'PLACE-ABSTRACT',
              'PLACE-ABSTRACT-MC',
              'PLACE-T-SpX',
              'PLACE-T-XSp',
              'PLACE-T-SpSp'
            ],
            [
              'MOVEMENT-SUBJECT',
              'MOVEMENT-OBJECT',
              'MOVEMENT-LIGHT',
              'MOVEMENT-SOUND',
              'MOVEMENT-SMELL',
              'MOVEMENT-T-SpX',
              'MOVEMENT-T-XSp',
              'MOVEMENT-T-SpSp'
            ],
            [
              'DIMENSIONING-SIZE',
              'DIMENSIONING-AMOUNT',
              'DIMENSIONING-DISTANCE',
              'DIMENSIONING-T-SpX',
              'DIMENSIONING-T-XSp',
              'DIMENSIONING-T-SpSp'
            ],
            [
              'POSITIONING',
              'POSITIONING-T-SpX',
              'POSITIONING-T-XSp',
              'POSITIONING-T-SpSp'
            ],
            [
              'DIRECTION',
              'DIRECTION-T-SpX',
              'DIRECTION-T-XSp',
              'DIRECTION-T-SpSp'
            ]
          ],
          'footer': '<p>Created with <a href="https://www.w3schools.com/w3css/w3css_downloads.asp">W3.CSS 4.15</a>, <a href="https://fontawesome.com/v4/icons/">Font Awesome 4.7.0</a>, and <a href="https://www.favicon-generator.org/">Favicon.ico & App Icon Generator</a>.</p>'
        }
      };

      // main
      // - language attribute of main
      [...document.getElementsByTagName('main')][0].setAttribute('lang', languageDict[clickedLanguageButton.id]['main']);
      // - h2 headings in categories and example
      document.querySelector('div[data-id="categories"] > h2').textContent = languageDict[clickedLanguageButton.id]['h2_headings']['categories'];
      document.querySelector('div[data-id="example"] > h2').textContent = languageDict[clickedLanguageButton.id]['h2_headings']['example'];
      // - h3 headings in categories > accordion
      const h3_headings = [...document.querySelectorAll('div[data-id="categories"] > .content > div[data-id="accordion"] > .w3-container > h3')];
      for (const [headingIndex, heading] of h3_headings.entries()) {
        const _categorieNames = languageDict[clickedLanguageButton.id]['h3_headings'];
        heading.childNodes[0].nodeValue = _categorieNames[headingIndex];
      }
      // list of all five accordion panels for following translations inside those panels
      const accordionPanels = [...document.querySelectorAll('.accordion-panel')];
      // - accordion-ort-examples in categories > accordion > accordion-panel
      for (const [accordionPanelIndex, accordionPanel] of accordionPanels.entries()) {
        accordionPanel.children[0].innerHTML = languageDict[clickedLanguageButton.id]['accordion_initial_examples'][accordionPanelIndex];
      }
      // - h4 headings in categories > accordion > accordion-panel
      for (const accordionPanel of accordionPanels) {
        const h4_headings = [...accordionPanel.querySelectorAll('h4')];
        for (const [headingIndex, heading] of h4_headings.entries()) {
          const _accordionPanelHeadings = languageDict[clickedLanguageButton.id]['h4_headings'];
          heading.childNodes[0].nodeValue = _accordionPanelHeadings[headingIndex];
        }
      }
      // - annotation-class-tags in categories > accordion > accordion-panel
      for (const [accordionPanelIndex, accordionPanel] of accordionPanels.entries()) {
        const annotationClassTags = [...accordionPanel.querySelectorAll('.annotation-class-tags > span')];
        for (const [annotationClassTagIndex, annotationClassTag] of annotationClassTags.entries()) {
          annotationClassTag.textContent = languageDict[clickedLanguageButton.id]['annotation_classes_tags'][accordionPanelIndex][annotationClassTagIndex];
        }
      }
      // - placeholder in categories > accordion > accordion-panel > annotation-class-infos
      // - h5 headings in categories > accordion > accordion-panel > annotation-class-infos > div[data-id]
      // - li in categories > accordion > accordion-panel > annotation-class-infos > div[data-id] > ul
      // - beispieltextBtns in example
      // - p in example > .content > blockquote[data-id='beispieltextText'] (replace html and execute refreshBeispieltextDisplay to display current text example state)

      // footer
      [...document.getElementsByTagName('footer')][0].innerHTML = languageDict[clickedLanguageButton.id]['footer'];

      // refresh display of open accordion panels
      for (const accordionPanel of accordionPanels) {
        if (accordionPanel.style.maxHeight) {
          accordionPanel.style.maxHeight = accordionPanel.scrollHeight + 'px';
        }
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
