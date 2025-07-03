"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PersonIcon, PlusIcon, RocketIcon, ExitIcon } from "@radix-ui/react-icons"
import { useDispatch, useSelector } from "react-redux"
import CreateProjectForm from "../Project/CreateProjectForm"
import { logout } from "@/redux/Auth/Action"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { auth } = useSelector((store) => store)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        {/* Left Section - Brand & Navigation */}
        <div className="flex items-center gap-6">
          {/* Brand/Logo */}
          <div onClick={() => navigate("/")} className="cursor-pointer flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-sm group-hover:shadow-md transition-all duration-300">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              Project Management
            </h1>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200 font-medium text-gray-700 border-gray-300 bg-white"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg bg-white border border-gray-200 shadow-xl">
                <DialogHeader className="pb-4 border-b border-gray-100">
                  <DialogTitle className="text-xl font-semibold text-gray-900">Create New Project</DialogTitle>
                </DialogHeader>
                <div className="pt-4">
                  <CreateProjectForm onClose={() => {}} />
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => navigate("/upgrade_plan")}
              variant="outline"
              className="hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 transition-all duration-200 font-medium text-gray-700 border-gray-300 bg-white"
            >
              <RocketIcon className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
          </div>
        </div>

        {/* Right Section - User Profile */}
        <div className="flex items-center gap-4">
          {/* User Name - Hidden on mobile */}
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-gray-600">
              Welcome back,{" "}
              <span className="font-semibold text-gray-900">{auth.user?.fullName?.split(" ")[0] || "User"}</span>
            </p>
          </div>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:bg-gray-100 transition-all duration-200"
              >
                <Avatar className="h-9 w-9 border border-gray-200 shadow-sm">
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-sm">
                    {auth.user?.fullName ? (
                      auth.user.fullName
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    ) : (
                      <PersonIcon className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{auth.user?.fullName}</p>
                <p className="text-xs text-gray-500">{auth.user?.email}</p>
              </div>

              {/* Mobile Navigation Items */}
              <div className="md:hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="cursor-pointer text-gray-700 hover:bg-gray-50"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      New Project
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg bg-white border border-gray-200 shadow-xl">
                    <DialogHeader className="pb-4 border-b border-gray-100">
                      <DialogTitle className="text-xl font-semibold text-gray-900">Create New Project</DialogTitle>
                    </DialogHeader>
                    <div className="pt-4">
                      <CreateProjectForm onClose={() => {}} />
                    </div>
                  </DialogContent>
                </Dialog>

                <DropdownMenuItem
                  onClick={() => navigate("/upgrade_plan")}
                  className="cursor-pointer text-gray-700 hover:bg-gray-50"
                >
                  <RocketIcon className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700 focus:bg-red-50"
              >
                <ExitIcon className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
