import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorageService } from "src/app/services/token-storage.service";

const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.tokenService.getToken();
        if(token != null) {
            authReq.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
            })
        }

        return next.handle(authReq);
    }

}

export const authInterceptorProvider = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]