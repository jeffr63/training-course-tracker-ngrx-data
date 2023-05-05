import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, NgIf } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject, takeUntil } from 'rxjs';

import { Path } from '../models/paths';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-path-edit',
  standalone: true,
  imports: [NgIf, NgbModule, ReactiveFormsModule, RouterLink],

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="pathEditForm" [formGroup]="pathEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Path Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter path name" />
              <div *ngIf="pathEditForm.controls.name.errors?.required && pathEditForm.controls.name?.touched">
                <small class="text-danger">Path Name is required</small>
              </div>
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary" (click)="save()" title="Save" [disabled]="!pathEditForm.valid">
              <i class="bi bi-save"></i> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/admin/paths']" title="Cancel">
              <i class="bi bi-x-circle"></i> Cancel
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
export default class PathEditComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  location = inject(Location);
  pathService = inject(PathService);
  route = inject(ActivatedRoute);

  destroy$ = new ReplaySubject<void>(1);
  isNew = true;
  pathEditForm!: FormGroup;
  path = <Path>{};

  ngOnInit() {
    this.pathEditForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params.id !== 'new') {
        this.isNew = false;
        this.pathService
          .getByKey(params.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((path: Path) => {
            this.path = { ...path };
            this.pathEditForm.get('name').setValue(this.path.name);
          });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  save() {
    this.path.name = this.pathEditForm.controls.name.value;
    if (this.isNew) {
      this.pathService.add(this.path);
    } else {
      this.pathService.update(this.path);
    }
    this.location.back();
  }
}
