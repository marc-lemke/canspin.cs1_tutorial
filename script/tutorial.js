const currentCS1version = '1.1.0';
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
        span.children[0].classList.remove('w3-hide');
      }
    } else {
      beispieltextBtn.classList.add('w3-white');
      beispieltextBtn.classList.remove(colorClass);
      const spanList = [...document.querySelectorAll(`blockquote[data-id="beispieltextText"] > p > span[class^="${category}"]`)];
      for (const span of spanList) {
        span.classList.remove(colorClass);
        span.children[0].classList.add('w3-hide');
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
            <p>Sie saß in ihrem <span class='w3-tooltip-class-examples w3-tag'>Zimmer<span class='farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity'>Container für Figuren</span></span> in <span class='w3-tooltip-class-examples w3-tag'>Köln<span class='farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity'>geografischer Container für Figuren</span></span>.</p>
            <p>Plötzlich merkte er, dass er schon wieder an der <span class='w3-tooltip-class-examples w3-tag'>Schiller-Statue<span class='farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity'>geografisches Objekt</span></span> vorbeilief.</p>
            <p><span class='w3-tooltip-class-examples w3-tag'>Fenster<span class='farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity'>raum-strukturelles Objekt</span></span> und <span class='w3-tooltip-class-examples w3-tag'>Türen<span class='farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity'>raum-strukturelles Objekt</span></span> sollten immer fest verschlossen sein.</p>
            <p>»In der <span class='w3-tooltip-class-examples w3-tag'>Mitte<span class='farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity'>abstrakter räumlicher Punkt</span></span> des Tischs lag das verschollene Buch«, las er laut aus der Mitte des Buches vor.</p>
            `,
            `
            <p>Im Traum <span class='w3-tooltip-class-examples w3-tag'>spazierte<span class='farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity'>gerichtete Bewegung</span></span> sie einfach in das Restaurant.</p>
            <p>»Brügge <span class='w3-tooltip-class-examples w3-tag'>sehen<span class='farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity'>gerichtete optische Wahrnehmung</span></span> ... und sterben?« läuft ab morgen in unserem Kino.</p>
            <p>Durch die Gipfel <span class='w3-tooltip-class-examples w3-tag'>schien<span class='farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity'>Bewegung von Licht</span></span> bleiches Licht auf den Waldweg.</p>
            <p>Sie versuchten, ihn zur vorderen Türschwelle zu <span class='w3-tooltip-class-examples w3-tag'>locken<span class='farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity'>mitausgedrückte geplante gerichtete Bewegung</span></span>.</p>
            `,
            `
            <p>Vor ihnen lag eine <span class='w3-tooltip-class-examples w3-tag'>riesige<span class='farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>Größe des Raums</span></span> Halle.</p>
            <p>Sie waren noch <span class='w3-tooltip-class-examples w3-tag'>250 Meter entfernt<span class='farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>Entfernungsangabe</span></span>.</p>
            <p><span class='w3-tooltip-class-examples w3-tag'>Über 250<span class='farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>Mengenangabe bezüglich räumlicher Entitäten</span></span> Bäume wurden geplanzt.</p>
            <p>Er dachte viel über die <span class='w3-tooltip-class-examples w3-tag'>schiere Masse der<span class='farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>Mengenangabe bezüglich räumlicher Entitäten</span></span> Schiffe nach.</p>
            `,
            `
            <p><span class='w3-tooltip-class-examples w3-tag'>Im<span class='farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>positioniert die Person im Saal</span></span> Saal mit den Impressionisten blickte sie lange auf den Renoir.</p>
            <p>Sie schwebten <span class='w3-tooltip-class-examples w3-tag'>draußen<span class='farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>positioniert die Personen außerhalb des Hauses</span></span> <span class='w3-tooltip-class-examples w3-tag'>oberhalb<span class='farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>positioniert die Personen oberhalb des Hauses</span></span> des <span class='w3-tooltip-class-examples w3-tag'>westlichen<span class='farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>positioniert den Teil westlich von anderen Teilen</span></span> Teils <span class='w3-tooltip-class-examples w3-tag'>des<span class='farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>positioniert den Teil im Haus</span></span> Hauses.</p>
            <p>Es ist später Abend <span class='w3-tooltip-class-examples w3-tag'>im<span class='farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>positioniert eine implizierte Beobachterposition im Wald</span></span> Wald <span class='w3-tooltip-class-examples w3-tag'>der<span class='farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>positioniert den Wald in der Stadt</span></span> Stadt.</p>
            <p>Sie lief <span class='w3-tooltip-class-examples w3-tag'>in<span class='farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity'>positioniert sie in der Halle</span></span> der Halle.</p>
            `,
            `
            <p>Im Saal mit den Impressionisten blickte sie lange <span class='w3-tooltip-class-examples w3-tag'>auf<span class='farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity'>Richtung des Blicks</span></span> den Renoir.</p>
            <p>Sie stieg <span class='w3-tooltip-class-examples w3-tag'>aus<span class='farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity'>Richtung zum Ausgangpunkt der Bewegung</span></span> Waggon 7 des Zuges.</p>
            <p>Sie bogen <span class='w3-tooltip-class-examples w3-tag'>nach<span class='farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity'>Richtung der Bewegung</span></span> <span class='w3-tooltip-class-examples w3-tag'>Süden<span class='farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity'>richtungsangebendes Nomen ohne Artikel</span></span> ab.</p>
            <p>Sie lief <span class='w3-tooltip-class-examples w3-tag'>in<span class='farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity'>gibt ihre Laufrichtung an</span></span> die Halle.</p>
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
              <li>Container sind Räume oder Bereiche, in denen sich menschliche Figuren prototypischerweise aufhalten können.</li>
              <li>Container können sich bewegen <span class='inline-examples'>(»das <span class='w3-tag'>Taxi</span>«)</span>.</li>
              <li>Container können konkrete Grenzen haben <span class='inline-examples'>(»das <span class='w3-tag'>Schloss</span>«)</span> oder auch diffuse <span class='inline-examples'>(»der <span class='w3-tag'>Berggipfel</span>«)</span>.</li>
              <li>Die annotierten Nomen können individuelle Orte, Gattungen <span class='inline-examples'>(»eine <span class='w3-tag'>Stadt</span>«)</span> oder mehrere Orte <span class='inline-examples'>(»viele <span class='w3-tag'>Städte</span>«)</span> bezeichnen.</li>
              `,
              `
              <li>Container sind Räume oder Bereiche, in denen sich menschliche Figuren prototypischerweise aufhalten können.</li>
              <li>Sie können unbewegter Ziel- und Ausgangspunkt von gerichteten Bewegungen in einem <b>Bewegungskontext (BK)</b> sein (»in <span class='inline-examples'>den <span class='w3-tag'>Wald</span></span> laufen«).</li>
              <li>Damit ein Bewegungskontext vorliegt, muss sich eine annotierte oder durch andere Ausdrücke implizierte Bewegung im Kotext befinden (»in den <span class='inline-examples'>Wald <span class='w3-tag'>laufen</span></span>«).</li>
              <li>Eine Bewegung kann auch eine Wahrnehmung oder anderes sein: Siehe die Infos zur Bewegungskategorie.</li>
              `,
              `
              <li>Objekte haben räumliche Ausdehnung, sind aber keine Container, in denen sich menschliche Figuren prototypischerweise aufhalten können.</li>
              <li><b>Mit der Klasse <i>ORT-OBJEKT</i> annotieren wir ausschließlich geografische, astronomische oder raumstrukturelle Objekte.</b></li>
              <li>Geografische Objekte sind Objekte, die auf Welt-, Land- und Stadtkarten auftauchen können <span class='inline-examples'>(»<span class='w3-tag'>Schiller-Statue</span>«)</span>.</li>
              <li>Astronomische Objekte sind Objekte, die in Sternenkarten und auf Himmelsgloben auftauchen können <span class='inline-examples'>(»<span class='w3-tag'>Mond</span>«)</span>.</li>
              <li>Raumstrukturelle Objekte sind Objekte, die die Grenzen eines Raumes markieren <span class='inline-examples'>(»<span class='w3-tag'>Tür</span>«</span>, <span class='inline-examples'>»<span class='w3-tag'>Zimmerdecke</span>«</span>, <span class='inline-examples'>»<span class='w3-tag'>Wände</span>«)</span>.</li>
              <li>Jedes annotierte Objekt muss zu einem Container gehören, in dem sich auch menschliche Figuren prototypischerweise aufhalten können: Der Verschluss einer Handtasche zählt daher nicht als raumstrukturelles Objekt, die Tür eines Autos schon.</li>
              `,
              `
              <li>Objekte haben räumliche Ausdehnung, sind aber keine Container, in denen sich menschliche Figuren prototypischerweise aufhalten können.</li>
              <li><b>Mit der Klasse <i>ORT-OBJEKT-BK</i> annotieren wir ausschließlich geografische, astronomische oder raumstrukturelle Objekte</b>, die unbewegter Ziel- und Ausgangspunkt von gerichteten Bewegungen in einem <b>Bewegungskontext (BK)</b> sind (»auf <span class='inline-examples'>das <span class='w3-tag'>Fenster</span></span> zugehen«).</li>
              <li>Damit ein Bewegungskontext vorliegt, muss sich eine annotierte oder durch andere Ausdrücke implizierte Bewegung im Kotext befinden (»auf das <span class='inline-examples'>Fenster <span class='w3-tag'>zugehen</span></span>«).</li>
              <li>Eine Bewegung kann auch eine Wahrnehmung oder anderes sein: Siehe die Infos zur Bewegungskategorie.</li>
              <li>Jedes annotierte Objekt muss sich in einem Container befinden, in dem sich auch menschliche Figuren prototypischerweise aufhalten können: Das angeschaute Fenster eines Hotelzimmers wird annotiert, das angeschaute Fenster eines Puppenhauses nicht.</li>
              `,
              `
              <li>Abstrakta haben im Gegensatz zu Containern und Objekten keine räumliche Ausdehnung, sondern sind Bezeichnungen für Punkte oder geometrische Figuren.</li>
              <li>Beispiele: <span class='inline-examples'>»die <span class='w3-tag'>Mitte</span></span> des Saales«, <span class='inline-examples'>»alle vier <span class='w3-tag'>Ecken</span></span> des Zimmers«, <span class='inline-examples'>»<span class='w3-tag'>Nordpol</span>«</span>, »an <span class='inline-examples'>dieser <span class='w3-tag'>Stelle</span></span> im Raum«, »sie fuhren <span class='inline-examples'>im <span class='w3-tag'>Kreis</span></span>«.</li>
              <li>Jedes annotierte Abstraktum muss sich in einem Container befinden, in dem sich auch menschliche Figuren prototypischerweise aufhalten können.</li>
              `,
              `
              <li>Abstrakta haben im Gegensatz zu Containern und Objekten keine räumliche Ausdehnung, sondern sind Bezeichnungen für Punkte oder geometrische Figuren.</li>
              <li>Sie können unbewegter Ziel- und Ausgangspunkt von gerichteten Bewegungen in einem <b>Bewegungskontext (BK)</b> sein (»zur <span class='inline-examples'>besagten <span class='w3-tag'>Stelle</span></span> laufen«).</li>
              <li>Damit ein Bewegungskontext vorliegt, muss sich eine annotierte oder durch andere Ausdrücke implizierte Bewegung im Kotext befinden (»zur besagten <span class='inline-examples'>Stelle <span class='w3-tag'>laufen</span></span>«).</li>
              <li>Eine Bewegung kann auch eine Wahrnehmung oder anderes sein: Siehe die Infos zur Bewegungskategorie.</li>
              <li>Jedes annotierte Abstraktum muss sich in einem Container befinden, in dem sich auch menschliche Figuren prototypischerweise aufhalten können.</li>
              `,
              `
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RX</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck nicht-räumlicher Sachverhalte (nicht-räumlicher Zielbereich: X). »Räumlich« bedeutet für uns im Projekt spezifisch: annotierbar in einer der Hauptklassen einer Kategorie.</li>
              <li>Der Ausdruck oder der Kopf des Kompositums muss nach den Informationen eines Wörterbuchs (für das Deutsche: <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>) im kontemporären Gebrauch auch räumlich im Sinne eines Ortes verwendet werden, also als Bezeichnung für einen Container, ein geografisches, astronomisches oder raumstrukturelles Objekt oder Abstraktum.</li>
              <li>Die Übertragung kann kreativ-metaphorisch sein: »Sie verirrte sich in <span class='inline-examples'>ihrem <span class='w3-tag'>Gedankenpalast</span></span>.«</li>
              <li>Sie kann kreativ-metonymisch sein: »Haben sich die Leute aus Berlin schon gemeldet? - <span class='inline-examples'>Ja, <span class='w3-tag'>Berlin</span></span> hat abgesagt.«</li>
              <li>Sie kann idiomatisch-metaphorisch sein: »Ein günstiger Zufall führte auf <span class='inline-examples'>dieser <span class='w3-tag'>Spur</span></span> zum gesuchten Buch.«</li>
              <li>Sie kann idiomatisch-metonymisch sein: »das <span class='inline-examples'>Flavische <span class='w3-tag'>Kaiserhaus</span></span>«.</li>
              `,
              `
              <li class='w3-text-black'><b>Diese Klasse wird im CANSpiN-Projekt seit CS1 v1.1.0 nicht mehr berücksichtigt.</b></li>
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-XR</i> ist ein übertragender Gebrauch von nicht-räumlichem Vokabular (nicht-räumlicher Quellbereich: X) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R).</li>
              <li>Die Übertragung kann kreativ-metaphorisch sein: »Dort leuchtet aus <span class='inline-examples'>tiefer <span class='w3-tag w3-grey w3-text-grey'>Dunkelheit</span></span> die brennende Kerze.«</li>
              <li>Sie kann idiomatisch-metaphorisch sein: »hier rastet <span class='inline-examples'>bei <span class='w3-tag w3-grey w3-text-grey'>Tage</span></span> der Wanderer«.</li>
              `,
              `
              <li class='w3-text-black'><b>Diese Klasse wird im CANSpiN-Projekt seit CS1 v1.1.0 nicht mehr berücksichtigt.</b></li>
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RR</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R), wobei die räumlichen Konzepte sich in Quell- und Zielbereich unterscheiden oder es sich um unterschiedliche Vertreter desselben räumlichen Konzepts handelt.</li>
              <li>Die Übertragung kann kreativ-metaphorisch sein: »Verschwinde hinter einer <span class='inline-examples'>Wolke, <span class='w3-tag w3-grey w3-text-grey'>Mond</span></span>, die Gesellschaft meines Professors ist mir lieber!«</li>
              <li>Sie kann idiomatisch-metonymisch sein: »sie macht <span class='inline-examples'>einen <span class='w3-tag w3-grey w3-text-grey'>Seitenweg</span></span> zur Bibliothek«.</li>
              `
            ],
            [
              `
              <li>Bewegungen von Subjekten sind gerichtete Bewegungen, die von Personen ausgeführt werden.</li>
              <li>Diese Bewegungen können beabsichtigt sein (»<span class='inline-examples'>sie <span class='w3-tag'>spazierte</span></span> durch die Stadt«).</li>
              <li>Sie können aber auch ohne Intention vonstattengehen (»<span class='inline-examples'>er <span class='w3-tag'>fiel</span></span> der Länge <span class='inline-examples'>nach <span class='w3-tag'>hin</span></span>«).</li>
              <li>Voneinander getrennte, zum Bewegungsverb gehörige Wörter werden im Satz zusammen als eine Bewegung annotiert.</li>
              <li>Verben, die eine gerichtete Bewegung zwar nicht direkt, aber zwingend mitausdrücken, werden auch als Bewegungen annotiert (»<span class='inline-examples'>plötzlich <span class='w3-tag'>bremste</span></span> der Fahrer«).</li>
              <li>Auch Partizipien drücken Bewegungen aus oder zwingend mit aus (»<span class='inline-examples'>hinter <span class='w3-tag'>vorgehaltener</span></span> Hand«).</li>
              `,
              `
              <li>Bewegungen von Objekten sind gerichtete Bewegung, die die Bewegung eines Objekts beschreiben (»der <span class='inline-examples'>Felsen <span class='w3-tag'>stürzte</span></span> in die Tiefe«).</li>
              <li>Voneinander getrennte, zum Bewegungsverb gehörige Wörter werden im Satz zusammen als eine Bewegung annotiert.</li>
              <li>Verben, die eine gerichtete Bewegung zwar nicht direkt, aber zwingend mitausdrücken, werden auch als Bewegungen annotiert (»<span class='inline-examples'>schließlich <span class='w3-tag'>blieb</span></span> der Felsbrocken noch vor dem <span class='inline-examples'>Abgrund <span class='w3-tag'>liegen</span></span>«).</li>
              <li>Auch Partizipien drücken Bewegungen aus oder zwingend mit aus (»<span class='inline-examples'>zig <span class='w3-tag'>herunterstürzende</span></span> Felsbrocken«).</li>
              `,
              `
              <li>Bewegungen von Licht sind Verben, die einerseits das Scheinen von Licht beschreiben und damit eine gerichtete Bewegung ausdrücken (»die <span class='inline-examples'>Lampe <span class='w3-tag'>erhellte</span></span> jede Ecke des Zimmers«).</li>
              <li>Andererseits sind auch Verben der optischen Wahrnehmung gemeint (»<span class='inline-examples'>sie <span class='w3-tag'>schaute</span></span> über die <span class='inline-examples'>Menschen <span class='w3-tag'>hinweg</span></span>«).</li>
              <li>Voneinander getrennte, zum Bewegungsverb gehörige Wörter werden im Satz zusammen als eine Bewegung annotiert.</li>
              <li>Verben, die eine gerichtete Bewegung zwar nicht direkt, aber zwingend mitausdrücken, werden auch als Bewegungen annotiert (»das <span class='inline-examples'>Feuer <span class='w3-tag'>brannte</span></span> im Kamin«).</li>
              <li>Wenn ein Verb logisch mehrere Wahrnehmungsqualitäten ausdrückt, ist die prototypische Bedeutung zu beachten, wie sie sich aus einem Wörterbuchartikel zum entsprechenden Verb erschließen lässt (für das Deutsche: <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>).</li>
              <li>Auch Partizipien drücken Bewegungen aus oder zwingend mit aus (»unter einer <span class='inline-examples'>hell <span class='w3-tag'>scheinenden</span></span> Sonne«).</li>
              `,
              `
              <li>Bewegungen von Schall sind Verben, die einerseits das Produzieren von Geräuschen beschreiben und damit eine gerichtete Bewegung ausdrücken (»<span class='inline-examples'>er <span class='w3-tag'>fragte</span></span>: 'Wann?'«).</li>
              <li>Andererseits sind auch Verben der akustischen Wahrnehmung gemeint (»<span class='inline-examples'>sie <span class='w3-tag'>hörten</span></span> dem Gesang noch eine <span class='inline-examples'>Weile <span class='w3-tag'>zu</span></span>«).</li>
              <li>Voneinander getrennte, zum Bewegungsverb gehörige Wörter werden im Satz zusammen als eine Bewegung annotiert.</li>
              <li>Verben, die eine gerichtete Bewegung zwar nicht direkt, aber zwingend mitausdrücken, werden auch als Bewegungen annotiert (»das <span class='inline-examples'>Feuer <span class='w3-tag'>knisterte</span></span> im Kamin«).</li>
              <li>Wenn ein Verb logisch mehrere Wahrnehmungsqualitäten ausdrückt, ist die prototypische Bedeutung zu beachten, wie sie sich aus einem Wörterbuchartikel zum entsprechenden Verb erschließen lässt (für das Deutsche: <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>).</li>
              <li>Auch Partizipien drücken Bewegungen aus oder zwingend mit aus (»der <span class='inline-examples'>soeben <span class='w3-tag'>gerammte</span></span> Pfeiler rührte sich nicht«).</li>
              `,
              `
              <li>Bewegungen von Geruch sind Verben, die einerseits das Verbreiten von Gerüchen beschreiben und damit eine gerichtete Bewegung ausdrücken (»der <span class='inline-examples'>Käse <span class='w3-tag'>verbreitete</span></span> einen furchtbaren Gestank«).</li>
              <li>Andererseits sind auch Verben der olfaktischen Wahrnehmung gemeint (»<span class='inline-examples'>es <span class='w3-tag'>roch</span></span> nach Rosen und Flieder«).</li>
              <li>Voneinander getrennte, zum Bewegungsverb gehörige Wörter werden im Satz zusammen als eine Bewegung annotiert.</li>
              <li>Verben, die eine gerichtete Bewegung zwar nicht direkt, aber zwingend mitausdrücken, werden auch als Bewegungen annotiert (»das <span class='inline-examples'>Feuer <span class='w3-tag'>qualmte</span></span> im Kamin«).</li>
              <li>Wenn ein Verb logisch mehrere Wahrnehmungsqualitäten ausdrückt, ist die prototypische Bedeutung zu beachten, wie sie sich aus einem Wörterbuchartikel zum entsprechenden Verb erschließen lässt (für das Deutsche: <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>).</li>
              <li>Auch Partizipien drücken Bewegungen aus oder zwingend mit aus (»<span class='inline-examples'>die <span class='w3-tag'>duftenden</span></span> Rosen«).</li>
              `,
              `
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RX</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck nicht-räumlicher Sachverhalte (nicht-räumlicher Zielbereich: X). »Räumlich« bedeutet für uns im Projekt spezifisch: annotierbar in einer der Hauptklassen einer Kategorie.</li>
              <li>Der Ausdruck muss nach den Informationen eines Wörterbuchs (für das Deutsche: <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>) im kontemporären Gebrauch auch räumlich im Sinne einer Bewegung verwendet werden, also als Bezeichnung für die Bewegung von Subjekten, Objekten, von Licht, Schall und Geruch oder deren Wahrnehmung.</li>
              <li>Die Übertragung kann kreativ-metaphorisch sein: »Der <span class='inline-examples'>Mond <span class='w3-tag'>sang</span></span> mir das Lied meiner Kindheit.«</li>
              <li>Sie kann idiomatisch-metaphorisch sein: »Der <span class='inline-examples'>Anblick <span class='w3-tag'>brachte</span></span> mir die Situation von damals in Erinnerung.«</li>
              <li>Sie kann idiomatisch-metonymisch sein: »<span class='inline-examples'>Das <span class='w3-tag'>klingt</span></span> wie der Titel eines Action-Films.«</li>
              `,
              `
              <li class='w3-text-white'><b>Diese Klasse wird im CANSpiN-Projekt seit CS1 v1.1.0 nicht mehr berücksichtigt.</b></li>
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-XR</i> ist ein übertragender Gebrauch von nicht-räumlichem Vokabular (nicht-räumlicher Quellbereich: X) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R).</li>
              <li>Die Übertragung kann kreativ-metonymisch sein: »<span class='inline-examples'>Sie <span class='w3-tag w3-grey w3-text-grey'>schummelten</span></span> sich durch das Labyrinth.«</li>
              `,
              `
              <li class='w3-text-white'><b>Diese Klasse wird im CANSpiN-Projekt seit CS1 v1.1.0 nicht mehr berücksichtigt.</b></li>
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RR</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R), wobei die räumlichen Konzepte sich in Quell- und Zielbereich unterscheiden oder es sich um unterschiedliche Vertreter desselben räumlichen Konzepts handelt.</li>
              <li>Die Übertragung kann kreativ-metaphorisch sein: »<span class='inline-examples'>Leise <span class='w3-tag w3-grey w3-text-grey'>wispert</span></span> das Laub des Waldes.«</li>
              <li>Sie kann kreativ-metonymisch sein: »Mit letzter <span class='inline-examples'>Kraft <span class='w3-tag w3-grey w3-text-grey'>hechelte</span></span> er durch die Ziellinie.«</li>
              <li>Sie kann idiomatisch-metaphorisch sein: »Dieser <span class='inline-examples'>Weg <span class='w3-tag w3-grey w3-text-grey'>führt</span></span> bis zu den Toren der Stadt.«</li>
              <li>Sie kann idiomatisch-metonymisch sein: »<span class='inline-examples'>Er <span class='w3-tag w3-grey w3-text-grey'>schlug</span></span> das <span class='inline-examples'>Buch <span class='w3-tag w3-grey w3-text-grey'>auf</span></span>.« (Ursprünglich für: Öffnen der Messing-Schließen mittelalterlicher Bücher durch Draufschlagen)</li>
              `
            ],
            [
              `
              <li>Ein die Größe dimensionierender Ausdruck verweist direkt auf die Größe oder Ausdehnung von räumlichen Entitäten (»<span class='inline-examples'><span class='w3-tag'>breites</span></span> Auto«, »<span class='inline-examples'><span class='w3-tag'>kleiner</span></span> Bereich«, »<span class='inline-examples'><span class='w3-tag'>zierliches</span></span> Fräulein«, »<span class='inline-examples'><span class='w3-tag'>endlose</span></span> Prärie«).</li>
              <li>Auch Phrasen mit oder ohne Verbalkern können eine dimensionierende Funktion haben und werden dann als Dimensionierung annotiert (»Die Weizenfelder <span class='inline-examples'>lagen <span class='w3-tag'>in ihrer unüberschaubaren Größe</span></span> vor ihr.«, »Dieser Raum, <span class='inline-examples'>scheinbar <span class='w3-tag'>das gesamte Schloss ausfüllend</span></span>, war wahrscheinlich Ort opulenter Feste gewesen.«).</li>
              `,
              `
              <li>Ein die Menge räumlicher Entitäten angebender Ausdruck verweist indirekt auf die Ausdehnung der räumlichen Entitäten, die sie zusammengenommen haben (»<span class='inline-examples'><span class='w3-tag'>32</span></span>Räder befanden sich noch im Lager.«).</li>
              <li>Es müssen mindestens zwei Entitäten zur Menge gehören, da in vielen Fällen nicht zwischen Mengenangabe und Klassenzugehörigkeit unterschieden werden kann (»Sie sahen ein Auto.«, »Sie sahen <span class='inline-examples'>zwei <span class='w3-tag'>Autos</span></span>.«).</li>
              <li>Auch Phrasen mit oder ohne Verbalkern können eine dimensionierende Funktion haben und werden dann als Dimensionierung annotiert (»Durch <span class='inline-examples'>die <span class='w3-tag'>Masse von</span></span> Bäumen war ihnen der Weg versperrt.«).</li>
              `,
              `
              <li>Ein einen Abstand angebender Ausdruck verweist direkt auf den Abstand zwischen zwei räumlichen Entitäten (»Bis zum Gipfel waren <span class='inline-examples'>es <span class='w3-tag'>250 Meter</span></span>.«).</li>
              <li>Auch Phrasen mit oder ohne Verbalkern können eine dimensionierende Funktion haben und werden dann als Dimensionierung annotiert (»Und <span class='inline-examples'><span class='w3-tag'>kaum ein Dutzend Kilometer entfernt</span></span> erblühen Universitäten.«).</li>
              `,
              `
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RX</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck nicht-räumlicher Sachverhalte (nicht-räumlicher Zielbereich: X). »Räumlich« bedeutet für uns im Projekt spezifisch: annotierbar in einer der Hauptklassen einer Kategorie.</li>
              <li>Der Ausdruck muss nach den Informationen eines Wörterbuchs (für das Deutsche: <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>) im kontemporären Gebrauch auch räumlich im Sinne einer Dimensionierung verwendet werden, also als Ausdruck für eine räumliche Größe oder einen Abstand.</li>
              <li>Mengenangaben funktionieren im Gegensatz zu Größen- und Abstandsangaben nur räumlich mit Bezug auf eine räumliche Entität: Sie können mit der Übertragungsklasse also nicht erfasst werden.</li>
              <li>Die Übertragung kann idiomatisch-metaphorisch sein: »Das <span class='inline-examples'>waren <span class='w3-tag'>höchst</span></span> unerfreuliche Nachrichten.«</li>
              `,
              `
              <li class='w3-text-black'><b>Diese Klasse wird im CANSpiN-Projekt seit CS1 v1.1.0 nicht mehr berücksichtigt.</b></li>
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-XR</i> ist ein übertragender Gebrauch von nicht-räumlichem Vokabular (nicht-räumlicher Quellbereich: X) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R).</li>
              <li>Die Übertragung kann kreativ-metonymisch sein: »Die Stadt <span class='inline-examples'>lag <span class='w3-tag w3-grey w3-text-grey'>wenige Wegstunden entfernt</span></span> von ihnen.«</li>
              `,
              `
              <li class='w3-text-black'><b>Diese Klasse wird im CANSpiN-Projekt seit CS1 v1.1.0 nicht mehr berücksichtigt.</b></li>
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RR</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R), wobei die räumlichen Konzepte sich in Quell- und Zielbereich unterscheiden oder es sich um unterschiedliche Vertreter desselben räumlichen Konzepts handelt.</li>
              <li>Die Übertragung kann idiomatisch-metaphorisch sein: »Die Zahl der täglichen Besucher ist inzwischen <span class='inline-examples'>so <span class='w3-tag w3-grey w3-text-grey'>groß</span></span> geworden.«</li>
              `
            ],
            [
              `
              <li>Positionierungen drücken die räumliche Relation zwischen zwei räumlichen Entitäten aus (»er befand <span class='inline-examples'>sich <span class='w3-tag'>im</span></span> Innenhof«, »sie <span class='inline-examples'>schwebten <span class='w3-tag'>draußen</span></span> <span class='inline-examples'><span class='w3-tag'>oberhalb</span></span> des Hauses«).</li>
              <li>Eine der Entitäten kann dabei implizit bleiben (»<span class='inline-examples'>das <span class='w3-tag'>linke</span></span> Zimmer« positioniert das Zimmer links von einem implizierten rechten Zimmer; in »Es war später <span class='inline-examples'>Abend <span class='w3-tag'>im</span></span> Wald« wird eine implizite Beobachterposition im Stadtwald positioniert).</li>
              <li>Auch Teil-Ganzes-Relationen werden als Positionierungen gewertet, wenn beide Bestandteile der Relation Orte sind (»dies ist der größte <span class='inline-examples'>Wald <span class='w3-tag'>unserer</span></span> Stadt«).</li>
              `,
              `
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RX</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck nicht-räumlicher Sachverhalte (nicht-räumlicher Zielbereich: X). »Räumlich« bedeutet für uns im Projekt spezifisch: annotierbar in einer der Hauptklassen einer Kategorie.</li>
              <li>Der Ausdruck muss Teil einer Übertragungsphrase sein, an der Inhaltswörter der Kategorien Ort, Bewegung oder Dimensionierung beteiligt sind.</li>
              <li>Die Übertragung kann idiomatisch-metaphorisch sein: »<span class='inline-examples'><span class='w3-tag'>an</span></span> dem silbernen Schilde der Wahrheit zerschellen«, »es nagt mancher <span class='inline-examples'>Kummer <span class='w3-tag'>am</span></span> Herzen«.</li>
              `,
              `
              <li class='w3-text-black'><b>Klasse wird im CANSpiN-Projekt seit CS1 v1.1.0 nicht mehr berücksichtigt.</b></li>
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-XR</i> ist ein übertragender Gebrauch von nicht-räumlichem Vokabular (nicht-räumlicher Quellbereich: X) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R).</li>
              <li>Die Übertragung kann kreativ-metaphorisch sein: »in einer <span class='inline-examples'>Ecke <span class='w3-tag w3-grey w3-text-grey'>meines</span></span> Bewusstseins«.</li>
              `,
              `
              <li class='w3-text-black'><b>Diese Klasse wird im CANSpiN-Projekt seit CS1 v1.1.0 nicht mehr berücksichtigt.</b></li>
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RR</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R), wobei die räumlichen Konzepte sich in Quell- und Zielbereich unterscheiden oder es sich um unterschiedliche Vertreter desselben räumlichen Konzepts handelt.</li>
              <li>Die Übertragung kann idiomatisch-metonymisch sein: »Er <span class='inline-examples'>wartete <span class='w3-tag w3-grey w3-text-grey'>auf</span></span> seinem Zimmer«.</li>
              `
            ],
            [
              `
              <li>Richtungen sind Ausdrücke, die zusammen mit einem Verb (häufig <i>Bewegungen</i>: »<span class='inline-examples'><span class='w3-tag'>zur</span></span> Stadt <i>laufen</i>«) oder als Teil von Nominalphrasen (»der <span class='inline-examples'>Nachbar <span class='w3-tag'>von</span></span> oben«) eine Richtungsangabe bilden.</li>
              <li>Die Richtungsangabe kann in einem Satz allein für eine solche stehen, also gewissermaßen ins Leere zeigen (»sie <span class='inline-examples'>bogen <span class='w3-tag'>nach</span></span> <span class='inline-examples'><span class='w3-tag'>Süden</span></span> ab«).</li>
              <li>Oder sie ist auf ein Ziel- oder Ausgangspunkt ausgerichtet (»<span class='inline-examples'><span class='w3-tag'>vom</span></span> <span class='inline-examples'>Turm <span class='w3-tag'>aus</span></span> konnte man <span class='inline-examples'>weit <span class='w3-tag'>in</span></span> die Ferne schauen«).</li>
              `,
              `
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RX</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck nicht-räumlicher Sachverhalte (nicht-räumlicher Zielbereich: X). »Räumlich« bedeutet für uns im Projekt spezifisch: annotierbar in einer der Hauptklassen einer Kategorie.</li>
              <li>Der Ausdruck muss Teil einer Übertragungsphrase sein, an der Inhaltswörter der Kategorien Ort, Bewegung oder Dimensionierung beteiligt sind.</li>
              <li>Die Übertragung kann idiomatisch-metaphorisch sein: »Manchmal kann <span class='inline-examples'>man <span class='w3-tag'>aus</span></span> dem Rhythmus geraten.«</li>
              `,
              `
              <li class='w3-text-black'><b>Diese Klasse wird im CANSpiN-Projekt seit CS1 v1.1.0 nicht mehr berücksichtigt.</b></li>
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-XR</i> ist ein übertragender Gebrauch von nicht-räumlichem Vokabular (nicht-räumlicher Quellbereich: X) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R).</li>
              `,
              `
              <li class='w3-text-black'><b>Diese Klasse wird im CANSpiN-Projekt seit CS1 v1.1.0 nicht mehr berücksichtigt.</b></li>
              <li><i>UE</i> steht für <i>Übertragung</i>.</li>
              <li><i>UE-RR</i> ist ein übertragender Gebrauch von räumlichem Vokabular (räumlicher Quellbereich: R) für den Ausdruck räumlicher Sachverhalte (räumlicher Zielbereich: R), wobei die räumlichen Konzepte sich in Quell- und Zielbereich unterscheiden oder es sich um unterschiedliche Vertreter desselben räumlichen Konzepts handelt.</li>
              <li>Die Übertragung kann idiomatisch-metonymisch sein: »Hier <span class='inline-examples'>leuchten <span class='w3-tag w3-grey w3-text-grey'>aus</span></span> tiefer Dunkelheit die Bäume.«</li>
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
          'example_text': 'Am nächsten Morgen <span class="bewegung-subjekt w3-tooltip-example-text">schrieb<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">BEWEGUNG-SUBJEKT</span></span> Laura mit <span class="dimensionierung-groesse w3-tooltip-example-text">großen<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">DIMENSIONIERUNG-GROESSE</span></span> steifen Buchstaben Name und <span class="ort-ue-rx w3-tooltip-example-text">Wohnung<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">ORT-UE-RX</span></span> des Herrn Hahn <span class="richtung w3-tooltip-example-text">auf<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">RICHTUNG</span></span> einen Briefumschlag, <span class="bewegung-subjekt w3-tooltip-example-text">siegelte<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">BEWEGUNG-SUBJEKT</span></span> diesen mit einem Veilchen, welches die Umschrift <span class="bewegung-ue-rx w3-tooltip-example-text">trug<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">BEWEGUNG-UE-RX</span></span>: »ich verberge mich,« und <span class="bewegung-subjekt w3-tooltip-example-text">steckte<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">BEWEGUNG-SUBJEKT</span></span> die Adresse <span class="richtung w3-tooltip-example-text">in<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">RICHTUNG</span></span> ihre Tasche. Als sie wegen eines Einkaufs <span class="richtung w3-tooltip-example-text">nach<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">RICHTUNG</span></span> der <span class="ort-container-bk w3-tooltip-example-text">Stadt<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">ORT-CONTAINER-BK</span></span> <span class="bewegung-subjekt w3-tooltip-example-text">ging<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">BEWEGUNG-SUBJEKT</span></span>, machte sie auf eigene Gefahr einen <span class="ort-ue-rx w3-tooltip-example-text">Seitenweg<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">ORT-UE-RX</span></span> <span class="richtung w3-tooltip-example-text">zu<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">RICHTUNG</span></span> einem Handelsgärtner, mit dem sie persönlich nicht bekannt war. <span class="positionierung w3-tooltip-example-text">Dort<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">POSITIONIERUNG</span></span> kaufte sie den <span class="dimensionierung-groesse w3-tooltip-example-text">dicken<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">DIMENSIONIERUNG-GROESSE</span></span> Busch einer Zwergorange <span class="dimensionierung-menge w3-tooltip-example-text">voll von<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">DIMENSIONIERUNG-MENGE</span></span> Blüthen und goldenen Früchten, ein Prachtstück des <span class="ort-ue-rx w3-tooltip-example-text">Glashauses<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">ORT-UE-RX</span></span>, sie <span class="bewegung-subjekt w3-tooltip-example-text">fuhr<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">BEWEGUNG-SUBJEKT</span></span> den Strauch mit pochendem Herzen <span class="positionierung w3-tooltip-example-text">in<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">POSITIONIERUNG</span></span> <span class="bewegung-subjekt w3-tooltip-example-text">geschlossener<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">BEWEGUNG-SUBJEKT</span></span> <span class="ort-container w3-tooltip-example-text">Droschke<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">ORT-CONTAINER</span></span>, bis sie einen Lohnträger <span class="bewegung-subjekt w3-tooltip-example-text">fand<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">BEWEGUNG-SUBJEKT</span></span>, und <span class="bewegung-schall w3-tooltip-example-text">empfahl<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">BEWEGUNG-SCHALL</span></span> mit einer außerordentlichen Vergütigung dem Träger, Strauch und Brief ohne Gruß und Wort <span class="positionierung w3-tooltip-example-text">im<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">POSITIONIERUNG</span></span> <span class="ort-container w3-tooltip-example-text">Hause<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">ORT-CONTAINER</span></span> des Herrn Hahn <span class="bewegung-subjekt w3-tooltip-example-text">niederzusetzen<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">BEWEGUNG-SUBJEKT</span></span>.',
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
            <p>She was sitting in her <span class="w3-tooltip-class-examples w3-tag">room<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">container for characters</span></span> in <span class="w3-tooltip-class-examples w3-tag">Cologne<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">geographical container for characters</span></span>.</p>
            <p>Suddenly he realized that he was walking past the <span class="w3-tooltip-class-examples w3-tag">Schiller statue<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">geographical object</span></span> again.</p>
            <p><span class="w3-tooltip-class-examples w3-tag">Windows<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">space-structural object</span></span> and <span class="w3-tooltip-class-examples w3-tag">doors<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">space-structural object</span></span> should always be tightly closed.</p>
            <p>»In the <span class="w3-tooltip-class-examples w3-tag">middle<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity">abstract spatial point</span></span> of the table lay the lost book«, he read aloud from the middle of the book.</p>
            `,
            `
            <p>In her dream she <span class="w3-tooltip-class-examples w3-tag">walked<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">directional movement</span></span> into the restaurant.</p>
            <p>»I <span class="w3-tooltip-class-examples w3-tag">see<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">directional visual perception</span></span> you« opens in our theaters tomorrow.</p>
            <p>Through the peaks, a pale light <span class="w3-tooltip-class-examples w3-tag">shone<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">directional movement of light</span></span> on the forest path.</p>
            <p>They tried to <span class="w3-tooltip-class-examples w3-tag">lure<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity">co-expressed planned directional movement</span></span> him to the front doorstep.</p>
            `,
            `
            <p>In front of them was a <span class="w3-tooltip-class-examples w3-tag">huge<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">size of the room</span></span> hall.</p>
            <p>They were still <span class="w3-tooltip-class-examples w3-tag">250 meters away<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">indication of a distance</span></span>.</p>
            <p><span class="w3-tooltip-class-examples w3-tag">Over 250<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">indication of an amount with regard to spatial entities</span></span> trees were planted.</p>
            <p>He thought a lot about the <span class="w3-tooltip-class-examples w3-tag">sheer mass of<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">indication of an amount with regard to spatial entities</span></span> ships.</p>
            `,
            `
            <p><span class="w3-tooltip-class-examples w3-tag">In<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions her in the gallery</span></span> the Impressionists Gallery, she gazed at the Renoir for a long time.</p>
            <p>They were floating <span class="w3-tooltip-class-examples w3-tag">outside<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions the persons outside the house</span></span> <span class="w3-tooltip-class-examples w3-tag">above<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions the persons above the house</span></span> the <span class="w3-tooltip-class-examples w3-tag">western<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions the part to the west of other parts</span></span> part <span class="w3-tooltip-class-examples w3-tag">of<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions the part in the house</span></span> the house.</p>
            <p>It is late evening <span class="w3-tooltip-class-examples w3-tag">in<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions an implied observer position in the forest</span></span> the forest <span class="w3-tooltip-class-examples w3-tag">of<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions the forest in the city</span></span> the city.</p>
            <p>She was running <span class="w3-tooltip-class-examples w3-tag">in<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity">positions her in the hall</span></span> the hall.</p>
            `,
            `
            <p>In the Impressionists Gallery, she gazed <span class="w3-tooltip-class-examples w3-tag">at<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">direction of the gaze</span></span> the Renoir for a long time.</p>
            <p>She got <span class="w3-tooltip-class-examples w3-tag">out<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">direction to the starting point of the movement</span></span> of carriage 7 of the train.</p>
            <p>They turned <span class="w3-tooltip-class-examples w3-tag">south<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">directional noun without article</span></span>.</p>
            <p>She ran <span class="w3-tooltip-class-examples w3-tag">into<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity">indicates the direction she is running in</span></span> the hall.</p>
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
              <li>Containers are spaces or areas in which human characters can prototypically reside.</li>
              <li>Containers can move (»<span class='inline-examples'>the <span class='w3-tag'>taxi</span></span>«).</li>
              <li>Containers can have specific boundaries (»<span class='inline-examples'>the <span class='w3-tag'>castle</span></span>«) or diffuse (»<span class='inline-examples'>the <span class='w3-tag'>mountain top</span></span>«).</li>
              <li>The annotated nouns can denote individual places, genera (»<span class='inline-examples'>a <span class='w3-tag'>city</span></span>«) or several places (»<span class='inline-examples'>many <span class='w3-tag'>cities</span></span>«).</li>
              `,
              `
              <li>Containers are spaces or areas in which human characters can prototypically reside.</li>
              <li>They can be the unmoved destination and starting point of directed movements in a <b>movement context (MC)</b> (»to run into <span class='inline-examples'>the <span class='w3-tag'>forest</span></span>«).</li>
              <li>For a movement context to exist, there must be an annotated or implied movement in the co-text (»<span class='inline-examples'>to <span class='w3-tag'>run</span></span> into the forest«).</li>
              <li>A movement can also be a perception or something else: See the information on the movement category.</li>
              `,
              `
              <li>Objects have spatial dimensions, but are not containers in which human characters can prototypically reside.</li>
              <li><b>With the class <i>PLACE-OBJECT</i> we only annotate geographical, astronomical or space-structural objects</b>.</li>
              <li>Geographical objects are objects that can appear on world, country and city maps <span class='inline-examples'>(»<span class='w3-tag'>Schiller statue</span></span>«).</li>
              <li>Astronomical objects are objects that can appear on star charts and celestial globes <span class='inline-examples'>(»<span class='w3-tag'>Moon</span></span>«).</li>
              <li>Space-structural objects are objects that mark the boundaries of a room or area <span class='inline-examples'>(»<span class='w3-tag'>door</span></span>«, <span class='inline-examples'>»<span class='w3-tag'>ceiling</span></span>«, <span class='inline-examples'>»<span class='w3-tag'>walls</span></span>«).</li>
              <li>Every annotated object must belong to a container in which human characters can prototypically reside: The clasp of a handbag therefore does not count as a space-structural object, but the door of a car does.</li>
              `,
              `
              <li>Objects have spatial dimensions, but are not containers in which human characters can prototypically reside.</li>
              <li><b>With the class <i>PLACE-OBJECT-MC</i> we only annotate geographical, astronomical or space-structural objects</b> that are the unmoved destination and starting point of directed movements in a <b>movement context (MC)</b> (»to move towards <span class='inline-examples'>the <span class='w3-tag'>window</span></span>«).</li>
              <li>For a movement context to exist, there must be an annotated or implied movement in the co-text (»<span class='inline-examples'>to <span class='w3-tag'>move</span></span> towards the window«).</li>
              <li>A movement can also be a perception or something else: See the information on the movement category.</li>
              <li>Each annotated object must be located in a container in which human characters can prototypically reside: The observed window of a hotel room is annotated, the observed window of a miniature dollhouse is not.</li>
              `,
              `
              <li>In contrast to containers and objects, abstracts have no spatial extension, but are designations for points or geometric figures.</li>
              <li>Examples: »<span class='inline-examples'>the <span class='w3-tag'>center</span></span> of the room«, »all <span class='inline-examples'>four <span class='w3-tag'>corners</span></span> of the room«, <span class='inline-examples'>»<span class='w3-tag'>North Pole</span></span>«, »at <span class='inline-examples'>this <span class='w3-tag'>point</span></span> in the room«, »the drove <span class='inline-examples'>in <span class='w3-tag'>circles</span></span>«.</li>
              <li>Each annotated abstract must be located in a container in which human characters can prototypically reside.</li>
              `,
              `
              <li>In contrast to containers and objects, abstracts have no spatial extension, but are designations for points or geometric figures.</li>
              <li>They can be the unmoved destination and starting point of directed movements in a <b>movement context (MC)</b> (»to run to the <span class='inline-examples'>said <span class='w3-tag'>site</span></span>«).</li>
              <li>For a movement context to exist, there must be an annotated or implied movement in the co-text (»<span class='inline-examples'>to <span class='w3-tag'>run</span></span> to the said site«).</li>
              <li>A movement can also be a perception or something else: See the information on the movement category.</li>
              <li>Each annotated abstract must be located in a container in which human characters can prototypically reside.</li>
              `,
              `
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpX</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express non-spatial issues (non-spatial target domain: X). For us in the project, »spatial« specifically means: annotatable in one of the main classes of a category.</li>
              <li>The expression or the head of the compound must in contemporary usage (referring to a dictionary like <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>)) also be applied spatially in the sense of a place, i.e. as a designation for a container, a geographical, astronomical or space-structual object or abstractum.</li>
              <li>The transferred use can be creative-metaphorical: »She got lost in <span class='inline-examples'>her <span class='w3-tag'>mind palace</span></span>.«</li>
              <li>It can be creative-metonymic: »Have the people from Berlin contacted you yet? - <span class='inline-examples'>Yes, <span class='w3-tag'>Berlin</span></span> has canceled the contract.«</li>
              <li>It can be idiomatic-metaphorical: »A favorable coincidence led on <span class='inline-examples'>this <span class='w3-tag'>track</span></span> to the book I was looking for.«</li>
              <li>It can be idiomatic-metonymic: »the <span class='inline-examples'>Flavian <span class='w3-tag'>imperial house</span></span>«.</li>
              `,
              `
              <li class='w3-text-black'><b>This class is no longer taken into account in the CANSpiN project since CS1 v1.1.0.</b></li>
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-XSp</i> is a transferred use of non-spatial vocabulary (non-spatial source domain: X) to express spatial issues (spatial target domain: Sp).</li>
              <li>The transferred use can be creative-metaphorical: »There, out of <span class='inline-examples'>deep <span class='w3-tag w3-grey w3-text-grey'>darkness</span></span> shines the burning candle.«</li>
              <li>It can be idiomatic-metaphorical: »here the hiker rests <span class='inline-examples'>by <span class='w3-tag w3-grey w3-text-grey'>day</span></span>«.</li>
              `,
              `
              <li class='w3-text-black'><b>This class is no longer taken into account in the CANSpiN project since CS1 v1.1.0.</b></li>
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpSp</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express spatial issues (spatial target domain: Sp), where the spatial concepts differ in the source and target domains or the related entities are different representatives of the same spatial concept.</li>
              <li>The transferred use can be creative-metaphorical: »Disappear behind a <span class='inline-examples'>cloud, <span class='w3-tag w3-grey w3-text-grey'>Moon</span></span>, I prefer the company of my professor!«</li>
              <li>It can be idiomatic-metonymic: »she makes <span class='inline-examples'>a <span class='w3-tag w3-grey w3-text-grey'>side path</span></span> to the library«.</li>
              `
            ],
            [
              `
              <li>Subject movements are directed movements that are carried out by persons.</li>
              <li>These movements may be intentional (»she <span class='inline-examples'>was <span class='w3-tag'>walking</span></span> through the city«).</li>
              <li>They can also happen unintentionally, though (»<span class='inline-examples'>he <span class='w3-tag'>fell</span></span> lengthwise«).</li>
              <li>Separate words that belong to the same verb, which can occur in German, are annotated together as one movement in the sentence.</li>
              <li>Verbs that necessarily co-express a directional movement are also annotated as movements (»suddenly, the <span class='inline-examples'>driver <span class='w3-tag'>braked</span></span>«).</li>
              <li>Participles also express or co-express movement (»behind <span class='inline-examples'><span class='w3-tag'>closed</span></span> doors«).</li>
              `,
              `
              <li>Object movements are directional movements that describe the movement of an object (»the <span class='inline-examples'>rock <span class='w3-tag'>plunged</span></span> into the depths«).</li>
              <li>Separate words that belong to the same verb, which can occur in German, are annotated together as one movement in the sentence.</li>
              <li>Verbs that necessarily co-express a directional movement are also annotated as movements (»finally, the <span class='inline-examples'>rock <span class='w3-tag'>stopped</span></span> just short of the cliff«).</li>
              <li>Participles also express or co-express movement (»dozens of <span class='inline-examples'><span class='w3-tag'>falling</span></span> rocks«).</li>
              `,
              `
              <li>Movements of light are verbs that describe the shining of light and thus express a directed movement (»the <span class='inline-examples'>lamp <span class='w3-tag'>illuminated</span></span> every corner of the room«).</li>
              <li>On the other hand, also verbs of optical perception are considered (»<span class='inline-examples'>she <span class='w3-tag'>looked out</span></span> over the people«).</li>
              <li>Separate words that belong to the same verb, which can occur in German, are annotated together as one movement in the sentence.</li>
              <li>Verbs that necessarily co-express a directional movement are also annotated as movements (»the fire <span class='inline-examples'>was <span class='w3-tag'>burning</span></span> in the fireplace«).</li>
              <li>When a verb logically expresses several perceptual qualities, the prototypical meaning is to be considered, as can be inferred from a dictionary article on the corresponding verb (for German: <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>).</li>
              <li>Participles also express or co-express movement (»under a bright <span class='inline-examples'><span class='w3-tag'>shining</span></span> sun«).</li>
              `,
              `
              <li>Sound movements are verbs that describe the production of sounds on the one hand and thus express a directional movement. (»<span class='inline-examples'>he <span class='w3-tag'>asked</span></span>: 'When?'«).</li>
              <li>On the other hand, also verbs of acoustic perception are considered (»<span class='inline-examples'>they <span class='w3-tag'>listened</span></span> to the singing for a while longer«).</li>
              <li>Separate words that belong to the same verb, which can occur in German, are annotated together as one movement in the sentence.</li>
              <li>Verbs that necessarily co-express a directional movement are also annotated as movements (»the <span class='inline-examples'>fire <span class='w3-tag'>crackled</span></span> in the fireplace«).</li>
              <li>When a verb logically expresses several perceptual qualities, the prototypical meaning is to be considered, as can be inferred from a dictionary article on the corresponding verb (for German: <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>).</li>
              <li>Participles also express or co-express movement (»the recently <span class='inline-examples'><span class='w3-tag'>rammed</span></span> pillar did not move«).</li>
              `,
              `
              <li>Odor movements are verbs that describe the spreading of odors on the one hand and thus express a directed movement (»the <span class='inline-examples'>cheese <span class='w3-tag'>gave off</span></span> a terrible smell«).</li>
              <li>On the other hand, also verbs of olfactory perception are considered (»<span class='inline-examples'>it <span class='w3-tag'>smelled</span></span> of roses and lilaces«).</li>
              <li>Separate words that belong to the same verb, which can occur in German, are annotated together as one movement in the sentence.</li>
              <li>Verbs that necessarily co-express a directional movement are also annotated as movements (»the fire <span class='inline-examples'>was <span class='w3-tag'>smoking</span></span> in the fireplace«).</li>
              <li>When a verb logically expresses several perceptual qualities, the prototypical meaning is to be considered, as can be inferred from a dictionary article on the corresponding verb (for German: <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>).</li>
              <li>Participles also express or co-express movement (»the <span class='inline-examples'><span class='w3-tag'>fragrant</span></span> roses«).</li>
              `,
              `
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpX</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express non-spatial issues (non-spatial target domain: X). For us in the project, »spatial« specifically means: annotatable in one of the main classes of a category.</li>
              <li>The expression must in contemporary usage (referring to a dictionary like <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>)) also be applied spatially in the sense of a movement, i.e. as a designation for a movement of subjects, objects, light, sound and smell or their perception.</li>
              <li>The transferred use can be creative-metaphorical: »The <span class='inline-examples'>moon <span class='w3-tag'>sang</span></span> me the song of my childhood.«</li>
              <li>It can be idiomatic-metaphorical: »The <span class='inline-examples'>sight <span class='w3-tag'>brought back</span></span> memories of the situation at the time.«</li>
              <li>It can be idiomatic-metonymic: »<span class='inline-examples'>That <span class='w3-tag'>sounds</span></span> like the title of an action movie.«</li>
              `,
              `
              <li class='w3-text-white'><b>This class is no longer taken into account in the CANSpiN project since CS1 v1.1.0.</b></li>
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-XSp</i> is a transferred use of non-spatial vocabulary (non-spatial source domain: X) to express spatial issues (spatial target domain: Sp).</li>
              <li>The transferred use can be creative-metonymic: »<span class='inline-examples'>They <span class='w3-tag w3-grey w3-text-grey'>cheated</span></span> their way through the maze.«</li>
              `,
              `
              <li class='w3-text-white'><b>This class is no longer taken into account in the CANSpiN project since CS1 v1.1.0.</b></li>
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpSp</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express spatial issues (spatial target domain: Sp), where the spatial concepts differ in the source and target domains or the related entities are different representatives of the same spatial concept.</li>
              <li>The transferred use can be creative-metaphorical: »The leaves of the <span class='inline-examples'>forest <span class='w3-tag w3-grey w3-text-grey'>whisper</span></span> softly.«</li>
              <li>It can be creative-metonymic: »With his last ounce of strength, <span class='inline-examples'>he <span class='w3-tag w3-grey w3-text-grey'>panted</span></span> across the finish line.«</li>
              <li>It can be idiomatic-metaphorical: »This <span class='inline-examples'>road <span class='w3-tag w3-grey w3-text-grey'>leads to</span></span> the city gates.«</li>
              <li>It can be idiomatic-metonymic: »<span class='inline-examples'>He <span class='w3-tag w3-grey w3-text-grey'>flipped open</span></span> the book.« (Originally the German term 'aufschlagen' for: opening the brass clasps of medieval books by hitting them)</li>
              `
            ],
            [
              `
              <li>A size dimensioning expression refers directly to the size or extent of spatial entities (»<span class='inline-examples'><span class='w3-tag'>wide</span></span> car«, »<span class='inline-examples'><span class='w3-tag'>small</span></span> area«, »<span class='inline-examples'><span class='w3-tag'>petite</span></span> young lady«, »<span class='inline-examples'><span class='w3-tag'>endless</span></span> prairie«).</li>
              <li>Phrases with or without a verbal core can also have a dimensioning function and are then annotated as dimensioning (»The wheat fields lay before <span class='inline-examples'>her <span class='w3-tag'>in their immense vastness</span></span>.«, »This room, <span class='inline-examples'>apparently <span class='w3-tag'>filling the entire castle</span></span>, had probably been the site of opulent festivities.«).</li>
              `,
              `
              <li>An expression indicating the amount of spatial entities indirectly refers to the extent of the spatial entities they have taken together (»<span class='inline-examples'><span class='w3-tag'>32</span></span> wheels were still in the warehouse.«).</li>
              <li>At least two entities must belong to the quantity, as in many cases it is not possible to differentiate between a quantity specification and class membership (»They saw a car.«, »They <span class='inline-examples'>saw <span class='w3-tag'>two</span></span> cars.«).</li>
              <li>Phrases with or without a verbal core can also have a dimensioning function and are then annotated as dimensioning (»Their way was blocked by <span class='inline-examples'>the <span class='w3-tag'>mass of</span></span> trees.«).</li>
              `,
              `
              <li>An expression specifying a distance refers directly to the distance between two spatial entities (»It <span class='inline-examples'>was <span class='w3-tag'>250 meters</span></span> to the summit.«).</l>
              <li>Phrases with or without a verbal core can also have a dimensioning function and are then annotated as dimensioning (»And <span class='inline-examples'><span class='w3-tag'>barely a dozen kilometers away</span></span>, universities are blossoming.«).</li>
              `,
              `
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpX</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express non-spatial issues (non-spatial target domain: X). For us in the project, »spatial« specifically means: annotatable in one of the main classes of a category.</li>
              <li>The expression must in contemporary usage (referring to a dictionary like <a href='https://www.dwds.de/wb' target='_blank'>DWDS</a>)) also be applied spatially in the sense of a dimensioning, i.e. as a designation for size or extend of spatial entities or distances.</li>
              <li>Quantity specifications, in contrast to size and distance specifications, only work spatially with reference to a spatial entity: they cannot be annotated with the transferred usage class.</li>
              <li>The transferred use can be idiomatic-metaphorical: »That <span class='inline-examples'>was <span class='w3-tag'>highly</span></span> unpleasant news.«</li>
              `,
              `
              <li class='w3-text-black'><b>This class is no longer taken into account in the CANSpiN project since CS1 v1.1.0.</b></li>
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-XSp</i> is a transferred use of non-spatial vocabulary (non-spatial source domain: X) to express spatial issues (spatial target domain: Sp).</li>
              <li>The transferred use can be creative-metonymic: »The city <span class='inline-examples'>was <span class='w3-tag w3-grey w3-text-grey'>a few hours away</span></span> from them.«</li>
              `,
              `
              <li class='w3-text-black'><b>This class is no longer taken into account in the CANSpiN project since CS1 v1.1.0.</b></li>
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpSp</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express spatial issues (spatial target domain: Sp), where the spatial concepts differ in the source and target domains or the related entities are different representatives of the same spatial concept.</li>
              <li>The transferred use can be idiomatic-metaphorical: »The number of daily visitors has now become <span class='inline-examples'>so <span class='w3-tag w3-grey w3-text-grey'>large</span></span>.«</li>
              `
            ],
            [
              `
              <li>Positionings express the spatial relation between two spatial entities (»he was <span class='inline-examples'>in <span class='w3-tag'>the</span></span> courtyard«, »they were <span class='inline-examples'>floating <span class='w3-tag'>outside</span></span> <span class='inline-examples'><span class='w3-tag'>above</span></span> the house«).</li>
              <li>One of the entities can remain implicit (»<span class='inline-examples'>the <span class='w3-tag'>left</span></span> room« positions the room to the left of an implicit right room; in »It was late <span class='inline-examples'>evening <span class='w3-tag'>in </span></span> the forest« an implicit observer position is placed in the city forest).</li>
              <li>Partial-whole relationships are also considered to be positionings if both constituents of the relationship are places (»this is the largest <span class='inline-examples'>forest <span class='w3-tag'>of our</span></span> city«).</li>
              `,
              `
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpX</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express non-spatial issues (non-spatial target domain: X). For us in the project, »spatial« specifically means: annotatable in one of the main classes of a category.</li>
              <li>The expression must be part of a transferred usage phrase involving content words of the categories place, movement or dimensioning.</li>
              <li>The transferred use can be idiomatic-metaphorical: »<span class='inline-examples'>shatter <span class='w3-tag'>on</span></span> the silver shield of truth«, »some sorrow <span class='inline-examples'>gnaws <span class='w3-tag'>at</span></span> the heart«.</li>
              `,
              `
              <li class='w3-text-black'><b>This class is no longer taken into account in the CANSpiN project since CS1 v1.1.0.</b></li>
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-XSp</i> is a transferred use of non-spatial vocabulary (non-spatial source domain: X) to express spatial issues (spatial target domain: Sp).</li>
              <li>The transferred use can be creative-metaphoric: »in a <span class='inline-examples'>corner <span class='w3-tag w3-grey w3-text-grey'>of my</span></span> mind«.</li>
              `,
              `
              <li class='w3-text-black'><b>This class is no longer taken into account in the CANSpiN project since CS1 v1.1.0.</b></li>
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpSp</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express spatial issues (spatial target domain: Sp), where the spatial concepts differ in the source and target domains or the related entities are different representatives of the same spatial concept.</li>
              <li>The transferred use can be idiomatic-metonymic: »He <span class='inline-examples'>waited <span class='w3-tag w3-grey w3-text-grey'>on</span></span> his room.« (Uncommon in English. In the German example, »auf« is used, which, in the context of this idiomatic phrase (»auf dem Zimmer warten«), preserves an older way of using a direction to express a positioning.)</li>
              `
            ],
            [
              `
              <li>Directions are expressions that form a directional statement together with a verb (mostly <i>movements</i>: »<span class='inline-examples'><i>walk</i> <span class='w3-tag'>into</span></span> the city«) or as part of a noun phrase (»the <span class='inline-examples'>neighbor <span class='w3-tag'>from</span></span> upstairs«).</li>
              <li>The directional information can stand alone in a sentence for one, so to speak, pointing into the void (»they <span class='inline-examples'>turned <span class='w3-tag'>south</span></span>«).</li>
              <li>Or it is oriented towards a destination point or a starting point (»<span class='inline-examples'><span class='w3-tag'>from</span></span> the tower, you could see <span class='inline-examples'>far <span class='w3-tag'>into</span></span> the distance«).</li>
              `,
              `
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpX</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express non-spatial issues (non-spatial target domain: X). For us in the project, »spatial« specifically means: annotatable in one of the main classes of a category.</li>
              <li>The expression must be part of a transferred usage phrase involving content words of the categories place, movement or dimensioning.</li>
              <li>The transferred use can be idiomatic-metaphorical: »Sometimes you can <span class='inline-examples'>get <span class='w3-tag'>out of</span></span> rhythm.«</li>
              `,
              `
              <li class='w3-text-black'><b>This class is no longer taken into account in the CANSpiN project since CS1 v1.1.0.</b></li>
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-XSp</i> is a transferred use of non-spatial vocabulary (non-spatial source domain: X) to express spatial issues (spatial target domain: Sp).</li>
              `,
              `
              <li class='w3-text-black'><b>This class is no longer taken into account in the CANSpiN project since CS1 v1.1.0.</b></li>
              <li><i>T</i> stands for <i>Transferred use</i>.</li>
              <li><i>T-SpSp</i> is a transferred use of spatial vocabulary (spatial source domain: Sp) to express spatial issues (spatial target domain: Sp), where the spatial concepts differ in the source and target domains or the related entities are different representatives of the same spatial concept.</li>
              <li>The transferred use can be idiomatic-metonymic: »Here the trees <span class='inline-examples'>glow <span class='w3-tag w3-grey w3-text-grey'>from</span></span> the deepest darkness.«</li>
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
          'example_text': 'The next morning Laura <span class="bewegung-subjekt w3-tooltip-example-text">wrote<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">MOVEMENT-SUBJECT</span></span> Mr. Hahn`s name and <span class="ort-ue-rx w3-tooltip-example-text">apartment<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">PLACE-T-SpX</span></span> <span class="richtung w3-tooltip-example-text">on<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">DIRECTION</span></span> an envelope in <span class="dimensionierung-groesse w3-tooltip-example-text">large<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">DIMENSIONING-SIZE</span></span>, stiff letters, <span class="bewegung-subjekt w3-tooltip-example-text">sealed<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">MOVEMENT-SUBJECT</span></span> it with a violet <span class="bewegung-subjekt w3-tooltip-example-text">bearing<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">MOVEMENT-T-SpX</span></span> the inscription, “I am hiding,” and <span class="bewegung-subjekt w3-tooltip-example-text">put<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">MOVEMENT-SUBJECT</span></span> the address <span class="richtung w3-tooltip-example-text">in<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">DIRECTION</span></span> her pocket. When she <span class="bewegung-subjekt w3-tooltip-example-text">went<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">MOVEMENT-SUBJECT</span></span> <span class="richtung w3-tooltip-example-text">into<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">DIRECTION</span></span> <span class="ort-container-bk w3-tooltip-example-text">town<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">PLACE-CONTAINER-MC</span></span> to do some shopping, she made a <span class="ort-ue-rx w3-tooltip-example-text">side street<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">PLACE-T-SpX</span></span> at her own risk <span class="richtung w3-tooltip-example-text">to<span class="farbe-richtung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">DIRECTION</span></span> a market gardener she was not personally acquainted with. <span class="positionierung w3-tooltip-example-text">There<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">POSITIONING</span></span> she bought a <span class="dimensionierung-groesse w3-tooltip-example-text">thick<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">DIMENSIONING-SIZE</span></span> bush of dwarf oranges, <span class="dimensionierung-menge w3-tooltip-example-text">full of<span class="farbe-dimensionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">DIMENSIONING-AMOUNT</span></span> flowers and golden fruit, a real showpiece of the <span class="ort-ue-rx w3-tooltip-example-text">greenhouse<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">PLACE-T-SpX</span></span>. She <span class="bewegung-subjekt w3-tooltip-example-text">drove<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">MOVEMENT-SUBJECT</span></span> the bush with a pounding heart <span class="positionierung w3-tooltip-example-text">in<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">POSITIONING</span></span> a <span class="bewegung-subjekt w3-tooltip-example-text">closed<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">MOVEMENT-SUBJECT</span></span> <span class="ort-container w3-tooltip-example-text">cab<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">PLACE-CONTAINER</span></span>, until she <span class="bewegung-subjekt w3-tooltip-example-text">found<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">MOVEMENT-SUBJECT</span></span> a laborer, and with an extraordinary sum she <span class="bewegung-schall w3-tooltip-example-text">recommended<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">MOVEMENT-SOUND</span></span> that the laborer should <span class="bewegung-subjekt w3-tooltip-example-text">put down<span class="farbe-bewegung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">MOVEMENT-SUBJECT</span></span> the bush and letter <span class="positionierung w3-tooltip-example-text">inside<span class="farbe-positionierung w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">POSITIONING</span></span> the <span class="ort-container w3-tooltip-example-text">house<span class="farbe-ort w3-text w3-small w3-tag w3-round w3-animate-opacity w3-hide">PLACE-CONTAINER</span></span> of Mr. Hahn without a word or greeting.',
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
      // - p in example > .content > blockquote[data-id='beispieltextText']
      const beispieltextTexts = [...document.querySelectorAll('blockquote[data-id="beispieltextText"] > p')];
      beispieltextTexts[0].innerHTML = languageDict[clickedLanguageButton.id]['example_text'];
      refreshBeispieltextDisplay();

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

    // inline-examples
    //// hint: is controlled in tutorial css, see css/tutorial.css
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
