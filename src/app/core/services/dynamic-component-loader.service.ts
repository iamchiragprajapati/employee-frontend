import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";

export interface ComponentLoader {
  loadChildren: () => Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentLoaderService {

  loadComponentDynamically(
    vcr: ViewContainerRef,
    loadChildren: () => Promise<any>,
  ): Observable<ComponentRef<any>> {
    vcr.clear();
    return this.forChild(vcr, { loadChildren });
  }

  private forChild(vcr: ViewContainerRef, cl: ComponentLoader): Observable<ComponentRef<any>> {
    return from(cl.loadChildren()).pipe(
      map((component: any) => vcr.createComponent(component))
    );
  }

}
