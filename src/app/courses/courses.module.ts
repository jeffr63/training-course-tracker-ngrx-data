import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CanActivateEdit } from '../auth/canActiveateEdit.guard';
import { CourseEditComponent } from './course-edit.component';
import { CourseListComponent } from './course-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routes = [
  {
    path: '',
    children: [
      { path: '', component: CourseListComponent },
      {
        path: ':id',
        component: CourseEditComponent,
        canActivate: [CanActivateEdit],
      },
    ],
  },
];

@NgModule({
  declarations: [CourseEditComponent, CourseListComponent],
  imports: [CommonModule, FontAwesomeModule, NgbModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoursesModule {}
