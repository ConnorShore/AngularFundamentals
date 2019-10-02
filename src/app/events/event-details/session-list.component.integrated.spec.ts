import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent } from './session-list.component';
// import { UpvoteComponent } from './upvote.component';
// import { CollapsibleWellComponent } from '../../common/collapsible-well.component';
import { DurationPipe } from '../shared/duration.pipe';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';
import { By } from '@angular/platform-browser';

describe('SessionListComponent', () => {
	let fixture: ComponentFixture<SessionListComponent>;
	let component: SessionListComponent;
	let element: HTMLElement;
	let debugEl: DebugElement;

	beforeEach(async(() => {
		const mockAuthService = {
			isAuthenticated: () => true,
			currentUser: {userName: 'Joe'}
		};
		const mockVoterService = {
			userHasVoted: () => true
		};

		TestBed.configureTestingModule({
			imports: [],
			declarations: [
				SessionListComponent,
				// UpvoteComponent,
				DurationPipe,
				// CollapsibleWellComponent
			],
			providers: [
				{ provide: AuthService, useValue: mockAuthService },
				{ provide: VoterService, useValue: mockVoterService }
			],
			schemas: [
				NO_ERRORS_SCHEMA    // this is if we want certain html elements to be 'dead'
									// (so we don't have to include UpvoteComponent <upvote> or CollapsableWellComponent w/out error)
			]
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SessionListComponent);
		component = fixture.componentInstance;
		debugEl = fixture.debugElement;
		element = fixture.nativeElement;
	});

	describe('initial display', () => {
		it('should have the correct session title', () => {
			component.sessions = [{id: 3, name: 'Session 1', presenter: 'Joe',
				duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john', 'bob']}];
			component.filterBy = 'all';
			component.sortBy = 'name';
			component.eventId = 4;

			// Change the state
			component.ngOnChanges();
			fixture.detectChanges();

			// Get the root element of the component and grab the element with the well-title attribute
			expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
			expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1'); // this test does same thing, just with debug element
		});
	});
});
