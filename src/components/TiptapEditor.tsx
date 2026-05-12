'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapImage from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useCallback } from 'react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        try {
          const res = await fetch('/api/upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (data.secure_url) {
            editor.chain().focus().setImage({ src: data.secure_url }).run();
          }
        } catch (error) {
          console.error('Failed to upload image', error);
        }
      }
    };
    input.click();
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const ToolBtn = ({ active, onClick, children, title }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-[#111C44] text-white shadow-md'
          : 'text-[#2B3674] hover:bg-[#111C44]/10'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-2.5 flex flex-wrap items-center gap-1">
      <div className="flex items-center gap-1 pr-3 border-r border-gray-200 mr-1">
        <ToolBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
          <span className="font-bold text-xs">B</span>
        </ToolBtn>
        <ToolBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
          <span className="italic text-xs">I</span>
        </ToolBtn>
        <ToolBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
          <span className="line-through text-xs">S</span>
        </ToolBtn>
      </div>

      <div className="flex items-center gap-1 pr-3 border-r border-gray-200 mr-1">
        <ToolBtn active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1">
          <span className="text-xs font-bold">H1</span>
        </ToolBtn>
        <ToolBtn active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
          <span className="text-xs font-bold">H2</span>
        </ToolBtn>
        <ToolBtn active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">
          <span className="text-xs font-bold">H3</span>
        </ToolBtn>
      </div>

      <div className="flex items-center gap-1 pr-3 border-r border-gray-200 mr-1">
        <ToolBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
          <span className="text-xs">• List</span>
        </ToolBtn>
        <ToolBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered List">
          <span className="text-xs">1. List</span>
        </ToolBtn>
        <ToolBtn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">
          <span className="text-xs">❝ Quote</span>
        </ToolBtn>
      </div>

      <div className="flex items-center gap-1">
        <ToolBtn active={editor.isActive('link')} onClick={setLink} title="Add Link">
          <span className="text-xs">🔗 Link</span>
        </ToolBtn>
        <ToolBtn active={false} onClick={addImage} title="Insert Image">
          <span className="text-xs">🖼 Image</span>
        </ToolBtn>
      </div>
    </div>
  );
};

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage.configure({
        HTMLAttributes: { class: 'max-w-full rounded-xl mx-auto my-6 shadow-sm' },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-600 underline hover:text-blue-800' },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[450px] px-8 py-6 text-[#2B3674]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
