export const countries = [
  {
    code: "bg",
    name: "България",
    flag: "https://flagcdn.com/bg.svg",
    groups: [
      {
        name: "МИГ Сливница",
        city: "Сливница",
        site: "https://mig-sd.org/",
      },
      {
        name: "МИГ Айтос",
        city: "Айтос",
        site: "https://mig-aytos.com/bg/",
    },
    ],
  },
  {
    code: "gr",
    name: "Гърция",
    flag: "https://flagcdn.com/gr.svg",
    groups: [
      {
        name: "Development Association of Halkidiki SA",
        city: "Polygyros",
        site: "https://www.anetxa.gr/",
    },
    ],
  },
  {
    code: "ro",
    name: "Румъния",
    flag: "https://flagcdn.com/ro.svg",
    groups: [
      {
        name: "GAL Napoca Porolissum",
        city: "Cluj Napoca",
        site: "https://napocaporolissum.ro/",
    },

    ],
  },
  {
    code: "de",
    name: "Германия",
    flag: "https://flagcdn.com/de.svg",
    groups: [
      {
        name: "LAG Ammersee",
        city: "Dießen",
        site: "https://lagammersee.de/",
    },
    ],
  },
  {
    code: "fr",
    name: "Франция",
    flag: "https://flagcdn.com/fr.svg",
    groups: [
      {
        name: "GAL Pays Vichy-Auvergne",
        city: "Vichy",
        site: "https://www.paysvichyauvergne.com/",
    },    
    ],
  },
  {
    code: "it",
    name: "Италия",
    flag: "https://flagcdn.com/it.svg",
    groups: [
      {
        name: "GAL La Cittadella del Sapere",
        city: "Lauria",
        site: "https://www.lacittadelladelsapere.it/wp/",
    },    
    ],
  },
  {
    code: "es",
    name: "Испания",
    flag: "https://flagcdn.com/es.svg",
    groups: [
      {
        name: "GAL Limia-Arnoia",
        city: "Xinzo de Limia",
        site: "https://limia-arnoia.gal/",
    },  
    ],
  },
  {
    code: "pl",
    name: "Полша",
    flag: "https://flagcdn.com/pl.svg",
    groups: [
      {
        name: "Bialskopodlaska Lokalna Grupa Działania",
        city: "Biała Podlaska",
        site: "https://blgd.eu/",
    },  
    ],
  },
  {
    code: "hu",
    name: "Унгария",
    flag: "https://flagcdn.com/hu.svg",
    groups: [
      {
        name: "Cserhátalja Vidékfejlesztési Egyesület",
        city: "Kozard",
        site: "https://cserhatalja.eu/",
    },  
    ],
  },
  {
    code: "cz",
    name: "Чехия",
    flag: "https://flagcdn.com/cz.svg",
    groups: [
      {
        name: "Sdružení SPLAV",
        city: "Skuhrov nad Bělou",
        site: "https://www.sdruzenisplav.cz/",
    },  
    ],
  },
  {
    code: "sk",
    name: "Словакия",
    flag: "https://flagcdn.com/sk.svg",
    groups: [
      {
        name: "LAG Dudvah",
        city: "Veľká Mača",
        site: "https://www.masdudvah.sk/",
    },  
    ],
  },
  {
    code: "hr",
    name: "Хърватия",
    flag: "https://flagcdn.com/hr.svg",
    groups: [
      {
        name: "LAG Adrion",
        city: "Zadvarje",
        site: "https://lag-adrion.hr/",
    },  
    ],
  },
  {
    code: "si",
    name: "Словения",
    flag: "https://flagcdn.com/si.svg",
    groups: [
      {
        name: "LAS Raznolikost podeželja",
        city: "Teharje",
        site: "https://www.las-raznolikost-podezelja.si/",
    },  
    ],
  },
  {
    code: "fi",
    name: "Финландия",
    flag: "https://flagcdn.com/fi.svg",
    groups: [
      {
        name: "Leader Aisapari",
        city: "Kauhava",
        site: "https://www.aisapari.net/",
    },
    ],
  },
  {
    code: "se",
    name: "Швеция",
    flag: "https://flagcdn.com/se.svg",
    groups: [
      {
        name: "Astrid Lindgrens Hembygd",
        city: "Vimmerby",
        site: "https://astridlindgrenshembygd.se/",
    },  
    ],
  },
  {
    code: "dk",
    name: "Дания",
    flag: "https://flagcdn.com/dk.svg",
    groups: [
      {
        name: "LAG & FLAG Thy-Mors",
        city: "Nykobing Mors",
        site: "https://lag-thymors.dk/",
    },  
    ],
  },
  {
    code: "nl",
    name: "Нидерландия",
    flag: "https://flagcdn.com/nl.svg",
    groups: [
      {
        name: "Achterhoek",
        city: "Doetinchem",
        site: "https://www.leaderachterhoek.nl/",
    },
    ],
  },
  {
    code: "be",
    name: "Белгия",
    flag: "https://flagcdn.com/be.svg",
    groups: [
      {
        name: "GAL Zwischen Weser und Göhl",
        city: "Eupen",
        site: "https://leader-ostbelgien.be/lag-zwischen-weser-und-goehl/",
    },  
    ],
  },
  {
    code: "pt",
    name: "Португалия",
    flag: "https://flagcdn.com/pt.svg",
    groups: [
      {
        name: "A. D. D. - ASSOCIAÇÃO DE DESENVOLVIMENTO DO DÃO",
        city: "Penalva do Castelo",
        site: "https://www.add.pt/",
    },  
    ],
  },
  {
    code: "cy",
    name: "Кипър",
    flag: "https://flagcdn.com/cy.svg",
    groups: [
      {
        name: "Development Agency of Lemesos Ltd",
        city: "Limassol",
        site: "https://www.anelem.com/",
    },  
    ],
  },
];

export const getCountryByCode = (code) =>
  countries.find((c) => c.code.toLowerCase() === String(code).toLowerCase());
