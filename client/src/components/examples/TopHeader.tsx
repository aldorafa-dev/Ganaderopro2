import TopHeader from '../TopHeader';

export default function TopHeaderExample() {
  return (
    <TopHeader 
      onMenuClick={() => console.log('Menu clicked')}
      onBackupClick={() => console.log('Backup clicked')}
    />
  );
}
