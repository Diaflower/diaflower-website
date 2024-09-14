import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/product/ProductDetails'
import { Product } from '@/types/product'
import { getProductBySlug,getAllProductSlugs } from '@/data/products'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  
  if (!product) {
    return {}
  }

  return {
    title: product.metaTitle_en || product.name_en,
    description: product.metaDescription_en || product.shortDescription_en,
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs()
    return slugs.map((slug: string) => ({
      slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}