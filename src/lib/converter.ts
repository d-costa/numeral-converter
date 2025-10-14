export function arabicToRoman(num: number): string {
  if (num < 1 || num > 3999) {
    throw new Error('Number must be between 1 and 3999');
  }

  const romanNumerals: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];

  let result = '';
  let remaining = num;

  for (const [value, numeral] of romanNumerals) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
}

export function romanToArabic(roman: string): number {
  const normalized = roman.toUpperCase().trim();
  
  if (!normalized) {
    throw new Error('Roman numeral cannot be empty');
  }

  if (!/^[MDCLXVI]+$/.test(normalized)) {
    throw new Error('Invalid characters in Roman numeral');
  }

  const romanValues: { [key: string]: number } = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };

  let result = 0;
  let prevValue = 0;

  for (let i = normalized.length - 1; i >= 0; i--) {
    const currentValue = romanValues[normalized[i]];
    
    if (currentValue < prevValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }
    
    prevValue = currentValue;
  }

  if (result < 1 || result > 3999) {
    throw new Error('Roman numeral out of valid range (1-3999)');
  }

  if (arabicToRoman(result) !== normalized) {
    throw new Error('Invalid Roman numeral format');
  }

  return result;
}

export function isValidArabicInput(input: string): boolean {
  if (!input.trim()) return true;
  
  const num = parseInt(input, 10);
  return !isNaN(num) && num >= 1 && num <= 3999 && input === num.toString();
}

export function isValidRomanInput(input: string): boolean {
  if (!input.trim()) return true;
  
  const normalized = input.toUpperCase().trim();
  
  if (!/^[MDCLXVI]+$/.test(normalized)) {
    return false;
  }

  try {
    romanToArabic(normalized);
    return true;
  } catch {
    return false;
  }
}
