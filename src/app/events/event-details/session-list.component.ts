import { Component, Input, OnChanges } from "@angular/core";
import { ISession } from '../shared';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from './voter.service';


@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})

export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    visibleSessions: ISession[] = [];

    constructor(private auth: AuthService, private voterService: VoterService) { }

    //Called whenenver input variables is changed
    ngOnChanges() {
        if(this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAscending) : this.visibleSessions.sort(sortByVotesDecending);
        }
    }

    filterSessions(filter) {
        if(filter === 'all') {
            this.visibleSessions = this.sessions.slice(0);  // create duplicate of array with all the same elements
        } else {
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            })
        }
    }

    toggleVote(session: ISession) {
        if(this.userHasVoted(session)) {
            this.voterService.deleteVoter(session, this.auth.currentUser.userName);
        } else {
            this.voterService.addVoter(session, this.auth.currentUser.userName);
        }

        if(this.sortBy === 'votes') {
            //if sorting by votes, update the sort after adding/removing vote
            this.visibleSessions.sort(sortByVotesDecending);
        }
    }

    userHasVoted(session: ISession): boolean {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
    }
}

//stateless so no need to have them in the class
function sortByNameAscending(s1: ISession, s2: ISession) {
    if(s1.name > s2.name) return 1;
    else if(s1.name == s2.name) return 0;
    else return -1;
}

function sortByVotesDecending(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
}