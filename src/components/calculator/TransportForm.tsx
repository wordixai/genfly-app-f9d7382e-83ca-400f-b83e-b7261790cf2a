import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Plane, Bus, ArrowRight } from 'lucide-react';

interface TransportData {
  carType: string;
  milesPerWeek: number;
  publicTransportMiles: number;
  flightsPerYear: number;
  avgFlightHours: number;
}

interface TransportFormProps {
  data: TransportData;
  onChange: (data: Partial<TransportData>) => void;
  onNext: () => void;
}

export function TransportForm({ data, onChange, onNext }: TransportFormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <Car className="h-6 w-6 text-blue-600" />
          Transportation
        </h2>
        <p className="text-muted-foreground">Tell us about your travel habits</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-600" />
              Personal Vehicle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="car-type">Vehicle Type</Label>
              <Select value={data.carType} onValueChange={(value) => onChange({ carType: value })}>
                <SelectTrigger id="car-type">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasoline">Gasoline Car</SelectItem>
                  <SelectItem value="diesel">Diesel Car</SelectItem>
                  <SelectItem value="hybrid">Hybrid Car</SelectItem>
                  <SelectItem value="electric">Electric Car</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="miles-week">Miles Driven Per Week</Label>
              <Input
                id="miles-week"
                type="number"
                value={data.milesPerWeek}
                onChange={(e) => onChange({ milesPerWeek: Number(e.target.value) })}
                placeholder="e.g., 150"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bus className="h-5 w-5 text-green-600" />
              Public Transport
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="public-transport">Miles Per Week</Label>
              <Input
                id="public-transport"
                type="number"
                value={data.publicTransportMiles}
                onChange={(e) => onChange({ publicTransportMiles: Number(e.target.value) })}
                placeholder="e.g., 50"
              />
              <p className="text-sm text-muted-foreground">
                Bus, train, subway combined
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-200 bg-purple-50/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plane className="h-5 w-5 text-purple-600" />
            Air Travel
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="flights">Flights Per Year</Label>
            <Input
              id="flights"
              type="number"
              value={data.flightsPerYear}
              onChange={(e) => onChange({ flightsPerYear: Number(e.target.value) })}
              placeholder="e.g., 4"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="flight-hours">Average Flight Duration (hours)</Label>
            <Input
              id="flight-hours"
              type="number"
              value={data.avgFlightHours}
              onChange={(e) => onChange({ avgFlightHours: Number(e.target.value) })}
              placeholder="e.g., 3"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700">
          Next: Energy <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}