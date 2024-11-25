import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { logoutUser } from "@/features/authSlice";
import { AppDispatch, RootState } from "@/store/store";

const dropdownLinks = [
  {id: 1, name: 'Add Blog', href: '#' },
  {id: 2, name: 'My Blogs', href: '#' },
]

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user); // Get user from the store

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()); // Backend isteği gönder ve Redux'u güncelle
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-stone-400 flex items-center justify-between px-4 sm:px-12 md:px-16 lg:px-28 xl:px-36 2xl:px-52 py-2 sm:py-4">
      <Link to="/">
        <h1 className="text-2xl font-bold text-stone-700">Blog</h1>
      </Link>

      {/* Desktop navbar */}
      <div id="desktop-navbar" className="hidden md:flex items-center gap-4 justify-between ">
        { user ? (
          <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="bg-stone-600 h-9 w-9 rounded-full text-white text-2xl flex items-center justify-center">{user?.username.charAt(0).toUpperCase()}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
              {dropdownLinks.map((link) => (
                <DropdownMenuItem key={link.id} 
                  className="cursor-pointer">
                    {link.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => {handleLogout()}}>
                  Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </>
          ) : (
          <>
            <Link to="/login">
              <Button className="bg-stone-600 hover:bg-stone-700 text-white border border-stone-600">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-slate-100 hover:bg-slate-200 text-black border border-transparent">Sign Up</Button>
            </Link>
          </>
        )}
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
            { user ? (
              <>
                <p className="text-xl font-semibold">{user?.username}</p>
                <ul className="flex flex-col items-center gap-3 w-full">
                  {dropdownLinks.map((link) => (
                    <li key={link.id} 
                      className="cursor-pointer w-full">
                        <SheetClose className="font-semibold text-sm shadow-md w-full px-4 py-2 rounded-md text-center bg-slate-100 text-black">
                          {link.name}
                        </SheetClose>
                    </li>
                  ))}
                </ul>
                <SheetClose onClick={() => {handleLogout()}} className="font-semibold text-sm shadow-md w-full px-4 py-2 rounded-md text-center bg-stone-600 text-white">
                  Log out
                </SheetClose>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className="w-full bg-stone-600 hover:bg-stone-700 text-white border border-stone-600">Log in</Button>
                </Link>
                <Link to="/signup" className="font-semibold text-sm shadow-md w-full px-4 py-2 rounded-md text-center bg-slate-100">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
