const Loading = () => {
  return (
    <section
      className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/70 z-10"
      data-testid="loading-spinner"
    >
      <span
        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-white"
        data-testid="loading-spinner-icon"
      ></span>
    </section>
  );
};

export default Loading;
