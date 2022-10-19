import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data, User } from '../model/user.module';

import { HttpClient } from '@angular/common/http';
import { decode } from 'jwt-simple';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('validateToken')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map((token) => {
                if (token) {
                    console.log('Auth ' + token.firstName)
                    localStorage.setItem('validateToken', JSON.stringify(token));
                    this.currentUserSubject.next(token);
                }
                return token;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('validateToken');
        this.currentUserSubject.next(null!);
    }

    createUser(firstName: string, lastName: string, email: string, role: string, phoneNumber: string) {
        let dataUser: Data[]
        return this.http.post<any>(`${environment.apiUrl}/users/create`, { firstName, lastName, email, role, phoneNumber })
            .pipe(map((userCreate) => {
                console.log('--- >> ' + userCreate)
                if (userCreate) {
                    dataUser = [userCreate]
                    if (localStorage.getItem('userData')) {
                        const existUserData: Data[] = JSON.parse(localStorage.getItem('userData')!);
                        existUserData.push(userCreate)

                        dataUser = existUserData
                        localStorage.setItem('userData', JSON.stringify(dataUser));
                    }
                    localStorage.setItem('userData', JSON.stringify(dataUser));
                }
                return userCreate;
            }))
    }

    updateUser(email: string) {
        return this.http.put<any>(`${environment.apiUrl}/users/update`, { email })
            .pipe(map((updateCreate) => {
                const existUserData: Data[] = JSON.parse(localStorage.getItem('userData')!);
                existUserData.forEach((value, index) => {
                    if (value.email == updateCreate)
                        console.log('Search List ' + JSON.stringify(existUserData[index]))
                    //existUserData.splice(index, 1);
                });
                //console.log(existUserData)

            }))

    }

    deleteUser(email: string) {
        console.log('Delete '+email)
        return this.http.delete(`${environment.apiUrl}/users/delete/${email}`)
            .pipe(map((updateCreate) => {
                let dataUser: Data[]
                const existUserData: Data[] = JSON.parse(localStorage.getItem('userData')!);
                existUserData.forEach((value, index) => {
                    if (value.email == updateCreate) {
                        console.log('Delete Search List ' + JSON.stringify(existUserData[index]))
                        existUserData.splice(index, 1);
                    }
                });

                console.log(existUserData)
                dataUser=existUserData

                localStorage.setItem('userData', JSON.stringify(dataUser));
            }))

    }
}
