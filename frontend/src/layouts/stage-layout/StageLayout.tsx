import type { ReactNode } from "react";
import useStageScale from "../../hooks/useStageScale";

type StageLayoutProps = {
  children: ReactNode;
};

export default function StageLayout({ children }: StageLayoutProps) {
  useStageScale();

  return (
    <div className="stage-wrap">
      <main className="stage">{children}</main>
    </div>
  );
}
