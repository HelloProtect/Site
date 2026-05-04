// 📊 Données pour l'entraînement (avec niveaux)

const phrases = [

  // 🟢 FACILE
  {
    level: "facile",
    text: "La petite maison",
    syllables: 6,
    split: ["La","pe","ti","te","mai","son"],
    hint: "Le e de 'petite' compte",
    rule: "e devant consonne = compte"
  },
  {
    level: "facile",
    text: "Une jolie fleur",
    syllables: 5,
    split: ["U","ne","jo","lie","fleur"],
    hint: "Découpe 'jolie'",
    rule: "chaque voyelle forme une syllabe"
  },

  // 🟡 MOYEN
  {
    level: "moyen",
    text: "Une rose éclot",
    syllables: 4,
    split: ["U","ne","ro","se","é","clot"],
    hint: "Voyelle après 'rose'",
    rule: "e disparaît devant voyelle"
  },
  {
    level: "moyen",
    text: "Le monde est calme",
    syllables: 5,
    split: ["Le","monde","est","calme"],
    hint: "Fin de vers",
    rule: "e final ne compte pas"
  },
  {
    level: "moyen",
    text: "Je regarde la mer",
    syllables: 6,
    split: ["Je","re","gar","de","la","mer"],
    hint: "Consonne après",
    rule: "e compte devant consonne"
  },

  // 🔴 DIFFICILE
  {
    level: "difficile",
    text: "La lumière danse encore",
    syllables: 7,
    split: ["La","lu","miè","re","dan","se","en","co","re"],
    hint: "Attention aux e internes",
    rule: "certains e comptent selon le rythme"
  },
  {
    level: "difficile",
    text: "Une flamme éclaire la nuit",
    syllables: 7,
    split: ["U","ne","flam","me","é","clai","re","la","nuit"],
    hint: "enchaînement voyelle",
    rule: "élision du e devant voyelle"
  },
  {
    level: "difficile",
    text: "Le silence tombe doucement",
    syllables: 8,
    split: ["Le","si","len","ce","tom","be","dou","ce","ment"],
    hint: "plusieurs e à analyser",
    rule: "chaque e dépend du contexte"
  }

];
