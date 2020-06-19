import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token_id: string;

  constructor(
    private router: Router
    ) { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    console.log('chegamos até o serviço: ', usuario);

    return firebase.auth().createUserWithEmailAndPassword(usuario.email,usuario.senha)
      .then((result: any) => {

        delete usuario.senha;

        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set({ usuario })

      }).catch((err: Error) => {
        console.log(err);

      });

  }

  public autenticar(email: string, senha: string): void {

    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((result: any) => {
        firebase.auth().currentUser.getIdToken()
          .then((idToken: string) => {
            this.token_id = idToken;
            localStorage.setItem('idToken', idToken);
            this.router.navigate(['/home']);
          })
      }).catch((err) => {

      });
  }

  public autenticado(): boolean {

    if ( this.token_id === undefined && localStorage.getItem('idToken') != null) {
      this.token_id = localStorage.getItem('idToken');
    }

    if ( this.token_id === undefined ) {
      this.router.navigate(['/']);
    }

    return this.token_id !== undefined;
  }

  public sair(): void {

    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('idToken');
        this.token_id = undefined;
        this.router.navigate(['/']);
      })
  }
}
