import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { User } from 'app/core/user/user.model';
import { UpdateUser } from './user-admin/user-details/update-user.model';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/admin/users`);
  }

  getUser(id: string): Observable<UpdateUser> {
    return this.http.get<UpdateUser>(`${environment.API_URL}/admin/users/${id}`);
  }

  updateUser(model: UpdateUser): Observable<UpdateUser> {
    return this.http.put<UpdateUser>(`${environment.API_URL}/admin/users`, model);
  }
}
