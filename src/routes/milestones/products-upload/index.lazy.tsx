import { createLazyFileRoute } from '@tanstack/react-router';

import { useState } from 'react';
import { Button } from 'ui-library/ui/button';
import { Input } from 'ui-library/ui/input';
import { Label } from 'ui-library/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from 'ui-library/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'ui-library/ui/accordion';
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui-library/ui/dialog';
import { Textarea } from 'ui-library/ui/textarea';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  supplier: string;
  variations: string[];
};

type Step = 'basic' | 'stock' | 'supplier' | 'variations';

export const Route = createLazyFileRoute('/milestones/products-upload/')({
  component: ProductUpload,
});

function ProductUpload() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>('basic');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [supplier, setSupplier] = useState('');
  const [variations, setVariations] = useState<string[]>(['']);
  const [file, setFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const productsPerPage = 25;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleVariationChange = (index: number, value: string) => {
    const newVariations = [...variations];
    newVariations[index] = value;
    setVariations(newVariations);
  };

  const addVariation = () => {
    setVariations([...variations, '']);
  };

  const removeVariation = (index: number) => {
    const newVariations = variations.filter((_, i) => i !== index);
    setVariations(newVariations);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      image: file ? URL.createObjectURL(file) : image,
      description,
      stock: parseInt(stock),
      supplier,
      variations: variations.filter((v) => v !== ''),
    };
    setProducts([...products, newProduct]);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setImage('');
    setDescription('');
    setStock('');
    setSupplier('');
    setVariations(['']);
    setFile(null);
    setCurrentStep('basic');
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setImage(product.image);
    setDescription(product.description);
    setStock(product.stock.toString());
    setSupplier(product.supplier);
    setVariations(product.variations);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name,
              price: parseFloat(price),
              image: file ? URL.createObjectURL(file) : image,
              description,
              stock: parseInt(stock),
              supplier,
              variations: variations.filter((v) => v !== ''),
            }
          : p,
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
      resetForm();
    }
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const steps: { key: Step; label: string }[] = [
    { key: 'basic', label: 'Información Básica' },
    { key: 'stock', label: 'Stockaje' },
    { key: 'supplier', label: 'Proveedor' },
    { key: 'variations', label: 'Variaciones' },
  ];

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Añadir Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            {steps.map((step, index) => (
              <Button
                key={step.key}
                variant={currentStep === step.key ? 'default' : 'outline'}
                className={`mx-1 ${index === 0 ? 'rounded-l-md' : ''} ${
                  index === steps.length - 1 ? 'rounded-r-md' : ''
                }`}
                onClick={() => setCurrentStep(step.key)}
              >
                {step.label}
              </Button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 'basic' && (
              <>
                <div>
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Precio</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">URL de la Imagen</Label>
                  <Input
                    id="image"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="file">O sube una imagen</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </>
            )}
            {currentStep === 'stock' && (
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
            )}
            {currentStep === 'supplier' && (
              <div>
                <Label htmlFor="supplier">Proveedor</Label>
                <Input
                  id="supplier"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  required
                />
              </div>
            )}
            {currentStep === 'variations' && (
              <>
                {variations.map((variation, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={variation}
                      onChange={(e) =>
                        handleVariationChange(index, e.target.value)
                      }
                      placeholder={`Variación ${index + 1}`}
                    />
                    <Button
                      type="button"
                      onClick={() => removeVariation(index)}
                      variant="destructive"
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addVariation}>
                  Añadir Variación
                </Button>
              </>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => {
              const currentIndex = steps.findIndex(
                (step) => step.key === currentStep,
              );
              if (currentIndex > 0) {
                setCurrentStep(steps[currentIndex - 1].key);
              }
            }}
            disabled={currentStep === 'basic'}
          >
            Anterior
          </Button>
          {currentStep === 'variations' ? (
            <Button onClick={handleSubmit}>Añadir Producto</Button>
          ) : (
            <Button
              onClick={() => {
                const currentIndex = steps.findIndex(
                  (step) => step.key === currentStep,
                );
                if (currentIndex < steps.length - 1) {
                  setCurrentStep(steps[currentIndex + 1].key);
                }
              }}
            >
              Siguiente
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {currentProducts.map((product, index) => (
              <AccordionItem key={product.id} value={`item-${index}`}>
                <AccordionTrigger className="flex justify-between items-center">
                  <span>
                    {product.name} - ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar producto</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Producto</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdate} className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">
                              Nombre del Producto
                            </Label>
                            <Input
                              id="edit-name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-price">Precio</Label>
                            <Input
                              id="edit-price"
                              type="number"
                              step="0.01"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-image">URL de la Imagen</Label>
                            <Input
                              id="edit-image"
                              type="url"
                              value={image}
                              onChange={(e) => setImage(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-file">
                              O sube una nueva imagen
                            </Label>
                            <Input
                              id="edit-file"
                              type="file"
                              onChange={handleFileChange}
                              accept="image/*"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">
                              Descripción
                            </Label>
                            <Textarea
                              id="edit-description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-stock">Stock</Label>
                            <Input
                              id="edit-stock"
                              type="number"
                              value={stock}
                              onChange={(e) => setStock(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-supplier">Proveedor</Label>
                            <Input
                              id="edit-supplier"
                              value={supplier}
                              onChange={(e) => setSupplier(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label>Variaciones</Label>
                            {variations.map((variation, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 mt-2"
                              >
                                <Input
                                  value={variation}
                                  onChange={(e) =>
                                    handleVariationChange(index, e.target.value)
                                  }
                                  placeholder={`Variación ${index + 1}`}
                                />
                                <Button
                                  type="button"
                                  onClick={() => removeVariation(index)}
                                  variant="destructive"
                                >
                                  Eliminar
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              onClick={addVariation}
                              className="mt-2"
                            >
                              Añadir Variación
                            </Button>
                          </div>
                          <Button type="submit">Actualizar Producto</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar producto</span>
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-start space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        Precio: ${product.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Stock: {product.stock}
                      </p>
                      <p className="text-sm text-gray-600">
                        Proveedor: {product.supplier}
                      </p>
                      <p className="text-sm text-gray-600">
                        Descripción: {product.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        Variaciones: {product.variations.join(', ')}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <span>
              Página {currentPage} de{' '}
              {Math.ceil(products.length / productsPerPage)}
            </span>
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastProduct >= products.length}
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
