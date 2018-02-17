# clean previous distribution
Remove-Item -r -fo build,dist

# run angular compiler
node_modules/.bin/ngc -p src/tsconfig-build.json
node_modules/.bin/rollup build/multi-datepicker.js -o dist/multi-datepicker.js -format=es -external="@angular/core"

Copy-Item src/package.json -Destination dist/package.json
