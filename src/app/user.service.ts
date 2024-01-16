import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "./User";
import {DefaultPostResponse} from "./DefaultPostResponse";

@Injectable({
  providedIn: "root"
})
export class UserService{
  isLoggedIn: boolean = false;
  private registerUrl = "http://localhost:29381/users/register";
  private authorizeUrl = "http://localhost:29381/users/authorize";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) {
  }
  register(user: User){
    return this.httpClient.post<DefaultPostResponse>(this.registerUrl, user, this.httpOptions);
  }
  authorize(user: User){
    return this.httpClient.post<DefaultPostResponse>(this.authorizeUrl, user, this.httpOptions);
  }
}
