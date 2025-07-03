import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { inviteToProject } from "@/redux/Project/Project.Action";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const InviteUserForm = ({ projectId }) => {
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, projectId };
      await dispatch(inviteToProject(payload));
      toast.success("Invitation sent successfully!");
      form.reset(); // Clear the form after success
    } catch (error) {
      toast.error("Failed to send invitation.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Enter user email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-slate-400 py-5">
            SEND INVITATION
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InviteUserForm;
