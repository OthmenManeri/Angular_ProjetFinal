import { Component, OnInit } from '@angular/core';
import { Type } from '../model/type.model';
import { Meuble } from '../model/meuble.model';
import { MeublesComponent } from '../meubles/meubles.component';
import { MeubleService } from '../services/meuble.service';
import { AuthService } from '../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Component({
  selector: 'app-recherche-par-type',
  templateUrl: './recherche-par-type.component.html',
  styles: [
  ]
})
export class RechercheParTypeComponent implements OnInit {
  IdType! : number;
  TypeList! : Type[];
  meubles! : Meuble[];
  typeid! :number;


  constructor(private meubleService : MeubleService,public authService: AuthService) { }

  ngOnInit(): void {
    this.meubleService.listeTypes().
    subscribe((cats :any) => {this.TypeList = cats as Type[];
      console.log(cats);
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
  chargerMeubles(){
    this.meubleService.listeMeuble().subscribe(prods => {
      console.log(prods);
      this.meubles = prods;
      });
  }
  
  rechercherProds(){
    this.meubleService.rechercherParType(this.typeid).subscribe(prods => {
      console.log(prods);
      this.meubles=prods;});
  }
  onChange() {
    this.meubleService.rechercherParType(this.IdType).
      subscribe(prods =>{this.meubles=prods});

    }


   

}
