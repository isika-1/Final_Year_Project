import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ScholarService } from "./scholar.service";
import { ArticleInfo } from "src/model/article-info.model";
import { Sort } from '@angular/material/sort';
import { catchError, delay, throwError } from "rxjs";

@Component({
    selector: 'app-scholar',
    templateUrl : './scholar.component.html',
    styleUrls : ['./scholar.component.css']
})

export class ScholarComponent {

    public authorId: string = "";

    public commonUrl: string = '../../assets/mock-data/';
    public personalDetails: any = {};
    public authorDetails: any = {};
    public name: string = "";
    public affiliation: string = "";
    public mail: string = "";
    public interests: any = [];
    public thumbnail: string = "";
    public articles: any = [];
    public coauthors: any = [];
    public articleData: Array<ArticleInfo> = [];
    public sortedData: Array<ArticleInfo> = [];
    public hData: any = [];
    public i10Data: any = [];
    public countData: any = [];
    public authorScore: any = ['—', '—', '—'];
    public coAuthorMap: Map<string, string> = {
        clear: function (): void {
            throw new Error("Function not implemented.");
        },
        delete: function (key: string): boolean {
            throw new Error("Function not implemented.");
        },
        forEach: function (callbackfn: (value: string, key: string, map: Map<string, string>) => void, thisArg?: any): void {
            throw new Error("Function not implemented.");
        },
        get: function (key: string): string | undefined {
            throw new Error("Function not implemented.");
        },
        has: function (key: string): boolean {
            throw new Error("Function not implemented.");
        },
        set: function (key: string, value: string): Map<string, string> {
            throw new Error("Function not implemented.");
        },
        size: 0,
        entries: function (): IterableIterator<[string, string]> {
            throw new Error("Function not implemented.");
        },
        keys: function (): IterableIterator<string> {
            throw new Error("Function not implemented.");
        },
        values: function (): IterableIterator<string> {
            throw new Error("Function not implemented.");
        },
        [Symbol.iterator]: function (): IterableIterator<[string, string]> {
            throw new Error("Function not implemented.");
        },
        [Symbol.toStringTag]: ""
    }

    public apiURL: string = 'https://final-year-project-backend-pi.vercel.app';
    public authorPersonal: any = {};
    public articleInfo: any = [];
    public articleDataList: Array<ArticleInfo> = [];
    public citedByMap: Map<string, number> = {
        clear: function (): void {
            throw new Error("Function not implemented.");
        },
        delete: function (key: string): boolean {
            throw new Error("Function not implemented.");
        },
        forEach: function (callbackfn: (value: number, key: string, map: Map<string, number>) => void, thisArg?: any): void {
            throw new Error("Function not implemented.");
        },
        get: function (key: string): number | undefined {
            throw new Error("Function not implemented.");
        },
        has: function (key: string): boolean {
            throw new Error("Function not implemented.");
        },
        set: function (key: string, value: number): Map<string, number> {
            throw new Error("Function not implemented.");
        },
        size: 0,
        entries: function (): IterableIterator<[string, number]> {
            throw new Error("Function not implemented.");
        },
        keys: function (): IterableIterator<string> {
            throw new Error("Function not implemented.");
        },
        values: function (): IterableIterator<number> {
            throw new Error("Function not implemented.");
        },
        [Symbol.iterator]: function (): IterableIterator<[string, number]> {
            throw new Error("Function not implemented.");
        },
        [Symbol
            //             count = count+1;
            //             break;
            //         }
            //     }
            // }
            // this.articleData[index].selfCitations = count;
            .
            //             count = count+1;
            //             break;
            //         }
            //     }
            // }
            // this.articleData[index].selfCitations = count;
            toStringTag //             count = count+1;
        ] //             count = count+1;
            : ""
    };
    public citationMap: Map<string, string> = {
        clear: function (): void {
            throw new Error("Function not implemented.");
        },
        delete: function (key: string): boolean {
            throw new Error("Function not implemented.");
        },
        forEach: function (callbackfn: (value: string, key: string, map: Map<string, string>) => void, thisArg?: any): void {
            throw new Error("Function not implemented.");
        },
        get: function (key: string): string | undefined {
            throw new Error("Function not implemented.");
        },
        has: function (key: string): boolean {
            throw new Error("Function not implemented.");
        },
        set: function (key: string, value: string): Map<string, string> {
            throw new Error("Function not implemented.");
        },
        size: 0,
        entries: function (): IterableIterator<[string, string]> {
            throw new Error("Function not implemented.");
        },
        keys: function (): IterableIterator<string> {
            throw new Error("Function not implemented.");
        },
        values: function (): IterableIterator<string> {
            throw new Error("Function not implemented.");
        },
        [Symbol.iterator]: function (): IterableIterator<[string, string]> {
            throw new Error("Function not implemented.");
        },
        // }
        // this.articleData[index].selfCitations = count;
        [
            // }
            // this.articleData[index].selfCitations = count;
            Symbol //     }


                // }
                // this.articleData[index].selfCitations = count;
                .


                // }
                // this.articleData[index].selfCitations = count;
                toStringTag // }
        ] // }
            : ""
    };
    public totalCount: number = 0;
    public total: Array<number> = [];
    public self: Array<number> = [];
    public other: Array<number> = [];

    constructor(private route: ActivatedRoute, private http: HttpClient, public ss: ScholarService) {
        route.params.subscribe((params) => {
            this.authorId = params["id"];
        });
        this.citedByMap = new Map();
        this.citationMap = new Map();
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } 
        else {
            console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    updateAuthorScores() {
        this.total.sort((a: number, b: number) => (a > b ? -1 : 1));
        this.self.sort((a: number, b: number) => (a > b ? -1 : 1));
        this.other.sort((a: number, b: number) => (a > b ? -1 : 1));
        // console.log(this.total);
        // console.log(this.self);
        // console.log(this.other);

        var i: number = 0, totalcount: number = 0, selfcount: number = 0, othercount: number = 0;
        var fl1: number = 1, fl2: number = 1;
        
        for(i=0; i<this.total.length; i++) {
            totalcount += this.total[i];
            if(i >= this.total[i] && fl1 > 0) {
                this.hData[0] = i; 
                fl1 = fl1-1;
            }
            if(this.total[i] < 10 && fl2 > 0) {
                this.i10Data[0] = i; 
                fl2 = fl2-1;
            }  
        }
        this.countData[0] = totalcount; 
        fl1 = 1; fl2 = 1; 
        for(i=0; i<this.self.length; i++) {
            selfcount += this.self[i];
            if(i >= this.self[i] && fl1 > 0) {
                this.hData[1] = i; 
                fl1 = fl1-1;
            }
            if(this.self[i] < 10 && fl2 > 0) {
                this.i10Data[1] = i; 
                fl2 = fl2-1;
            }  
        }
        this.countData[1] = selfcount; 
        fl1 = 1; fl2 = 1; 
        for(i=0; i<this.other.length; i++) {
            othercount += this.other[i];
            if(i >= this.other[i] && fl1 > 0) {
                this.hData[2] = i; 
                fl1 = fl1-1;
            }
            if(this.other[i] < 10 && fl2 > 0) {
                this.i10Data[2] = i; 
                fl2 = fl2-1;
            }  
        }
        this.countData[2] = othercount; 
        if(this.countData[0] != 0) {
            var x = ((selfcount/othercount).toFixed(4)).toString();
            if(x == 'Infinity' || x == "NaN")
                x = '∞';
            this.authorScore[0] = x;

            var x = ((selfcount/totalcount).toFixed(4)).toString();
            if(x == 'Infinity' || x == "NaN")
                x = '∞';
            this.authorScore[1] = x;

            var x = ((othercount/totalcount).toFixed(4)).toString();
            if(x == 'Infinity' || x == "NaN")
                x = '∞';
            this.authorScore[2] = x;
        }
    }

    calculateRatios(citationId: string, citedByList: any) {
        var count = 0;
        for(var x of citedByList) {
            var citedByAuthors = x.publication_info.authors;
            if(citedByAuthors == undefined)
                continue;
            for(var y in citedByAuthors) {
                if(citedByAuthors[y].author_id === this.authorId) {
                    count = count+1;
                    break;
                }
            }
        }
        console.log(this.citationMap.get(citationId) + " " + this.citedByMap.get(citationId) + " => " + count);
        var index = this.citedByMap.get(citationId);
        if(index != undefined) {
            // console.log(index);
            this.articleDataList[index].selfCitations = count;
            console.log(this.articleDataList[index]);
            this.articleDataList[index].otherCitations = this.articleDataList[index].totalCitations - this.articleDataList[index].selfCitations;
            this.total.push(Number(this.articleDataList[index].totalCitations));
            this.self.push(this.articleDataList[index].selfCitations);
            this.other.push(this.articleDataList[index].otherCitations);

            var x: any = (this.articleDataList[index].selfCitations/this.articleDataList[index].otherCitations).toFixed(2);
            this.articleDataList[index].selfOtherRatio = x.toString();
            if(this.articleDataList[index].selfOtherRatio == 'Infinity' || this.articleDataList[index].selfOtherRatio == "NaN")
                this.articleDataList[index].selfOtherRatio = '∞'
            
            x = (this.articleDataList[index].selfCitations/this.articleDataList[index].totalCitations).toFixed(2);
            this.articleDataList[index].selfAllRatio = x.toString();
            if(this.articleDataList[index].selfAllRatio == 'Infinity' || this.articleDataList[index].selfAllRatio == "NaN")
                this.articleDataList[index].selfAllRatio = '∞'
            
            x = (this.articleDataList[index].otherCitations/this.articleDataList[index].totalCitations).toFixed(2);
            this.articleDataList[index].otherAllRatio = x.toString();
            if(this.articleDataList[index].otherAllRatio == 'Infinity' || this.articleDataList[index].otherAllRatio == "NaN")
                this.articleDataList[index].otherAllRatio = '∞'

            if(this.articleDataList[index].totalCitations == 0)
            {
                this.articleDataList[index].selfOtherRatio = '—'
                this.articleDataList[index].selfAllRatio = '—'
                this.articleDataList[index].otherAllRatio = '—'
            }
        }
    }

    async getSelfCitationData(citationId: string) {
        try {
            var body: any = { "author_id": this.authorId, "cites_id": this.citationMap.get(citationId) };
            await this.http.post<any>(this.apiURL + "/api/get-cited-by-information", body)
            .pipe(catchError(this.handleError))
            .subscribe((data: any) => {
                var citedByList = data.organic_results;
                console.log(citedByList);
                console.log(this.citationMap.get(citationId) + " " + this.citedByMap.get(citationId));
                this.calculateRatios(citationId, citedByList);
                this.updateAuthorScores();
            });
        } 
        catch (error) {
            console.log("Error: Failed to Get Author List Details");
        }
    }

    async updateArticleDetails() {
        this.articleInfo = this.authorPersonal.articles;
        console.log(this.articleInfo);
        var index = 0;
        for(let article of this.articleInfo) {
            var data: ArticleInfo = { 
                title: "", totalCitations: 0, selfCitations: 0, otherCitations: 0, selfOtherRatio: '—', selfAllRatio: '—', otherAllRatio: '—'
            };
            data.title = article.title;
            if(article.cited_by_value != null)
                data.totalCitations = Number(article.cited_by_value);
            this.articleDataList.push(data); 
            var citationId = article.citation_id;
            var citesId = article.cites_id;
            if(citesId == undefined || citesId == null || citationId == null) 
                continue;
            console.log(citationId + " " + citesId + " -> " + data.totalCitations + " " + this.articleDataList.length);
            this.citedByMap.set(citationId, this.articleDataList.length-1);
            this.citationMap.set(citationId, citesId);
            this.totalCount++;
        }
        // console.log(this.totalCount);

        for(let article of this.articleInfo) {
            var citationId = article.citation_id;
            var citesId = article.cites_id;
            if(citesId == undefined || citesId == null || citationId == null) 
                continue;
            try {
                await this.getSelfCitationData(citationId);
            }
            catch (error) {
                console.log("Self Citation Details Unavailable");
            }
        }
    }

    async getAuthorDataById(id: string) {
        try {
            var body: any = { "id": id };
            await this.http.post<any>(this.apiURL + "/get-all-data", body)
            .pipe(catchError(this.handleError))
            .subscribe((data: any[]) => {
                this.authorPersonal = data[0];
                // console.log(this.authorPersonal);
                this.coauthors = this.authorPersonal.coauthors;
                this.updateArticleDetails();
            });
        } 
        catch (error) {
            console.log("Error: Failed to Get Author List Details");
        }
    }

    async ngOnInit() {
        console.log(this.authorId);
        try {
            await this.getAuthorDataById(this.authorId); 
        } 
        catch (error) {
            console.log("Error: Author Complete Details unavailable.");
        }
    }

    sortData(sort: Sort) {
        const data = this.articleDataList;
        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'totalCitations':
                    return this.compare(Number(a.totalCitations), Number(b.totalCitations), isAsc);
                case 'selfCitations':
                    return this.compare(Number(a.selfCitations), Number(b.selfCitations), isAsc);
                case 'otherCitations':
                    return this.compare(Number(a.otherCitations), Number(b.otherCitations), isAsc);
                case 'sor':
                    return this.compare1(a.selfOtherRatio, b.selfOtherRatio, isAsc);
                case 'sar':
                    return this.compare1(a.selfAllRatio, b.selfAllRatio, isAsc);
                case 'oar':
                    return this.compare1(a.otherAllRatio, b.otherAllRatio, isAsc);
                default:
                    return 0;
            }
        });
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    compare1(a: number | string, b: number | string, isAsc: boolean) {
        a = (a == "—") ? -1 : ((a == "∞") ? Number.MAX_SAFE_INTEGER : Number(a));
        b = (b == "—") ? -1 : ((b == "∞") ? Number.MAX_SAFE_INTEGER : Number(b));
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }


}