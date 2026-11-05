import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface HtmlEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  size?: "lg" | "md" | "sm";
  className?: string;
  minHeight?: string;
}

function ToolbarButton({
  onClick,
  active,
  title,
  size = "lg",
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  size?: "lg" | "md" | "sm";
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        "rounded transition-colors",
        size === "sm" ? "px-1 py-0.5 text-xs" : "px-2 py-1 text-sm",
        active
          ? "bg-primary text-primary-foreground"
          : "text-[#595959] hover:bg-gray-100"
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-4 w-px bg-[#d9d9d9]" />;
}

export function HtmlEditor({
  value,
  onChange,
  label,
  helperText,
  error = false,
  disabled = false,
  size = "lg",
  className,
  minHeight = "200px",
}: HtmlEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  useEffect(() => {
    editor.setEditable(!disabled);
  }, [disabled, editor]);

  const setLink = () => {
    const url = window.prompt(
      "URL",
      editor.getAttributes("link").href ?? "https://"
    );
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className={cn("gap-0.5 flex w-full flex-col", className)}>
      {label && (
        <label className="text-sm leading-[22px] text-foreground">
          {label}
        </label>
      )}
      <div
        className={cn(
          "overflow-hidden rounded-md border transition-colors",
          error ? "border-destructive" : "border-[#d9d9d9]",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <div
          className={cn(
            "gap-1 px-2 py-1.5 flex flex-wrap items-center border-b border-[#d9d9d9] bg-gray-50",
            disabled && "pointer-events-none"
          )}
        >
          <ToolbarButton
            title="Bold"
            size={size}
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton
            title="Italic"
            size={size}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            title="Underline"
            size={size}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
          >
            <span className="underline">U</span>
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            title="Heading 1"
            size={size}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
          >
            H1
          </ToolbarButton>
          <ToolbarButton
            title="Heading 2"
            size={size}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            H2
          </ToolbarButton>
          <ToolbarButton
            title="Heading 3"
            size={size}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
          >
            H3
          </ToolbarButton>
          <ToolbarButton
            title="Heading 4"
            size={size}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            active={editor.isActive("heading", { level: 4 })}
          >
            H4
          </ToolbarButton>
          <ToolbarButton
            title="Heading 5"
            size={size}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            active={editor.isActive("heading", { level: 5 })}
          >
            H5
          </ToolbarButton>
          <ToolbarButton
            title="Heading 6"
            size={size}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            active={editor.isActive("heading", { level: 6 })}
          >
            H6
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            title="Bullet List"
            size={size}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            ≡
          </ToolbarButton>
          <ToolbarButton
            title="Ordered List"
            size={size}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            1.
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            title="Align Left"
            size={size}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
          >
            ←
          </ToolbarButton>
          <ToolbarButton
            title="Align Center"
            size={size}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
          >
            ↔
          </ToolbarButton>
          <ToolbarButton
            title="Align Right"
            size={size}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
          >
            →
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            title="Link"
            size={size}
            onClick={setLink}
            active={editor.isActive("link")}
          >
            🔗
          </ToolbarButton>
          <ToolbarButton
            title="Blockquote"
            size={size}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
          >
            "
          </ToolbarButton>
          <ToolbarButton
            title="Code Block"
            size={size}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
          >
            &lt;/&gt;
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            title="Undo"
            size={size}
            onClick={() => editor.chain().focus().undo().run()}
          >
            ↩
          </ToolbarButton>
          <ToolbarButton
            title="Redo"
            size={size}
            onClick={() => editor.chain().focus().redo().run()}
          >
            ↪
          </ToolbarButton>
        </div>

        <EditorContent
          editor={editor}
          style={{ minHeight }}
          className={cn(
            "px-4 py-3 text-sm focus-within:outline-none",
            "[&_.ProseMirror]:min-h-[inherit] [&_.ProseMirror]:outline-none",
            "[&_.ProseMirror_h1]:mb-1 [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold",
            "[&_.ProseMirror_h2]:mb-1 [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold",
            "[&_.ProseMirror_h3]:mb-1 [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold",
            "[&_.ProseMirror_h4]:mb-1 [&_.ProseMirror_h4]:text-base [&_.ProseMirror_h4]:font-semibold",
            "[&_.ProseMirror_h5]:mb-1 [&_.ProseMirror_h5]:text-sm [&_.ProseMirror_h5]:font-semibold",
            "[&_.ProseMirror_h6]:mb-1 [&_.ProseMirror_h6]:text-xs [&_.ProseMirror_h6]:font-semibold [&_.ProseMirror_h6]:text-muted-foreground",
            "[&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul]:list-disc",
            "[&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol]:list-decimal",
            "[&_.ProseMirror_li]:my-0.5",
            "[&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-gray-300 [&_.ProseMirror_blockquote]:text-muted-foreground [&_.ProseMirror_blockquote]:italic",
            "[&_.ProseMirror_pre]:my-2 [&_.ProseMirror_pre]:rounded [&_.ProseMirror_pre]:p-3 [&_.ProseMirror_pre]:overflow-x-auto [&_.ProseMirror_pre]:bg-gray-100",
            "[&_.ProseMirror_pre_code]:p-0 [&_.ProseMirror_pre_code]:font-mono [&_.ProseMirror_pre_code]:text-xs [&_.ProseMirror_pre_code]:bg-transparent",
            "[&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:font-mono [&_.ProseMirror_code]:text-xs [&_.ProseMirror_code]:bg-gray-100",
            "[&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline",
            disabled && "cursor-not-allowed"
          )}
        />
      </div>
      {helperText && (
        <span
          className={cn(
            "text-xs leading-5",
            error ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
