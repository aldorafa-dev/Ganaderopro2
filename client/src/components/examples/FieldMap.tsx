import FieldMap from '../FieldMap';

export default function FieldMapExample() {
  return (
    <div className="p-4">
      <FieldMap onFullscreen={() => console.log('Fullscreen clicked')} />
    </div>
  );
}
