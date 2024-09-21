export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export type ProductType = 'LONG_LIFE' | 'BOUQUET' | 'ARRANGEMENT' | 'ACRYLIC_BOX'

export type Product = {
  id: number
  code: string | null
  name: string
  slug: string
  shortDescription: string
  longDescription: string
  metaTitle: string | null
  metaDescription: string | null
  featured: boolean
  status: ProductStatus
  productType: ProductType
  categoryId: number
  category: Category
  mainImage: ProductImage
  variations: ProductVariation[]
  tags: ProductTag[]
  addons: Addon[]
  createdAt: string
  updatedAt: string
}

export type SimpleProduct = {
  id: number;
  name: string;
  image: {
    url: string;
    altText: string;
  };
  price: number;
}



export type ProductVariation = {
  id: number
  sku: string
  barcode: string | null
  price: number
  previousPrice: number | null
  inStock: boolean
  weight: number | null
  size: ProductSize | null
  infinityColor: Color | null
  boxColor: Color | null
  wrappingColor: Color | null
  isDefault: boolean
  image: ProductImage | null
  product: {
    id: number
    name: string
    slug:string

  }
}

export type ProductSize = {
  id: number
  name: string
}

export type Color = {
  id: number
  name: string
  color: string | null
  image: ColorImage | null
}



export type ProductImage = {
  id: number
  url: string
  thumbnail: string | null
  altText: string | null
  caption: string | null
}



export type ColorImage = {
  id: number
  url: string
  thumbnail: string | null
  altText: string | null
}

export type Category = {
  id: number
  name: string
}

export type ProductTag = {
  id: number
  name: string
}

export type AddonType = 'BALOONS' | 'CHOCOLATES' | 'CAKES'



export type Addon = {
  id: number
  addonType: AddonType
  name: string
  description: string | null
  addonVariations: AddonVariation[]
  mainImage: AddonImage | null
}

export type AddonVariation = {
  id: number
  sku: string
  price: number
  inStock: boolean
  weight: number | null
  isDefault: boolean
  size: AddonSize | null
  image: AddonImage | null
  quantity?: number  // Add this line
}




export type AddonImage = {
  id: number
  url: string
  thumbnail: string | null
  altText: string | null
  caption: string | null
}

export type AddonSize = {
  id: number
  name: string
}