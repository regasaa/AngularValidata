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
        let ok: boolean | null = null
        return this.http.post<any>(`${environment.apiUrl}/users/create`, { firstName, lastName, email, role, phoneNumber })
            .pipe(map((userCreate) => {
                //console.log('--- >> ' + userCreate.email)
                if (userCreate) {
                    if (this.exist(userCreate.email)) {
                        ok = null
                    } else {
                        dataUser = [userCreate]
                        if (localStorage.getItem('userData')) {
                            const existUserData: Data[] = JSON.parse(localStorage.getItem('userData')!);
                            existUserData.push(userCreate)

                            dataUser = existUserData
                            localStorage.setItem('userData', JSON.stringify(dataUser));
                        }
                        localStorage.setItem('userData', JSON.stringify(dataUser));
                        ok = !null
                    }
                }
                return ok
            }))
    }

    updateUser(firstName: string, lastName: string, email: string, role: string, phoneNumber: string) {
        let ok: boolean | null = null
        return this.http.put<any>(`${environment.apiUrl}/users/update`, { firstName, lastName, email, role, phoneNumber })
            .pipe(map((updateCreate) => {
                if (this.exist(updateCreate.email)) {
                    const existUserData: Data[] = JSON.parse(localStorage.getItem('userData')!);
                    existUserData.forEach((value, index) => {
                        if (value.email == updateCreate.email) {
                            let dataUser: Data[]
                            
                            existUserData[index] = updateCreate
                            ok = !null
                            dataUser = existUserData
                            console.log('Update ' + dataUser)
                            localStorage.setItem('userData', JSON.stringify(dataUser));
                        }
                        //console.log('Search List ' + JSON.stringify(existUserData[index]))

                        //existUserData.splice(index, 1);
                    });
                    
                } else {
                    ok = null
                }

                //console.log(existUserData)
                return ok

            }))

    }

    deleteUser(email: string) {
        console.log('Delete ' + email)
        let ok = null
        return this.http.delete<any>(`${environment.apiUrl}/users/delete/${email}`)
            .pipe(map((updateCreate) => {
                console.log('Exis or not ' + this.exist(updateCreate))
                if (this.exist(updateCreate)) {

                    let dataUser: Data[]
                    const existUserData: Data[] = JSON.parse(localStorage.getItem('userData')!);
                    existUserData.forEach((value, index) => {
                        if (value.email == updateCreate) {
                            console.log('Delete Search List ' + JSON.stringify(existUserData[index]))
                            existUserData.splice(index, 1);
                        }
                    });
                    console.log(existUserData)
                    dataUser = existUserData
                    localStorage.setItem('userData', JSON.stringify(dataUser));
                    ok = !null
                } else {
                    ok = null
                }

                return ok
            }))
    }


    exist(email: string): boolean {
        console.log(' EMail=== ' + email)
        const existUserData: Data[] = JSON.parse(localStorage.getItem('userData')!);
        let existY: boolean = false
        existUserData.forEach((value, index) => {
            if (value.email == email) {
                existY = true
            }
        });

        console.log('Exist or nOe ' + existY)
        return existY
    }

}
