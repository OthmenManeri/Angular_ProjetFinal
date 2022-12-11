import { Component, OnInit } from '@angular/core';
import { Type } from '../model/type.model';
import { MeubleService } from '../services/meuble.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styles: [
  ]
})
export class ListeTypesComponent implements OnInit {

  types!: Type[];

  ajout:boolean=true;


  updatedType:Type = {"idType":0,"nomType":""};

  
  constructor(private meubleService: MeubleService,
    public authService: AuthService) { }

  ngOnInit(): void {
    
    this.chargerTypes();
  }

  supprimerType(p: Type)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
    this.meubleService.supprimerType(p.idType).subscribe(() => {
          console.log("meuble supprimé");
          this.chargerTypes();     
        
  });
  }
  chargerTypes() {
    this.meubleService.listeTypes().
      subscribe((cats :any) => {
        console.log(cats);
        this.types = cats as Type[];
      
      });

  }

  typeUpdated(type:Type) {
    console.log("catégorie reçue du composant updateCAtegorie ",type);
    this.meubleService.ajouterType(type).subscribe( ()=> this.chargerTypes());


  }

  updateType(type :Type)
  {
    this.updatedType = type;
    this.ajout=false;
  }

}
