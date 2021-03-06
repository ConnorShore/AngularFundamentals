import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession, IEvent } from '../events';
import { EventService } from '../events/index';

@Component({
	selector: 'nav-bar',
	templateUrl: './navbar.component.html',
	styles: [`
		.nav.navbar-nav {font-size: 15px;}
		#searchForm {margin-right: 100px;}
		@media (max-width: 1200px) {#searchForm {display:none}}
		li > a.active { color: #F97924; }
    `]
})

export class NavBarComponent implements OnInit {
	searchTerm = '';
	foundSessions: ISession[];

	events: IEvent[];

	constructor(public auth: AuthService, private eventService: EventService) { }

	ngOnInit() {
		this.eventService.getEvents().subscribe((events: IEvent[]) => {
			this.events = events;
		});
	}

	searchSessions(searchTerm) {
		this.eventService.searchSessions(searchTerm).subscribe(sessions => {
			this.foundSessions = sessions;
		});
	}
}
