import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BookComponent } from './book/book.component';
import { HeroComponent } from './hero/hero.component';
import { SearchresultComponent } from './searchresult/searchresult.component';

const routes: Routes = [
  {path:'', component :HeroComponent},
  {path:'search',component:SearchresultComponent},
  {path:'details',component:BookComponent},
  {path:'about', component:AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
