import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultsMoodPage } from './search-results-mood.page';

const routes: Routes = [
  {
    path: '',
    component: SearchResultsMoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchResultsMoodPageRoutingModule {}
