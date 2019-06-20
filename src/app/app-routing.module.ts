import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryDetailsComponent, ListEntriesComponent } from './components';

const routes: Routes = [
    {
        path: '',
        component: ListEntriesComponent,
    },
    {
        path: ':id',
        component: EntryDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
