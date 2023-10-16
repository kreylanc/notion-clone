import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./UserItem";
const Navigation = () => {
  const pathname = usePathname();

  // mediaQuery hook to check user's viewport
  const isMobile = useMediaQuery("(max-width: 768px)");
  // ref for resizing the sidebar
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  // useStates for navbar resizing and collapsing
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile); // always true if mobile user

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  // ========== Event Handlers =============
  // on mouse down add eventlistener
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove); //when user moves mouse
    document.addEventListener("mouseup", handleMouseUp); // when user releases mouse click
  };

  // resizing the sidebar when mouse is moved
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = e.clientX;

    // min and max constraints for sidebar width
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`; // set new width of the sidebar
      // resize the navbar left position and width accordingly
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  // stop resizing the sidebar when mouse click is released
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // to reset sidebar back to original width on clicking the resizable bar
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px)"
      );

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  // collapse the sidebar on buton click
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  };
  return (
    <>
      <aside
        ref={sidebarRef}
        aria-label="sidebar menu"
        className={cn(
          "relative flex w-60 flex-col h-full bg-secondary group/sidebar overflow-y-auto z-[999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft />
        </div>
        <div>
          <UserItem />
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute left-60 top-0 w-[calc(100%-240px)] z-[9999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-full left-0"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed ? (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="text-muted-foreground"
            />
          ) : null}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
