import { Component, OnInit } from "@angular/core";
import { MessageService } from "../../services/service.index";
import * as swal from "sweetalert";

@Component({
  selector: "app-contacto",
  templateUrl: "./contacto.component.html",
  styles: []
})
export class ContactoComponent implements OnInit {
  fonoUsa: any[] = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  fonoChile: any[] = ['+', '56', '', /[1-9]/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  
  /* rut: any[] = []; */
  /* rut: any[] = [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/]; */

  constructor(public _MessageService: MessageService) {}

  ngOnInit() {}

  contactForm(form) {
    this._MessageService.enviarMensaje(form).subscribe();
  }
}
