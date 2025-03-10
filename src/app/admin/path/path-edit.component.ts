import { Component, OnInit, inject, DestroyRef, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { Path } from '@models/paths';
import { PathEditCardComponent } from './path-edit-card.component';
import { PathService } from '@shared/services/path/path.service';

@Component({
  selector: 'app-path-edit',
  imports: [PathEditCardComponent],
  template: `<app-path-edit-card [(pathEditForm)]="pathEditForm" (save)="save()" (cancel)="cancel()" />`,
})
export default class PathEditComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #location = inject(Location);
  readonly #pathService = inject(PathService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);

  protected readonly id = input.required<string>();
  #isNew = true;
  #path = <Path>{};
  protected pathEditForm!: FormGroup;

  ngOnInit() {
    this.pathEditForm = this.#fb.group({
      name: ['', Validators.required],
    });

    if (this.id() === 'new') return;

    this.#isNew = false;
    this.#pathService
      .getByKey(this.id())
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((path: Path) => {
        this.#path = { ...path };
        this.pathEditForm.get('name').setValue(this.#path.name);
      });
  }

  protected cancel() {
    this.#router.navigate(['/admin/paths']);
  }

  protected save() {
    this.#path.name = this.pathEditForm.controls.name.value;
    if (this.#isNew) {
      this.#pathService.add(this.#path);
    } else {
      this.#pathService.update(this.#path);
    }
    this.#location.back();
  }
}
