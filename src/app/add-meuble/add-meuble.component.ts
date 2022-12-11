import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from '../model/type.model';
import { Meuble } from '../model/meuble.model';
import { MeubleService } from '../services/meuble.service';

@Component({
  selector: 'app-add-meuble',
  templateUrl: './add-meuble.component.html'
})
export class AddMeubleComponent implements OnInit {

  newMeuble = new Meuble();
  TypeList! : Type[];
  newIdType! : number;
  newType! : Type;
  
  constructor(private meubleService: MeubleService,
              private router : Router) { }

  ngOnInit(): void {

    this.meubleService.listeTypes().
          subscribe((cats :any) => {this.TypeList = cats as Type[];
            console.log(cats);
        });
 
  }

 
  addMeuble(){
    this.newMeuble.type = this.TypeList.find(type => type.idType == this.newIdType)!;
    this.meubleService.ajouterProduit(this.newMeuble)
                      .subscribe(prod => {
                      console.log(prod);
                      this.router.navigate(['meubles']);
                      }); 
    }




}
