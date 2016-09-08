import {Component, NgModule, Input, Injectable} from '@angular/core';

import { PartsModule }   from '../parts/parts.module';

export interface IHaveDynamicData { 
    public entity: any;
}

@Injectable()
export class DynamicTypeBuilder {

  // this object is singleton - so we can use this as a cache
  private _cacheOfTypes  : { [templateKey: string]: any } = {};
  private _cacheOfModules: { [templateKey: string]: any } = {};
  
  public createComponentAndModule(template: string): {type: any, module: any} {
    let module;
    let type = this._cacheOfTypes[template];

    if (type) {
       module = this._cacheOfModules[template];
       console.log("Module and Type are returned from cache")
       return { type: type, module: module };
    }
    
    // unknown template ... let's create a Type for it
    type   = this.createNewComponent(template);
    module = this.createComponentModule(type);
    
    // cache that type and module - because the only difference would be "template"
    this._cacheOfTypes[template]   = type;
    this._cacheOfModules[template] = module;

    return { type: type, module: module };
  }
  
  protected createNewComponent (tmpl:string) {
      @Component({
          selector: 'dynamic-component',
          template: tmpl,
      })
      class CustomDynamicComponent  implements IHaveDynamicData {
          @Input()  public entity: any;
      };
      // a component for this particular template
      return CustomDynamicComponent;
  }
  protected createComponentModule (componentType: any) {
      @NgModule({
        imports: [
          PartsModule, // there are 'text-editor', 'string-editor'...
        ],
        declarations: [
          componentType
        ],
      })
      class RuntimeComponentModule
      {
      }
      // a module for just this Type
      return RuntimeComponentModule;
  }
}