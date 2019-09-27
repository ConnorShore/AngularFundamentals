import { Component, Input, OnChanges } from "@angular/core";
import { ISession } from '../shared';


@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})

export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    visibleSessions: ISession[] = [];

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