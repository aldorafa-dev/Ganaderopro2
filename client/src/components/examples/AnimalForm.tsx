import AnimalForm from '../AnimalForm';

export default function AnimalFormExample() {
  return (
    <div className="p-4">
      <AnimalForm
        onSubmit={(data) => console.log('Form submitted:', data)}
        onCancel={() => console.log('Form cancelled')}
      />
    </div>
  );
}
