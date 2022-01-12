import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import * as fromRoot from '../store';
import * as courseActions from '../store/course/course.actions';
import * as courseSelectors from '../store/course/course.selectors';
import * as pathsActions from '../store/paths/paths.actions';
import * as pathsSelectors from '../store/paths/paths.selectors';
import * as sourcesActions from '../store/sources/sources.actions';
import * as sourcesSelectors from '../store/sources/sources.selectors';
import { Course } from '../shared/course';

@Component({
  selector: 'app-course-edit',

  template: `
    <section class="container">
      <section class="card">
        <form *ngIf="course">
          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="title">Title</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                name="title"
                [(ngModel)]="course.title"
                placeholder="Enter title of course taken"
              />
            </div>
          </fieldset>

          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="instructor">Instructor</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                name="instructor"
                [(ngModel)]="course.instructor"
                placeholder="Enter name of course's intructor"
              />
            </div>
          </fieldset>

          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="path">Path</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                name="path"
                [(ngModel)]="course.path"
                list="path-helpers"
                placeholder="Enter techical path of course (ex: Angular or React)"
              />
              <datalist id="path-helpers">
                <div *ngFor="let path of paths$ | async">
                  <option value="{{ path.name }}"></option>
                </div>
              </datalist>
            </div>
          </fieldset>

          <fieldset class="form-group row">
            <label class="col-form-label col-sm-2" for="source">Source</label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                name="source"
                list="source-helpers"
                [(ngModel)]="course.source"
                placeholder="Enter where the course was sourced from (ex: Pluralsite)"
              />
              <datalist id="source-helpers">
                <div *ngFor="let source of sources$ | async">
                  <option value="{{ source.name }}"></option>
                </div>
              </datalist>
            </div>
          </fieldset>

          <div class="form-group row form-buttons">
            <button class="btn btn-primary mr-sm-2" (click)="save()" title="Save">
              <fa-icon [icon]="faSave"></fa-icon> Save
            </button>
            <a class="btn btn-secondary" [routerLink]="['/courses']"> <fa-icon [icon]="faBan"></fa-icon> Cancel </a>
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
export class CourseEditComponent implements OnInit, OnDestroy {
  course = <Course>{};
  loading = false;
  componentActive = true;
  paths$: Observable<any[]>;
  sources$: Observable<any[]>;
  faSave = faSave;
  faBan = faBan;

  constructor(private route: ActivatedRoute, private location: Location, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id !== 'new') {
        this.store.dispatch(courseActions.getCourse({ id: params.id }));
        this.store
          .pipe(
            select(courseSelectors.getCourse),
            takeWhile(() => this.componentActive)
          )
          .subscribe((course: Course) => (this.course = course));
      }
    });

    this.store.dispatch(pathsActions.loadPaths());
    this.paths$ = this.store.pipe(select(pathsSelectors.getPaths));

    this.store.dispatch(sourcesActions.loadSources());
    this.sources$ = this.store.pipe(select(sourcesSelectors.getSources));
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  save() {
    this.store.dispatch(courseActions.saveCourse({ course: this.course }));
    this.location.back();
  }
}
