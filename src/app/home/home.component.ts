import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes', {static: false}) public publicacoes: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public sair(): void {
    this.auth.sair();
  }

  public atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine();
  }
}
