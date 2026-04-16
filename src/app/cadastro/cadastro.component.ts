import { Component, OnInit,inject} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import{NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import{ BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    CommonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatSelectModule
  ],

  providers: [
    provideNgxMask()],

  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snakBar: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private service : ClienteService,
    private brasilapiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if(id){
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if(clienteEncontrado){
        this.atualizando = true;
        this.cliente = clienteEncontrado;
        if(this.cliente.uf){
          const event = {value: this.cliente.uf} 
          this.carregarMunicipios(event as MatSelectChange);
        }
        }
      }
    }) 
    this.carregarUfs();
}

  carregarUfs(){
    this.brasilapiService.listarUfs().subscribe({
     next: listaEstados => this.estados = listaEstados,
     error: erro => console.log('Erro ao carregar estados:', erro),
    });
    }

  carregarMunicipios(event: MatSelectChange){
    const ufSelecionada = event.value;
    this.brasilapiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipios = listaMunicipios,
      error: erro => console.log('Erro ao carregar municípios:', erro),
    })
  
  } 

  salvar(){
    if(!this.atualizando){

      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem('Cliente salvo com sucesso!');

    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Cliente atualizado com sucesso!');
    }
  } 
  mostrarMensagem(mensagem: string){
    this.snakBar.open(mensagem, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
     
    });
  }
}

