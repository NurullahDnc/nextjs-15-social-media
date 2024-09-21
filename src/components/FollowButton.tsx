"use client";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import useFolloweInfo from "@/hooks/useFolloweInfo";
import kyInstance from "@/lib/ky";
import { Button } from "./ui/button";
import { FollowerInfo } from "@/lib/types";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { data } = useFolloweInfo(userId, initialState);

  const queryKey: QueryKey = ["follower-info", userId];

  const { mutate } = useMutation({
    //mutationFn, mutasyon işlemi sırasında çalışacak asenkron fonksiyonu tanımlar.
    mutationFn: () =>
      data.isFollowedByUser //Takip durumuna gore ekle veya sil
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),

    //onMutate, mutasyon öncesi mevcut durumu iptal eder ve optimistik güncelleme yapar.
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
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
    <Button
      variant={data.isFollowedByUser ? "secondary" : "default"}
      onClick={() => mutate()}
    >
      {data.isFollowedByUser ? "Cıkar" : "Takip et"}
    </Button>
  );
}
