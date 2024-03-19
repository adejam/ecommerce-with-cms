import { Loader2 } from "lucide-react"
import React from "react"
import { Button, ButtonProps } from "./button"

interface Props extends ButtonProps {
  isLoading: boolean
}

const LoadingButton = ({ isLoading, children, ...props }: Props) => (
  <Button {...props}>
    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    {children}
  </Button>
)

export default LoadingButton
