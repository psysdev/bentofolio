"use client";

import { LayoutItem } from "@/config/profile";
import HeroWidget from "@/components/widgets/HeroWidget";
import FeedWidget from "@/components/widgets/FeedWidget";
import ProjectCard from "@/components/widgets/ProjectCard";
import StatusWidget from "@/components/widgets/StatusWidget";

interface BentoGridProps {
  layout: LayoutItem[];
}

const widgetMap: Record<string, React.FC<any>> = {
  HeroWidget,
  FeedWidget,
  ProjectCard,
  StatusWidget,
};

export default function BentoGrid({ layout }: BentoGridProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {layout.map((item) => {
          const Widget = widgetMap[item.widget];
          if (!Widget) return null;

          const colSpanClass =
            item.colSpan === 2
              ? "sm:col-span-2 lg:col-span-2"
              : "col-span-1";

          const rowSpanClass =
            item.rowSpan === 2 ? "sm:row-span-2" : "row-span-1";

          return (
            <div key={item.id} className={`${colSpanClass} ${rowSpanClass}`}>
              <Widget id={item.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
