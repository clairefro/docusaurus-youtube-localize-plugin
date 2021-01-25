const getHtmlLang = () => {
  return document.querySelector('html').lang;
};

const buildYoutubeParams = (lang) => {
  return `&hl=${lang}&cc_lang_pref=${lang}&cc_load_policy=1`;
};

const buildYoutubeParamsRegex = () => {
  return new RegExp(buildYoutubeParams(`\\w+-?\\w+`) + '$');
};

const localizeYoutubePlayers = () => {
  const iframes = document.querySelectorAll('iframe');
  const lang = getHtmlLang();
  // On youtube urls, these params determine iframe player language settings
  // hl=<lang-code>        language of player controls
  // cc_lang=<lang-code>  language of subtitles (if officially published - autotranslate does not work)
  // cc_load_policy=1     turn subtitles on by default
  const youtubeUrlParams = buildYoutubeParams(lang);
  const youtubeUrlParamsRegex = buildYoutubeParamsRegex();
  const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/';
  iframes.forEach((iframe) => {
    if (iframe.src.includes(YOUTUBE_EMBED_URL)) {
      if (!iframe.src.match(youtubeUrlParamsRegex)) {
        iframe.src += youtubeUrlParams;
      } else if (!iframe.src.match(youtubeUrlParams)) {
        iframe.src = iframe.src.replace(
          youtubeUrlParamsRegex,
          youtubeUrlParams
        );
      }
    }
  });
};

// Listen for dom changes (i.e new page opened) and update any youtube embed iframes to use the <html lang> language
const observeForDomChanges = () => {
  // Select the node that will be observed for mutations
  const targetNode = document.querySelector('html');

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (_mutationsList, _observer) {
    localizeYoutubePlayers();
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
};

// Attach listener to window
window.addEventListener('DOMContentLoaded', () => {
  observeForDomChanges();
});
