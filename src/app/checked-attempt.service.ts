import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CheckedAttempt} from "./CheckedAttempt";
import { Subject} from "rxjs";
import {DefaultPostResponse} from "./DefaultPostResponse";
import {Attempt} from "./attempt";
@Injectable({
  providedIn: "root"
})
export class CheckedAttemptService{
  checkedAttempts: Array<CheckedAttempt> = new Array<CheckedAttempt>();
  private checkedAttemptsUrl = 'http://localhost:29381/attempts';  // URL to web api
  private _carList = new Subject<CheckedAttempt[]>();
  carList$ = this._carList.asObservable();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
    constructor(private httpClient: HttpClient) {
      this.notify()
    }
  getCheckedAttempt(): void {
      this.httpClient.get<CheckedAttempt[]>(this.checkedAttemptsUrl).subscribe((data)=>{
        this.checkedAttempts = data;
        this.notify();
      });
  }
  addCheckedAttempt(attempt: Attempt, response: DefaultPostResponse){
      this.httpClient.post<DefaultPostResponse>(this.checkedAttemptsUrl,
        attempt, this.httpOptions).subscribe(value => {
          this.getCheckedAttempt();
          this.notify();
          response.successfully = value.successfully;
          response.errors = value.errors;
      });
  }
  private notify() {
    // Call next on the subject with the latest data
    this._carList.next(this.checkedAttempts);
  }
}
