import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { Source } from '../shared/sources';
import { SourceService } from '../services/source.service';

@Component({
  selector: 'app-source-edit',

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="source">
          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="name">Source Name</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                name="name"
                [(ngModel)]="source.name"
                placeholder="Enter source name"
              />
            </div>
          </fieldset>

          <div class="form-group row form-buttons">
            <button class="btn btn-primary mr-sm-2" (click)="save()" title="Save">
              <fa-icon [icon]="faSave"></fa-icon> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/admin/sources']" title="Cancel">
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
export class SourceEditComponent implements OnInit, OnDestroy {
  source = <Source>{};
  componentActive = true;
  faSave = faSave;
  faBan = faBan;
  private isNew = true;
  private subSource: Subscription;
  private subRoute: Subscription;

  constructor(private route: ActivatedRoute, private location: Location, private sourceService: SourceService) { }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe((params) => {
      if (params.id !== 'new') {
        this.isNew = false;
        this.subSource = this.sourceService.getByKey(params.id).subscribe((source: Source) => {
          this.source = { ...source };
        });
      }
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
    this.subRoute.unsubscribe();
    if (this.subSource) {
      this.subSource.unsubscribe();
    }
  }

  save() {
    if (this.isNew) {
      this.sourceService.add(this.source);
    } else {
      this.sourceService.update(this.source);
    }
    this.location.back();
  }
}
