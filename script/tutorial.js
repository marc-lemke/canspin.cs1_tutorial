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
            <p>»Brügge <span class="w3-tooltip w3-tag">sehen<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">gerichtete optische Wahrnehmung</span></span> ... und sterben?« läuft ab morgen in unserem Kino.</p>
            <p>Durch die Gipfel <span class="w3-tooltip w3-tag">schien<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">Bewegung von Licht</span></span> bleiches Licht auf den Waldweg.</p>
            <p>Sie versuchten, ihn zur vorderen Türschwelle zu <span class="w3-tooltip w3-tag">locken<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">mitausgedrückte geplante gerichtete Bewegung</span></span>.</p>
            `,
            `
            <p>Vor ihnen lag eine <span class="w3-tooltip w3-tag">riesige<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">Größe des Raums</span></span> Halle.</p>
            <p>Sie waren noch <span class="w3-tooltip w3-tag">250 Meter entfernt<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">Entfernungsangabe</span></span>.</p>
            <p><span class="w3-tooltip w3-tag">Über 250<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">Mengenangabe bezüglich räumlicher Entitäten</span></span> Bäume wurden geplanzt.</p>
            <p>Er dachte viel über die <span class="w3-tooltip w3-tag">schiere Masse der<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">Mengenangabe bezüglich räumlicher Entitäten</span></span> Schiffe nach.</p>
            `,
            `
            <p><span class="w3-tooltip w3-tag">Im<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positioniert die Person im Saal</span></span> Saal mit den Impressionisten blickte sie lange auf den Renoir.</p>
            <p>Sie schwebten <span class="w3-tooltip w3-tag">draußen<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positioniert die Personen außerhalb des Hauses</span></span> <span class="w3-tooltip w3-tag">oberhalb<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positioniert die Personen oberhalb des Hauses</span></span> des <span class="w3-tooltip w3-tag">westlichen<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positioniert den Teil westlich von anderen Teilen</span></span> Teils <span class="w3-tooltip w3-tag">des<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positioniert den Teil im Haus</span></span> Hauses.</p>
            <p>Es ist später Abend <span class="w3-tooltip w3-tag">im<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positioniert eine implizierte Beobachterposition im Wald</span></span> Wald <span class="w3-tooltip w3-tag">der<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positioniert den Wald in der Stadt</span></span> Stadt.</p>
            `,
            `
            <p>Im Saal mit den Impressionisten blickte sie lange <span class="w3-tooltip w3-tag">auf<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">Richtung des Blicks</span></span> den Renoir.</p>
            <p>Sie stieg <span class="w3-tooltip w3-tag">aus<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">Richtung zum Ausgangpunkt der Bewegung</span></span> Waggon 7 des Zuges.</p>
            <p>Sie bogen <span class="w3-tooltip w3-tag">nach<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">Richtung der Bewegung</span></span> <span class="w3-tooltip w3-tag">Süden<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">richtungsangebendes Nomen ohne Artikel</span></span> ab.</p>
            `
          ],
          'annotation_categories': [
            'Ort',
            'Bewegung',
            'Dimensionierung',
            'Positionierung',
            'Richtung'
          ],
          'annotation_classes': [
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
          'annotation_classes_infos': [
            [
              `
              <li>Container sind Räume oder Bereiche, in denen sich Figuren prototypischerweise aufhalten können.</li>
              <li>Container können sich bewegen <span class='inline-examples'>(»das <span class='w3-tag'>Taxi</span>«)</span>.</li>
              <li>Container können konkrete Grenzen haben <span class='inline-examples'>(»das <span class='w3-tag'>Schloss</span>«)</span> oder auch diffuse <span class='inline-examples'>(»der <span class='w3-tag'>Berggipfel</span>«)</span>.</li>
              <li>Die annotierten Nomen können individuelle Orte, Gattungen <span class='inline-examples'>(»eine <span class='w3-tag'>Stadt</span>«)</span> oder mehrere Orte <span class='inline-examples'>(»viele <span class='w3-tag'>Städte</span>«)</span> bezeichnen.</li>
              `,
              `
              <li>Container sind Räume oder Bereiche, in denen sich Figuren prototypischerweise aufhalten können.</li>
              <li>Sie können unbewegter Ziel- und Ausgangspunkt von gerichteten Bewegungen in einem <b>Bewegungskontext (BK)</b> sein <span class='inline-examples'>(»in den <span class='w3-tag'>Wald</span> laufen«)</span>.</li>
              <li>Damit ein Bewegungskontext vorliegt, muss sich eine annotierte Bewegung im Kotext befinden <span class='inline-examples'>(»in den Wald <span class='w3-tag'>laufen</span>«)</span>.</li>
              <li>Eine Bewegung kann auch eine Wahrnehmung oder anderes sein: Siehe die Infos zur Bewegungskategorie.</li>
              `,
              `
              <li>Objekte haben räumliche Ausdehnung, sind aber keine Container, in denen sich Figuren prototypischerweise aufhalten können.</li>
              <li><b>Mit der Klasse <i>ORT-OBJEKT</i> annotieren wir ausschließlich geografische, astronomische oder raumstrukturelle Objekte.</b></li>
              <li>Geografische Objekte sind Objekte, die auf Welt-, Land- und Stadtkarten auftauchen können <span class='inline-examples'>(»<span class='w3-tag'>Schiller-Statue</span>«)</span>.</li>
              <li>Astronomische Objekte sind Objekte, die in Sternenkarten und auf Himmelsgloben auftauchen können <span class='inline-examples'>(»<span class='w3-tag'>Mond</span>«)</span>.</li>
              <li>Raumstrukturelle Objekte sind Objekte, die die Grenzen eines Raumes markieren <span class='inline-examples'>(»<span class='w3-tag'>Tür</span>«</span>, <span class='inline-examples'>»<span class='w3-tag'>Zimmerdecke</span>«</span>, <span class='inline-examples'>»<span class='w3-tag'>Wände</span>«)</span>.</li>
              <li>Jedes annotierte Objekt muss zu einem Container gehören, in dem sich auch Figuren prototypischerweise aufhalten können: Der Verschluss einer Handtasche zählt daher nicht als raumstrukturelles Objekt, die Tür eines Autos schon.</li>
              `,
              `
              <li>Objekte haben räumliche Ausdehnung, sind aber keine Container, in denen sich Figuren prototypischerweise aufhalten können.</li>
              <li><b>Mit der Klasse <i>ORT-OBJEKT-BK</i> annotieren wir, im Gegensatz zur Klasse <i>ORT-OBJEKT</i>, alle Arten von Objekten</b>, die unbewegter Ziel- und Ausgangspunkt von gerichteten Bewegungen in einem <b>Bewegungskontext (BK)</b> sind <span class='inline-examples'>(»auf das <span class='w3-tag'>Gemälde</span> zugehen«)</span>.</li>
              <li>Damit ein Bewegungskontext vorliegt, muss sich eine annotierte Bewegung im Kotext befinden <span class='inline-examples'>(»auf das Gemälde <span class='w3-tag'>zugehen</span>«)</span>.</li>
              <li>Eine Bewegung kann auch eine Wahrnehmung oder anderes sein: Siehe die Infos zur Bewegungskategorie.</li>
              <li>Jedes annotierte Objekt muss sich in einem Container befinden, in dem sich auch Figuren prototypischerweise aufhalten können: Das angeschaute Gemälde in einem Ausstellungsraum wird annotiert, das Gemälde in einer Tasche nicht.</li>
              `,
              `
              <li>Abstrakta haben im Gegensatz zu Containern und Objekten keine räumliche Ausdehnung, sondern sind Bezeichnungen für Punkte oder geometrische Figuren.</li>
              <li>Beispiele: <span class='inline-examples'>»die <span class='w3-tag'>Mitte</span> des Saales«</span>, <span class='inline-examples'>»alle vier <span class='w3-tag'>Ecken</span> des Zimmers«</span>, <span class='inline-examples'>»<span class='w3-tag'>Nordpol</span>«</span>, <span class='inline-examples'>»an dieser <span class='w3-tag'>Stelle</span> im Raum«</span>, <span class='inline-examples'>»sie fuhren im <span class='w3-tag'>Kreis</span>«</span>.</li>
              <li>Jedes annotierte Abstraktum muss sich in einem Container befinden, in dem sich auch Figuren prototypischerweise aufhalten können.</li>
              `,
              `
              <li>Abstrakta haben im Gegensatz zu Containern und Objekten keine räumliche Ausdehnung, sondern sind Bezeichnungen für Punkte oder geometrische Figuren.</li>
              <li>Sie können unbewegter Ziel- und Ausgangspunkt von gerichteten Bewegungen in einem <b>Bewegungskontext (BK)</b> sein <span class='inline-examples'>(»zur besagten <span class='w3-tag'>Stelle</span> laufen«)</span>.</li>
              <li>Damit ein Bewegungskontext vorliegt, muss sich eine annotierte Bewegung im Kotext befinden <span class='inline-examples'>(»zur besagten Stelle <span class='w3-tag'>laufen</span>«)</span>.</li>
              <li>Eine Bewegung kann auch eine Wahrnehmung oder anderes sein: Siehe die Infos zur Bewegungskategorie.</li>
              <li>Jedes annotierte Abstraktum muss sich in einem Container befinden, in dem sich auch Figuren prototypischerweise aufhalten können.</li>
              `,
              `
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RX</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck nicht-räumlicher Sachverhalte (nicht-räumlicher Zielbereich: X).</li>
              <li>Die Übertragung kann kreativ-metaphorisch sein: »Sie verirrte sich in <span class='inline-examples'>ihrem <span class='w3-tag'>Gedankenpalast</span>.«</span></li>
              <li>Sie kann kreativ-metonymisch sein: »Haben sich die Leute aus Berlin schon gemeldet? - <span class='inline-examples'>Ja, <span class='w3-tag'>Berlin</span> hat</span> den Vertrag widerrufen.«</li>
              <li>Sie kann idiomatisch-metaphorisch sein: »Ein günstiger Zufall führte auf <span class='inline-examples'>dieser <span class='w3-tag'>Spur</span> zum</span> gesuchten Buch.«</li>
              <li>Sie kann idiomatisch-metonymisch sein: »das <span class='inline-examples'>Flavische <span class='w3-tag'>Kaiserhaus</span>«</span>.</li>
              `,
              `
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-XR</i> ist ein übertragender Gebrauch von nicht-räumlichem Vokabular (nicht-räumlicher Quellbereich: X) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R).</li>
              <li>Die Übertragung kann kreativ-metaphorisch sein: »Dort leuchtet aus <span class='inline-examples'>tiefer <span class='w3-tag'>Dunkelheit</span> die</span> brennende Kerze.«</li>
              <li>Sie kann idiomatisch-metaphorisch sein: »hier rastet <span class='inline-examples'>bei <span class='w3-tag'>Tage</span> der</span> Wanderer«.</li>
              `,
              `
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RR</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R), wobei die räumlichen Konzepte sich in Quell- und Zielbereich unterscheiden oder es sich um unterschiedliche Vertreter desselben räumlichen Konzepts handelt.</li>
              <li>Die Übertragung kann kreativ-metaphorisch sein: »Verschwinde hinter einer <span class='inline-examples'>Wolke, <span class='w3-tag'>Mond</span>, die</span> Gesellschaft meines Professors ist mir lieber!«</li>
              <li>Sie kann idiomatisch-metonymisch sein: »sie macht <span class='inline-examples'>einen <span class='w3-tag'>Seitenweg</span> zur</span> Bibliothek«.</li>
              `
            ],
            [
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `
            ],
            [
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `
            ],
            [
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `
            ],
            [
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `
            ]
          ],
          'grammaticalIndicators': [
            'Orte sind <b>Nomen</b>.',
            'Bewegungen sind <b>Verben und Partizip-Konstruktionen</b>.',
            'Dimensionierungen sind <b>attributiv und adverbial verwendete Adjektive, Adverbien und Mengenangaben</b>.',
            'Positionierungen sind <b>Präpositionen, Lokal-Adverbien, adverbial und attributiv verwendete Adjektive sowie Possessivpronomen und Artikel</b>.',
            'Richtungen sind <b>Präpositionen, Lokal-Adverbien, adverbial verwendete Adjektive und richtungsangebende Nomen ohne Artikel</b>.'
          ],
          'placeholder': 'Wähle eine Annotationsklasse aus...',
          'footer': '<p>Gebaut mit <a href="https://www.w3schools.com/w3css/w3css_downloads.asp">W3.CSS 4.15</a>, <a href="https://fontawesome.com/v4/icons/">Font Awesome 4.7.0</a> und <a href="https://www.favicon-generator.org/">Favicon.ico & App Icon Generator</a>.</p>'
        },
        'english_lang': {
          'main': 'en-US',
          'h2_headings': {
            'categories': 'Categories',
            'example': 'Example text'
          },
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
            `
            <p>In her dream she <span class="w3-tooltip w3-tag">walked<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">directional movement</span></span> into the restaurant.</p>
            <p>»I <span class="w3-tooltip w3-tag">see<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">directional visual perception</span></span> you« opens in our theaters tomorrow.</p>
            <p>Through the peaks, a pale light <span class="w3-tooltip w3-tag">shone<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">directional movement of light</span></span> on the forest path.</p>
            <p>They tried to <span class="w3-tooltip w3-tag">lure<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">co-expressed planned directional movement</span></span> him to the front doorstep.</p>
            `,
            `
            <p>In front of them was a <span class="w3-tooltip w3-tag">huge<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">size of the room</span></span> hall.</p>
            <p>They were still <span class="w3-tooltip w3-tag">250 meters away<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">indication of a distance</span></span>.</p>
            <p><span class="w3-tooltip w3-tag">Over 250<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">indication of an amount with regard to spatial entities</span></span> trees were planted.</p>
            <p>He thought a lot about the <span class="w3-tooltip w3-tag">sheer mass of<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">indication of an amount with regard to spatial entities</span></span> ships.</p>
            `,
            `
            <p><span class="w3-tooltip w3-tag">In<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions the person in the room</span></span> the room with the Impressionists, she gazed at the Renoir for a long time.</p>
            <p>They were floating <span class="w3-tooltip w3-tag">outside<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions the persons outside the house</span></span> <span class="w3-tooltip w3-tag">above<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions the persons above the house</span></span> the <span class="w3-tooltip w3-tag">western<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions the part to the west of other parts</span></span> part <span class="w3-tooltip w3-tag">of<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions the part in the house</span></span> the house.</p>
            <p>It is late evening <span class="w3-tooltip w3-tag">in<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions an implied observer position in the forest</span></span> the forest <span class="w3-tooltip w3-tag">of<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions the forest in the city</span></span> the city.</p>
            `,
            `
            <p>In the room with the Impressionists, she gazed <span class="w3-tooltip w3-tag">at<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">direction of the gaze</span></span> the Renoir for a long time.</p>
            <p>She got <span class="w3-tooltip w3-tag">out<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">direction to the starting point of the movement</span></span> of carriage 7 of the train.</p>
            <p>They turned <span class="w3-tooltip w3-tag">south<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">directional noun without article</span></span>.</p>
            `
          ],
          'annotation_categories': [
            'Place',
            'Movement',
            'Dimensioning',
            'Positioning',
            'Direction'
          ],
          'annotation_classes': [
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
          'annotation_classes_infos': [
            [
              `
              <li>Containers are spaces or areas in which characters can prototypically reside.</li>
              <li>Containers can move <span class='inline-examples'>(»the <span class='w3-tag'>taxi</span>«)</span>.</li>
              <li>Containers can have specific boundaries <span class='inline-examples'>(»the <span class='w3-tag'>castle</span>«)</span> or diffuse <span class='inline-examples'>(»the <span class='w3-tag'>mountain top</span>«)</span>.</li>
              <li>The annotated nouns can denote individual places, genera <span class='inline-examples'>(»a <span class='w3-tag'>city</span>«)</span> or several places <span class='inline-examples'>(»many <span class='w3-tag'>cities</span>«)</span>.</li>
              `,
              `
              <li>Containers are spaces or areas in which characters can prototypically reside.</li>
              <li>They can be the unmoved destination and starting point of directed movements in a <b>movement context (MC)</b> <span class='inline-examples'>(»to run into the <span class='w3-tag'>forest</span>«)</span>.</li>
              <li>For a movement context to exist, there must be an annotated movement in the co-text <span class='inline-examples'>(»to <span class='w3-tag'>run</span> into the forest«)</span>.</li>
              <li>A movement can also be a perception or something else: See the information on the movement category.</li>
              `,
              `
              <li>Objects have spatial dimensions, but are not containers in which characters can prototypically reside.</li>
              <li><b>With the class <i>PLACE-OBJECT</i> we only annotate geographical, astronomical or space-structural objects</b>.</li>
              <li>Geographical objects are objects that can appear on world, country and city maps <span class='inline-examples'>(»<span class='w3-tag'>Schiller statue</span>«)</span>.</li>
              <li>Astronomical objects are objects that can appear on star charts and celestial globes <span class='inline-examples'>(»<span class='w3-tag'>Moon</span>«)</span>.</li>
              <li>Space-structural objects are objects that mark the boundaries of a room or area <span class='inline-examples'>(»<span class='w3-tag'>door</span>«</span>, <span class='inline-examples'>»<span class='w3-tag'>ceiling</span>«</span>, <span class='inline-examples'>»<span class='w3-tag'>walls</span>«)</span>.</li>
              <li>Every annotated object must belong to a container in which characters can prototypically reside: The clasp of a handbag therefore does not count as a space-structural object, but the door of a car does.</li>
              `,
              `
              <li>Objects have spatial dimensions, but are not containers in which characters can prototypically reside.</li>
              <li><b>With the class <i>PLACE-OBJECT-MC</i> we annotate, in contrast to the class <i>PLACE-OBJECT</i>, all types of objects</b> that are the unmoved destination and starting point of directed movements in a <b>movement context (MC)</b> <span class='inline-examples'>(»to move towards the <span class='w3-tag'>painting</span>«)</span>.</li>
              <li>For a movement context to exist, there must be an annotated movement in the co-text <span class='inline-examples'>(»to <span class='w3-tag'>move</span> towards the painting«)</span>.</li>
              <li>A movement can also be a perception or something else: See the information on the movement category.</li>
              <li>Each annotated object must be located in a container in which characters can prototypically reside: The painting viewed in an exhibition room is annotated, the painting in a bag is not.</li>
              `,
              `
              <li>In contrast to containers and objects, abstracts have no spatial extension, but are designations for points or geometric figures.</li>
              <li>Examples: <span class='inline-examples'>»the <span class='w3-tag'>center</span> of the room«</span>, <span class='inline-examples'>»all four <span class='w3-tag'>corners</span> of the room«</span>, <span class='inline-examples'>»<span class='w3-tag'>North Pole</span>«</span>, <span class='inline-examples'>»at this <span class='w3-tag'>point</span> in the room«</span>, <span class='inline-examples'>»the drove in <span class='w3-tag'>circles</span>«</span>.</li>
              <li>Each annotated abstract must be located in a container in which characters can prototypically reside.</li>
              `,
              `
              <li>In contrast to containers and objects, abstracts have no spatial extension, but are designations for points or geometric figures.</li>
              <li>They can be the unmoved destination and starting point of directed movements in a <b>movement context (MC)</b> <span class='inline-examples'>(»to run to the said <span class='w3-tag'>site</span>«)</span>.</li>
              <li>For a movement context to exist, there must be an annotated movement in the co-text <span class='inline-examples'>(»to <span class='w3-tag'>run</span> to the said site«)</span>.</li>
              <li>A movement can also be a perception or something else: See the information on the movement category.</li>
              <li>Each annotated abstract must be located in a container in which characters can prototypically reside.</li>
              `,
              `
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpX</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express non-spatial issues (non-spatial target domain: X).</li>
              <li>The transferred use can be creative-metaphorical: »She got lost in <span class='inline-examples'>her <span class='w3-tag'>mind palace</span>.«</span></li>
              <li>It can be creative-metonymic: »Have the people from Berlin contacted you yet? - <span class='inline-examples'>Yes, <span class='w3-tag'>Berlin</span> has</span> canceled the contract.«</li>
              <li>It can be idiomatic-metaphorical: »A favorable coincidence led on <span class='inline-examples'>this <span class='w3-tag'>track</span> to the</span> book I was looking for.«</li>
              <li>It can be idiomatic-metonymic: »the <span class='inline-examples'>Flavian <span class='w3-tag'>imperial house</span>«</span>.</li>
              `,
              `
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-XSp</i> is a transferred use of non-spatial vocabulary (non-spatial source domain: X) to express spatial issues (spatial target domain: Sp).</li>
              <li>The transferred use can be creative-metaphorical: »There, out of <span class='inline-examples'>deep <span class='w3-tag'>darkness</span> shines the</span> burning candle.«</li>
              <li>It can be idiomatic-metaphorical: »here the hiker rests <span class='inline-examples'>by <span class='w3-tag'>day</span>«.</span></li>
              `,
              `
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpSp</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express spatial issues (spatial target domain: Sp), where the spatial concepts differ in the source and target domains or the related entities are different representatives of the same spatial concept.</li>
              <li>The transferred use can be creative-metaphorical: »Disappear behind a <span class='inline-examples'>cloud, <span class='w3-tag'>Moon</span>, I prefer the</span> company of my professor!«</li>
              <li>It can be idiomatic-metonymic: »she makes <span class='inline-examples'>a <span class='w3-tag'>side path</span> to the</span> library«.</li>
              `
            ],
            [
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `
            ],
            [
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `
            ],
            [
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `
            ],
            [
              `
              
              `,
              `
              
              `,
              `
              
              `,
              `
              
              `
            ]
          ],
          'grammaticalIndicators': [
            'Places are <b>nouns</b>.',
            'Movements are <b>verbs and participle constructions</b>.',
            'Dimensionings are <b>attributively and adverbially used adjectives, adverbs and quantities</b>.',
            'Positionings are <b>prepositions, local adverbs, adverbially and attributively used adjectives as well as possessive pronouns and articles</b>.',
            'Directions are <b>prepositions, local adverbs, adverbially used adjectives and directional nouns without articles</b>.'
          ],
          'placeholder': 'Select an annotation class...',
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
        const _categorieNames = languageDict[clickedLanguageButton.id]['annotation_categories'];
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
          annotationClassTag.textContent = languageDict[clickedLanguageButton.id]['annotation_classes'][accordionPanelIndex][annotationClassTagIndex];
        }
      }
      // - grammatical indicators in categories > accordion > accordion-panel
      for (const [accordionPanelIndex, accordionPanel] of accordionPanels.entries()) {
        accordionPanel.querySelector('.grammaticalIndicator').innerHTML = languageDict[clickedLanguageButton.id]['grammaticalIndicators'][accordionPanelIndex];
      }
      // - placeholder in categories > accordion > accordion-panel > annotation-class-infos
      for (const accordionPanel of accordionPanels) {
        const placeholders = [...accordionPanel.querySelectorAll('.placeholder > p')];
        for (const placeholder of placeholders) {
          placeholder.textContent = languageDict[clickedLanguageButton.id]['placeholder'];
        }
      }
      // - h5 headings in categories > accordion > accordion-panel > annotation-class-infos > div[data-id]
      for (const [accordionPanelIndex, accordionPanel] of accordionPanels.entries()) {
        const h5_headings = [...accordionPanel.querySelectorAll('h5')];
        for (const [headingIndex, heading] of h5_headings.entries()) {
          const _classInfoHeadings = languageDict[clickedLanguageButton.id]['annotation_classes'][accordionPanelIndex];
          heading.textContent = _classInfoHeadings[headingIndex];
        }
      }
      // - li in categories > accordion > accordion-panel > annotation-class-infos > div[data-id] > ul
      for (const [accordionPanelIndex, accordionPanel] of accordionPanels.entries()) {
        const annotationClassesInfos = [...accordionPanel.querySelectorAll('ul')];
        for (const [annotationClassInfosIndex, annotationClassInfos] of annotationClassesInfos.entries()) {
          annotationClassInfos.innerHTML = languageDict[clickedLanguageButton.id]['annotation_classes_infos'][accordionPanelIndex][annotationClassInfosIndex];
        }
      }
      // - beispieltextBtns in example
      const beispieltextBtns = [...document.querySelectorAll('div[data-id="beispieltextBtns"] > div[data-id^="beispieltextBtns_"]')];
      for (const [beispieltextBtnIndex, beispieltextBtn] of beispieltextBtns.entries()) {
        beispieltextBtn.textContent = languageDict[clickedLanguageButton.id]['annotation_categories'][beispieltextBtnIndex];
      }
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
