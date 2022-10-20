import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { decode, encode } from 'jwt-simple';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data, User } from '../model/user.module';
import { usersdata } from '../user.data';

const users: User[] = usersdata
let dataUser: Data[]

@Injectable({
  providedIn: 'root'
})
export class ApiService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;


    if (req.method === "POST" && req.url === `${environment.apiUrl}/users/authenticate`) {
      const { username, password } = body;
      const user = users.find(x => x.email === username && x.password === password);
      console.log('Api ' + user?.firstName)
      //const tokenGenerated = encode(user, environment.apiKey, 'HS256')
      //if (!user) return Error('Email or password is incorrect');
      //console.log('Token '+tokenGenerated)
      return of(new HttpResponse({ status: 200, body: user }))

    }
    // && req.url.match(/\/delete\/\d+$/)
    if (req.method === "DELETE") {
      console.log('Api De ')
      const urlParts = req.url.split('/');
      parseInt(urlParts[urlParts.length - 1]);

      console.log('Api ' + req.url + '  ' + urlParts[urlParts.length - 1])
      return of(new HttpResponse({ status: 200, body: urlParts[urlParts.length - 1] }))
    }

    if (req.method === "PUT" && req.url === `${environment.apiUrl}/users/update`) {
      const { firstName, lastName, email, role, phoneNumber } = body;
      return of(new HttpResponse({ status: 200, body: { firstName, lastName, email, role, phoneNumber }  }))
    }

    if (req.method === "POST" && req.url === `${environment.apiUrl}/users/create`) {
      const { firstName, lastName, email, role, phoneNumber } = body;
      let id: number = Math.random() * 1000;
      //dataUser = { id,firstName, lastName, email, role, phoneNumber };
      /*dumpData: Data = '{"id":0,"firstName":"","lastName":"","email":"","role":0,"phoneNumber":""}'


      if (!localStorage.getItem('userData')) {
        localStorage.setItem('userData', );
      }
      
       console.log('Api ' + JSON.parse(localStorage.getItem('userData')!).email)
      dataUser = JSON.parse(localStorage.getItem('userData')!)
      console.log('Api ' + dataUser)
      const userD = dataUser.find(x => x.email === email);
 */
      /* if (userD) {
        return of(new HttpResponse({ status: 200, body: "Email Aready Registered" }))
      } */
      // { id,firstName, lastName, email, role, phoneNumber }
      return of(new HttpResponse({ status: 200, body: { id, firstName, lastName, email, role, phoneNumber } }))
    }
    function ok(body: Data) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function isLoggedIn() {
      const id = decode(localStorage.getItem('validateToken')!, environment.apiKey).id
      return users.find(x => x.id === id);
    }


    throw new Error('Method not implemented.');
  }


}
