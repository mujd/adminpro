import { Component, OnInit } from "@angular/core";
import { Medico } from "../../models/medico.model";
import { MedicoService } from "../../services/service.index";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";
/* import swal from "sweetalert"; */

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  constructor(
    public _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService
      .cargarMedicos()
      .subscribe(medicos => (this.medicos = medicos));
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoService
      .buscarMedicos(termino)
      .subscribe(medicos => (this.medicos = medicos));
  }

  borrarMedico(medico: Medico) {
    this._medicoService.borrarMedico(medico._id)
    .subscribe(() => this.cargarMedicos());
  }
}
