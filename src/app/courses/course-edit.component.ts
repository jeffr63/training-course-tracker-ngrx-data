import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, Subscription } from 'rxjs';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

import { Course } from '../shared/course';
import { Path } from '../shared/paths';
import { PathService } from '../services/path.service';
import { Source } from '../shared/sources';
import { SourceService } from '../services/source.service';
import { CourseService } from './course.service';

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
  paths$: Observable<Path[]>;
  sources$: Observable<Source[]>;
  faSave = faSave;
  faBan = faBan;
  private isNew = true;
  private subCourses: Subscription;
  private subRoute: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private courseService: CourseService,
    private pathService: PathService,
    private sourceService: SourceService
  ) { }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe((params) => {
      if (params.id !== 'new') {
        this.isNew = false;
        this.subCourses = this.courseService.getByKey(params.id).subscribe((course: Course) => {
          this.course = { ...course };
        });
      }
    });

    this.paths$ = this.pathService.getAll();
    this.sources$ = this.sourceService.getAll();
  }

  ngOnDestroy() {
    this.componentActive = false;
    this.subRoute.unsubscribe();
    if (this.subCourses) {
      this.subCourses.unsubscribe();
    }
  }

  save() {
    if (this.isNew) {
        this.courseService.add(this.course);
    } else {
        this.courseService.update(this.course);
    }
    this.location.back();
  }
}
