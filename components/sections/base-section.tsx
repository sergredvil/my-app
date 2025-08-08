import { Section, SectionContent, SectionStyles } from '@/types'

export interface BaseSectionProps {
  section: Section
  isEditing?: boolean
  onContentChange?: (content: SectionContent) => void
  onStyleChange?: (styles: SectionStyles) => void
  onDelete?: () => void
  onDuplicate?: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}

export interface SectionComponentProps extends BaseSectionProps {
  className?: string
}

// Base wrapper component that handles common section functionality
export function BaseSectionWrapper({
  section,
  isEditing = false,
  onContentChange,
  onStyleChange,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  children,
  className = ''
}: BaseSectionProps & { children: React.ReactNode; className?: string }) {
  const sectionStyles = {
    backgroundColor: section.styles.backgroundColor || 'transparent',
    color: section.styles.textColor || 'inherit',
    paddingTop: `${section.styles.padding?.top || 0}px`,
    paddingBottom: `${section.styles.padding?.bottom || 0}px`,
    paddingLeft: `${section.styles.padding?.left || 0}px`,
    paddingRight: `${section.styles.padding?.right || 0}px`,
    marginTop: `${section.styles.margin?.top || 0}px`,
    marginBottom: `${section.styles.margin?.bottom || 0}px`,
  }

  return (
    <section
      className={`relative ${className}`}
      style={sectionStyles}
      data-section-id={section.id}
      data-section-type={section.type}
    >
      {isEditing && (
        <div className="absolute top-2 right-2 flex gap-2 bg-white shadow-md rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onMoveUp && (
            <button
              onClick={onMoveUp}
              className="p-1 hover:bg-gray-100 rounded text-xs"
              title="Move Up"
            >
              ↑
            </button>
          )}
          {onMoveDown && (
            <button
              onClick={onMoveDown}
              className="p-1 hover:bg-gray-100 rounded text-xs"
              title="Move Down"
            >
              ↓
            </button>
          )}
          {onDuplicate && (
            <button
              onClick={onDuplicate}
              className="p-1 hover:bg-gray-100 rounded text-xs"
              title="Duplicate"
            >
              📋
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1 hover:bg-red-100 rounded text-xs text-red-600"
              title="Delete"
            >
              🗑️
            </button>
          )}
        </div>
      )}
      {children}
    </section>
  )
}