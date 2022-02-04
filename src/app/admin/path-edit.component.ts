import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { Path } from '../shared/paths';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-path-edit',

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="path">
          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="name">Path Name</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                name="pathName"
                [(ngModel)]="path.name"
                placeholder="Enter path name"
              />
            </div>
          </fieldset>

          <div class="form-group row form-buttons">
            <button class="btn btn-primary mr-sm-2" (click)="save()" title="Save">
              <fa-icon [icon]="faSave"></fa-icon> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/admin/paths']" title="Cancel">
              <fa-icon [icon]="faBan"></fa-icon> Cancel
            </a>
          </div>
        </form>
      </section>
    </section>
  `,

  styles: [
    `
      section .card {
        margin-top: 30px;
        padding-left: 15px;
        padding-right: 15px;
      }
      .form-buttons {
        margin-left: 3px;
      }
    `,
  ],
})
export class PathEditComponent implements OnInit, OnDestroy {
  public path = <Path>{};
  componentActive = true;
  faSave = faSave;
  faBan = faBan;
  private isNew = true;
  private sub = new Subscription();

  constructor(private route: ActivatedRoute, private location: Location, private pathService: PathService) { }

  ngOnInit() {
    this.sub.add(this.route.params.subscribe((params) => {
      if (params.id !== 'new') {
        this.isNew = false;
        this.sub.add(this.pathService.getByKey(params.id).subscribe((path: Path) => {
          this.path = { ...path };
        }));
      }
    }))
  }

  ngOnDestroy() {
    this.componentActive = false;
    this.sub.unsubscribe();
  }

  save() {
    if (this.isNew) {
      this.pathService.add(this.path);
    } else {
      this.pathService.update(this.path);
    }
    this.location.back();
  }
}
