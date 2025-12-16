import AnimalCard from '../AnimalCard';

export default function AnimalCardExample() {
  return (
    <div className="space-y-3 p-4">
      <AnimalCard
        caravana="AR-2024-001"
        categoria="vaca"
        sexo="hembra"
        colorRaza="Angus Negro"
        lote="Lote Norte"
        rodeo="Rodeo Principal"
        isPregnant={true}
        onClick={() => console.log('Animal clicked')}
      />
      <AnimalCard
        caravana="AR-2024-002"
        categoria="toro"
        sexo="macho"
        colorRaza="Hereford"
        lote="Lote Sur"
        rodeo="Rodeo Reproductores"
        onClick={() => console.log('Animal clicked')}
      />
      <AnimalCard
        caravana="AR-2024-003"
        categoria="vaca"
        sexo="hembra"
        colorRaza="Braford"
        lote="Lote Norte"
        hasAlert={true}
        alertMessage="Parto próximo - 5 días"
        onClick={() => console.log('Animal clicked')}
      />
    </div>
  );
}
