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

//Post Create components
export default function PostEditor() {
  const { user } = useSession();

  const queryClient = useQueryClient();
  const mutation = useSubmitPostMutation();


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
    mutation.mutate(input, {  
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3"
        />
      </div>
      <div className="flex justify-end">
        <LoadingButton
          onClick={onSubmit}
          disabled={!input.trim()}
          loading={mutation.isPending}
          className="min-w-20 cursor-pointer"
        >
          Gönder
        </LoadingButton>
      </div>
    </div>
  );
}
