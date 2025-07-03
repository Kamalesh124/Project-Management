/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CaretDownIcon,
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { fetchProjects, searchProjects } from "@/redux/Project/Project.Action";
import { useLocation, useNavigate } from "react-router-dom";
import { tags } from "./filterData";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterSheet from "./FilterSheet";

const ProjectList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const [keyword, setKeyword] = useState("");

  const projects = useSelector((store) => store.project.projects);
  const searchProjectsList = useSelector((store) => store.project.searchProjects);
  const jwt = useSelector((store) => store.auth.jwt);

  useEffect(() => {
    dispatch(fetchProjects({ category, tag }));
  }, [category, tag, jwt]);

  const handleFilterChange = (section, value) => {
    if (value === "all") {
      searchParams.delete(section);
    } else {
      searchParams.set(section, value);
    }
    const query = searchParams.toString();
    navigate({ search: query ? `?${query}` : "" });
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    if (e.target.value) {
      dispatch(searchProjects(e.target.value));
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#0f0f1b] via-[#1a1a2e] to-[#121212] px-5 lg:px-0 lg:flex gap-5 justify-center py-10 text-white">
      <section className="hidden lg:block">
        <Card className="p-5 sticky top-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-md text-white">
          <div className="flex justify-between lg:w-[20rem]">
            <p className="text-xl tracking-wider">filters</p>
            <Button variant="ghost" size="icon">
              <MixerHorizontalIcon />
            </Button>
          </div>

          <CardContent className="mt-5">
            <ScrollArea className="space-y-7 h-[70vh]">
              <div>
                <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                <div className="pt-5">
                  <RadioGroup
                    onValueChange={(value) => handleFilterChange("category", value)}
                    className="space-y-3"
                    defaultValue={category || "all"}
                  >
                    {["all", "fullstack", "frontend", "backend"].map((cat, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={cat} id={`cat-${cat}`} />
                        <Label htmlFor={`cat-${cat}`}>{cat}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className="pt-9">
                <h1 className="pb-3 text-gray-400 border-b">Tags</h1>
                <RadioGroup
                  onValueChange={(value) => handleFilterChange("tag", value)}
                  className="space-y-3 pt-5"
                  defaultValue={tag || "all"}
                >
                  {tags.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <RadioGroupItem value={item} id={`r-${item}`} />
                      <Label htmlFor={`r-${item}`}>{item}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>

      <section className="w-full lg:w-[48rem]">
        <div className="flex gap-2 items-center pb-5 justify-between">
          <div className="relative p-0 w-full">
            <Input
              className="w-[40%] rounded-full px-9 bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-1 focus:ring-cyan-500"
              placeholder="search project..."
              onChange={handleSearchChange}
            />
            <MagnifyingGlassIcon className="absolute top-3 left-4 text-gray-400" />
          </div>

          <Sheet className="lg:hidden">
            <SheetTrigger>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <FilterSheet />
            </SheetContent>
          </Sheet>
        </div>

        <div>
          <div className="space-y-5 min-h-[74vh]">
            {(keyword ? searchProjectsList : projects).map((item) => (
              <ProjectCard item={item} key={item.id} />
            ))}
          </div>

          {projects.length > 0 ? (
            <div>{/* Optional pagination */}</div>
          ) : (
            <div className="flex items-center justify-center h-[80vh]">
              <h1 className="text-gray-400">No projects...</h1>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectList;
