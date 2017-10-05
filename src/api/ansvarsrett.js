export default {
  meta: {
    title: 'Erklæring om ansvarsrett',
    footer: 'Your footer here!',
  },
  schema: [
    {
      id: 'page1',
      type: 'Page',
      title: 'Informasjon om firmaet ditt',
      lead:
        '<p>Dersom firmaet ditt har norsk organisasjonsnummer vil informasjon om firmaet ditt hentes fra Brønnøysundregistrene.</p><p>Representerer du et utenlandsk firma, må du fylle inn informasjonen manuelt.</p>',
      children: [
        {
          property: 'companytype',
          type: 'Radio',
          heading: 'Hvem representerer du?',
          suggestedAnswer: [
            {
              type: 'Answer',
              text: 'Et norsk firma',
              value: 'norwegian',
            },
            {
              type: 'Answer',
              text: 'Et utenlands firma',
              value: 'foreign',
            },
          ],
        },
        {
          property: 'orgnr',
          type: 'FetchOrg',
          heading: 'Organisasjonsnummer',
          text: 'Eksempel: 123 456 789',
          placeholder: '987 654 321',
          source:
            'https://data.brreg.no/enhetsregisteret/enhet.json?page=0&size=30&$filter=organisasjonsnummer+eq+',
          information:
            'Er firmaets navn eller adresse feil? Da må du endre denne informasjonen via skjemaet <a href="https://www.altinn.no/no/Starte-og-drive-bedrift/Drive/Andre-driftsoppgaver/Flytting-og-omorganisering/Hvordan-meldes-flytting-og-andre-endringer/">Samordnet registermelding</a> i Altinn før du fortsetter.',
          fetchSG: true,
          SGheading: '${name} er registrert med sentral godkjenning for følgende områder',
          SGtext:
            'Godkjenningen er til ${status.approval_period_to} og viser hvilke fagområder firmaet har kompetanse på. Du kan likevel erklære ansvar for ansvarsområder som ligger utenfor den sentrale godkjenningen hvis firmaet ditt har nødvendig kunnskap og erfaring fra også det området.',
          invalidapproval: 'Vi fant ikke godkjenningen din i systemet vårt',
          SGsource: 'https://sgregister.dibk.no/api/enterprises/',
        },
        {
          type: 'Group',
          heading: 'Kontaktperson for prosjektet',
          property: 'contactperson',
          children: [
            {
              property: 'contactperson.name',
              type: 'Input',
              heading: 'Navn',
            },
            {
              property: 'contactperson.email',
              type: 'Input',
              validator: { pattern: '\\S+@\\S+\\.\\S+', error: 'Må være en epost' },
              heading: 'Epost',
            },
            {
              property: 'contactperson.phone',
              type: 'Input',
              heading: 'Telefon',
            },
          ],
        },
      ],
    },
    {
      id: 'page2',
      type: 'Page',
      title: 'Har firmaet rett kompetanse til å gjøre jobben?',
      lead:
        '<p>For å kunne erklære ansvarsrett for en jobb, må firmaet ditt ha tilstrekkelig formell kompetanse for jobben som skal gjøres. Dette er en kombinasjon av utdannelse og arbeidserfaring.</p><p>Eks: Hvis firmaet skal ha ansvar for tømrerarbeider for en enebolig, må fagansvarlig for jobben minst være tømrersvenn i tllegg til å ha minst 2 års relevant arbeidserfaring.</p>',
      children: [
        {
          type: 'Group',
          heading:
            'Hvilken utdanning og praksis, som er nyttig for jobben som nå skal gjøres, har faglig leder i firma?',
          property: 'competence',
          children: [
            {
              property: 'competence.education',
              type: 'Select',
              heading: 'Utdanningsnivå',
              defaultOption: 'Velg utdanningsnivå',
              text:
                '<a href="https://dibk.no/byggeregler/sak/3/11/11-2/ ">Les mer om utdanningsnivåer</a> i byggesaksforskriften',
              suggestedAnswer: [
                {
                  type: 'Answer',
                  text: 'Fag- eller svenneprøve',
                  value: 'a',
                },
                {
                  type: 'Answer',
                  text: 'Mesterbrev eller fagskole',
                  value: 'b',
                },
                {
                  type: 'Answer',
                  text: 'Utdanning på høgskolenivå',
                  value: 'c',
                },
                {
                  type: 'Answer',
                  text: 'Utdanning på universitetsnivå',
                  value: 'd',
                },
              ],
            },
            {
              property: 'competence.experience',
              type: 'Input',
              text:
                '<a href="https://dibk.no/byggeregler/sak/3/11/11-4/ ">Les mer om krav til praksis</a> i byggesaksforskriften',
              heading: 'År med relevant erfaring',
            },
            {
              property: 'contactperson.phone',
              type: 'Image',
              heading: 'Hvilken jobb kan du gjøre?',
              text: 'Utdannings- og erfaringsnivået avgjør hvilken jobb firmaet ditt kan gjøre',
              image: {
                url: '/images/matrix.png',
                alt: 'alt for image',
              },
            },
          ],
        },
        {
          property: 'tiltaksklasse',
          type: 'Radio',
          heading: 'Hvilken tiltaksklasse er jobben?',
          text:
            '<a href="https://dibk.no/byggeregler/sak/3/9/9-4/">Les mer om tiltaksklasser</a> i byggesaksforskriften',
          suggestedAnswer: [
            {
              type: 'Answer',
              heading: 'Tiltaksklasse 1',
              text:
                'Som regel vil alt arbeid med oppføring av eneboliger, tomannsboliger og rekkehus komme inn under tiltaksklasse 1. Deler av utførelsen av større boligbygninger innitil 3 etasjer kan også være tiltaksklasse 1. Likevel kan det hende at noe av arbeidet er spesielt vanskelig og må settes til tiltaksklasse 2 eller 3.',
              image: {
                url: '/images/skog.jpg',
                alt: '',
              },
              value: 'tiltaksklasse1',
            },
            {
              type: 'Answer',
              heading: 'Tiltaksklasse 2',
              text:
                'Typiske bygninger i tiltaksklasse 2 er boligblokker og kontorbygg på 3-4 etasjer. Deler av utførelsen av større bygninger inntil 5 etasjer kan også være tiltaksklasse 2. Likevel kan det hende at noe av arbeidet er spesielt vanskelig og må settes til tiltaksklasse 3.',
              image: {
                url: '/images/bygg.jpg',
                alt: '',
              },
              value: 'tiltaksklasse2',
            },
            {
              type: 'Answer',
              heading: 'Tiltaksklasse 3',
              text:
                'Arbeid med store og kompliserte bygninger er i tiltaksklasse 3. Det kan også være enkelte ansvarsområder i mindre bygninger som må settes i tiltaksklasse 3 fordi det er spesielt vanskelig.',
              image: {
                url: '/images/sykehus.jpg',
                alt: '',
              },
              value: 'tiltaksklasse3',
            },
          ],
        },
        {
          property: 'function',
          type: 'Radio',
          heading: 'Hvilken funksjon har firmaet ditt i prosjektet??',
          text:
            '<a href="https://dibk.no/byggeregler/sak/3/12/innledning/">Les mer om hvilket ansvar du har</a> som ansvarlig søker, prosjekterende, utførende og kontrollerende i byggesaksforskriften',
          suggestedAnswer: [
            {
              type: 'Answer',
              heading: 'Ansvarlig søker (SØK)',
              value: 'sok',
            },
            {
              type: 'Answer',
              heading: 'Ansvarlig prosjekterende (PRO)',
              value: 'pro',
            },
            {
              type: 'Answer',
              heading: 'Ansvarlig utførende (UTF)',
              value: 'utf',
            },
            {
              type: 'Answer',
              heading: 'Ansvarlig kontrollerende (KPR)',
              value: 'krp',
            },
          ],
        },
      ],
    },
    {
      id: 'responsibility',
      type: 'Page',
      title: 'Hva skal firmaet ta ansvar for?',
      lead:
        'Pass på at du ikke beskriver arbeidet som mer omfattende enn det du faktsk skal gjøre. Det er viktig å avgrense det mot andre ansvarsområder slik at du ikke blir stilt til ansvar for noe noen andre har gjort. ',
      children: [
        {
          property: 'responsibility.description',
          type: 'Textarea',
          heading: 'Beskriv kort arbeidet som firmaet ditt tar ansvar for',
          information: 'Husk at det du beskriver her vil firmaet bli stilt til ansvar for',
          summary: 'Se eksempler',
          details:
            '<h3>Grunnarbeider</h3><p>Graving og sprengning av byggegrop, kulting og komprimering, legging av radonsperre, samt graving og gjenfylling av grøfter.</p><h3>Plassering</h3><p>Utstikking av høyde og plan før graving. Kvalitetssikre plassering av såle og grunnmur.</p><h3>Arkitektur</h3><p>Prosjektering av situasjonsplan, visuell utforming og terrengtilpasning, innvendig planløsning.</p>',
        },
      ],
    },
    {
      id: 'declarationofconformity',
      type: 'Page',
      title: 'Hva skal firmaet ta ansvar for?',
      lead:
        '<p>Når du har gjort jobben, må du erklære at arbeidet er forskriftsmessig utført ved å sende en Samsvarserklæring til ansvarlig søker.</p><p>Det er vanlig å gjøre dette når du er helt ferdig, men du kan også lage flere erklæringer underveis. Dette må du gjøre om arbeidet ditt skal være ferdig ved søknad om igangsettingstillatelse, midlertidig brukstillatelse eller når det skal søkes om ferdigattest.</p><p>Det viktige er at du ikke krysser av for at du er ferdig med arbeidet før du faktsk er det!</p><p><a href="https://dibk.no/byggeregler/sak/1/1/1-2/?_t_id=icu3BVXVvaK3ddH6i8JK6Q%3d%3d&_t_q=samsvarserkl%C3%A6ring&_t_tags=language%3ano%2csiteid%3aa8fed669-6208-4354-8fe6-9c93cb91a133&_t_ip=195.159.248.98%3a59714&_t_hit.id=EPiServer_Templates_DIBK_PageTypes_Veiledninger_ParagrafPageType/_a0b64d87-7db5-42f9-a6cb-238f9d1daebc_no&_t_hit.pos=1">Les mer om samsvarserklæring i regelverket</a><p>',
      children: [
        {
          property: 'conformity.type',
          type: 'Checkbox',
          heading: 'Hvilken samsvarserklæring skal du sende?',
          suggestedAnswer: [
            {
              type: 'Answer',
              heading: '1 Rammetillatelse',
              text:
                'Det første steget i en byggesak er en søknad om rammetillatelse. Her beskrives det hva man skal bygge, endre eller utbedre.',
              value: '1',
              image: {
                url: '/images/notes.jpg',
                alt: '',
              },
            },
            {
              type: 'Answer',
              heading: '2 Igangsettelse',
              text:
                'Dette er en søknad om hvorvidt man kan begynne selve byggearbeidet. Det er viktig å ikke ta ett eneste spadetak før man har fått godkjent denne!',
              value: '2',
              image: {
                url: '/images/person.jpg',
                alt: '',
              },
            },
            {
              type: 'Answer',
              heading: '3 Midlertidig brukstillatelse',
              text:
                'Dette er en søknad om tillatelse til å bruke et byggverk midlertidig, selv om det ikke er helt ferdig. Det må allikevel gjenstå såpass lite at kommunen må finne det forsvarlig å kunne ta det i bruk.',
              value: '3',
              image: {
                url: '/images/pen.jpg',
                alt: '',
              },
            },
            {
              type: 'Answer',
              heading: '4 Ferdigattest',
              text:
                'Alle tiltak du må søke om, må også avsluttes med en ferdigattest som du får av kommunen. En ferdigattest skal foreligge før bygget tas i bruk, ellers må man søke om en “midlertidig brukstillatelse”',
              value: '4',
              image: {
                url: '/images/nail.jpg',
                alt: '',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'responsible',
      type: 'Page',
      title: 'Hvor er byggeplassen og hvem er ansvarlig søker?',
      lead:
        'Du må fylle ut denne informasjonen slik at det blir enkelt for ansvarlig søker og kommunen å knytte erklæringen til riktig byggesak.',
      children: [
        {
          property: 'responsiblefirm',
          type: 'Input',
          heading: 'Hvilket firma er ansvarlig søker?',
        },
        {
          type: 'Group',
          heading: 'Hvor skal arbeidet gjøres?',
          property: 'where',
          children: [
            {
              property: 'where.municipality',
              type: 'Input',
              heading: 'Kommune',
            },
            {
              property: 'where.section',
              type: 'Input',
              heading: 'Gårdsnummer',
            },
            {
              property: 'where.number',
              type: 'Input',
              heading: 'Bruksnummer',
            },

            {
              property: 'where.address',
              type: 'Input',
              heading: 'Gateadresse',
              text: 'Fylles ut hvis eiendommen har gateadresse',
            },
          ],
        },
      ],
    },
    {
      id: 'hooray',
      type: 'Result',
      title: 'Se over og fullfør',
      lead:
        '<p>Les nøye gjennom erklæringen før du fortsetter.</p><p>Når du trykker fullfør vil du motta erklæringen på epost. Den må du skrive ut, signere og sende videre til ansvarlig søker. Ansvarlig søker vil sende erklæringen videre til kommunen sammen med sin gjennomføringsplan.</p><p><b>Husk at firmaet ditt kan bli stilt til ansvar for det som er beskrevet i denne erklæringen!</b></p>',
      exporter: 'dataExport',
      children: [
        {
          property: 'independent',
          type: 'Checkbox',
          suggestedAnswer: [
            {
              type: 'Answer',
              text:
                'Ansvarlig kontrollerende erklærer uavhengighet, jf. SAK10 § 14-1, og vil redegjøre for endringer som kan påvirke uavhengigheten jf. SAK10 §12-5',
              value: 'true',
            },
          ],
        },
      ],
    },
  ],
};
