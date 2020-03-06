import { Event } from "./Catalog";

const events: Event[] =  [{
    tittel: 'CFS/ME Gruppetilbud for deg mellom 16-18 år og dine foresatte',
    malgruppe: ['pasient og pårørende'],
    type: 'kurs',
    sted: 'Gaustad sykehus',
    avdeling: '',
    datoer: [{start: '2020-03-03T12:00:00Z', slutt: '2020-03-03T16:00:00Z'}],
    behandling: '',
    behandlingsprogram: 'CFS/ME',
    id: 11111
    },
    {
    tittel: 'Kurset for bronkitt',
    malgruppe: ['helsepersonell', 'leger i spesialisering'],
    type: 'kurs',
    sted: 'Ullevål sykehus',
    avdeling: '',
    datoer: [{start: '2020-03-03T12:00:00Z', slutt: '2020-03-05T16:00:00Z'}],
    behandling: 'Smertelindring',
    behandlingsprogram: '',
    id: 11112
    },
    {
    tittel: 'Strålekurs',
    malgruppe: ['pasient og pårørende', 'helsepersonell', 'leger'],
    type: 'kurs',
    sted: 'Radiumhospitalet',
    avdeling: '',
    datoer: [{start: '2020-04-01T09:00:00Z', slutt: '2020-04-07T15:00:00Z'}],
    behandling: '',
    behandlingsprogram: 'Annet',
    id: 11113
    },
    {
        tittel: 'Smoothiekurs, over nett - lær deg å lage smoothies',
        malgruppe: ['pasient og pårørende'],
        type: 'kurs',
        sted: '',
        avdeling: '',
        datoer: [],
        behandling: '',
        behandlingsprogram: 'Annet',
        id: 11114
    },
    {
    tittel: 'Smoothiekurs',
    malgruppe: ['pasient og pårørende'],
    type: 'kurs',
    sted: 'Ahus',
    avdeling: '',
    datoer: [{start: '2020-05-01T12:00:00Z', slutt: '2020-05-01T16:00:00Z'},{start: '2020-05-10T10:00:00Z', slutt: '2020-05-10T14:00:00Z'}],
    behandling: 'Annet',
    behandlingsprogram: '',
    id: 11115
    },
    {
    tittel: 'Kurs for deg med tvangslidelser',
    malgruppe: ['pasient og pårørende'],
    type: 'kurs',
    sted: 'Gaustad sykehus',
    avdeling: '',
    datoer: [{start: '2020-05-10T12:00:00Z', slutt: '2020-05-12T16:00:00Z'}, {start: '2020-06-10T12:00:00Z', slutt: '2020-06-12T16:00:00Z'}],
    behandling: '',
    behandlingsprogram: 'Psykologiske lidelser',
    id: 11116,
    },
    {
    tittel: 'Pårørende med barn som har psykiske lidelser',
    malgruppe: ['pasient og pårørende'],
    type: 'kurs',
    sted: 'Gaustad sykehus',
    avdeling: '',
    datoer: [{start: '2020-05-10T12:00:00Z', slutt: '2020-05-12T16:00:00Z'}, {start: '2020-06-10T12:00:00Z', slutt: '2020-06-12T16:00:00Z'}],
    behandling: '',
    behandlingsprogram: 'Psykologiske lidelser',
    id: 11117
    },

    {
        tittel: 'Akromegali, kurs for pasienter og deres pårørende',
        malgruppe: ['pasient og pårørende'],
        type: 'kurs',
        sted: 'Ullevål sykehus',
        avdeling: '',
        datoer: [{start: '2020-05-10T12:00:00Z', slutt: '2020-05-12T16:00:00Z'}],
        behandling: '',
        behandlingsprogram: 'Akromegali',
        id: 11118
    },
    {
        tittel: 'Akromegali, kurs for pasient',
        malgruppe: ['pasient'],
        type: 'kurs',
        sted: 'Betanien hospital',
        avdeling: '',
        datoer: [],
        behandling: '',
        behandlingsprogram: 'Akromegali',
        id: 11119
    },

    ];

export default events;