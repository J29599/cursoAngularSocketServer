export class Usuario {

    public id: string;
    public nombre: string;
    public sala: string;    //Va a ser una única sala

    constructor(id: string){
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    }

}