import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { 
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  EventResolver
} from './events/index'

import { 
	TOASTR_TOKEN, 
	Toastr, 
	JQ_TOKEN, 
	CollapsibleWellComponent, 
	SimpleModalComponent,
	ModalTriggerDirective
} from './common/index';

import { appRoutes } from './routes';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

let toastr: Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(appRoutes),
		HttpClientModule
	],
	declarations: [
		EventsAppComponent,
		EventsListComponent,
		EventThumbnailComponent,
		NavBarComponent,
		EventDetailsComponent,
		CreateEventComponent,
		CreateSessionComponent,
		Error404Component,
		SessionListComponent,
		CollapsibleWellComponent,
		SimpleModalComponent,
		ModalTriggerDirective,
		UpvoteComponent,
		DurationPipe,
		LocationValidator,
	],
	providers: [
		EventService,
		EventResolver,
		EventListResolver,
		AuthService,
		VoterService,
		{ provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
		{ provide: TOASTR_TOKEN, useValue: toastr },
		{ provide: JQ_TOKEN, useValue: jQuery },
	],
	bootstrap: [EventsAppComponent]
})

export class AppModule {}

export function checkDirtyState(comp: CreateEventComponent) {
	if(comp.isDirty) {
		return window.confirm('You have not saved this event, do you really want to cancel?')
	}

	return true;
}