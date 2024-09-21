import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { deletePost } from "./actions";
import { PostsPage } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";

export function useDeletePostMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: deletePost, // Silme işlemi için kullanılacak fonksiyon

    // Silme işlemi başarılı olduğunda çalışacak olan onSuccess fonksiyonu
    onSuccess: async (deletePost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed"] };  // Post feed'i temsil eden query filtreleri

      await queryClient.cancelQueries(queryFilter);   // Eski sorguları iptal ediyoruz

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((p) => p.id !== deletePost.id),  // Silinen gönderiyi post listesinden filtrele
            })),
          };
        },
      );

      toast({
        description: "Gönderi başarıyla silindi",
      });

      if (pathname === `/posts/${deletePost.id}`) {
        router.push(`/users/${deletePost.user.username}`);
      }
    },

    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Gönderi silinmedi. Lütfen tekrar deneyin.",
      });
    },
  });
  return mutation
}
