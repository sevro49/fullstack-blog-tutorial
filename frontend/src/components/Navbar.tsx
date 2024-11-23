import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Icon } from '@iconify/react';

const Navbar = () => {
  return (
    <nav className="bg-stone-400 flex items-center justify-between px-4 sm:px-12 md:px-16 lg:px-28 xl:px-36 2xl:px-52 py-2 sm:py-4">
      <Link to="/">
        <h1 className="text-2xl font-bold text-stone-700">Blog</h1>
      </Link>

      {/* Desktop navbar */}
      <div id="desktop-navbar" className="hidden md:flex items-center gap-4 justify-between ">
        <Button className="bg-stone-600 hover:bg-stone-700 text-white border border-stone-600">Login</Button>
        <Button className="bg-slate-100 hover:bg-slate-200 text-black border border-transparent">Register</Button>
      </div>

      {/* Mobile navbar */}
      <Sheet>
        <SheetTrigger className="inline-block md:hidden group hover:bg-stone-600 rounded-sm p-1">
          <Icon icon="material-symbols:menu" className="text-2xl group-hover:text-white"/>
        </SheetTrigger>
        <SheetContent id="mobile-navbar">
          <VisuallyHidden>
            <SheetTitle>Mobile navigation menu</SheetTitle>
            <SheetDescription></SheetDescription>
          </VisuallyHidden>
          <div className="mt-20 flex flex-col gap-4 px-6">
            <Button className=" bg-stone-600 hover:bg-stone-700 text-white border border-stone-600">Login</Button>
            <Button className="bg-slate-100 hover:bg-slate-200 text-black border border-transparent">Register</Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
