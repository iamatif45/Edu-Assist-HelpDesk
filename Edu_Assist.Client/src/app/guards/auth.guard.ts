
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roleName = decodedToken.roleName;

      // Get the requested route path
      const requestedRoute = route.url[0]?.path;

      // Role-based page redirection logic
      if ((roleName === 'Student' && requestedRoute === 'student') ||
          (roleName === 'Staff' && requestedRoute === 'staff') ||
          (roleName === 'Admin' && requestedRoute === 'admin')) {
        return true;  // Allow access if role matches the route
      }

      // If role doesn't match the requested page, redirect to their respective page
      if (roleName === 'Student' && requestedRoute !== 'student') {
        this.router.navigate(['/student']);
        return false;
      }
      if (roleName === 'Staff' && requestedRoute !== 'staff') {
        this.router.navigate(['/staff']);
        return false;
      }
      if (roleName === 'Admin' && requestedRoute !== 'admin') {
        this.router.navigate(['/admin']);
        return false;
      }

      return true;
    }

    // Redirect to login page if token is not found or is expired
    this.router.navigate(['/login']);
    return false;
  }
}
