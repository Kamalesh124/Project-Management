import { useEffect } from "react";
import Auth from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/Auth/Action";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import ProjectDetails from "./pages/Project/ProjectDetails";
import IssueDetails from "./pages/Issue/IssueDetails";
import UpdateProjectForm from "./pages/Project/UpdateProjectForm";
import Loader from "./pages/Loader/Loader";
import AcceptInvitation from "./pages/Project/AcceptInvitation";
import Subscription from "./pages/subscription/Subscription";
import UpgradeSuccess from "./pages/subscription/UpgradeSuccess";
import { getUserSubscription } from "./redux/Subscription/Action";


// ✅ Add this import
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  


  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
    dispatch(getUserSubscription(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);

  return (
    <>
      {/* ✅ Global Toast Provider */}
      <Toaster position="top-right" reverseOrder={false} />

      {auth.loading ? (
        <Loader />
      ) : auth.user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project/update/:id" element={<UpdateProjectForm />} />
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            />
            <Route path="/accept_invitation" element={<AcceptInvitation />} />
            <Route path="/upgrade_plan" element={<Subscription />} />
            <Route path="/upgrade_plan/success" element={<UpgradeSuccess />} />
          </Routes>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
