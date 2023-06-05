import { RouterLink } from '@angular/router';
import { Component, OnInit, inject, Input, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Source } from '@models/sources';
import { SourceService } from '@services/source.service';

@Component({
  selector: 'app-source-edit',
  standalone: true,
  imports: [NgIf, NgbModule, ReactiveFormsModule, RouterLink],

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="sourceEditForm" [formGroup]="sourceEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Source Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="name" placeholder="Enter source name" />
              <div *ngIf="sourceEditForm.controls.name.errors?.required && sourceEditForm.controls.name?.touched">
                <small class="text-danger">Source Name is required</small>
              </div>
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary" (click)="save()" title="Save" [disabled]="!sourceEditForm.valid">
              <i class="bi bi-save"></i> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/admin/sources']" title="Cancel">
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
export default class SourceEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private location = inject(Location);
  private sourceService = inject(SourceService);
  private destroyRef = inject(DestroyRef);

  @Input() id;
  isNew = true;
  source = <Source>{};
  sourceEditForm!: FormGroup;

  ngOnInit() {
    this.sourceEditForm = this.fb.group({
      name: ['', Validators.required],
    });

    if (this.id === 'new') return;

    this.isNew = false;
    this.sourceService
      .getByKey(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((source: Source) => {
        this.source = { ...source };
        this.sourceEditForm.get('name').setValue(this.source.name);
      });
  }

  save() {
    this.source.name = this.sourceEditForm.controls.name.value;
    if (this.isNew) {
      this.sourceService.add(this.source);
    } else {
      this.sourceService.update(this.source);
    }
    this.location.back();
  }
}
