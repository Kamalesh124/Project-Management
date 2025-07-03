"use client"

/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import UserList from "./UserList"
import { useDispatch } from "react-redux"
import { deleteIssue, updateIssueStatus } from "@/redux/Issue/Issue.action"
import { useNavigate, useParams } from "react-router-dom"

const IssueCard = ({ item }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const handleDelete = () => {
    dispatch(deleteIssue(item.id))
  }

  const handleStatusChange = (newStatus) => {
    dispatch(updateIssueStatus({ id: item.id, status: newStatus }))
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        label: "To Do",
        className: "bg-slate-100 text-slate-700 border-slate-200",
      },
      in_progress: {
        label: "In Progress",
        className: "bg-blue-100 text-blue-700 border-blue-200",
      },
      done: {
        label: "Done",
        className: "bg-emerald-100 text-emerald-700 border-emerald-200",
      },
    }

    const config = statusConfig[status] || statusConfig.pending
    return <Badge className={`${config.className} text-xs font-medium border`}>{config.label}</Badge>
  }

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50 rounded-xl">
      {/* Blue accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

      <CardHeader className="pb-3 pt-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle
              className="cursor-pointer hover:text-blue-600 transition-colors duration-200 text-base font-semibold text-gray-800 line-clamp-2 leading-tight mb-2"
              onClick={() => navigate(`/project/${id}/issue/${item.id}`)}
              title={item.title}
            >
              {item.title}
            </CardTitle>

            <div className="flex items-center justify-between">
              {getStatusBadge(item.status)}
              {/* Made issue ID more subtle and smaller */}
              <span className="text-xs text-blue-400 font-mono opacity-60">#{item.id || 1}</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full h-8 w-8 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 opacity-0 group-hover:opacity-100 transition-all duration-200"
                variant="ghost"
                size="icon"
              >
                <DotsVerticalIcon className="h-4 w-4 text-blue-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleStatusChange("pending")} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                  To Do
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("in_progress")} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  In Progress
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("done")} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  Done
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-gray-700">Edit</DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-blue-600 font-medium">Assignee</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="relative bg-white/80 backdrop-blur-md border border-white/40 hover:bg-white/90 hover:border-white/50 rounded-full h-9 w-9 p-0 transition-all duration-300 shadow-lg hover:shadow-xl"
                variant="outline"
                size="icon"
              >
                {/* Clean glass effect overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 to-white/20"></div>

                <Avatar className="h-7 w-7 relative z-10">
                  <AvatarFallback className="bg-transparent text-slate-700 text-sm font-bold">
                    {item.assignee?.fullName ? (
                      item.assignee.fullName[0].toUpperCase()
                    ) : (
                      <PersonIcon className="h-4 w-4 text-slate-600" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white/95 backdrop-blur-md border border-white/20">
              <UserList issueDetails={item} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

export default IssueCard
