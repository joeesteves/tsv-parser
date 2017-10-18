### Instalation
  npm install --save tsv-parser
  yarn add tsv-parser
### Use (uses rxjs)
```js
import { parse } from tsv-parser
  parse(url.tsv)
  .subscribe(console.log)
```