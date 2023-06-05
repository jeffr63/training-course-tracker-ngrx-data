import { RouterLink } from '@angular/router';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, NgIf } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject, takeUntil } from 'rxjs';

import { UserService } from '@services/user.service';
import { User } from '@models/user';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [NgIf, NgbModule, ReactiveFormsModule, RouterLink],

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="userEditForm" [formGroup]="userEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="name">Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="Enter user's name" formControlName="name" />
              <div *ngIf="userEditForm.controls.name.errors?.required && userEditForm.controls.name.touched">
                <small class="text-danger">Name is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="email">Email</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="Enter email address" formControlName="email" />
              <div *ngIf="userEditForm.controls.email.errors?.required && userEditForm.controls.email.touched">
                <small class="text-danger">Email is required</small>
              </div>
              <div *ngIf="userEditForm.controls.email.errors?.email">
                <small class="text-danger">Must be a valid email</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="email">Roles</label>
            <div class="form-check col-sm-3" style="margin-left:20px">
              <input type="radio" class="form-check-input" id="role1" value="admin" formControlName="role" />
              <label class="form-check-label" for="check1">Admin</label>
              <div *ngIf="userEditForm.controls.role.errors?.required && userEditForm.controls.role.touched">
                <small class="text-danger">Role is required</small>
              </div>
            </div>
            <div class="form-check col-sm-3">
              <input type="radio" class="form-check-input" value="user" id="role2" formControlName="role" />
              <label class="form-check-label" for="check1">User</label>
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary" (click)="save()" title="Save" [disabled]="!userEditForm.valid">
              <i class="bi bi-save"></i> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/admin/users']" title="Cancel">
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
export default class UserEditComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private location = inject(Location);
  private userService = inject(UserService);

  @Input() id;
  destroy$ = new ReplaySubject<void>(1);
  user = <User>{};
  userEditForm!: FormGroup;

  ngOnInit() {
    this.userEditForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    if (this.id === 'new') return;

    this.userService
      .getByKey(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        this.user = { ...user };
        this.userEditForm.patchValue({
          name: user.name,
          email: user.email,
          role: user.role,
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  save() {
    const patchData = this.userEditForm.getRawValue();
    this.userService.patch(this.user.id, patchData).pipe(takeUntil(this.destroy$)).subscribe();
    this.location.back();
  }
}
