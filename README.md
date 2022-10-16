# markdown-it-when
Conditional text render plugin for markdown-it markdown parser

With this plugin you can create conditional text blocks and inline parts that are rendered only when (that's where the name comes from) the condition is met.

```
Here be ((when dragons))*dragons* or ((/when))other creatures.

((when dragons))
And here, too.
((/when))
```

Now you can override `when_open`, `when_close`, `when_block_open` and `when_block_close` blocks and inline blocks to achieve something like this in, for example, Vue:
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
    - __startRegex__ - optional, the regex for the start tag, default: `'\\(\\($0 ([^)]*?)\\)\\)'` matches anything like `((phrase anything))`. The `$0`is replaced with any of the phrases
    - __endRegex__ - optional, the regex for the end tag, default: `'\\(\\(\\/$0\\)\\)'`, matches anything like `((/phrase))`
    - __whenBlockOpen__ - optional, the render function for when open block, NOTE! There's no good default rendered implemented, you have to provide something
    - __whenBlockClose__ - optional, the render function for when close block, NOTE! There's no good default rendered implemented, you have to provide something
    - __whenOpen__ - optional, the render function for when open inline, NOTE! There's no good default rendered implemented, you have to provide something
    - __whenClose__ - optional, the render function for when close inline, NOTE! There's no good default rendered implemented, you have to provide something

## Contributing
Please contribute. Check out the `test/fixtures/default.txt` file for the test cases. Create a test case following the [markdown-it-testgen](https://github.com/markdown-it/markdown-it-testgen) format. Then implement the feature and create a pull request.
    
## License
 MIT (see LICENSE file)
