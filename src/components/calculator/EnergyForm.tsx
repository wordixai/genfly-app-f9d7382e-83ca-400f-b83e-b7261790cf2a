import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Zap, Thermometer, ArrowRight } from 'lucide-react';

interface EnergyData {
  electricityKwh: number;
  heatingType: string;
  heatingUsage: number;
  homeSize: number;
}

interface EnergyFormProps {
  data: EnergyData;
  onChange: (data: Partial<EnergyData>) => void;
  onNext: () => void;
}

export function EnergyForm({ data, onChange, onNext }: EnergyFormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <Home className="h-6 w-6 text-green-600" />
          Home Energy
        </h2>
        <p className="text-muted-foreground">Your household energy consumption</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-yellow-200 bg-yellow-50/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Electricity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="electricity">Monthly Usage (kWh)</Label>
              <Input
                id="electricity"
                type="number"
                value={data.electricityKwh}
                onChange={(e) => onChange({ electricityKwh: Number(e.target.value) })}
                placeholder="e.g., 900"
              />
              <p className="text-sm text-muted-foreground">
                Check your electricity bill for this information
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-orange-600" />
              Heating & Cooling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heating-type">Heating Type</Label>
              <Select value={data.heatingType} onValueChange={(value) => onChange({ heatingType: value })}>
                <SelectTrigger id="heating-type">
                  <SelectValue placeholder="Select heating type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gas">Natural Gas</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="oil">Heating Oil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="heating-usage">Monthly Usage (therms/kWh)</Label>
              <Input
                id="heating-usage"
                type="number"
                value={data.heatingUsage}
                onChange={(e) => onChange({ heatingUsage: Number(e.target.value) })}
                placeholder="e.g., 150"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="text-lg">Home Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="home-size">Home Size (sq ft)</Label>
            <Input
              id="home-size"
              type="number"
              value={data.homeSize}
              onChange={(e) => onChange({ homeSize: Number(e.target.value) })}
              placeholder="e.g., 1500"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700">
          Next: Diet <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}