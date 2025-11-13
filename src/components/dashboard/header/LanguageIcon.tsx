import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

// Flags URLs (you can replace with your own assets if needed)
const flags: Record<string, string> = {
  English: "https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/gb.svg",
  Thai: "https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/th.svg",
  Arabic: "https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/sa.svg",
};

export default function LanguageIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    closeDropdown();
    console.log("Language changed to:", language);
  };

  return (
    <div className="relative">
      {/* Button */}
      <button
        className="flex items-center justify-center gap-2 px-3 py-2 text-gray-700 transition-colors bg-white border border-gray-200 rounded-full hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
        onClick={toggleDropdown}
      >
        <img
          src={flags[currentLanguage]}
          alt={currentLanguage}
          className="w-5 h-5 rounded-full"
        />
        <span className="font-medium">{currentLanguage}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-2 w-48 flex-col rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900"
      >
        {Object.keys(flags).map((lang) => (
          <DropdownItem
            key={lang}
            onItemClick={() => handleLanguageChange(lang)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <img src={flags[lang]} alt={lang} className="w-5 h-5 rounded-full" />
            <span className={`${currentLanguage === lang ? "font-semibold text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}>
              {lang}
            </span>
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
}
