import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ProgressoService } from './progresso.service';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private progresso: ProgressoService) { }

  public publicar(publicacao: any): void {

    let nomeImagem = Date.now()

    console.log(publicacao.imagem);


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

    // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    //   .push( { titulo: publicacao.titulo });

    // console.log("Chegamos até o serviço responsável");

  }
}
