import { Socket } from "socket.io";

import { UsuarioLista } from '../classes/usuario-lista';

import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuarioLista();

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        const usuario = usuariosConectados.borrarUsuario(cliente.id);
        // console.log("Usuario eliminado: ", usuario);
    })
}

//Escuchar Mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
}

//Escuchar configurar-usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: any) => {
        
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
}

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}