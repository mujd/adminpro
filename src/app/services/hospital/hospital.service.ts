import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Hospital } from "../../models/hospital.model";
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";
import swal from "sweetalert";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: "root"
})
export class HospitalService {
  totalHospitales: number = 0;
  hospital: Hospital;
  token: string;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    /* console.log("Servicio de hospital listo"); */
    /* this.cargarStorage(); */
  }

  cargarHospitales(desde: number = 0, limite: number = 0) {
    let url = URL_SERVICIOS + "/hospital?desde=" + desde + '&limite=' + limite;
    /* let url = URL_SERVICIOS + "/hospital"; */

    return this.http.get(url);
    /* return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    ); */
  }
  cargarHospitalesOtro() {
    let limiteHospital: number = 999;
    let url = URL_SERVICIOS + "/hospital?limite=" + limiteHospital;

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    );
  }
  /* cargarHospitalesOtro() {
    let url = URL_SERVICIOS + "/hospital";

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    );
  } */

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    url += "?token=" + this._usuarioService.token;
    return this.http.delete(url).pipe(
      map((resp: any) => {
        swal("Hospital borrado", "Eliminado correctamente", "success");
        return true;
      })
    );
  }

  /* crearHospital(hospital: Hospital) { */
  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + "/hospital";
    url += "?token=" + this._usuarioService.token;
    return this.http.post(url, { nombre: nombre }).pipe(
      map((resp: any) => {
        /* resp.hospital; */
        swal("Hospital Creado", nombre, "success");
        return resp.hospital;
      })
    );
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/hospitales/" + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + "/hospital/" + hospital._id;
    url += "?token=" + this._usuarioService.token;

    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        /* resp.hospital;
        let hospitalDB: Hospital = resp.hospital;
        */
       swal("Hospital actualizado", hospital.nombre, "success");
       return resp.hospital; 
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService
      .subirArchivo(archivo, "hospitales", id)
      .then((resp: any) => {
        /* console.log(resp); */
        this.hospital.img = resp.hospital.img;
        swal("Imagen actualizada", this.hospital.nombre, "success");
        /* this.guardarStorage(id, this.token, this.hospital); */
      })
      .catch(resp => {
        console.log(resp);
      });
  }
}
