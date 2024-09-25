import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";

export interface Attachment {
  file: File;
  mediaId?: string;
  isUploading: boolean;
}

// medya yükleme işlemini yönetir.
export default function useMediaUpload() {
  const { toast } = useToast();

  const [attachments, setAttachments] = useState<Attachment[]>([]); // Yüklenen dosyaların durumu.
  const [uploadProgress, setUploadProgress] = useState<number>(); // Yükleme ilerlemesini tutar.

  // Dosya yükleme işlemlerini başlatan hook.
  const { startUpload, isUploading } = useUploadThing("attachment", {
    onBeforeUploadBegin(file) {
      // Dosyaların isimlerini değiştiriyoruz ve yeni dosyalar oluşturuyoruz.
      const renamedFiles = file.map((file) => {
        const extension = file.name.split(".").pop();

        return new File(
          [file],
          `attachment_${crypto.randomUUID()}.${extension}`,
          {
            type: file.type,
          },
        );
      });

      // Yeni dosyaları yüklenme durumu ile birlikte attachments listesine ekliyoruz.
      setAttachments((prev) => [
        ...prev,
        ...renamedFiles.map((file) => ({ file, isUploading: true })),
      ]);

      return renamedFiles;
    },

    onUploadProgress: setUploadProgress,

    // Yükleme tamamlandığında çalıştırılan fonksiyon.
    onClientUploadComplete(res) {
      // Yüklenen dosya ile sunucudan gelen sonucu eşleştiriyoruz.
      setAttachments((prev) =>
        prev.map((a) => {
          const uploadResult = res.find((r) => r.name === a.file.name);
          if (!uploadResult) return a;
          return {
            ...a, // Mevcut dosya bilgilerini koruyoruz.
            mediaId: uploadResult.serverData.mediaId, // Sunucudan gelen medya ID'sini ekliyoruz.
            isUploading: false,
          };
        }),
      );
    },

    onUploadError(e) {
      // Hata olan dosyaları attachments listesinden çıkarıyoruz.
      setAttachments((prev) => prev.filter((a) => !a.isUploading));

      toast({
        variant: "destructive",
        description: e.message,
      });
    },
  });

  // Yükleme işlemini başlatan fonksiyon.
  function handleStartUpload(files: File[]) {
    if (isUploading) {
      toast({
        variant: "destructive",
        description: "Lütfen önce hazır olan yüklemeleri tamamlayın.",
      });
      return;
    }

    if (attachments.length + files.length > 5) {
      toast({
        variant: "destructive",
        description: "Maksimum 5 adet media yükleyebilirsiniz.",
      });
      return;
    }

    startUpload(files);
  }

  // Bir dosyayı yükleme listesinden kaldıran fonksiyon.
  function removeAttachment(fileName: string) {
    setAttachments((prev) => prev.filter((a) => a.file.name !== fileName));
  }

  // Yükleme sürecini sıfırlayan fonksiyon.
  function reset() {
    setAttachments([]);
    setUploadProgress(undefined);
  }

  // Fonksiyonun geri döndürdüğü değerler ve işlevler.
  return {
    startUpload: handleStartUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset,
  };
}
