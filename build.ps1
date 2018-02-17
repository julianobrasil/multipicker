# clean previous distribution
Remove-Item -r -fo .ng_build,dist

# run angular compiler
node_modules/.bin/ngc -p src/lib/tsconfig-build.json
node_modules/.bin/rollup .ng_build/es2015/multi-datepicker.js -o ./dist/out-tsc/multi-datepicker.js -format=es -external="@angular/core"

Copy-Item src/lib/package.json -Destination dist/out-tsc/package.json
