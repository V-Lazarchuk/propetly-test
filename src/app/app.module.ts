import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    ListEntriesComponent,
    EntryDetailsComponent,
    EntryComponent,
    PaginationComponent
} from './components';
import { SliceStrPipe } from './pipes';

@NgModule({
    declarations: [
        AppComponent,
        ListEntriesComponent,
        EntryComponent,
        EntryDetailsComponent,
        SliceStrPipe,
        PaginationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
