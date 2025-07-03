"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormMessage
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { array, object, string } from "zod"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useDispatch, useSelector } from "react-redux"
import { createProject, fetchProjects } from "@/redux/Project/Project.Action"
import { useState } from "react"
import { GET_USER_SUCCESS } from "@/redux/Auth/ActionTypes"

const tags = [
  "react", "nextjs", "spring boot", "mysql",
  "mongodb", "angular", "python", "flask", "django"
]

const formSchema = object({
  name:        string().min(1, "Project name is required").max(50),
  description: string().min(1, "Description is required").max(200),
  category:    string().min(1, "Category is required"),
  tags:        array(string()).min(1, "At least one tag is required"),
})

const CreateProjectForm = ({ onClose }) => {
  const dispatch = useDispatch()
  const { auth, subscription } = useSelector(s => s)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "fullstack",
      tags: ["react"],
    },
  })

  const handleTagsChange = (value) => {
    const current = form.getValues("tags")
    const updated = current.includes(value)
      ? current.filter(t => t !== value)
      : [...current, value]
    form.setValue("tags", updated)
  }

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      setError(null)

      if (
        subscription.userSubscription?.planType === "FREE" &&
        auth.user?.projectSize >= 3
      ) {
        setError("Free plan limit (3 projects) reached")
        setIsLoading(false)
        return
      }

      await dispatch(createProject(data))

      dispatch({
        type: GET_USER_SUCCESS,
        payload: {
          ...auth.user,
          projectSize: auth.user.projectSize + 1
        }
      })

      form.reset({
        name: "",
        description: "",
        category: "fullstack",
        tags: ["react"],
      })

      dispatch(fetchProjects({ category: null, tag: null }))

      if (onClose) onClose()
    } catch (err) {
      console.error("Error creating project:", err)
      const msg = err.response?.data?.message || err.message || "Failed to create project"
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const isFreeLimitReached =
    subscription.userSubscription?.planType === "FREE" &&
    auth.user?.projectSize >= 3

  return (
    <div className="p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Name */}
          <FormField name="name" control={form.control} render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="project name..."
                  className="text-gray-900 bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          {/* Description */}
          <FormField name="description" control={form.control} render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="project description"
                  className="text-gray-900 bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          {/* Category */}
          <FormField name="category" control={form.control} render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="text-gray-900 bg-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="fullstack">Full Stack</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          {/* Tags */}
          <FormField name="tags" control={form.control} render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={handleTagsChange}>
                  <SelectTrigger className="text-gray-900 bg-white">
                    <SelectValue placeholder="Add tags..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {tags.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FormControl>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map(tag => (
                  <div
                    key={tag}
                    onClick={() => handleTagsChange(tag)}
                    className="flex items-center bg-gray-100 text-gray-900 px-3 py-1 rounded-full cursor-pointer"
                  >
                    {tag}<Cross1Icon className="ml-1 h-3 w-3" />
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}/>

          {/* Submit or Limit Message */}
          {isFreeLimitReached ? (
            <div className="py-3 text-red-600 font-medium">
              You can create only 3 projects with free plan, please upgrade.
            </div>
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}

export default CreateProjectForm
