import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscriber, Subscription } from "rxjs";
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable().subscribe(
      numero => console.log("Subs", numero),
      error => console.log("Error en el Obs", error),
      () => console.log("El observador Termino!.")
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log("La página se va a cerrar");
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let interval = setInterval(() => {
        contador += 1;
        let salida = {
          valor: contador
        };
        observer.next(salida);
        /* if (contador === 3) {
          clearInterval(interval);
          observer.complete();
        } */

        // if(contador === 4){
        // clearInterval(interval);
        // observer.error('Auxilio!.');
        // }
      }, 1000);
    }).pipe(
      /* retry(2), */
      map((res: any) => res.valor),
      filter((valor, index) => {
        if (valor % 2 === 1) {
          //impar
          return true;
        } else {
          //par
          return false;
        }
        /* console.log('Filter', valor, index); */
      })
    );
  }
}
