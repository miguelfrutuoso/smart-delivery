import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { AuthService } from "./services/auth/auth.service";
import { catchError, filter, switchMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService) { }

    // intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
    //     const authRequest = req.clone({
    //         headers : req.headers.set(
    //             'Authorization', localStorage.getItem('access_token') 
    //             ? 'JWT' + localStorage.getItem('access_token')
    //             : null)
    //     })

    //     return next.handle(authRequest)  
    // }



    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (localStorage.getItem('access_token')) {
            req = this.addToken(req, localStorage.getItem('access_token'))
        }

        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(req, next)
            }
            else {
                return throwError(error)
            }
        }))
    }


    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            console.log("REFRESHING")
            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.jwt);
                    return next.handle(this.addToken(request, token.jwt));
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }));
        }
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': 'JWT ' + token
            }
        })
    }
}