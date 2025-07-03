import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProject } from "@/redux/Project/Project.Action";

const ProjectCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteProject = () => {
    dispatch(deleteProject({ projectId: item.id }));
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border border-white/10 p-5 w-full lg:max-w-3xl rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3 flex-wrap">
              <h1
                onClick={() => navigate(`/project/${item.id}`)}
                className="cursor-pointer font-semibold text-lg hover:underline text-white"
              >
                {item.name}
              </h1>
              <DotFilledIcon className="text-gray-400" />
              <p className="text-sm text-gray-400 capitalize">{item.category}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" variant="ghost" size="icon">
                  <DotsVerticalIcon className="text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-white/10">
                <DropdownMenuItem
                  onClick={() => navigate(`/project/update/${item.id}`)}
                >
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteProject}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-sm text-gray-400">{item.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-gray-300 border-gray-600">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
