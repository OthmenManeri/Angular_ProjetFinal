import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '../model/type.model';
import { Meuble } from '../model/meuble.model';
import { MeubleService } from '../services/meuble.service';

@Component({
  selector: 'app-update-meuble',
  templateUrl: './update-meuble.component.html',
  styles: [
  ]
})
export class UpdateMeubleComponent implements OnInit {

  currentMeuble = new Meuble();
  TypeList! : Type[];
  updatedTypeId! : number;
  
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private meubleService: MeubleService) { }

  ngOnInit(): void {
    this.meubleService.listeTypes().
    subscribe((cats :any) => {this.TypeList = cats as Type[];
      console.log(cats);
    });


    this.meubleService.consulterProduit(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentMeuble = prod; 
      this.updatedTypeId =   this.currentMeuble.type.idType;
    
    } ) ;
    }
    

  

  updateMeuble() {
    this.currentMeuble.type = this.TypeList.find(type => type.idType == this.updatedTypeId)!;
         this.meubleService.updateMeuble(this.currentMeuble).subscribe(prod => {
      this.router.navigate(['meubles']); }
      );
  }

}
