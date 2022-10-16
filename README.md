# markdown-it-when
Conditional text render plugin for markdown-it markdown parser

With this plugin you can create conditional text blocks and inline parts that are rendered only when (that's where the name comes from) the condition is met.

```
Here be ((when dragons))*dragons* or ((/when))other creatures.

((when dragons))
And here, too.
((/when))
```

Now you can override `when_open` and `when_close` blocks and inline blocks to achieve something like this in Vue:
```html
Here be <span v-if="dragons"><em>dragons</em> or </span>other creatures.

<p v-if="dragons">
And here, too.
</p>
```

## Installation
node.js
```bash
$ npm install markdown-it-when --save
```

## API
```js
var md = require('markdown-it')()
            .use(require('markdown-it-when')[, options]);
```

Options:
- __options:__:
    - __phrases__ - optional, what words are supported, default: `[ 'when', 'until' ]`
    - __startRegex__ - optional, the regex for the start tag, default: `'\\(\\($0 (.*?)\\)\\)'` matches anything like `((phrase anything))`. The `$0`is replaced with any of the phrases
    - __endReges__ -optional, the regex for the end tag, default: `'\\(\\(\\/$0\\)\\)'`, matches anything like `((/phrase))`
    
 ## License
 MIT (see LICENSE file)
