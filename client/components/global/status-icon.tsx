
export const StatusIcon = (status: boolean) => {
    if(status)
      return <div className="h-4 w-4 bg-green-500 rounded-full" />
    else
      return <div className="h-4 w-4 bg-red-500 rounded-full" />
  }