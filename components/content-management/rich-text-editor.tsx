'use client'

import { useState, useRef, useEffect } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  maxLength?: number
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter your text...",
  className = "",
  maxLength
}: RichTextEditorProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Format text with basic styling
  const formatText = (command: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.slice(start, end)
    
    if (!selectedText) return

    let formattedText = selectedText
    let wrapper = ''

    switch (command) {
      case 'bold':
        wrapper = '**'
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        wrapper = '*'
        formattedText = `*${selectedText}*`
        break
      case 'underline':
        wrapper = '__'
        formattedText = `__${selectedText}__`
        break
      case 'code':
        wrapper = '`'
        formattedText = `\`${selectedText}\``
        break
      case 'link':
        const url = prompt('Enter URL:')
        if (url) {
          formattedText = `[${selectedText}](${url})`
        } else {
          return
        }
        break
    }

    const newValue = value.slice(0, start) + formattedText + value.slice(end)
    onChange(newValue)

    // Restore selection
    setTimeout(() => {
      textarea.focus()
      if (command === 'link') {
        textarea.setSelectionRange(start, start + formattedText.length)
      } else {
        textarea.setSelectionRange(start + wrapper.length, start + wrapper.length + selectedText.length)
      }
    }, 0)
  }

  const insertList = (ordered: boolean = false) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const lines = value.split('\n')
    let currentLine = 0
    let currentPos = 0

    // Find which line the cursor is on
    for (let i = 0; i < lines.length; i++) {
      if (currentPos + lines[i].length >= start) {
        currentLine = i
        break
      }
      currentPos += lines[i].length + 1 // +1 for newline
    }

    const listPrefix = ordered ? '1. ' : '- '
    lines[currentLine] = listPrefix + lines[currentLine].replace(/^(\d+\.\s|- )/, '')

    const newValue = lines.join('\n')
    onChange(newValue)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + listPrefix.length, start + listPrefix.length)
    }, 0)
  }

  const insertHeading = (level: number) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.slice(start, end) || 'Heading'
    
    const heading = '#'.repeat(level) + ' ' + selectedText
    const newValue = value.slice(0, start) + heading + value.slice(end)
    onChange(newValue)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + level + 1, start + level + 1 + selectedText.length)
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle common shortcuts
    if (e.metaKey || e.ctrlKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          formatText('bold')
          break
        case 'i':
          e.preventDefault()
          formatText('italic')
          break
        case 'u':
          e.preventDefault()
          formatText('underline')
          break
        case 'k':
          e.preventDefault()
          formatText('link')
          break
      }
    }
  }

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${isFocused ? 'ring-2 ring-blue-600 border-transparent' : ''} ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center space-x-1 flex-wrap gap-1">
        {/* Headings */}
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value)
            if (level) insertHeading(level)
            e.target.value = ''
          }}
          className="text-xs border border-gray-300 rounded px-2 py-1"
          defaultValue=""
        >
          <option value="">Heading</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
        </select>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Text Formatting */}
        <button
          onClick={() => formatText('bold')}
          className="p-1 hover:bg-gray-200 rounded text-sm font-bold"
          title="Bold (Ctrl+B)"
        >
          B
        </button>
        
        <button
          onClick={() => formatText('italic')}
          className="p-1 hover:bg-gray-200 rounded text-sm italic"
          title="Italic (Ctrl+I)"
        >
          I
        </button>
        
        <button
          onClick={() => formatText('underline')}
          className="p-1 hover:bg-gray-200 rounded text-sm underline"
          title="Underline (Ctrl+U)"
        >
          U
        </button>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Lists */}
        <button
          onClick={() => insertList(false)}
          className="p-1 hover:bg-gray-200 rounded text-xs"
          title="Bullet List"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
        
        <button
          onClick={() => insertList(true)}
          className="p-1 hover:bg-gray-200 rounded text-xs"
          title="Numbered List"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0-6h6m-6 4h6m6-8H9V5z" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Link and Code */}
        <button
          onClick={() => formatText('link')}
          className="p-1 hover:bg-gray-200 rounded text-xs"
          title="Link (Ctrl+K)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        
        <button
          onClick={() => formatText('code')}
          className="p-1 hover:bg-gray-200 rounded text-xs font-mono"
          title="Code"
        >
          &lt;/&gt;
        </button>
      </div>

      {/* Text Area */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full p-3 resize-none focus:outline-none font-sans leading-relaxed"
          rows={6}
          style={{ minHeight: '120px' }}
        />
        
        {/* Character Count */}
        {maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {value.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Preview Toggle */}
      <div className="bg-gray-50 border-t border-gray-200 px-3 py-2">
        <div className="text-xs text-gray-600">
          Use <strong>**bold**</strong>, <em>*italic*</em>, <code>`code`</code>, and <span className="underline">__underline__</span> for formatting
        </div>
      </div>
    </div>
  )
}