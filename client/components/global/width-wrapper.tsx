import { FC } from "react"

interface WidthWrapperProps {
    children: React.ReactNode;
}

const WidthWrapper : FC<WidthWrapperProps> = ({children}) => {
    return <div className="w-full max-w-screen-2xl h-full mx-auto px-4 md:px-8">{children}</div>
} 

export default WidthWrapper