import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface GalleryImage {
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
}

interface GalleryContent {
  title: string
  subtitle?: string
  images: GalleryImage[]
  categories?: string[]
}

export function GallerySection({ section, ...props }: SectionComponentProps) {
  const content = section.content as GalleryContent

  if (section.variant === 'masonry') {
    return (
      <BaseSectionWrapper section={section} {...props} className="group py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {content.subtitle}
              </p>
            )}
          </div>

          {/* Category Filter */}
          {content.categories && content.categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                All
              </button>
              {content.categories.map((category, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {content.images.map((image, index) => (
              <div key={index} className="break-inside-avoid mb-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover"
                  />
                  {(image.title || image.description) && (
                    <div className="p-4">
                      {image.title && (
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {image.title}
                        </h3>
                      )}
                      {image.description && (
                        <p className="text-sm text-gray-600">
                          {image.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BaseSectionWrapper>
    )
  }

  // Default: grid variant
  return (
    <BaseSectionWrapper section={section} {...props} className="group py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Category Filter */}
        {content.categories && content.categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
              All
            </button>
            {content.categories.map((category, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors border border-gray-200"
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {content.images.map((image, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {(image.title || image.description) && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.title && (
                      <h3 className="font-semibold mb-1">
                        {image.title}
                      </h3>
                    )}
                    {image.description && (
                      <p className="text-sm opacity-90">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BaseSectionWrapper>
  )
}