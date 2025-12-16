import { useState } from 'react';
import { Download, Upload, FileSpreadsheet, Database, Check, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface BackupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BackupDialog({ open, onOpenChange }: BackupDialogProps) {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const handleExportDB = () => {
    setIsExporting(true);
    setExportProgress(0);
    
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          toast({
            title: 'Backup completado',
            description: 'Los datos se exportaron correctamente',
          });
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const handleExportCSV = () => {
    toast({
      title: 'Exportando a Excel',
      description: 'Preparando archivo CSV...',
    });
    console.log('Export to CSV triggered');
  };

  const handleImport = () => {
    toast({
      title: 'Importar datos',
      description: 'Seleccione un archivo de backup',
    });
    console.log('Import triggered');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-backup">
        <DialogHeader>
          <DialogTitle>Backup y Exportación</DialogTitle>
          <DialogDescription>
            Guarda tus datos o expórtalos a diferentes formatos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <Card 
            className="p-4 hover-elevate active-elevate-2 cursor-pointer"
            onClick={handleExportDB}
            data-testid="button-export-db"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Database className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Backup Completo</h4>
                <p className="text-sm text-muted-foreground">
                  Exportar toda la base de datos
                </p>
                {isExporting && (
                  <Progress value={exportProgress} className="mt-2" />
                )}
              </div>
              {exportProgress === 100 && !isExporting && (
                <Check className="w-5 h-5 text-green-500" />
              )}
            </div>
          </Card>

          <Card 
            className="p-4 hover-elevate active-elevate-2 cursor-pointer"
            onClick={handleExportCSV}
            data-testid="button-export-csv"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg text-green-600">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Exportar a Excel</h4>
                <p className="text-sm text-muted-foreground">
                  Descargar datos en formato CSV
                </p>
              </div>
              <Download className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card 
            className="p-4 hover-elevate active-elevate-2 cursor-pointer"
            onClick={handleImport}
            data-testid="button-import"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-600">
                <Upload className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Importar Backup</h4>
                <p className="text-sm text-muted-foreground">
                  Restaurar desde archivo de backup
                </p>
              </div>
            </div>
          </Card>

          <div className="flex items-start gap-2 p-3 bg-muted rounded-lg mt-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Los backups se guardan localmente. Recomendamos hacer backup periódicamente.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
