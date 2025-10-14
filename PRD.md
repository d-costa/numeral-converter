# Planning Guide

A bidirectional converter that transforms numbers between Roman numeral and Arabic numeral systems with instant, real-time conversion.

**Experience Qualities**:
1. **Effortless** - Conversion happens instantly as you type with no buttons to press
2. **Clear** - Immediate visual feedback shows valid/invalid input and guides correct usage
3. **Minimal** - Zero distractions, just the conversion tool and nothing more

**Complexity Level**: Micro Tool (single-purpose)
  - This is a focused utility that does one thing exceptionally well: convert between numeral systems

## Essential Features

### Bidirectional Number Conversion
- **Functionality**: Real-time conversion between Roman (I, V, X, L, C, D, M) and Arabic (1-3999) numerals
- **Purpose**: Enables quick conversion in either direction without mode switching
- **Trigger**: User types in either input field
- **Progression**: User focuses field → Types numeral → Sees instant conversion in opposite field → Can switch fields anytime
- **Success criteria**: All valid Roman numerals (I-MMMCMXCIX) convert accurately; Arabic numbers (1-3999) convert to proper Roman format; invalid inputs show helpful error states

### Input Validation & Feedback
- **Functionality**: Real-time validation that highlights invalid inputs and shows helpful messages
- **Purpose**: Guides users toward correct input format without frustration
- **Trigger**: User types invalid character or out-of-range number
- **Progression**: Invalid input entered → Field shows error state → Helper text explains valid range/format → User corrects input → Error clears
- **Success criteria**: Users understand valid ranges immediately; no confusion about why conversion fails

### Swap Direction Button
- **Functionality**: One-click button to transfer the converted value back to the input field
- **Purpose**: Enables quick chaining of conversions or corrections
- **Trigger**: User clicks swap icon between fields
- **Progression**: User clicks swap → Values exchange between fields → Conversion recalculates
- **Success criteria**: Values swap smoothly with clear animation feedback

## Edge Case Handling

- **Empty Input**: Show placeholder examples, clear opposite field gracefully
- **Invalid Roman Numerals**: Detect patterns like "IIII" or "VV" and show error, suggest correct format
- **Out of Range Numbers**: Numbers >3999 or <1 show friendly message explaining Roman numeral limitations
- **Mixed Input**: Reject non-alphanumeric characters immediately, guide toward valid input
- **Leading Zeros**: Strip automatically from Arabic numbers, treat as valid input

## Design Direction

The design should feel precise, mathematical, and trustworthy—like a professional reference tool. Clean and minimal interface where the conversion is the hero, with a modern aesthetic that feels both timeless (honoring Roman heritage) and contemporary.

## Color Selection

Monochromatic with selective accent - A refined grayscale palette with a single vibrant accent color to highlight the conversion action, creating focus and clarity.

- **Primary Color**: Deep charcoal (oklch(0.25 0 0)) - Conveys precision and professionalism
- **Secondary Colors**: Soft grays (oklch(0.95 0 0)) for backgrounds - Provides clean canvas without distraction
- **Accent Color**: Vibrant blue (oklch(0.55 0.22 250)) - Draws attention to interactive elements and conversion status
- **Foreground/Background Pairings**:
  - Background (Light Gray oklch(0.98 0 0)): Dark text (oklch(0.25 0 0)) - Ratio 13.4:1 ✓
  - Card (White oklch(1 0 0)): Dark text (oklch(0.25 0 0)) - Ratio 15.2:1 ✓
  - Primary (Deep Charcoal oklch(0.25 0 0)): White text (oklch(1 0 0)) - Ratio 15.2:1 ✓
  - Accent (Vibrant Blue oklch(0.55 0.22 250)): White text (oklch(1 0 0)) - Ratio 4.8:1 ✓
  - Muted (Light Gray oklch(0.95 0 0)): Medium Gray text (oklch(0.50 0 0)) - Ratio 6.2:1 ✓

## Font Selection

A clean, geometric sans-serif that balances modern readability with mathematical precision, paired with a monospace font for the actual numerals to emphasize their systematic nature.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter SemiBold/32px/tight letter-spacing (-0.02em)
  - Input Labels: Inter Medium/14px/normal spacing
  - Numeral Inputs: JetBrains Mono Regular/24px/wide spacing (0.02em) - Monospace emphasizes the character-by-character nature
  - Helper Text: Inter Regular/13px/relaxed leading (1.5)
  - Error Messages: Inter Medium/13px/normal spacing

## Animations

Subtle, purposeful micro-interactions that provide feedback without slowing down the conversion experience—animations should feel instantaneous and confidence-building.

- **Purposeful Meaning**: Smooth field transitions and gentle error state pulses communicate system responsiveness; swap button rotation reinforces the bidirectional nature
- **Hierarchy of Movement**: Input fields get priority feedback (instant), swap button has satisfying rotation (200ms), error states pulse gently to draw attention without alarming

## Component Selection

- **Components**:
  - Card: Houses the entire converter in a clean, elevated container
  - Input: Large, clear text fields for both numeral types with prominent focus states
  - Label: Clear field labels above inputs
  - Button: Icon button for swap functionality with hover states
  - Alert: Subtle inline error/info messages below inputs
  
- **Customizations**:
  - Inputs sized larger than default (text-2xl) for prominence
  - Custom monospace font applied to input fields
  - Swap button circular with icon only (no text) positioned centrally between fields
  - Generous padding throughout for breathing room
  
- **States**:
  - Inputs: default (subtle border), focused (accent border + subtle glow), error (red border + shake), success (green subtle highlight)
  - Swap button: default, hover (scale 1.05), active (rotate 180deg)
  - Error text: fade in/out transitions
  
- **Icon Selection**:
  - ArrowsDownUp from phosphor-icons for the swap button (represents bidirectional conversion)
  - WarningCircle for error states
  - Info for helpful tips
  
- **Spacing**:
  - Card padding: p-8 (2rem)
  - Input spacing: space-y-6 between input groups (1.5rem)
  - Label to input: space-y-2 (0.5rem)
  - Container margins: max-w-2xl mx-auto with py-16
  
- **Mobile**:
  - Single column layout maintained (already optimal)
  - Reduce card padding to p-6 on mobile
  - Font sizes scale down: title to 24px, inputs to 20px
  - Maintain swap button between fields but adjust spacing for compact view
