import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from 'src/model/author.model';

@Injectable({
    providedIn: 'root'
})
export class SearchListService {
    public apiURL: string = 'https://final-year-project-backend-pi.vercel.app/author';
    public authorId: string = '';
    public personalDetails: any = {};
    
    constructor(private http: HttpClient) {}

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } 
        else {
            console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    async getAuthorListByName(name: string) {
        try {
            var body: any = { "name": name };
            const response = await this.http.post<Author[]>(this.apiURL, {observe: body}).pipe(
                catchError(this.handleError)
            ).subscribe();
            return response;
        } 
        catch (error) {
            console.log("Error: Failed to Get Author List Details");
            return null;
        }
    }
}