import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface TestimonialItem {
  quote: string
  name: string
  title: string
  company: string
  avatar?: string
  rating?: number
}

interface TestimonialsContent {
  title: string
  subtitle?: string
  testimonials: TestimonialItem[]
}

export function TestimonialsSection({ section, ...props }: SectionComponentProps) {
  const content = section.content as TestimonialsContent

  const renderStars = (rating: number = 5) => {
    return (
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  const renderTestimonialCard = (testimonial: TestimonialItem, index: number) => (
    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
      {renderStars(testimonial.rating)}
      <blockquote className="text-gray-600 mb-6 italic">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full mr-4 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 font-semibold text-sm">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <div className="font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-sm text-gray-500">
            {testimonial.title}{testimonial.company && `, ${testimonial.company}`}
          </div>
        </div>
      </div>
    </div>
  )

  if (section.variant === 'carousel') {
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

          {/* Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out">
                {content.testimonials.slice(0, 1).map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="text-center px-8">
                      {renderStars(testimonial.rating)}
                      <blockquote className="text-xl md:text-2xl text-gray-600 mb-8 italic leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center justify-center">
                        {testimonial.avatar ? (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full mr-4 object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full mr-4 bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 font-semibold text-lg">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="text-left">
                          <div className="font-semibold text-gray-900 text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-500">
                            {testimonial.title}{testimonial.company && `, ${testimonial.company}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Indicators */}
            {content.testimonials.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {content.testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
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

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.testimonials.map((testimonial, index) =>
            renderTestimonialCard(testimonial, index)
          )}
        </div>
      </div>
    </BaseSectionWrapper>
  )
}