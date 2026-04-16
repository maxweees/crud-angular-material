import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }
  
  salvar(cliente:Cliente){
    const storage =  this.obterSrtorge();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  deletar(cliente: Cliente) {
    const storage = this.obterSrtorge();
    const novaLista = storage.filter(c => c.id !== cliente.id);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaLista));

  }
  
  pesquisarClientes(nomeBusca: string) : Cliente[]{
     
    const cliente = this.obterSrtorge();

      if(!nomeBusca){
        return cliente;
      }
      return cliente.filter(cliente => cliente.nome?.toLocaleLowerCase().includes(nomeBusca.toLocaleLowerCase()));
  }
      buscarClientePorId(id: string) : Cliente | undefined {
        const cliente = this.obterSrtorge();
        return cliente.find(cliente => cliente.id === id);
      }
      atualizar(cliente: Cliente) : void {
        const storage = this.obterSrtorge();
        storage.forEach(c => {
          if(c.id === cliente.id){
            Object.assign(c, cliente);
          }
        })
        localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
      }

   private obterSrtorge() : Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if(repositorioClientes){
      const clientes : Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }
    const clientes : Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return  clientes;
  }
}
