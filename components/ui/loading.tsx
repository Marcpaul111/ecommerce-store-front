

import getStoreBanners from "@/actions/get-store-banners"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export const Loading = async () => {
    const storeData = await getStoreBanners()

    const storeLogo = storeData[0]?.store.logoUrl;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <Card className="w-[300px]">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="relative w-16 h-16 mb-4">
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="border rounded-full p-2"><Image height={30} width={30} alt=""  src={storeLogo}/></span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Loading, please wait...</p>
        </CardContent>
      </Card>
    </div>
  )
}