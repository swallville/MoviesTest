interface VideoPlayerProps {
  selectedVideo: string;
  onCloseVideo: () => void;
}

export const VideoPlayer = ({
  selectedVideo,
  onCloseVideo,
}: VideoPlayerProps) => {
  return (
    <section className="fixed top-0 w-screen h-screen z-1000 bg-black">
      <button
        onClick={onCloseVideo}
        className="absolute top-6 right-6 z-1100 bg-[rgba(0,0,0,0.7)] text-white border-none rounded-[50%] w-10 h-10 text-2xl cursor-pointer"
        aria-label="Close video"
        type="button"
      >
        X
      </button>

      <iframe
        className="w-screen h-screen bg-black"
        title="Youtube player"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        src={`https://youtube.com/embed/${selectedVideo}?autoplay=0`}
      ></iframe>
    </section>
  );
};
