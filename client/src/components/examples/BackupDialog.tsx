import { useState } from 'react';
import BackupDialog from '../BackupDialog';
import { Button } from '@/components/ui/button';

export default function BackupDialogExample() {
  const [open, setOpen] = useState(true);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Abrir Backup</Button>
      <BackupDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
