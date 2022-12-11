import { Component, OnInit } from '@angular/core';
import { Meuble } from '../model/meuble.model';
import { AuthService } from '../services/auth.service';
import { MeubleService } from '../services/meuble.service';

@Component({
  selector: 'app-meubles',
  templateUrl: './meubles.component.html'
})
export class MeublesComponent implements OnInit {

    meubles? : Meuble[]; //un tableau de meubles

  constructor(private meubleService: MeubleService,
              public authService: AuthService) {
   //this.meubles=[];
     }

  ngOnInit(): void {

    this.chargerMeubles();
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
 
 

}
