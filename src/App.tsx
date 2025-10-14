import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WarningCircle } from '@phosphor-icons/react';
import { arabicToRoman, romanToArabic, isValidArabicInput, isValidRomanInput } from '@/lib/converter';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';

function App() {
  const [arabicInput, setArabicInput] = useState('');
  const [romanInput, setRomanInput] = useState('');
  const [arabicError, setArabicError] = useState('');
  const [romanError, setRomanError] = useState('');
  const [lastEdited, setLastEdited] = useState<'arabic' | 'roman' | null>(null);

  const handleArabicChange = (value: string) => {
    setArabicInput(value);
    setLastEdited('arabic');
    setArabicError('');
    setRomanError('');

    if (!value.trim()) {
      setRomanInput('');
      return;
    }

    if (!/^\d+$/.test(value)) {
      setArabicError('Please enter only numbers');
      setRomanInput('');
      return;
    }

    const num = parseInt(value, 10);
    
    if (num < 1) {
      setArabicError('Number must be at least 1');
      setRomanInput('');
      return;
    }
    
    if (num > 3999) {
      setArabicError('Number must be 3999 or less');
      setRomanInput('');
      return;
    }

    if (!isValidArabicInput(value)) {
      setArabicError('Invalid number format');
      setRomanInput('');
      return;
    }

    try {
      const roman = arabicToRoman(num);
      setRomanInput(roman);
    } catch (err) {
      setArabicError(err instanceof Error ? err.message : 'Conversion error');
      setRomanInput('');
    }
  };

  const handleRomanChange = (value: string) => {
    const upperValue = value.toUpperCase();
    setRomanInput(upperValue);
    setLastEdited('roman');
    setRomanError('');
    setArabicError('');

    if (!upperValue.trim()) {
      setArabicInput('');
      return;
    }

    if (!/^[MDCLXVI]+$/.test(upperValue)) {
      setRomanError('Only letters M, D, C, L, X, V, I allowed');
      setArabicInput('');
      return;
    }

    if (!isValidRomanInput(upperValue)) {
      setRomanError('Invalid Roman numeral format');
      setArabicInput('');
      return;
    }

    try {
      const arabic = romanToArabic(upperValue);
      setArabicInput(arabic.toString());
    } catch (err) {
      setRomanError(err instanceof Error ? err.message : 'Conversion error');
      setArabicInput('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-center mb-2 tracking-tight">
            Roman Numeral Converter
          </h1>
          <p className="text-center text-muted-foreground mb-8 md:mb-12">
            Convert between Roman and Arabic numerals instantly
          </p>

          <Card className="p-6 md:p-8 shadow-lg">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="arabic-input" className="text-sm font-medium">
                  Arabic Numeral (1-3999)
                </Label>
                <Input
                  id="arabic-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="2024"
                  value={arabicInput}
                  onChange={(e) => handleArabicChange(e.target.value)}
                  className={`text-2xl h-14 font-mono tracking-wide ${
                    arabicError ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-accent'
                  }`}
                />
                {arabicError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-destructive text-sm mt-2"
                  >
                    <WarningCircle weight="fill" className="flex-shrink-0" />
                    <span>{arabicError}</span>
                  </motion.div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="roman-input" className="text-sm font-medium">
                  Roman Numeral
                </Label>
                <Input
                  id="roman-input"
                  type="text"
                  placeholder="MMXXIV"
                  value={romanInput}
                  onChange={(e) => handleRomanChange(e.target.value)}
                  className={`text-2xl h-14 font-mono tracking-wide uppercase ${
                    romanError ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-accent'
                  }`}
                />
                {romanError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-destructive text-sm mt-2"
                  >
                    <WarningCircle weight="fill" className="flex-shrink-0" />
                    <span>{romanError}</span>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Quick Reference:</span> I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default App;