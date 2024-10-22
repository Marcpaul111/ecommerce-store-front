import { Banner as BannerType } from "@/types"

interface BannerProps{
    data: BannerType
}

const Banner: React.FC<BannerProps> = ({data}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
        <div className="rounded-xl lg:p-8 aspect-square md:aspect-[2.4/1] lg:aspect-[3.5/1] overflow-hidden bg-cover" 
        style={{backgroundImage: `url(${data.imageUrl})`, backgroundSize: ""}}
        >
            <div className="h-full flex flex-col justify-center items-center text-center gap-y-8">
                <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xs">
                    {data.label}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner