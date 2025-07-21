import type React from "react";

interface buttonProp {
  children: React.ReactNode;
}

const Button = ({ children }: buttonProp) => {
  return (
    <>
      <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition">
        {children}
      </button>
    </>
  );
};

export default Button;
