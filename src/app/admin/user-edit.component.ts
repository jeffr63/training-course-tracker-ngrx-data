import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { UserService } from '../services/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-user-edit',
  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="userEditForm" [formGroup]="userEditForm">
          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="name">Name</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="Enter user's name" formControlName="name" />
              <div *ngIf="userEditForm.controls.name.errors?.required">
                <small class="text-danger">Name is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="email">Email</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="Enter email address" formControlName="email" />
              <div *ngIf="userEditForm.controls.email.errors?.required">
                <small class="text-danger">Email is required</small>
              </div>
              <div *ngIf="userEditForm.controls.email.errors?.email">
                <small class="text-danger">Must be a valid email</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="email">Roles</label>
            <div class="form-group form-radio col-sm-3" style="margin-left:20px">
              <input type="radio" class="form-check-input" id="role1" value="admin" formControlName="role" />
              <label class="form-check-label" for="check1">Admin</label>
              <div *ngIf="userEditForm.controls.role.errors?.required">
                <small class="text-danger">Role is required</small>
              </div>
            </div>
            <div class="form-group form-radio col-sm-3">
              <input type="radio" class="form-check-input" value="user" id="role2" formControlName="role" />
              <label class="form-check-label" for="check1">User</label>
            </div>
          </fieldset>

          <div class="form-group row form-buttons">
            <button class="btn btn-primary mr-sm-2" (click)="save()" title="Save" [disabled]="!userEditForm.valid">
              <fa-icon [icon]="faSave"></fa-icon> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/admin/users']" title="Cancel">
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
export class UserEditComponent implements OnInit, OnDestroy {
  componentActive = true;
  faSave = faSave;
  faBan = faBan;
  user = <User>{};
  userEditForm!: FormGroup;
  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userEditForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    this.sub.add(
      this.route.params.subscribe((params) => {
        if (params.id !== 'new') {
          this.sub.add(
            this.userService.getByKey(params.id).subscribe((user: User) => {
              this.user = { ...user };
              this.userEditForm.get('name').setValue(user.name);
              this.userEditForm.get('email').setValue(user.email);
              this.userEditForm.get('role').setValue(user.role);
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
    const patchData = {
      name: this.userEditForm.controls.name.value,
      email: this.userEditForm.controls.email.value,
      role: this.userEditForm.controls.role.value,
    };
    this.sub.add(this.userService.patch(this.user.id, patchData).subscribe());
    this.location.back();
  }
}
