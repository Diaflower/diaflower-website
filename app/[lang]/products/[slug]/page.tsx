import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/product/ProductDetails'
import { getProductBySlug, getAllProductSlugs } from '@/data/products'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: { slug: string, lang: 'en' | 'ar' } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug, params.lang)
  const t = await getTranslations('product')
  
  if (!product) {
    return {}
  }

  return {
    title: product.metaTitle || t('defaultMetaTitle', { name: product.name }),
    description: product.metaDescription || product.shortDescription,
  }
}

export default async function ProductPage({ params }: { params: { slug: string, lang: 'en' | 'ar' } }) {
  const product = await getProductBySlug(params.slug, params.lang)
  

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} lang={params.lang} />
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs()
    const langs = ['en', 'ar']
    return slugs.flatMap((slug: string) => 
      langs.map((lang) => ({
        slug,
        lang,
      }))
    )
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}