import { createBucketClient } from '@cosmicjs/sdk'
import PeriodicTable from '@/components/PeriodicTable'
import DarkModeToggle from '@/components/DarkModeToggle'
import type { Element } from '@/types'

// Initialize Cosmic client for server-side data fetching
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

async function getElements(): Promise<Element[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'elements' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects || []
  } catch (error) {
    console.error('Error fetching elements:', error)
    return []
  }
}

export default async function HomePage() {
  const elements = await getElements()

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1"></div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Can I Lick It?
            </h1>
            <div className="flex-1 flex justify-end">
              <DarkModeToggle />
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Interactive Periodic Table - Discover which elements are safe to lick and which ones you should definitely avoid!
          </p>
        </header>
        
        <PeriodicTable elements={elements} />
        
        <footer className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>⚠️ For educational purposes only. Please don't actually lick random elements!</p>
        </footer>
      </div>
    </main>
  )
}