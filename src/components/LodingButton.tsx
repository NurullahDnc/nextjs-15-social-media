import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";



interface LoadingButtonProps extends ButtonProps{
    loading: boolean;
}

export default function LodingButton({
    loading,
    disabled,
    className,
    ...props
}: LoadingButtonProps){
    return (
        <Button
            className={cn("flex items-center gap-2", className) }
            disabled={disabled || loading}
            {...props}
        >
            {loading &&<Loader2 className="size-5 animate-spin " /> }
            {props.children}
        </Button>
    );
}