import { AsyncPipe, Location } from '@angular/common';
import { Component, OnInit, inject, DestroyRef, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Course } from '@models/course';
import { CourseService } from '@services/course.service';
import { Path } from '@models/paths';
import { PathService } from '@services/path.service';
import { Source } from '@models/sources';
import { SourceService } from '@services/source.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-course-edit',
    imports: [AsyncPipe, NgbModule, ReactiveFormsModule, RouterLink],
    template: `
    <section class="container">
      <section class="card">
        @if (courseEditForm) {
        <form [formGroup]="courseEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="title">Title</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="title" placeholder="Enter title of course taken" />
              @if (courseEditForm.controls.title.errors?.required && courseEditForm.controls.title?.touched) {
              <small class="text-danger">Title is required</small>
              }
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="instructor">Instructor</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="instructor" placeholder="Enter name of course's intructor" />
              @if (courseEditForm.controls.instructor.errors?.required && courseEditForm.controls.instructor?.touched) {
              <small class="text-danger">Instructor is required</small>
              }
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="path">Path</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="path" list="path-helpers" placeholder="Enter techical path of course (ex: Angular or React)" />
              <datalist id="path-helpers">
                @for (path of paths$ | async; track path.id) {
                <option value="{{ path.name }}"></option>
                }
              </datalist>
              @if (courseEditForm.controls.path.errors?.required && courseEditForm.controls.path?.touched) {
              <small class="text-danger">Path is required</small>
              }
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="source">Source</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" formControlName="source" list="source-helpers" placeholder="Enter source of course (ex: Pluralsight)" />
              <datalist id="source-helpers">
                @for (source of sources$ | async; track source.id) {
                <option value="{{ source.name }}"></option>
                }
              </datalist>
              @if (courseEditForm.controls.source.errors?.required && courseEditForm.controls.source?.touched) {
              <small class="text-danger">Source is required</small>
              }
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary" (click)="save()" title="Save" [disabled]="!courseEditForm.valid"><i class="bi bi-save"></i> Save</button>
            <a class="btn btn-secondary" [routerLink]="['/courses']"> <i class="bi bi-x-circle"></i> Cancel </a>
          </div>
        </form>
        }
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
    ]
})
export default class CourseEditComponent implements OnInit {
  readonly #courseService = inject(CourseService);
  readonly #fb = inject(FormBuilder);
  readonly #location = inject(Location);
  readonly #pathService = inject(PathService);
  readonly #sourceService = inject(SourceService);
  readonly #destroyRef = inject(DestroyRef);

  protected readonly id = input.required<string>();
  #course = <Course>{};
  protected courseEditForm!: FormGroup;
  #isNew = true;
  protected paths$: Observable<Path[]>;
  protected sources$: Observable<Source[]>;

  ngOnInit() {
    this.courseEditForm = this.#fb.group({
      title: ['', Validators.required],
      instructor: ['', Validators.required],
      path: ['', Validators.required],
      source: ['', Validators.required],
    });

    this.#pathService.getAll();
    this.paths$ = this.#pathService.entities$;
    this.#sourceService.getAll();
    this.sources$ = this.#sourceService.entities$;

    if (this.id() === 'new') return;

    this.#isNew = false;
    this.#courseService
      .getByKey(this.id())
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((course: Course) => {
        this.#course = { ...course };
        this.courseEditForm.patchValue({
          title: course.title,
          instructor: course.instructor,
          path: course.path,
          source: course.source,
        });
      });
  }

  protected save() {
    const { title, instructor, path, source } = this.courseEditForm.getRawValue();
    this.#course.title = title;
    this.#course.instructor = instructor;
    this.#course.path = path;
    this.#course.source = source;

    if (this.#isNew) {
      this.#courseService.add(this.#course);
    } else {
      this.#courseService.update(this.#course);
    }
    this.#location.back();
  }
}
