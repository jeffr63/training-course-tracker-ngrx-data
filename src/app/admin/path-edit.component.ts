import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Path } from '../models/paths';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-path-edit',
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule, RouterModule],

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
export class PathEditComponent implements OnInit, OnDestroy {
  componentActive = true;
  pathEditForm!: FormGroup;
  private path = <Path>{};
  private isNew = true;
  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pathService: PathService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.pathEditForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.sub.add(
      this.route.params.subscribe((params) => {
        if (params.id !== 'new') {
          this.isNew = false;
          this.sub.add(
            this.pathService.getByKey(params.id).subscribe((path: Path) => {
              this.path = { ...path };
              this.pathEditForm.get('name').setValue(this.path.name);
            })
          );
        }
      })
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
    this.sub.unsubscribe();
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
