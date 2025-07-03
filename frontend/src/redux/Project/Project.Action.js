import * as actionTypes from "./ActionTypes";
import api, { API_BASE_URL } from "@/Api/api";
import { GET_USER_SUCCESS } from "@/redux/Auth/ActionTypes";

// Invite to Project
export const inviteToProject = ({ email, projectId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.INVITE_TO_PROJECT_REQUEST });
    try {
      const { data } = await api.post("/api/projects/invite", { email, projectId });
      dispatch({ type: actionTypes.INVITE_TO_PROJECT_SUCCESS });
    } catch (error) {
      dispatch({ type: actionTypes.INVITE_TO_PROJECT_FAILURE, error: error.message });
    }
  };
};

// Fetch Projects
export const fetchProjects = ({ category, tag }) => {
  const params = {};
  if (category) params.category = category;
  if (tag) params.tag = tag;

  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECTS_REQUEST });
    try {
      const response = await api.get("/api/projects", { params });
      dispatch({
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        projects: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PROJECTS_FAILURE,
        error: error.message,
      });
    }
  };
};

// Search Projects
export const searchProjects = (keyword) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEARCH_PROJECT_REQUEST });
    try {
      const response = await api.get(`/api/projects/search?keyword=${keyword}`);
      dispatch({
        type: actionTypes.SEARCH_PROJECT_SUCCESS,
        projects: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.SEARCH_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// Create Project (with return + optional update)
export const createProject = (projectData) => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });
    try {
      const response = await api.post(`${API_BASE_URL}/api/projects`, projectData);
      const project = response.data;

      dispatch({
        type: actionTypes.CREATE_PROJECT_SUCCESS,
        project,
      });

      // ✅ Update projectSize manually
      const { auth } = getState();
      const currentUser = auth.user;

      dispatch({
        type: GET_USER_SUCCESS,
        payload: {
          ...currentUser,
          projectSize: currentUser.projectSize + 1,
        },
      });

      return project; // allow await in component
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_PROJECT_FAILURE,
        error: error.message,
      });
      throw error;
    }
  };
};

// Update Project
export const updateProject = ({ projectId, updatedData }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_PROJECT_REQUEST });
    try {
      const response = await api.put(`${API_BASE_URL}/api/projects/${projectId}`, updatedData);
      dispatch({
        type: actionTypes.UPDATE_PROJECT_SUCCESS,
        project: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// Fetch Single Project by ID
export const fetchProjectById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECT_BY_Id_REQUEST });
    try {
      const response = await api.get(`/api/projects/${id}`);
      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_Id_SUCCESS,
        projectDetails: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_Id_FAILURE,
        error: error.message,
      });
    }
  };
};

// ✅ Delete Project + Update User projectSize
export const deleteProject = ({ projectId }) => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST });
    try {
      await api.delete(`/api/projects/${projectId}`);
      dispatch({ type: actionTypes.DELETE_PROJECT_SUCCESS, projectId });

      // ✅ update auth.user.projectSize locally
      const { auth } = getState();
      const currentUser = auth.user;

      if (currentUser && currentUser.projectSize > 0) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: {
            ...currentUser,
            projectSize: currentUser.projectSize - 1,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// Accept Invitation
export const acceptInvitation = ({ invitationToken, navigate }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ACCEPT_INVITATION_REQUEST });
    try {
      const { data } = await api.get("/api/projects/accept_invitation", {
        params: { token: invitationToken },
      });

      navigate(`/project/${data.projectId}`);
      dispatch({ type: actionTypes.ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.ACCEPT_INVITATION_FAILURE,
        error: error.message,
      });
    }
  };
};
