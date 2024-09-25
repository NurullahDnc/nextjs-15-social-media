"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import submitPost from "./actions";
import "./styles.css";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useSubmitPostMutation } from "./mutations";
import LoadingButton from "@/components/LoadingButton";
import useMediaUpload, { Attachment } from "./useMediaUpload";
import { ImageIcon, Loader2, X } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useDropzone } from "@uploadthing/react";
import { ClipboardEventHandler } from 'react'; // React olay tiplerini içeri aktar


//Post Create components
export default function PostEditor() {
  const { user } = useSession();

  const queryClient = useQueryClient();
  const mutation = useSubmitPostMutation();

  const {
    startUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset: resetMediaUploads,
  } = useMediaUpload();

  //dosya surukle bırak input uzerine
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  });

  const { onClick, ...rootProps } = getRootProps();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }), //bold ve italic özelliklerini devre dışı bırakacak şekilde yapılandırılıyor.

      Placeholder.configure({
        placeholder: "Neler oluyor?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  async function onSubmit() {
    // İşlem tamamlandığında verileri yeniden sorgulamak için geçersiz kıl  - farklı yontem kulanıldı.
    // queryClient.refetchQueries({ queryKey: ["post-feed", "for-you"] });

    // mutation.mutate(input, { ... }) ile input, submitPost fonksiyonuna otomatik olarak props gönderilir.
    mutation.mutate(
      {
        content: input,
        mediaIds: attachments
          .map((att) => att.mediaId)
          .filter(Boolean) as string[],
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          resetMediaUploads();
        },
      },
    );
  }

// Kopyalanan medyayı input alanına yapıştırma func.
const onPaste: ClipboardEventHandler<HTMLDivElement> = (e) => {
    // clipboardData'dan öğeleri alın
    const files = Array.from(e.clipboardData?.items || [])   
      .filter((item) => item.kind === 'file')   
      .map((item) => item.getAsFile())   
  
      .filter((file): file is File => file !== null);   
  
    startUpload(files);   
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <div {...rootProps} className="w-full">
          <EditorContent
            editor={editor}
            className={cn("max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3", isDragActive && "outline-dashed")}
            onPaste={onPaste}
          />

          <input {...getInputProps()} />
        </div>
      </div>

      {/* Yuklenmis image video varsa goster */}
      {!!attachments.length && (
        <AttachmentPreviews
          attachments={attachments}
          removeAttachment={removeAttachment}
        />
      )}

      {/* Yukleme durum ilerlemesi */}
      <div className="flex justify-end">
        {isUploading && (
          <>
            <span className="text-sm">{uploadProgress ?? 0}%</span>
            <Loader2 className="size-5 animate-spin text-primary" />
          </>
        )}

        <AddAttachmentsButton
          disabled={isUploading || arguments.length >= 5}
          onFilesSelected={startUpload}
        />
        <LoadingButton
          onClick={onSubmit}
          disabled={!input.trim() || isUploading}
          loading={mutation.isPending}
          className="min-w-20 cursor-pointer"
        >
          Gönder
        </LoadingButton>
      </div>
    </div>
  );
}

interface AddAttachmentsButtonProps {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

// media dosya yükleme butonu bileşeni
function AddAttachmentsButton({
  onFilesSelected,
  disabled,
}: AddAttachmentsButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-primary hover:text-primary"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon size={20} />
      </Button>

      <input
        type="file"
        accept="image/*, video/*"
        multiple
        ref={fileInputRef}
        className="sr-only hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) {
            onFilesSelected(files);
            e.target.value = "";
          }
        }}
      />
    </>
  );
}

interface AttachmentPreviewsProps {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}

// media dosya önizleme bileşeni
function AttachmentPreviews({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemoveClick={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  );
}

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemoveClick: () => void;
}

// Tek bir dosya önizleme bileşeni
function AttachmentPreview({
  attachment: { file, mediaId, isUploading },
  onRemoveClick,
}: AttachmentPreviewProps) {
  const src = URL.createObjectURL(file);

  return (
    <div
      className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
    >
      {file.type.startsWith("image") ? (
        <Image
          src={src}
          alt="attachment preview"
          width={500}
          height={500}
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      ) : (
        <video controls className="size max-h[30rem] rounded-2xl">
          <source src={src} type={file.type} />
        </video>
      )}

      {!isUploading && (
        <button
          onClick={onRemoveClick}
          className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
