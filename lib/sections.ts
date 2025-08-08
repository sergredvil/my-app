import { Section, SectionType, SectionTemplate, SectionVariant } from '@/types'
import { nanoid } from 'nanoid'

// Generate a new section with default content
export function createSection(
  type: SectionType,
  variant: string,
  order: number = 0
): Section {
  return {
    id: nanoid(),
    type,
    variant,
    content: getDefaultContent(type, variant),
    styles: getDefaultStyles(type),
    order
  }
}

// Get default content for a section type and variant
export function getDefaultContent(type: SectionType, variant: string): any {
  const defaults: Record<SectionType, any> = {
    header: {
      logo: { text: 'Your Logo', image: null },
      navigation: [
        { label: 'Home', href: '#' },
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Contact', href: '#contact' }
      ],
      cta: { text: 'Get Started', href: '#' }
    },
    hero: {
      headline: 'Welcome to Your Amazing Product',
      subheadline: 'Build something incredible with our powerful tools',
      cta: { primary: { text: 'Get Started', href: '#' }, secondary: { text: 'Learn More', href: '#' } },
      image: null,
      videoUrl: null
    },
    features: {
      title: 'Amazing Features',
      subtitle: 'Everything you need to succeed',
      features: [
        {
          title: 'Feature One',
          description: 'Description of your first amazing feature',
          icon: '🚀'
        },
        {
          title: 'Feature Two',
          description: 'Description of your second amazing feature',
          icon: '⚡'
        },
        {
          title: 'Feature Three',
          description: 'Description of your third amazing feature',
          icon: '🎯'
        }
      ]
    },
    pricing: {
      title: 'Simple Pricing',
      subtitle: 'Choose the perfect plan for your needs',
      plans: [
        {
          name: 'Basic',
          price: '$9',
          period: '/month',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          cta: { text: 'Get Started', href: '#' }
        },
        {
          name: 'Pro',
          price: '$29',
          period: '/month',
          features: ['Everything in Basic', 'Feature 4', 'Feature 5'],
          popular: true,
          cta: { text: 'Get Started', href: '#' }
        }
      ]
    },
    testimonials: {
      title: 'What Our Customers Say',
      testimonials: [
        {
          text: 'This product has completely transformed how we work. Highly recommended!',
          author: 'John Doe',
          role: 'CEO, Company Inc.',
          avatar: null
        }
      ]
    },
    cta: {
      title: 'Ready to Get Started?',
      subtitle: 'Join thousands of satisfied customers today',
      cta: { text: 'Get Started Now', href: '#' }
    },
    about: {
      title: 'About Us',
      content: 'We are passionate about creating amazing products that help people achieve their goals.',
      image: null
    },
    team: {
      title: 'Meet Our Team',
      members: [
        {
          name: 'Jane Smith',
          role: 'CEO & Founder',
          bio: 'Passionate about building great products',
          avatar: null,
          social: { linkedin: '#', twitter: '#' }
        }
      ]
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'How does this work?',
          answer: 'It works by doing amazing things that help you achieve your goals.'
        }
      ]
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'We would love to hear from you',
      email: 'hello@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345'
    },
    newsletter: {
      title: 'Stay Updated',
      subtitle: 'Get the latest news and updates delivered to your inbox',
      placeholder: 'Enter your email address',
      cta: { text: 'Subscribe', href: '#' }
    },
    blog: {
      title: 'Latest News',
      posts: [
        {
          title: 'Blog Post Title',
          excerpt: 'A brief description of this blog post...',
          date: new Date().toISOString(),
          image: null,
          href: '#'
        }
      ]
    },
    gallery: {
      title: 'Gallery',
      images: []
    },
    stats: {
      title: 'By the Numbers',
      stats: [
        { number: '1000+', label: 'Happy Customers' },
        { number: '99%', label: 'Satisfaction Rate' },
        { number: '24/7', label: 'Support Available' }
      ]
    },
    footer: {
      logo: { text: 'Your Logo', image: null },
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' }
      ],
      social: [
        { platform: 'twitter', href: '#' },
        { platform: 'facebook', href: '#' },
        { platform: 'linkedin', href: '#' }
      ],
      copyright: '© 2024 Your Company. All rights reserved.'
    }
  }
  
  return defaults[type] || {}
}

// Get default styles for a section type
export function getDefaultStyles(type: SectionType) {
  const defaults: Record<SectionType, any> = {
    header: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      padding: { top: 16, bottom: 16, left: 24, right: 24 }
    },
    hero: {
      backgroundColor: '#f8fafc',
      textColor: '#1e293b',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    features: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    pricing: {
      backgroundColor: '#f8fafc',
      textColor: '#374151',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    testimonials: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    cta: {
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    about: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    team: {
      backgroundColor: '#f8fafc',
      textColor: '#374151',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    faq: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    contact: {
      backgroundColor: '#f8fafc',
      textColor: '#374151',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    newsletter: {
      backgroundColor: '#1e293b',
      textColor: '#ffffff',
      padding: { top: 60, bottom: 60, left: 24, right: 24 }
    },
    blog: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    gallery: {
      backgroundColor: '#f8fafc',
      textColor: '#374151',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    stats: {
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      padding: { top: 80, bottom: 80, left: 24, right: 24 }
    },
    footer: {
      backgroundColor: '#1e293b',
      textColor: '#ffffff',
      padding: { top: 60, bottom: 60, left: 24, right: 24 }
    }
  }
  
  return defaults[type] || {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    padding: { top: 40, bottom: 40, left: 24, right: 24 }
  }
}