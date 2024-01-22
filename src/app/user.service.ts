import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "./User";
import {DefaultPostResponse} from "./DefaultPostResponse";
import {catchError, tap, throwError} from "rxjs";
import {JwtAuthResponse} from "./JwtAuthResponse";

@Injectable({
  providedIn: "root"
})
export class UserService{
  isLoggedIn: boolean = false;
  private registerUrl = "http://localhost:29381/register";
  private authorizeUrl = "http://localhost:29381/login";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };
  constructor(private httpClient: HttpClient) {
  }
  register(user: User){
    return this.httpClient.post<JwtAuthResponse>(this.registerUrl, user, this.httpOptions).pipe(
      catchError(this.handleError));
  }
  login(user: User){
    return this.httpClient.post<JwtAuthResponse>(this.authorizeUrl, user, this.httpOptions).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse){
    return throwError(()=> error);
  }
}
