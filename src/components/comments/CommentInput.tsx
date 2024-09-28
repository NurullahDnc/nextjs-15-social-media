import { PostData } from "@/lib/types";
import { useSubmitCommentMutation } from "./mutations";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, SendHorizonal } from "lucide-react";

interface CommentInputProps {
  post: PostData;
}

export default function CommentInput({ post }: CommentInputProps) {
  const [input, setInput] = useState("");
  const mutation = useSubmitCommentMutation(post.id);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input) return;

    mutation.mutate(
      {
        post: post,
        content: input,
      },
      {
        onSuccess: () => {
          setInput("");
        },
      },
    );
  }

  return (
    <form className="flex w-full items-center gap-2" onClick={onSubmit}>
      <Input
        placeholder="Yorum Yap"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />

      <Button
        variant="ghost"
        type="submit"
        size="icon"
        disabled={!input.trim() || mutation.isPending}
      >
        {!mutation.isPending ? (
          <SendHorizonal />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </Button>
    </form>
  );
}
