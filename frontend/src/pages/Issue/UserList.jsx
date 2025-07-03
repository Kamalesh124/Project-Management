/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assignedUserToIssue } from "@/redux/Issue/Issue.action";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const UserList = ({ issueDetails }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project, auth, issue } = useSelector((store) => store);

  const handleIssueAssigne = (userId) => {
    dispatch(
      assignedUserToIssue({
        userId,
        issueId: issueDetails.id,
      })
    );
  };

  return (
    <Fragment>
      {!issue.loading ? (
        <div className="space-y-2 bg-blue-100/60 p-3 rounded-lg shadow-md border border-blue-200">
          {/* Currently Assigned */}
          <div className="rounded-md bg-blue-200 px-3 py-2 text-blue-900 font-medium">
            {issueDetails.assignee?.fullName || "Unassigned"}
          </div>

          {/* Team List */}
          {project.projectDetails?.team.map((item) => (
            <div
              onClick={() => handleIssueAssigne(item.id)}
              key={item.id}
              className="py-2 px-4 flex items-center space-x-4 rounded-md border border-blue-300 hover:bg-blue-200 cursor-pointer transition-colors duration-150"
            >
              <Avatar>
                <AvatarFallback className="bg-blue-500 text-white">
                  {item.fullName[0]}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-blue-900">{item.fullName}</p>
                <p className="text-xs text-blue-700 opacity-80">
                  @{item.fullName?.toLowerCase().replace(/\s+/g, "_")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-2 space-y-2">
          <Skeleton className="h-[2rem] rounded-md bg-blue-100" />
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[2.5rem] rounded-md bg-blue-100" />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default UserList;
