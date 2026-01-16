import React, { useRef, useCallback } from "react";

import Loading from "#/shared/ui/Loading/Loading";

interface CarrouselProps {
  children: React.ReactNode[] | React.ReactNode;
  loadMore: () => void;
  loading?: boolean;
}

const Carrousel = ({ children, loadMore, loading }: CarrouselProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const childrenArray = React.Children.toArray(children);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new window.IntersectionObserver((entries) => {
        const entry = entries.at(0);
        if (entry && entry.isIntersecting && !loading) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadMore, loading],
  );

  return (
    <div className="relative w-full h-full" data-testid="carrousel">
      <div className={`grid grid-cols-2 gap-0`} data-testid="carrousel-grid">
        {childrenArray.map((child, idx) => {
          if (idx === childrenArray.length - 1) {
            return (
              <div ref={lastItemRef} key={idx} className="w-full h-full">
                {child}
              </div>
            );
          }
          return (
            <div key={idx} className="w-full h-full">
              {child}
            </div>
          );
        })}
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default Carrousel;
