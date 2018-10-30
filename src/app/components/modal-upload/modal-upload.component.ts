import { Component, OnInit, ViewChild } from "@angular/core";
import { SubirArchivoService } from "../../services/subir-archivo/subir-archivo.service";
import { ModalUploadService } from "./modal-upload.service";

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styles: []
})
export class ModalUploadComponent implements OnInit {
  /* oculto: string = ""; */
  imagenSubir: File;
  imagenTemp: string;

  @ViewChild("inputFile")
  inputFile: any;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}

  clearForm() {
    /* console.log(
      "Aqui obtienes el elemento para atribuir algo vacio: ",
      this.inputFile.nativeElement
    ); */
    this.inputFile.nativeElement.value = "";
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf("image") < 0) {
      swal(
        "Solo imágenes",
        "El archivo seleccionado no es una imagen",
        "error"
      );
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => (this.imagenTemp = reader.result.toString());
  }

  subirImagen() {
    this._subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this._modalUploadService.tipo,
        this._modalUploadService.id
      )
      .then(resp => {
        this._modalUploadService.notificacion.emit(resp);
        /* this._modalUploadService.ocultarModal(); */
        this.cerrarModal();
        this.clearForm();
      })
      .catch(err => {
        console.log("Error en la carga...");
      });
  }
}
