import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { ModeToggle } from "@/components/mode-toggle";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header
      className={`flex ${
        isMobile ? "h-12" : "h-16"
      } shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 font-bold text-xl text-blue-800 dark:text-neutral-200`}
    >
      <div className="flex items-center gap-2 px-2 md:px-4">
        <SidebarTrigger className="-ml-1 w-5 h-5" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className={`${isMobile ? "text-lg" : "text-xl"} font-bold`}>
          {title}
        </h1>
        <ModeToggle/>
      </div>
    </header>
  );
}