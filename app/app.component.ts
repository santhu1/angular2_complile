import { Component }          from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';

@Component({
  selector: 'my-app',  
  providers: [ COMPILER_PROVIDERS ],
  template: `
<div>
   <h2>An app with DYNAMIC content</h2>
   <hr />
   <dynamic-detail></dynamic-detail>
</div>`,
})
export class AppComponent { }