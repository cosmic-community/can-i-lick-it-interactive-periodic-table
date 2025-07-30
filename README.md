# Can I Lick It? - Interactive Periodic Table

![App Preview](https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=300&fit=crop&auto=format)

A fun, interactive periodic table that answers the important question: "Can I lick it?" Each element is color-coded based on how safe (or dangerous) it would be to lick it, with humorous tooltips explaining the consequences.

## Features

- **Interactive Periodic Table**: Full 118-element periodic table with authentic positioning
- **Color-Coded Safety System**: Four-tier lickability rating system
- **Humorous Tooltips**: Entertaining explanations for each element's licking consequences
- **Random Element Discovery**: Explore random elements with surprise highlights
- **Dark Mode Toggle**: Switch between light and dark themes
- **Mobile Responsive**: Optimized for all device sizes
- **Hover Animations**: Smooth interactions and visual feedback

## Safety Color Legend

- 🟩 **Green**: "Sure, it's probably fine"
- 🟨 **Yellow**: "Maybe not a good idea" 
- 🟥 **Red**: "You really shouldn't"
- 🟪 **Purple**: "Please reconsider"

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68896c2e2dcc7fbc00c94eb9&clone_repository=68896eeb2dcc7fbc00c94ebb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a fun, modern, interactive website titled "Can I lick it?" that displays a periodic table where each element is color-coded based on how dangerous it would be to lick it.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and modern patterns
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for element data management
- **Lucide React** - Beautiful icons for UI elements

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd can-i-lick-it
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Elements Data

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all periodic elements
export async function getElements() {
  try {
    const response = await cosmic.objects
      .find({ type: 'elements' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Element[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

// Get a specific element by symbol
export async function getElementBySymbol(symbol: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'elements',
      slug: symbol.toLowerCase()
    }).depth(1)
    
    return response.object as Element
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}
```

### Creating New Element Data

```typescript
// Add a new element to the periodic table
export async function createElement(elementData: CreateElementData) {
  const response = await cosmic.objects.insertOne({
    type: 'elements',
    title: elementData.name,
    slug: elementData.symbol.toLowerCase(),
    metadata: {
      symbol: elementData.symbol,
      atomic_number: elementData.atomicNumber,
      safety_level: elementData.safetyLevel,
      lick_description: elementData.lickDescription,
      element_group: elementData.elementGroup,
      period: elementData.period,
      group: elementData.group
    }
  })
  
  return response.object as Element
}
```

## Cosmic CMS Integration

This application uses Cosmic CMS to manage periodic element data. The content model includes:

- **Elements**: Each periodic table element with safety ratings and descriptions
- **Safety Levels**: Color-coded lickability ratings
- **Tooltips**: Humorous descriptions of what happens if you lick each element

### Content Model Structure

```typescript
interface Element {
  id: string
  title: string // Element name (e.g., "Hydrogen")
  slug: string // Element symbol (e.g., "h")
  metadata: {
    symbol: string // Chemical symbol (H, He, Li, etc.)
    atomic_number: number // Position in periodic table
    safety_level: SafetyLevel // Green, Yellow, Red, Purple
    lick_description: string // Humorous tooltip text
    element_group?: string // Metal, Nonmetal, etc.
    period: number // Periodic table row
    group: number // Periodic table column
  }
}

type SafetyLevel = 'green' | 'yellow' | 'red' | 'purple'
```

## Deployment Options

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify
3. Set environment variables in Netlify dashboard

For production, make sure to set the environment variables in your hosting platform's dashboard.

<!-- README_END -->