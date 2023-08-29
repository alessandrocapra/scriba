import { ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
};

export default function Heading({ children }: HeadingProps) {
  return <h1 className="font-bold text-6xl">{children}</h1>;
}
