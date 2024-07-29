import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Ne pas intercepter les requêtes de login
  if (req.url.endsWith('/auth/login')) {
    return next(req);
  }

  // Pour les autres requêtes, ajouter le token si disponible
  const token = localStorage.getItem('token');
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  return next(req);
};