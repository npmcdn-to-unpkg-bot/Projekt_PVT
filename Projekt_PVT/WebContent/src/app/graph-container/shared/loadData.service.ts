import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {IDatasource} from './datasource';

@Injectable()
export class LoadDataService { 
    private title : string;
    private availableUrl = "http://rigel.hig.se:8080/Bulle/GetAvailableAnalysisServlet"
    private savedUrl = "http://rigel.hig.se:8080/Bulle/GetAnalysisServlet?title="
    
    constructor(private http: Http){}
       
    getSaved(){
        return this.http.get(this.availableUrl)
            .map((response: Response) => <string[]> response.json().values)
            .catch(this.handleError);
    }
    
    loadAnalysis(title:string): Observable<any>{
        return this.http.get(this.getLoadUrl(title))
            .map((response: Response) => <any> response.json())
            .catch(this.handleError);  
    }
    
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
    
    private  getLoadUrl(title: string){
        return (this.savedUrl + title);    
    }
}