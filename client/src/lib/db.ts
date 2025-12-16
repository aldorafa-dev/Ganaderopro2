import Dexie, { type Table } from 'dexie';

export interface Establecimiento {
  id?: number;
  nombre: string;
  ubicacion: string;
  coordenadasGPS?: string;
  observaciones?: string;
}

export interface Lote {
  id?: number;
  nombre: string;
  establecimientoId: number;
  superficie?: number;
  coordenadasPoligono?: string;
  observaciones?: string;
}

export interface Rodeo {
  id?: number;
  nombre: string;
  establecimientoId: number;
  loteId: number;
  observaciones?: string;
}

export type CategoriaAnimal = 'ternero' | 'ternera' | 'novillo' | 'vaquillona' | 'vaca' | 'toro';
export type SexoAnimal = 'macho' | 'hembra';

export interface Tratamiento {
  fecha: string;
  tipo: string;
  observaciones?: string;
}

export interface Animal {
  id?: number;
  caravana: string;
  establecimientoId: number;
  loteId: number;
  rodeoId: number;
  categoria: CategoriaAnimal;
  sexo: SexoAnimal;
  colorRaza?: string;
  fechaNacimiento?: string;
  tratamientos: Tratamiento[];
  madreCaravana?: string;
  padreCaravana?: string;
  observaciones?: string;
  fechaAlta: string;
}

export type TipoEvento = 'IATF' | 'Servicio Natural';

export interface EventoReproductivo {
  id?: number;
  animalId: number;
  tipoEvento: TipoEvento;
  fechaEvento: string;
  toroOSemen?: string;
  observaciones?: string;
}

export type OrigenParto = 'IATF' | 'Servicio Natural' | 'Indeterminado';

export interface Parto {
  id?: number;
  madreId: number;
  fechaParto: string;
  criaCaravana?: string;
  origen: OrigenParto;
  toroOSemen?: string;
  observaciones?: string;
}

export interface MovimientoAnimal {
  id?: number;
  animalId: number;
  fechaMovimiento: string;
  loteAnteriorId: number;
  rodeoAnteriorId: number;
  loteNuevoId: number;
  rodeoNuevoId: number;
  observaciones?: string;
}

export class GanaderoProDB extends Dexie {
  establecimientos!: Table<Establecimiento>;
  lotes!: Table<Lote>;
  rodeos!: Table<Rodeo>;
  animales!: Table<Animal>;
  eventosReproductivos!: Table<EventoReproductivo>;
  partos!: Table<Parto>;
  movimientos!: Table<MovimientoAnimal>;

  constructor() {
    super('GanaderoProDB');
    this.version(1).stores({
      establecimientos: '++id, nombre',
      lotes: '++id, establecimientoId, nombre',
      rodeos: '++id, establecimientoId, loteId, nombre',
      animales: '++id, caravana, establecimientoId, loteId, rodeoId, categoria, sexo',
      eventosReproductivos: '++id, animalId, tipoEvento, fechaEvento',
      partos: '++id, madreId, fechaParto, criaCaravana',
      movimientos: '++id, animalId, fechaMovimiento'
    });
  }
}

export const db = new GanaderoProDB();
