import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UserService } from '@shared/services/user/user.service';
import { User } from '@models/user';
import { UserEditCardComponent } from './user-edit-card.component';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  imports: [UserEditCardComponent],
  template: `<app-user-edit-card [(userEditForm)]="userEditForm" (cancel)="cancel()" (save)="save()" />`,
})
export default class UserEditComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #location = inject(Location);
  readonly #userService = inject(UserService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);

  protected readonly id = input.required<string>();
  #user = <User>{};
  protected userEditForm!: FormGroup;

  ngOnInit() {
    this.userEditForm = this.#fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    if (this.id() === 'new') return;

    this.#userService
      .getByKey(this.id())
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((user: User) => {
        this.#user = { ...user };
        this.userEditForm.patchValue({
          name: user.name,
          email: user.email,
          role: user.role,
        });
      });
  }

  protected cancel() {
    this.#router.navigate(['/admin/users']);
  }

  protected save() {
    const patchData = this.userEditForm.getRawValue();
    this.#userService.patch(this.#user.id, patchData).pipe(take(1)).subscribe();
    this.#userService.getAll();
    this.#location.back();
  }
}
