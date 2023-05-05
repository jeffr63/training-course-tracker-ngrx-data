import { AsyncPipe, Location, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';

import { Course } from '../models/course';
import { CourseService } from './course.service';
import { Path } from '../models/paths';
import { PathService } from '../services/path.service';
import { Source } from '../models/sources';
import { SourceService } from '../services/source.service';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf, NgbModule, ReactiveFormsModule, RouterLink],

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="courseEditForm" [formGroup]="courseEditForm">
          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="title">Title</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="title"
                placeholder="Enter title of course taken"
              />
              <div *ngIf="courseEditForm.controls.title.errors?.required && courseEditForm.controls.title?.touched">
                <small class="text-danger">Title is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="instructor">Instructor</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="instructor"
                placeholder="Enter name of course's intructor"
              />
              <div
                *ngIf="
                  courseEditForm.controls.instructor.errors?.required && courseEditForm.controls.instructor?.touched
                "
              >
                <small class="text-danger">Instructor is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="path">Path</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="path"
                list="path-helpers"
                placeholder="Enter techical path of course (ex: Angular or React)"
              />
              <datalist id="path-helpers">
                <div *ngFor="let path of paths$ | async">
                  <option value="{{ path.name }}"></option>
                </div>
              </datalist>
              <div *ngIf="courseEditForm.controls.path.errors?.required && courseEditForm.controls.path?.touched">
                <small class="text-danger">Path is required</small>
              </div>
            </div>
          </fieldset>

          <fieldset class="m-2 row">
            <label class="col-form-label col-sm-2" for="source">Source</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                formControlName="source"
                list="source-helpers"
                placeholder="Enter source of course (ex: Pluralsight)"
              />
              <datalist id="source-helpers">
                <div *ngFor="let source of sources$ | async">
                  <option value="{{ source.name }}"></option>
                </div>
              </datalist>
              <div *ngIf="courseEditForm.controls.source.errors?.required && courseEditForm.controls.source?.touched">
                <small class="text-danger">Source is required</small>
              </div>
            </div>
          </fieldset>

          <div class="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
            <button class="btn btn-primary" (click)="save()" title="Save" [disabled]="!courseEditForm.valid">
              <i class="bi bi-save"></i> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/courses']"> <i class="bi bi-x-circle"></i> Cancel </a>
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
export default class CourseEditComponent implements OnInit, OnDestroy {
  courseService = inject(CourseService);
  fb = inject(FormBuilder);
  location = inject(Location);
  pathService = inject(PathService);
  route = inject(ActivatedRoute);
  sourceService = inject(SourceService);

  course = <Course>{};
  courseEditForm!: FormGroup;
  destroy$ = new ReplaySubject<void>(1);
  isNew = true;
  paths$: Observable<Path[]>;
  sources$: Observable<Source[]>;

  ngOnInit() {
    this.courseEditForm = this.fb.group({
      title: ['', Validators.required],
      instructor: ['', Validators.required],
      path: ['', Validators.required],
      source: ['', Validators.required],
    });

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params.id !== 'new') {
        this.isNew = false;
        this.courseService.getByKey(params.id).pipe(takeUntil(this.destroy$)).subscribe((course: Course) => {
          this.course = { ...course };
          this.courseEditForm.patchValue({
            title: course.title,
            instructor: course.instructor,
            path: course.path,
            source: course.source,
          });
        });
      }
    });

    this.pathService.getAll();
    this.paths$ = this.pathService.entities$;
    this.sourceService.getAll();
    this.sources$ = this.sourceService.entities$;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  save() {
    const { title, instructor, path, source } = this.courseEditForm.getRawValue();
    this.course.title = title;
    this.course.instructor = instructor;
    this.course.path = path;
    this.course.source = source;

    if (this.isNew) {
      this.courseService.add(this.course);
    } else {
      this.courseService.update(this.course);
    }
    this.location.back();
  }
}
