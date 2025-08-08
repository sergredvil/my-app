import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface TeamMember {
  name: string
  title: string
  bio?: string
  image?: string
  social?: {
    twitter?: string
    linkedin?: string
    email?: string
  }
}

interface TeamContent {
  title: string
  subtitle?: string
  members: TeamMember[]
}

export function TeamSection({ section, ...props }: SectionComponentProps) {
  const content = section.content as TeamContent

  const renderSocialLinks = (social?: TeamMember['social']) => {
    if (!social) return null

    return (
      <div className="flex justify-center space-x-3 mt-4">
        {social.twitter && (
          <a
            href={social.twitter}
            className="text-gray-400 hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        )}
        {social.linkedin && (
          <a
            href={social.linkedin}
            className="text-gray-400 hover:text-blue-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
        {social.email && (
          <a
            href={`mailto:${social.email}`}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        )}
      </div>
    )
  }

  const renderTeamMember = (member: TeamMember, index: number) => {
    if (section.variant === 'cards') {
      return (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-square">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl font-semibold text-gray-400">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {member.name}
            </h3>
            <p className="text-blue-600 font-medium mb-3">
              {member.title}
            </p>
            {member.bio && (
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {member.bio}
              </p>
            )}
            {renderSocialLinks(member.social)}
          </div>
        </div>
      )
    }

    // Default grid layout
    return (
      <div key={index} className="text-center">
        <div className="aspect-square mb-6">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover rounded-full shadow-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl font-semibold text-gray-400">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {member.name}
        </h3>
        <p className="text-blue-600 font-medium mb-3">
          {member.title}
        </p>
        {member.bio && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {member.bio}
          </p>
        )}
        {renderSocialLinks(member.social)}
      </div>
    )
  }

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

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {content.members.map((member, index) => renderTeamMember(member, index))}
        </div>
      </div>
    </BaseSectionWrapper>
  )
}