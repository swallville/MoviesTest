import Image from "next/image";

interface VideoCardProps {
  onClick: () => void;
  index: number;
}

export const VideoCard = ({ onClick, index }: VideoCardProps) => {
  return (
    <button
      className="flex flex-row gap-4 h-15 py-4.5 px-4.5 bg-[#FAFAFA] hover:bg-[#DEDEDE] cursor-pointer items-center focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#FAFAFA]"
      onClick={onClick}
      type="button"
      tabIndex={index}
      aria-label={`Play movie trailer ${index + 1}`}
    >
      <Image
        src="/vector.png"
        alt={`Video ${index + 1} button player`}
        width={28}
        height={28}
        priority
      />

      <p className="font-[Roboto] text-sm font-medium leading-6 tracking-[2%] text-[#757575]">
        {`Play trailer ${index + 1}`}
      </p>
    </button>
  );
};
