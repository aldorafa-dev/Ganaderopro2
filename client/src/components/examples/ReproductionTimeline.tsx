import ReproductionTimeline from '../ReproductionTimeline';

export default function ReproductionTimelineExample() {
  // todo: remove mock functionality
  const mockEvents = [
    {
      id: '1',
      type: 'iatf' as const,
      date: '15/03/2024',
      description: 'IATF con semen Angus Premium',
      result: 'Confirmada preñez - Tacto 05/04/2024',
    },
    {
      id: '2',
      type: 'parto' as const,
      date: '22/12/2023',
      description: 'Parto normal - Cría hembra',
      result: 'Cría: AR-2023-089',
    },
    {
      id: '3',
      type: 'servicio_natural' as const,
      date: '01/03/2023',
      description: 'Servicio con toro AR-2020-005',
    },
    {
      id: '4',
      type: 'parto' as const,
      date: '10/12/2022',
      description: 'Parto normal - Cría macho',
      result: 'Cría: AR-2022-156',
    },
  ];

  return (
    <div className="p-4">
      <ReproductionTimeline 
        events={mockEvents} 
        animalCaravana="AR-2024-015" 
      />
    </div>
  );
}
