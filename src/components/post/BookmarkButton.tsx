import { BookmarkInfo } from "@/lib/types";
import { useToast } from "../ui/use-toast";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { Bookmark, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  postId: string;
  initialState: BookmarkInfo;
}

export default function BookmarkButton({ postId, initialState }: LikeButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["bookmark-info", postId];

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/posts/${postId}/bookmark`).json<BookmarkInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isBookmarksByUser
        ? kyInstance.delete(`/api/posts/${postId}/bookmark`)
        : kyInstance.post(`/api/posts/${postId}/bookmark`),
    
    onMutate: async () => {

      toast({
        description: `Gönderi ${data.isBookmarksByUser ? "kaydedildi" : "kaldırıldı"}`
      })
        
        await queryClient.cancelQueries({ queryKey });

        const previousState = queryClient.getQueryData<BookmarkInfo>(queryKey);
  
        queryClient.setQueryData<BookmarkInfo>(queryKey, () => ({
          isBookmarksByUser: !previousState?.isBookmarksByUser,
        }));
  
        return { previousState };
      },

      onError(error, variables, context) {
        queryClient.setQueryData(queryKey, context?.previousState);
        console.error(error);
        toast({
          variant: "destructive",
          description: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin.",
        });
      },
  });

  return (
    <button onClick={()=> mutate()} className="flex items-center gap-2" >

        <Bookmark className={cn("size-5", data.isBookmarksByUser && "fill-primary text-prfill-primary ")} />
    </button>
  );
}
