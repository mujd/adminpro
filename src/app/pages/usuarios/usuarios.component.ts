import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { UsuarioService } from "../../services/service.index";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";
/* import swal from "sweetalert"; */

declare var swal: any;

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  limite: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe(resp =>
      this.cargarUsuarios()
    );
  }

  mostrarModal(id: string) {
    if (id === this._usuarioService.usuario._id) {
      swal("No puede actualizar imagen", "Para actualizarla ve a tu perfil", "error");
      return;
    }
    this._modalUploadService.mostrarModal("usuarios", id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarLimite(valor: number) {
    let limite = this.limite + valor;
    /* console.log(limite); */

    if (limite >= this.totalRegistros) {
      return;
    }

    if (limite < 0) {
      return;
    }

    this.limite += valor;
    this.cargarUsuarios();
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    /* console.log(desde); */

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal("No puede borrar usuario", "No se puede borrar a si mismo", "error");
      return;
    }
    swal({
      title: "¿Esta seguro?",
      text: "Esta a punto de borrar a" + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(borrado => {
          console.log(borrado);
          this.cargarUsuarios();
        });
      }
    });
    /*  swal({
      title: "¿Está seguro?",
      text: "Está a punto de borrar a " + usuario.nombre,
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(borrado => {
          console.log(borrado);
          this.cargarUsuarios();
        });
      }
    }); */
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
