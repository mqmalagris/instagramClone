import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ProgressoService } from './progresso.service';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private progresso: ProgressoService) { }

  public publicar(publicacao: any): void {

    console.log(publicacao.imagem);

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push( { titulo: publicacao.titulo })
      .then((resposta:any) => {

        let nomeImagem = resposta.key;

        firebase.storage().ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot:any) => {
              this.progresso.status = 'andamento';
              this.progresso.estado = snapshot;
              // console.log(snapshot);
            },
            (error: any) => {
              this.progresso.status = 'erro';
              // console.log(error);
            },
            () => {
              this.progresso.status = 'concluido';
              // console.log('Upload completo');
            }
          );
      });
  }

  public consultaPubs(emailUsuario: string): Promise<any> {

    return new Promise((resolve, reject) => {


      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          // console.log(snapshot.val());
          let publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {

            let publicacao = childSnapshot.val();
            publicacao.key = childSnapshot.key;

            publicacoes.push(publicacao);


          });

          // resolve(publicacoes);

          return publicacoes.reverse();

        })
        .then((publicacoes: any) => {

          publicacoes.forEach((publicacao) => {
            firebase.storage().ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url;

                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snapshot: any) => {

                    publicacao.nome_usuario = snapshot.val().usuario.nome_usuario;
                  });
              });
          });

          resolve(publicacoes);

        });
    });


  }
}







