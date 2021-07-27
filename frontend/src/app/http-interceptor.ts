import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next:HttpHandler):
        Observable<HttpEvent<any>> 
        {
            const authRequest = req.clone({
                headers : req.headers.set(
                    'Authorization', localStorage.getItem('access_token') 
                    ? 'JWT' + localStorage.getItem('access_token')
                    : null)
            })

            return next.handle(authRequest)  
        }

}