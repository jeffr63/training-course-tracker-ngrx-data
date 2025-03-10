import { Router } from '@angular/router';
import { Component, OnInit, inject, DestroyRef, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Source } from '@models/sources';
import { SourceEditCardComponent } from './source-edit-card.component';
import { SourceService } from '@shared/services/source/source.service';

@Component({
  selector: 'app-source-edit',
  imports: [SourceEditCardComponent],
  template: `<app-source-edit-card [(sourceEditForm)]="sourceEditForm" (cancel)="cancel()" (save)="save()" />`,
})
export default class SourceEditComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #location = inject(Location);
  readonly #sourceService = inject(SourceService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);

  protected readonly id = input.required<string>();
  #isNew = true;
  #source = <Source>{};
  protected sourceEditForm!: FormGroup;

  ngOnInit() {
    this.sourceEditForm = this.#fb.group({
      name: ['', Validators.required],
    });

    if (this.id() === 'new') return;

    this.#isNew = false;
    this.#sourceService
      .getByKey(this.id())
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((source: Source) => {
        this.#source = { ...source };
        this.sourceEditForm.get('name').setValue(this.#source.name);
      });
  }

  protected cancel() {
    this.#router.navigate(['/admin/sources']);
  }

  protected save() {
    this.#source.name = this.sourceEditForm.controls.name.value;
    if (this.#isNew) {
      this.#sourceService.add(this.#source);
    } else {
      this.#sourceService.update(this.#source);
    }
    this.#location.back();
  }
}
