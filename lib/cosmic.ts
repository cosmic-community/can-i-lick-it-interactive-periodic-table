import { createBucketClient } from '@cosmicjs/sdk';
import type { Element, CosmicResponse } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
});

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all periodic elements
export async function getElements(): Promise<Element[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'elements' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Element[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch elements');
  }
}

// Get a specific element by symbol
export async function getElementBySymbol(symbol: string): Promise<Element | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'elements',
      slug: symbol.toLowerCase()
    }).depth(1);
    
    return response.object as Element;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch element: ${symbol}`);
  }
}

// Get elements by safety level
export async function getElementsBySafetyLevel(safetyLevel: string): Promise<Element[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'elements',
        'metadata.safety_level': safetyLevel
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Element[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch elements with safety level: ${safetyLevel}`);
  }
}

// Create a new element (for admin functions)
export async function createElement(elementData: any): Promise<Element> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'elements',
      title: elementData.element_name,
      slug: elementData.symbol.toLowerCase(),
      metadata: {
        symbol: elementData.symbol,
        atomic_number: elementData.atomic_number,
        safety_level: elementData.safety_level,
        lick_description: elementData.lick_description,
        element_group: elementData.element_group || '',
        period: elementData.period,
        group: elementData.group,
        element_name: elementData.element_name
      }
    });
    
    return response.object as Element;
  } catch (error) {
    console.error('Error creating element:', error);
    throw new Error('Failed to create element');
  }
}

// Update an existing element
export async function updateElement(id: string, elementData: any): Promise<Element> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      title: elementData.element_name,
      slug: elementData.symbol.toLowerCase(),
      metadata: {
        symbol: elementData.symbol,
        atomic_number: elementData.atomic_number,
        safety_level: elementData.safety_level,
        lick_description: elementData.lick_description,
        element_group: elementData.element_group || '',
        period: elementData.period,
        group: elementData.group,
        element_name: elementData.element_name
      }
    });
    
    return response.object as Element;
  } catch (error) {
    console.error('Error updating element:', error);
    throw new Error('Failed to update element');
  }
}