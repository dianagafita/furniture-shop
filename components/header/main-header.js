"use client";

import { AlignJustify } from "lucide-react";
import { useState, useEffect } from "react";
import MobileHeader from "./mobile-header";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "./search/search-bar";
import Link from "next/link";

export default function MainHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
    setOpenSearch(false);
  };

  const handleOpenSearch = () => {
    setOpenSearch((prev) => !prev);
  };

  const slideDownAnimation = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  const slideLeftAnimation = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "auto" },
    exit: { opacity: 0, width: 0 },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`z-[100] fixed top-0 w-full flex flex-col text-white transition-colors duration-100 ${
        isScrolled || openMenu ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center cursor-pointer">
          <AlignJustify strokeWidth={0.6} onClick={handleOpenMenu} />
          <Link href="/" className="mx-5 mt-[2px] main_font">
            MOBILA
          </Link>
        </div>

        <div className="flex items-center">
          <button className="second_font flex py-1" onClick={handleOpenSearch}>
            Cauta
          </button>{" "}
          <AnimatePresence>
            {openSearch && (
              <motion.div
                className="overflow-hidden"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideLeftAnimation}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <SearchBar />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideDownAnimation}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <MobileHeader handleOpenMenu={handleOpenMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
