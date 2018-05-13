# Important Note

This is a personal project just for internal use at work (I used it to try out
`@angular/cli`'s `ng generate library`).

If you want more info on how to build an angular library with @angular/cli, take a look at this [great
article](https://medium.com/@tomsu/how-to-build-a-library-for-angular-apps-4f9b38b0ed11).

# MultiDatepicker

This datepicker is built upon `@material2/datepicker`.

## Getting Started

`npm i @julianobrasil/multidatepicker --save`

In the `@NgModule` where it will be used (usually `app.module.ts` for an application wide installation):

```ts
  import {MultiDatepickerModule} from '@julianobrasil/multidatepicker';
  
  ...

  imports: [...,MultiDatepickerModule,...]
```

To see the possibilities, checkout this stackblitz demo: https://stackblitz.com/edit/angular-mulitdate-picker-demo

So you can mess with the code (it's not so hard)
