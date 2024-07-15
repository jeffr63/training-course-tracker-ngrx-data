import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalDataService {
  private deleteModalOptions = {
    title: '',
    body: '',
    warning: '',
  };

  public setDeleteModalOptions(options: any) {
    this.deleteModalOptions = options;
  }

  public getDeleteModalOtions(): any {
    return this.deleteModalOptions;
  }
}
