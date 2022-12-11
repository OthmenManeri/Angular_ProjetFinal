import { Component, OnInit } from '@angular/core';
import { Meuble } from '../model/meuble.model';
import { MeubleService } from '../services/meuble.service';
import { AuthService } from '../services/auth.service';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
  
@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})


export class RechercheParNomComponent implements OnInit {

  nomMeuble! : string;
  meubles!: Meuble[];
  allMeubles!: Meuble[];
  searchTerm!: string;

  constructor(private meubleService : MeubleService,public authService: AuthService) { }

  ngOnInit(): void {
    this.meubleService.listeMeuble().subscribe(prods => {
      console.log(prods);
      this.meubles = prods;
      });
      
  }

  rechercherProds(){
    this.meubleService.rechercherParNom(this.nomMeuble).
    subscribe(prods => {
      console.log(prods);
      this.meubles=prods;});
  }

  
  chargerMeubles(){
    this.meubleService.listeMeuble().subscribe(prods => {
      console.log(prods);
      this.meubles = prods;
      });
  }

  supprimerMeuble(p: Meuble)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
    this.meubleService.supprimerMeuble(p.idMeuble).subscribe(() => {
          console.log("meuble supprimé");
          this.chargerMeubles();     
        
  });
  }

  onKeyUp(filterText : string){
    this.meubles = this.allMeubles.filter(item =>
    item.nomMeuble.toLowerCase().includes(filterText));
    }
    

}
