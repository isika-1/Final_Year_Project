import { Component, Injectable } from "@angular/core";
import { Location } from '@angular/common';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

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

    constructor(private location: Location, private http: HttpClient) {}

    ngOnInit() {
        this.author = this.location.getState();
        this.authorName = this.author.data;
        console.log(this.authorName);

        // find the authors
        var result: any = localStorage.getItem('findName-' + this.authorName);
        var res: any = JSON.parse(result);
        console.log(res.profiles);

        this.authorList = res.profiles;
    }

    private errorHandler(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } 
        else {
          console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    authorSearchById(id: string) {
        console.log(id);
    }

}