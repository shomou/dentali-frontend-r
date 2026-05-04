import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest, LoginResponse, AuthUser } from '../models/login.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`;
  private currentUserSubject: BehaviorSubject<AuthUser | null>;
  public currentUser$: Observable<AuthUser | null>;

  constructor(private http: HttpClient) {
    // Recuperar usuario del localStorage si existe
    let storedUser: AuthUser | null = null;
    try {
      const userJson = localStorage.getItem('currentUser');
      if (userJson && userJson.trim() !== '') {
        storedUser = JSON.parse(userJson);
      }
    } catch (error) {
      console.error('Error al parsear usuario del localStorage:', error);
      // Limpiar localStorage si está corrupto
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
      storedUser = null;
    }
    this.currentUserSubject = new BehaviorSubject<AuthUser | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Obtener el usuario actual
   */
  public get currentUserValue(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Verificar si el usuario está autenticado
   */
  public get isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null && !!this.getToken();
  }

  /**
   * Obtener el token del localStorage
   */
  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Login del usuario
   */
  login(credentials: { email: string, password: string }): Observable<any> {
    // Mapeamos 'email' a 'username' para el backend
    const loginData = { username: credentials.email, password: credentials.password };

    return this.http.post<any>(`${this.apiUrl}/login`, loginData)
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('authToken', response.token);

            // Como el backend no manda usuario, creamos uno básico con el email
            const user: AuthUser = { email: credentials.email, name: credentials.email, id: '' };
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return response;
        })
      );
  }

  /**
   * Logout del usuario
   */
  logout(): void {
    // Remover usuario y token del localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  /**
   * Registrar un nuevo usuario (opcional)
   */
  register(username: string, password: string, name: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, { username, password, name })
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
          return response;
        })
      );
  }

  /**
   * Validar si el usuario sigue autenticado (refresh del token)
   */
  validateToken(): Observable<boolean> {
    return this.http.get<{ valid: boolean }>(`${this.apiUrl}/validate`)
      .pipe(
        map(response => response.valid)
      );
  }
}
