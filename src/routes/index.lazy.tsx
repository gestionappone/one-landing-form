import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from 'ui-library/ui/button';
import { Input } from 'ui-library/ui/input';
import { Progress } from 'ui-library/ui/progress';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: '',
    hobby: '',
    dream: '',
    goal: '',
  });
  const steps = [
    {
      title: 'What is your name?',
      options: [
        { label: 'John', value: 'john' },
        { label: 'Jane', value: 'jane' },
        { label: 'Other', value: 'other' },
      ],
      field: 'name',
    },
    {
      title: 'How old are you?',
      options: [
        { label: '18-25', value: '18-25' },
        { label: '26-35', value: '26-35' },
        { label: '36+', value: '36+' },
      ],
      field: 'age',
    },
    {
      title: 'What is your occupation?',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Professional', value: 'professional' },
        { label: 'Retired', value: 'retired' },
      ],
      field: 'occupation',
    },
    {
      title: 'What is your favorite hobby?',
      options: [],
      field: 'hobby',
    },
    {
      title: 'What is your dream?',
      options: [],
      field: 'dream',
    },
    {
      title: 'What is your goal?',
      options: [],
      field: 'goal',
    },
  ];
  const currentStepData = steps[currentStep];
  const handleOptionSelect = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [currentStepData.field]: value,
    }));
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handleTextInput = (e: { target: { value: any } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [currentStepData.field]: e.target.value,
    }));
    setCurrentStep((prevStep) => prevStep + 1);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-2xl p-8 bg-card rounded-lg shadow-lg">
        <div className="mb-6">
          <Progress value={(currentStep / (steps.length - 1)) * 100} />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
          {currentStepData.options.length > 0 ? (
            <div className="grid gap-4">
              {currentStepData.options.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="justify-start w-full"
                  onClick={() => handleOptionSelect(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          ) : (
            <Input
              type="text"
              placeholder={currentStepData.title}
              value={formData[currentStepData.field as keyof typeof formData]}
              onChange={handleTextInput}
            />
          )}
        </div>
      </div>
    </div>
  );
}
