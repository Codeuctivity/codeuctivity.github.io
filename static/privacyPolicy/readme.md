# howto generate html from md

``` javascript
for file in *.md; do npx marked -o "${file%.md}.html" "$file"; done
```
