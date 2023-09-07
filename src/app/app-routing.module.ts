import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopupComponent } from './popup/popup.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

const routes: Routes = [
  { path: '', component: MyCalendarComponent},
  { path: 'deal/:date', component: PopupComponent},
  { path: 'side', component: SidemenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
