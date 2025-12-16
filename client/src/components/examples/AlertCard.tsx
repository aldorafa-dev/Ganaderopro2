import AlertCard from '../AlertCard';

export default function AlertCardExample() {
  return (
    <div className="space-y-3 p-4">
      <AlertCard
        type="parto_proximo"
        priority="urgente"
        animalCaravana="AR-2024-015"
        message="Días de gestación: 278. Parto estimado para el 20/12"
        date="15/12/2024"
        daysRemaining={5}
        lote="Lote Norte"
        onClick={() => console.log('Alert clicked')}
      />
      <AlertCard
        type="repeticion_celo"
        priority="proximo"
        animalCaravana="AR-2024-023"
        message="Han pasado 22 días desde el último servicio"
        date="12/12/2024"
        daysRemaining={0}
        lote="Lote Sur"
        onClick={() => console.log('Alert clicked')}
      />
      <AlertCard
        type="control_postparto"
        priority="rutina"
        animalCaravana="AR-2024-008"
        message="Control programado a los 30 días post-parto"
        date="18/12/2024"
        daysRemaining={3}
        lote="Lote Este"
        onClick={() => console.log('Alert clicked')}
      />
    </div>
  );
}
