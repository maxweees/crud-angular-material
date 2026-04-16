import { Component, OnInit,inject } from '@angular/core';
import{ FlexLayoutModule } from '@angular/flex-layout';
import{MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';




@Component({
  selector: 'app-consulta',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    CommonModule
   
],

  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  nomeBusca: string = '';
  listaClientes: Cliente[] = []; //array de clientes
  clienteTable: string[] = ['id', 'nome', 'cpf', 'email', 'dataNascimento', 'acoes'];
  deletando: boolean = false;
  snakBar: MatSnackBar = inject(MatSnackBar);
  
  constructor(
    private service : ClienteService,
    private router: Router,

  ){}

  ngOnInit() {
    console.log('ConsultaComponent iniciado');
    this.listaClientes = this.service.pesquisarClientes('');
   
  }
  
  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string){
    console.log('Preparando para editar cliente com ID:', id);
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } });
  }
  
  preparaDeletar(cliente: Cliente){
    cliente.deletando = true;
}
  deletar(cliente: Cliente){
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisarClientes('');
    this.deletando = false;
    this.mostarMensagem('Cliente deletado com sucesso!');
  }
  
  mostarMensagem(mensagem: string){
    this.snakBar.open(mensagem, 'Fechar', {
      duration: 3000,
    });
  }
}
