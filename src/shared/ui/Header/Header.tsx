"use client";

import { useCallback, useState } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Modal } from "../Modal";

const colorVariants = {
  primary: {
    backgroundColor: "bg-[#212121]",
    padding: "py-5 px-5",
  },
  secondary: {
    backgroundColor: "bg-[#746A64]",
    padding: "py-4 px-4",
  },
};
interface HeaderProps {
  title?: string;
  defaultBackgroundColor?: keyof typeof colorVariants;
  goBackButton?: boolean;
}

const Header = ({
  title = "Pop Movies",
  defaultBackgroundColor = "primary",
  goBackButton = true,
}: HeaderProps) => {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();

  const backgroundColor = colorVariants[defaultBackgroundColor].backgroundColor;
  const padding = colorVariants[defaultBackgroundColor].padding;

  const isPrimary = defaultBackgroundColor === "primary";

  const isNotMainPage = pathname.startsWith("/movies");

  const onModalOpen = useCallback(() => {
    setShowModal(true);
  }, []);

  const onModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <header
      className={`w-full ${padding} text-white flex flex-row items-center ${backgroundColor} justify-between`}
    >
      <div className={`w-full flex flex-row items-center gap-3.75`}>
        {goBackButton && isNotMainPage && (
          <Link href={"/"}>
            <Image
              src="/arrow.png"
              alt="Go back button"
              width={14}
              height={14}
              priority
              className="cursor-pointer hover:opacity-75"
            />
          </Link>
        )}
        <h1
          className="text-xl font-bold leading-6"
          data-testid={`header-title-${defaultBackgroundColor}`}
        >
          {isNotMainPage ? title : "Movie Details"}
        </h1>
      </div>

      {isPrimary && (
        <Image
          src="/moreVertical.svg"
          alt="More vertical button"
          width={28}
          height={28}
          priority
          onClick={onModalOpen}
          className="cursor-pointer hover:opacity-75"
        />
      )}

      {showModal && <Modal onClose={onModalClose}>Modal Content</Modal>}
    </header>
  );
};

export default Header;
