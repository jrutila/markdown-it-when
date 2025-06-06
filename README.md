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

### List item plugin (optional)

The list item plugin for `markdown-it-when` is a plugin that allows you to conditionally render list items. For example:

```
- [[when dragons]] dragonics
- other creatures ((when black))black((/when))
```

Will be rendered as:

```
<ul>
<li when="dragons">dragonics</li>
<li>other creatures <span when="black">black</span></li>
</ul>
```


```js
var md = require('markdown-it')()
            .use(require('markdown-it-when/list-item-plugin')[, options]);
```

Options:
- __options:__:
    - __phrases__ - optional, what words are supported, default: `[ 'when', 'until' ]`
    - __listRegex__ - optional, the regex for the list item, default: `'\\[\\[$0 ([^)]*?)\\]\\]'` matches anything like `[[phrase anything]]`. The `$0`is replaced with any of the phrases
    - __whenListItemOpenRender__ - optional, the render function for when list item opens, defaults to `<li phrase="condition">`
    - __whenListItemCloseRender__ - optional, the render function for when list item closes, defaults to `</li>`
    - __whenListItemOpen__ - optional, if you want to fine-tune the list item open logic, you probably are good by using the `whenListItemOpenRender`
    - __whenListItemClose__ - optional, if you want to fine-tune the list item close logic, you probably are good by using the `whenListItemCloseRender`

## Contributing
Please contribute. 

```bash
$ pnpm install
$ pnpm test
```

Check out the `test/fixtures/default.txt` file for the test cases. Create a test case following the [markdown-it-testgen](https://github.com/markdown-it/markdown-it-testgen) format. Then implement the feature and create a pull request.

### Building
```bash
pnpm build
```

### Publishing
```bash
pnpm publish
```

## License
 MIT (see LICENSE file)
