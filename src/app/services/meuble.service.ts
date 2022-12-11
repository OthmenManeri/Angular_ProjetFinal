import { Injectable } from '@angular/core';
import { Type } from '../model/type.model';
import { Meuble } from '../model/meuble.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeWrapper } from '../model/typeWrapped.model';

const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class MeubleService {
  apiURL: string = 'http://localhost:8082/meubles/meubleController';
  apiURLCat: string = 'http://localhost:8082/meubles/typeController';

  meubles : Meuble[]; //un tableau de meubles
  //types : Type[];
 

  constructor(private http : HttpClient) { 
    
    /* this.types = [
      {idType : 1, nomType : "PC"},
      {idType : 2, nomType : "Imprimante"}
    ]; */
    this.meubles = [{idMeuble : 1, nomMeuble : "PC Asus", prixMeuble : 3000.600,
                      type : {idType : 1, nomType : "PC"} },
                     {idMeuble : 2, nomMeuble : "Imprimante Epson", prixMeuble : 450, 
                    type :  {idType : 2, nomType : "Imprimante"}},
                     {idMeuble : 3, nomMeuble :"Tablette Samsung", prixMeuble : 900.123, 
                     type : {idType : 1, nomType : "PC"}}
                    ];
    
  }

  listeMeuble(): Observable<Meuble[]>{
    return this.http.get<Meuble[]>(this.apiURL+"/getAllMeubles");
    }

    ajouterProduit( prod: Meuble):Observable<Meuble>{
      return this.http.post<Meuble>(this.apiURL+"/createMeuble", prod, httpOptions);
      }

      supprimerMeuble(id : number) {
        const url = `${this.apiURL}/deleteMeuble/${id}`;
        return this.http.delete(url, httpOptions);
        }
        supprimerType(id : number) {
          const url = `${this.apiURLCat}/deleteType/${id}`;
          return this.http.delete(url, httpOptions);
          }

        
        consulterProduit(id: number): Observable<Meuble> {
          const url = `${this.apiURL}/getMeubleById/${id}`;
          return this.http.get<Meuble>(url);
          }

          trierProduits(){
            this.meubles = this.meubles.sort((n1,n2) => {
              if (n1.idMeuble > n2.idMeuble) {
                  return 1;
              }
             if (n1.idMeuble < n2.idMeuble) {
                  return -1;
              }
            return 0;
          });
          }
      

          updateMeuble(prod :Meuble) : Observable<Meuble>
            {
              return this.http.put<Meuble>(this.apiURL+"/updateMeuble", prod, httpOptions);
            }

         
         
       listeTypes():Observable<TypeWrapper>{
            return this.http.get<TypeWrapper>(`${this.apiURLCat}/getAllTypes`);
            } 
            
            

  rechercherParType(idType: number): Observable<Meuble[]> {
    const url = `${this.apiURL}/getMeublesByTypeId/${idType}`;
    return this.http.get<Meuble[]>(url);
  } 

  rechercherParNom(nom: string):Observable< Meuble[]> {
    const url = `${this.apiURL}/getMeublesByTypeId/${nom}`;
    return this.http.get<Meuble[]>(url);
    }

    ajouterType( type: Type):Observable<Type>{
      return this.http.post<Type>(`${this.apiURLCat}/createType`, type, httpOptions);
      }
      

 
}
