import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface BlogPost {
  title: string
  excerpt: string
  author: string
  date: string
  image?: string
  href: string
  category?: string
  readTime?: string
}

interface BlogContent {
  title: string
  subtitle?: string
  posts: BlogPost[]
  viewAllLink?: {
    text: string
    href: string
  }
}

export function BlogSection({ section, ...props }: SectionComponentProps) {
  const content = section.content as BlogContent

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (section.variant === 'list') {
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

          {/* Blog List */}
          <div className="max-w-4xl mx-auto space-y-8">
            {content.posts.map((post, index) => (
              <article key={index} className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                {post.image && (
                  <div className="md:w-1/3 flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 md:h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatDate(post.date)}</span>
                    {post.category && (
                      <>
                        <span>•</span>
                        <span className="text-blue-600 font-medium">{post.category}</span>
                      </>
                    )}
                    {post.readTime && (
                      <>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    <a href={post.href}>{post.title}</a>
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {post.author}</span>
                    <a
                      href={post.href}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Link */}
          {content.viewAllLink && (
            <div className="text-center mt-12">
              <a
                href={content.viewAllLink.href}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                {content.viewAllLink.text}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
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

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.posts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {post.image && (
                <div className="aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{formatDate(post.date)}</span>
                  {post.category && (
                    <>
                      <span>•</span>
                      <span className="text-blue-600 font-medium">{post.category}</span>
                    </>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors">
                  <a href={post.href}>{post.title}</a>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">By {post.author}</span>
                  {post.readTime && (
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        {content.viewAllLink && (
          <div className="text-center mt-12">
            <a
              href={content.viewAllLink.href}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {content.viewAllLink.text}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </BaseSectionWrapper>
  )
}