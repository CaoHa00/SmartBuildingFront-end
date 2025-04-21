import React, { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/mode-toggle';

const SettingsPanel = () => {
  const [language, setLanguage] = useState('en');
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
  ];

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white">Settings</h3>
        <p className="text-sm text-gray-300">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Label className="text-white">Language</Label>
            <span className="text-sm text-gray-300">
              Select your preferred language
            </span>
          </div>
          <Select defaultValue={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-white">Languages</SelectLabel>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} className="text-white">
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Label className="text-white">Theme</Label>
            <span className="text-sm text-gray-300">
              Select your preferred theme
            </span>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;