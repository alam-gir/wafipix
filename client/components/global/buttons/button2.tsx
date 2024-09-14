'use client'

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { FC, useRef } from "react";


const buttonVariants = cva(
    "inline-flex items-center justify-center gap-4 whitespace-nowrap text-base font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:ring-8 duration-100 transition-all",
    {
      variants: {
          variant: {
              default: "bg-accent3 text-primary-foreground hover:bg-accent3/90 hover:ring-accent3/20",
              destructive:
              "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:ring-destructive/20",
              accent:
              "bg-accent2 text-destructive-foreground hover:bg-accent2/90 hover:ring-accent2/20",
              outline:
              "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:ring-primary/20",
              secondary:
              "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:drop-shadow-sm hover:ring-secondary/20",
              ghost: "hover:bg-accent hover:text-accent-foreground hover:ring-accent/20",
              link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-10 rounded-md px-3",
                lg: "h-14 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

interface Button2Props extends React.ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof buttonVariants> {
    title?: string
    ring?: boolean
    icon?: React.ReactNode
    iconPosition?: "left" | "right" | "middle"
    href?:string
    hideText?: "mobile" | "mobile-tablet" | "tablet" | "tablet-desktop" | "desktop"
    isLoading?: boolean
    loadingText?: string
}

const Button2 : FC<Button2Props> = ({isLoading,loadingText="Loading..." ,hideText , title, variant, ring = true, size,className, icon, iconPosition ="right", href, ...props}) => {
    const LinkRef = useRef<any>(null)

    const leftIcon = iconPosition === "left" && icon ? icon : null
    const rightIcon = iconPosition === "right" && icon ? icon : null
    const onlyIcon = !title && !iconPosition && icon ? icon : null

    const clickHandle = (e: any) => {
        if(LinkRef?.current) LinkRef.current.click()
        props.onClick && props.onClick(e)
    }

    const buttonContent = <>{leftIcon ? <span>{leftIcon}</span> : null}
    {title ? <span className={cn({
        "hidden sm:inline": hideText === "mobile",
        "hidden md:inline": hideText === "mobile-tablet",
        "hidden lg:inline": hideText === "tablet",
        "hidden xl:inline": hideText === "tablet-desktop",
        "hidden 2xl:inline": hideText === "desktop",
    })}> {title}</span> : null}
    {rightIcon ? <span>{rightIcon}</span> : null}
    {onlyIcon ? onlyIcon : null}
    {href ? <Link ref={LinkRef} href={href} /> : null}
    </>

    return <button {...props} onClick={clickHandle} className={cn(buttonVariants({variant,size, className}))}> 
        {isLoading ? loadingText : buttonContent}   
    </button>
}


export default Button2