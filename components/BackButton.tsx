"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {ButtonHTMLAttributes} from "react"
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";

type Props = {
    title: string;
    className?: string;
    variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary" | null | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function BackButton({title, className, variant, ...props}: Props) {
    const router = useRouter();
    return (
        <Button variant={variant} className={cn("w-fit", className)} onClick={() => router.back()} {...props}>
            <ArrowLeftIcon className="size-4" />
            {title}
        </Button>
    )
}

