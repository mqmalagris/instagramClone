import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';

import { BdService } from 'src/app/bd.service';
import { ProgressoService } from 'src/app/progresso.service';
import { Observable, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>();

  public email: string;
  private imagem: any;

  public progressoPub: string = 'pendente';
  public porcentagemUpload: number;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null),
  })

  constructor(
    private bd: BdService,
    private progresso: ProgressoService
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  public publicar(): void {
    this.bd.publicar({
      'email': this.email,
      'titulo': this.formulario.value.titulo,
      'imagem': this.imagem[0]
    });

    let continua = new Subject<boolean>();
    continua.next(true);

    let acompanhamentoUpload = interval(1500);

    acompanhamentoUpload
      .pipe(takeUntil(continua))
      .subscribe(() => {
        // console.log(this.progresso.status);
        // console.log(this.progresso.estado);
        this.progressoPub = this.progresso.status;

        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes)* 100);
        if (this.progresso.status === 'concluido') {
          this.progressoPub = this.progresso.status;

          this.atualizarTimeLine.emit();

          continua.next(false);
        }
      });
  }

  public preparaImagemUpload(evento: Event): void {
    this.imagem = (<HTMLInputElement>evento.target).files;

  }

}
