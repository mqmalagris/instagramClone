import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
      .then((result) => {

      }).catch((err) => {

      });
  }
}
