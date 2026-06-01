import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class AuthorizationInterceptor<T> implements HttpInterceptor {
  intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const auth = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyZEhKQWhuTjI3a0Vxd0VBY3ptaWVGMTlWcklNdF9zX05yNndCUHJGOVNZIn0.eyJleHAiOjE3NjIzMzEyNjksImlhdCI6MTc2MjMzMDk2OSwiYXV0aF90aW1lIjoxNzYyMzMwOTY4LCJqdGkiOiI0MzQ4ZGI0Ni03NjFkLTQ1N2ItYjM4YS04MTg2MGYxOWVjMzEiLCJpc3MiOiJodHRwczovL2F1dGguc2l0LmluZGlnaXQuaW8vcmVhbG1zL29wdHVzIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImRmNWUxZTg2LWFjODMtNDEzYy1hYmM2LTYzNmJmZjdiMDFkZCIsInR5cCI6IkJlYXJlciIsImF6cCI6IjEwOTciLCJzaWQiOiIwMGJiZmIwNS04Yzc3LTRmNzItOGJkZi0zOTE2YTFiZWMyZDAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLW9wdHVzIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6Ik9wdHVzIEFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoib3B0dXMuYWRtaW4iLCJnaXZlbl9uYW1lIjoiT3B0dXMiLCJmYW1pbHlfbmFtZSI6IkFkbWluIiwiZW1haWwiOiJvcHR1cy5hZG1pbkBvcHR1cy5jb20ifQ.B7sxdw8iMJQ9y-xpCBPqbFE2nEWSt-89_90B43CzUXbZHibPTlB76_2Xv-3KQ_tPzCrrATZCMHfs5VFzQjjBVIP60yLfeu_IO65F0nMacMhCsTk-DpS-pUA46yMLAavS6DeARhzSvsayeQwTLZoZEUTtzCEcGH_-PrRHNyXIHK3KWUtaJvv4deO5IjiZ9o4CIOjdwtX9dpd2RifSprJOQvtplygdJTzAdn3WgJMHbsiHkpouhPSQHdzF7HfhO0pSmM9JbpYU-HTTTa5yA3tMO0EMyrT-_wCZFkx2ImKJFoDJtxKv_rasYfjHybQhDm4C4qkvR-RsmBTGaaxe02r4lA`;
    if (req.body instanceof FormData) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${auth}`,
        }),
      });
      return next.handle(authReq);
    }

    let serviceCallHeaders: { key?: string | string[] } =
      req?.headers?.keys()
        ?.reduce((previousValue: {}, key: string) =>
          ({ ...previousValue, [key]: req?.headers?.get(key) }), {}
        );

    let headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth}`,
      'Content-Type': `application/json`,
      ...serviceCallHeaders
    });
    let authReq: HttpRequest<T> = req.clone({
      headers: headers
    });

    return next.handle(authReq);
  }
}
