import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Utensils, ArrowRight } from 'lucide-react';

interface DietData {
  type: string;
}

interface DietFormProps {
  data: DietData;
  onChange: (data: Partial<DietData>) => void;
  onNext: () => void;
}

export function DietForm({ data, onChange, onNext }: DietFormProps) {
  const dietOptions = [
    {
      value: 'meatHeavy',
      title: 'Meat Lover',
      description: 'Eat meat daily, including red meat 4+ times per week',
      impact: 'Highest carbon impact',
      color: 'border-red-200 bg-red-50/30',
    },
    {
      value: 'average',
      title: 'Typical Omnivore',
      description: 'Eat meat several times per week, mix of proteins',
      impact: 'Moderate carbon impact',
      color: 'border-orange-200 bg-orange-50/30',
    },
    {
      value: 'vegetarian',
      title: 'Vegetarian',
      description: 'No meat, but eat dairy and eggs regularly',
      impact: 'Lower carbon impact',
      color: 'border-yellow-200 bg-yellow-50/30',
    },
    {
      value: 'vegan',
      title: 'Vegan',
      description: 'Plant-based diet, no animal products',
      impact: 'Lowest carbon impact',
      color: 'border-green-200 bg-green-50/30',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <Utensils className="h-6 w-6 text-orange-600" />
          Diet & Food
        </h2>
        <p className="text-muted-foreground">Your eating habits significantly impact your carbon footprint</p>
      </div>

      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <RadioGroup 
            value={data.type} 
            onValueChange={(value) => onChange({ type: value })}
            className="space-y-4"
          >
            {dietOptions.map((option) => (
              <Card key={option.value} className={`cursor-pointer transition-all hover:shadow-md ${option.color}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={option.value} className="text-lg font-medium cursor-pointer">
                        {option.title}
                      </Label>
                      <p className="text-muted-foreground">
                        {option.description}
                      </p>
                      <p className="text-sm font-medium text-green-700">
                        {option.impact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="bg-earth-50 rounded-lg p-4 border border-earth-200">
        <h3 className="font-medium text-earth-800 mb-2">💡 Did you know?</h3>
        <p className="text-sm text-earth-700">
          Food production accounts for about 26% of global greenhouse gas emissions. 
          Even reducing meat consumption by one day per week can make a significant difference!
        </p>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700">
          Next: Lifestyle <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}