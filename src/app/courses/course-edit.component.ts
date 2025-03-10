import { AsyncPipe, Location } from '@angular/common';
import { Component, OnInit, inject, DestroyRef, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Course } from '@models/course';
import { CourseService } from '@shared/services/course/course.service';
import { Path } from '@models/paths';
import { PathService } from '@shared/services/path/path.service';
import { Source } from '@models/sources';
import { SourceService } from '@shared/services/source/source.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CourseEditCardComponent } from './course-edit-card.component';

@Component({
  selector: 'app-course-edit',
  imports: [CourseEditCardComponent],
  template: `<app-course-edit-card
    [(courseEditForm)]="courseEditForm"
    [paths]="paths()"
    [sources]="sources()"
    (cancel)="cancel()"
    (save)="save()" />`,
})
export default class CourseEditComponent implements OnInit {
  readonly #courseService = inject(CourseService);
  readonly #fb = inject(FormBuilder);
  readonly #location = inject(Location);
  readonly #pathService = inject(PathService);
  readonly #sourceService = inject(SourceService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);

  protected readonly id = input.required<string>();
  #course = <Course>{};
  protected courseEditForm!: FormGroup;
  #isNew = true;
  protected paths = toSignal(this.#pathService.entities$);
  protected sources = toSignal(this.#sourceService.entities$);

  ngOnInit() {
    this.courseEditForm = this.#fb.group({
      title: ['', Validators.required],
      instructor: ['', Validators.required],
      path: ['', Validators.required],
      source: ['', Validators.required],
    });

    this.#pathService.getAll();
    this.#sourceService.getAll();

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

  protected cancel() {
    this.#router.navigate(['/courses'])
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
