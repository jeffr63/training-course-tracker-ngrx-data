import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdminComponent } from './admin.component';
import { CanActivateAdmin } from '../auth/canActiveateAdmin.guard';
import { PathListComponent } from './path-list.component';
import { PathEditComponent } from './path-edit.component';
import { SourceListComponent } from './source-list.component';
import { SourceEditComponent } from './source-edit.component';

const routes = [
  {
    path: '', children: [
      { path: '', component: AdminComponent },
      { path: 'sources', component: SourceListComponent },
      { path: 'sources/:id', component: SourceEditComponent },
      { path: 'paths', component: PathListComponent },
      { path: 'paths/:id', component: PathEditComponent },
    ],
    canActivate: [CanActivateAdmin]
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    PathListComponent,
    PathEditComponent,
    SourceListComponent,
    SourceEditComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
