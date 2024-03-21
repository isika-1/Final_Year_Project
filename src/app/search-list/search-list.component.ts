import { Component, Injectable } from "@angular/core";
import { Location } from '@angular/common';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { Author } from "src/model/author.model";

@Component({
    selector : 'app-search-list',
    templateUrl : './search-list.component.html',
    styleUrls : ['./search-list.component.css']
})

@Injectable({
    providedIn: 'root'
})

export class SearchListComponent{
    faMagnifyingGlass = faMagnifyingGlass;
    author: any = {};
    authorName: string = "";
    authorList: any = [];
    mauthorData: any = {};
    apiUrl : string = 'https://serpapi.com/search.json';
    apiKey: string = '0ac4f57fd4e92788d9dabf20118139043c5a04cc76d9d2560c54320a5fab75fd';
    apiEngine: string = 'google_scholar_profiles';
    commonUrl: string = '../../assets/mock-data/';
    apiURL: string = "https://final-year-project-backend-pi.vercel.app/authors";

    constructor(private location: Location, private http: HttpClient, private router: Router) {}

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
            await this.http.post<Author[]>(this.apiURL, body)
            .pipe(catchError(this.handleError))
            .subscribe(data => {
                console.log(data);
                this.authorList = data;
            });
        } 
        catch (error) {
            console.log("Error: Failed to Get Author List Details");
        }
    }

    async ngOnInit() {
        this.author = this.location.getState();
        this.authorName = this.author.data;
        console.log("Searching for " + this.authorName);
        await this.getAuthorListByName(this.authorName);
    }

    authorSearchById(id: string) {
        console.log(id);
        this.router.navigate(['/scholar/' + id]);
    }
}