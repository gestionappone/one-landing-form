import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from 'ui-library/ui/button';
import { Input } from 'ui-library/ui/input';
import { Progress } from 'ui-library/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui-library/ui/select';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    employees: '',
    sector: '',
    location: '',
    hasBranding: '',
    businessType: '',
    productType: '',
    productVariations: '',
    colorPalette: '',
    customColors: '',
    productUpload: '',
    logistics: '',
    paymentMethod: '',
  });

  const steps = [
    {
      title: '¿Cuántos empleados tiene la empresa?',
      options: [
        { label: 'Autónoma', value: 'autonoma' },
        { label: '2-3 empleados', value: '2-3' },
        { label: '5-15 empleados', value: '5-15' },
      ],
      field: 'employees',
    },
    {
      title: 'Sector de e-commerce',
      type: 'select',
      options: [
        'Ropa y accesorios',
        'Electrónica',
        'Hogar y jardín',
        'Salud y belleza',
        'Alimentos y bebidas',
        'Juguetes y juegos',
        'Deportes y aire libre',
        'Libros y medios',
        'Arte y artesanía',
        'Joyería',
        'Automóviles y motocicletas',
        'Mascotas',
        'Oficina y papelería',
        'Instrumentos musicales',
        'Bebés y niños',
      ],
      field: 'sector',
    },
    {
      title: 'Ubicación de la empresa',
      type: 'input',
      field: 'location',
    },
    {
      title: '¿Tiene branding establecido?',
      options: [
        { label: 'Sí', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
      field: 'hasBranding',
    },
    {
      title: '¿Qué tipo de negocio tiene?',
      options: [
        { label: 'Servicio / Suscripción', value: 'service' },
        { label: 'Producto', value: 'product' },
      ],
      field: 'businessType',
    },
    {
      title: '¿Qué tipo de producto ofrece?',
      options: [
        { label: 'Físico', value: 'physical' },
        { label: 'Digital', value: 'digital' },
      ],
      field: 'productType',
      condition: (data) => data.businessType === 'product',
    },
    {
      title: '¿Cuántas variaciones tiene su producto?',
      type: 'input',
      field: 'productVariations',
      condition: (data) => data.productType === 'physical',
    },
    {
      title: 'Elija una paleta de colores',
      options: [
        { label: 'Opción 1: Azul, Blanco, Gris', value: 'palette1' },
        { label: 'Opción 2: Verde, Beige, Marrón', value: 'palette2' },
        { label: 'Opción 3: Rojo, Negro, Plateado', value: 'palette3' },
        { label: 'Personalizado', value: 'custom' },
      ],
      field: 'colorPalette',
    },
    {
      title: 'Introduzca los colores de su empresa (separados por comas)',
      type: 'input',
      field: 'customColors',
      condition: (data) => data.colorPalette === 'custom',
    },
    {
      title: '¿Cómo planea subir sus productos?',
      options: [
        { label: 'Excel', value: 'excel' },
        { label: 'Importador WooCommerce', value: 'woocommerce' },
        { label: 'Importador Shopify', value: 'shopify' },
      ],
      field: 'productUpload',
    },
    {
      title: 'Logística de entrega',
      type: 'input',
      placeholder: 'Introduzca el rango de precios por proveedor',
      field: 'logistics',
    },
    {
      title: 'Método de pago',
      type: 'input',
      placeholder: 'Introduzca el correo o teléfono para pagos',
      field: 'paymentMethod',
    },
  ];

  const currentStepData = steps[currentStep];

  const handleOptionSelect = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [currentStepData.field]: value,
    }));
    goToNextStep();
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [currentStepData.field]: e.target.value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [currentStepData.field]: value,
    }));
    goToNextStep();
  };

  const goToNextStep = () => {
    let nextStep = currentStep + 1;
    while (
      nextStep < steps.length &&
      steps[nextStep].condition &&
      !steps[nextStep].condition(formData)
    ) {
      nextStep++;
    }
    setCurrentStep(nextStep);
  };

  const renderStepContent = () => {
    if (currentStepData.type === 'input') {
      return (
        <Input
          type="text"
          placeholder={currentStepData.placeholder || currentStepData.title}
          value={formData[currentStepData.field as keyof typeof formData]}
          className="w-full h-12 text-lg"
          onChange={handleTextInput}
          onKeyPress={(e) => e.key === 'Enter' && goToNextStep()}
        />
      );
    } else if (currentStepData.type === 'select') {
      return (
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full h-12 text-lg">
            <SelectValue placeholder="Seleccione una opción" />
          </SelectTrigger>
          <SelectContent>
            {currentStepData.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    } else {
      return (
        <div className="grid gap-6">
          {currentStepData.options.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              className="justify-start w-full h-12 text-lg"
              onClick={() => handleOptionSelect(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
      <div className="w-full max-w-4xl p-12 bg-card rounded-lg shadow-lg">
        <div className="mb-8">
          <Progress value={(currentStep / (steps.length - 1)) * 100} />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{currentStepData.title}</h2>
          {renderStepContent()}
        </div>
        {currentStepData.type === 'input' && (
          <Button className="mt-6" onClick={goToNextStep}>
            Siguiente
          </Button>
        )}
      </div>
    </div>
  );
}

export default Index;
