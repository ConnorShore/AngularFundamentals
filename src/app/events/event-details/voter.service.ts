import { Injectable } from "@angular/core";
import { ISession } from '../shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable()
export class VoterService {

    constructor(private http: HttpClient) { }

    addVoter(eventId: number, session: ISession, voterName: string) {
        //client side
        session.voters.push(voterName);

        //server side
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        const options = { headers: new HttpHeaders({'Content-Type': '/application/json'})};
        this.http.post(url, {}, options)
            .pipe(catchError(this.handleError('addVoter')))
            .subscribe();
    }

    deleteVoter(eventId: number, session: ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName);   //gets list of voters whose name isn't voterName (removes voterName from list essentially)

        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.delete(url)
            .pipe(catchError(this.handleError('addVoter')))
            .subscribe();
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName);
    }

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			return of(result as T);
		}
	}
}