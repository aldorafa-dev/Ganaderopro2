import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Radio, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const animalFormSchema = z.object({
  caravana: z.string().min(1, 'La caravana es requerida'),
  categoria: z.enum(['ternero', 'ternera', 'novillo', 'vaquillona', 'vaca', 'toro']),
  sexo: z.enum(['macho', 'hembra']),
  colorRaza: z.string().optional(),
  fechaNacimiento: z.string().optional(),
  loteId: z.string().min(1, 'Seleccione un lote'),
  rodeoId: z.string().min(1, 'Seleccione un rodeo'),
  madreCaravana: z.string().optional(),
  padreCaravana: z.string().optional(),
  observaciones: z.string().optional(),
});

type AnimalFormValues = z.infer<typeof animalFormSchema>;

interface AnimalFormProps {
  onSubmit: (data: AnimalFormValues) => void;
  onCancel: () => void;
  initialValues?: Partial<AnimalFormValues>;
}

export default function AnimalForm({ onSubmit, onCancel, initialValues }: AnimalFormProps) {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);

  const form = useForm<AnimalFormValues>({
    resolver: zodResolver(animalFormSchema),
    defaultValues: {
      caravana: '',
      categoria: 'vaca',
      sexo: 'hembra',
      colorRaza: '',
      fechaNacimiento: '',
      loteId: '',
      rodeoId: '',
      madreCaravana: '',
      padreCaravana: '',
      observaciones: '',
      ...initialValues,
    },
  });

  const handleRfidScan = () => {
    setIsScanning(true);
    toast({
      title: 'RFID',
      description: 'Función preparada para integración Bluetooth',
    });
    setTimeout(() => setIsScanning(false), 2000);
  };

  // todo: remove mock functionality
  const lotes = [
    { id: '1', nombre: 'Lote Norte' },
    { id: '2', nombre: 'Lote Sur' },
    { id: '3', nombre: 'Lote Este' },
  ];

  const rodeos = [
    { id: '1', nombre: 'Rodeo Principal' },
    { id: '2', nombre: 'Rodeo Cría' },
    { id: '3', nombre: 'Rodeo Engorde' },
  ];

  return (
    <Card className="p-4" data-testid="form-animal">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="caravana"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caravana / RFID</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input 
                      placeholder="Número de caravana" 
                      className="h-14 text-lg"
                      {...field} 
                      data-testid="input-caravana"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-14 w-14 shrink-0"
                    onClick={handleRfidScan}
                    disabled={isScanning}
                    data-testid="button-rfid-scan"
                  >
                    {isScanning ? (
                      <Radio className="w-5 h-5 animate-pulse" />
                    ) : (
                      <ScanLine className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-14" data-testid="select-categoria">
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ternero">Ternero</SelectItem>
                      <SelectItem value="ternera">Ternera</SelectItem>
                      <SelectItem value="novillo">Novillo</SelectItem>
                      <SelectItem value="vaquillona">Vaquillona</SelectItem>
                      <SelectItem value="vaca">Vaca</SelectItem>
                      <SelectItem value="toro">Toro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sexo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-14" data-testid="select-sexo">
                        <SelectValue placeholder="Sexo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="macho">Macho</SelectItem>
                      <SelectItem value="hembra">Hembra</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="colorRaza"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color / Raza</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ej: Angus Negro" 
                    className="h-14"
                    {...field} 
                    data-testid="input-color-raza"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fechaNacimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    className="h-14"
                    {...field} 
                    data-testid="input-fecha-nacimiento"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="loteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lote</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-14" data-testid="select-lote">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lotes.map((lote) => (
                        <SelectItem key={lote.id} value={lote.id}>
                          {lote.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rodeoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rodeo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-14" data-testid="select-rodeo">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {rodeos.map((rodeo) => (
                        <SelectItem key={rodeo.id} value={rodeo.id}>
                          {rodeo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="madreCaravana"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Madre (Caravana)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Opcional" 
                      className="h-14"
                      {...field} 
                      data-testid="input-madre"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="padreCaravana"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Padre (Caravana)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Opcional" 
                      className="h-14"
                      {...field} 
                      data-testid="input-padre"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="observaciones"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observaciones</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Notas adicionales..." 
                    className="min-h-[100px]"
                    {...field} 
                    data-testid="textarea-observaciones"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 h-12"
              onClick={onCancel}
              data-testid="button-cancel"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-12"
              data-testid="button-submit"
            >
              Guardar Animal
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
