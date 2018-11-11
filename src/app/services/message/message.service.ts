import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";
import swal from "sweetalert";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  enviarMensaje(body) {
    let url = URL_SERVICIOS + "/contacto";

    return this.http.post(url, body).pipe(
      map((resp: any) => {
        swal("Formulario de contacto", "Mensaje enviado correctamente", "success");
        return resp;
      })
    );
  }

}
