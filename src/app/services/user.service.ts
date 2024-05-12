import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.url + '/users');
  }

  createUser(userData: {
    id: string; firstName: string; lastName: string;
    profession: string; gender: string; image: string; age: number; day: number;
    month: number; year: number;
  }) {

    return this.http.post<User>(`${this.url}/users`, userData)
  }

  onDelete(id: string) {
    return this.http.delete(`${this.url}/users/${id}`);
  }
}
