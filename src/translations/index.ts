import English from './english'
import French from './french'

let lang = localStorage.getItem('rushtera_user_language')

if (!lang) {
    localStorage.setItem('rushtera_user_language', 'en')
    lang = 'en'
}

let language = []

switch (lang) {
    case 'fr':
        language = French
        break;

    case 'en':
    default:
        language = English
        break;
}

const translate = function (word: string) {
    return language[word]
}

export default translate