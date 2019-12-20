export default function setProperFlag(name) {
  let flag = '';
  switch (name) {
    case 'bolivia, plurinational state of': {
      flag = 'bolivia';
      break;
    }
    case 'bonaire, sint eustatius and saba': {
      flag = 'netherlands';
      break;
    }
    case 'cabo verde': {
      flag = 'cape verde';
      break;
    }
    case 'congo': {
      flag = 'congo brazzaville';
      break;
    }
    case 'congo, the democratic republic of the': {
      flag = 'congo';
      break;
    }
    case 'czechia': {
      flag = 'czech republic';
      break;
    }
    case "côte d'ivoire": {
      flag = 'cote divoire';
      break;
    }
    case 'eswatini': {
      flag = 'swaziland';
      break;
    }
    case 'guadeloupe': {
      flag = 'france';
      break;
    }
    case 'holy see (vatican city state)': {
      flag = 'vatican city';
      break;
    }
    case 'iran, islamic republic of': {
      flag = 'iran';
      break;
    }
    case "korea, democratic people's republic of": {
      flag = 'north korea';
      break;
    }
    case 'korea, republic of': {
      flag = 'south korea';
      break;
    }
    case "lao people's democratic republic": {
      flag = 'laos';
      break;
    }
    case 'macao': {
      flag = 'macau';
      break;
    }
    case 'micronesia, federated states of': {
      flag = 'micronesia';
      break;
    }
    case 'moldova, republic of': {
      flag = 'moldova';
      break;
    }
    case 'palestine, state of': {
      flag = 'palestine';
      break;
    }
    case 'pitcairn': {
      flag = 'pitcairn islands';
      break;
    }
    case 'russian federation': {
      flag = 'russia';
      break;
    }
    case 'réunion': {
      flag = 'reunion';
      break;
    }
    case 'saint barthélemy': {
      flag = 'france';
      break;
    }
    case 'saint helena, ascension and tristan da cunha': {
      flag = 'united kingdom';
      break;
    }
    case 'saint martin (french part)': {
      flag = 'france';
      break;
    }
    case 'syrian arab republic': {
      flag = 'syria';
      break;
    }
    case 'taiwan, province of china': {
      flag = 'taiwan';
      break;
    }
    case 'tanzania, united republic of': {
      flag = 'tanzania';
      break;
    }
    case 'timor-leste': {
      flag = 'timorleste';
      break;
    }
    case 'venezuela, bolivarian republic of': {
      flag = 'venezuela';
      break;
    }
    case 'viet nam': {
      flag = 'vietnam';
      break;
    }
    case 'virgin islands, british': {
      flag = 'british virgin islands';
      break;
    }
    case 'virgin islands, u.s.': {
      flag = 'us virgin islands';
      break;
    }
    case 'Åland islands': {
      flag = 'aland islands';
      break;
    }
    // so it won't show errors on debugger tools about missing flags
    case 'antigua and barbuda': {
      flag = 'antigua';
      break;
    }
    case 'bosnia and herzegovina': {
      flag = 'bosnia';
      break;
    }
    case 'british indian ocean territory': {
      flag = 'indian ocean territory';
      break;
    }
    case 'brunei darussalam': {
      flag = 'brunei';
      break;
    }
    case 'cocos (keeling) islands': {
      flag = 'cocos islands';
      break;
    }
    case 'falkland islands (malvinas)': {
      flag = 'falkland islands';
      break;
    }
    case 'south georgia and the south sandwich islands': {
      flag = 'sandwich islands';
      break;
    }
    case 'french southern territories': {
      flag = 'french territories';
      break;
    }
    case 'heard island and mcdonald islands': {
      flag = 'heard island';
      break;
    }
    case 'united states minor outlying islands': {
      flag = 'us minor islands';
      break;
    }
    case 'papua new guinea': {
      flag = 'new guinea';
      break;
    }
    case 'saint pierre and miquelon': {
      flag = 'saint pierre';
      break;
    }
    case 'saint vincent and the grenadines': {
      flag = 'saint vincent';
      break;
    }
    case 'sao tome and principe': {
      flag = 'sao tome';
      break;
    }
    case 'svalbard and jan mayen': {
      flag = 'jan mayen';
      break;
    }
    case 'turks and caicos islands': {
      flag = 'caicos islands';
      break;
    }
    case 'trinidad and tobago': {
      flag = 'trinidad';
      break;
    }
    case 'north macedonia': {
      flag = 'macedonia';
      break;
    }
    //
    // missing flags
    case 'antarctica': {
      flag = '';
      break;
    }
    case 'curaçao': {
      flag = '';
      break;
    }
    case 'guernsey': {
      flag = '';
      break;
    }
    case 'isle of man': {
      flag = '';
      break;
    }
    case 'jersey': {
      flag = '';
      break;
    }
    case 'sint maarten (dutch part)': {
      flag = '';
      break;
    }
    case 'south sudan': {
      flag = '';
      break;
    }
    //
    // no flags
    case 'international waters': {
      flag = '';
      break;
    }
    //
    default: {
      flag = name;
      break;
    }
  }
  return flag;
}
