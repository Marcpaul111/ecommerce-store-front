import { Banner as BannerType } from "@/types";
import { Separator } from "./ui/separator";

interface BannerProps {
  data: BannerType | null;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
        <div
          className="rounded-xl lg:p-8 aspect-square md:aspect-[2.4/1] lg:aspect-[3.5/1] overflow-hidden bg-cover"
          style={{
            backgroundImage: `url(${data?.imageUrl})`,
            backgroundSize: "",
          }}
        ></div>
      </div>
      <div className="relative flex items-center justify-center my-10">
        <Separator className="absolute top-1/2 w-full transform -translate-y-1/2 text-lg bg-gray-900" />
        <h3 className="relative z-10 font-bold text-3xl bg-white text-center px-10">
          {data?.label}
        </h3>
      </div>
    </>
  );
};

export default Banner;
