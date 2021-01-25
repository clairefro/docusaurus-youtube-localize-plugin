# docusaurus-youtube-localize-plugin
This is a super hacky (temporary) solution for getting iframe embedded Youtube players in Docusaurus docs to render player controls and [published] captions based on the language of a given page's `<html lang="<lang>">`


## Usage 
Create a `plugins` dir at your Docusaurus project root, and create a file named `youtube-localize-plugin.js` inside. 

Paste this code which references this repo's hosted `index.js`

```js
// plugins/youtube-localize-pluign.js

module.exports = function (_context, _options) {
  return {
    name: 'youtube-localize-plugin',
    injectHtmlTags() {
      return {
        preBodyTags: [
          {
            tagName: 'script',
            attributes: {
              charset: 'utf-8',
              src:
                'https://clairefro.github.io/docusaurus-youtube-localize-plugin/index.js',
            },
          },
        ],
      };
    },
  };
};

```
 
Then simply configure this plugin in `docusaurus.config.js`

```js
// docusaurus.config.js
module.exports = {
  //..
  plugins: [path.resolve(__dirname, 'plugins', 'youtube-localize-plugin')],
};

```

## Troubleshooting
**Why aren't captions showing up???**
Subtitles will only appear in any given language if the video owner has officially published subtitles in that language.

The params used in the plugin do not allow for forcing auto-generated or auto-translated captions (although users can still click to enable those). If you are the video owner, note that it is simple to officially publish auto-generated subtitles using the Youtubes in-house tool Youtube Studio.
 
