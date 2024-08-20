import { createBrowserRouter } from "react-router-dom";
import GuardComponent from "./guard/GuardComponent";
import AdminLayout from "./layout/AdminLayout";
import Layout from "./layout/Layout";
import ManagerLayout from "./layout/ManagerLayout";
import ProjectLayout from "./layout/ProjectLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectFormPage from "./pages/ProjectFormPage";
import PersonFormPage from "./pages/admin/PersonFormPage";
import PersonPage from "./pages/admin/PersonPage";
import ProjectPage from "./pages/admin/ProjectPage";
import TeamFormPage from "./pages/admin/TeamFormPage";
import TeamPage from "./pages/admin/TeamPage";
import WorkflowPage from "./pages/manager/WorkflowPage";
import ProjectScopeFormPage from "./pages/project/ProjectScopeFormPage";
import ProjectScopePage from "./pages/project/ProjectScopePage";
import ProjectSummaryPage from "./pages/project/ProjectSummaryPage";
import ProjectVersionPage from "./pages/project/ProjectVersionPage";
import MyTeamPage from "./pages/manager/MyTeamPage";
import TeamManagerFormPage from "./pages/manager/TeamManagerFormPage";
import LanguageTemplatesPage from "./pages/admin/LanguageTemplatesPage";
import LanguageTemplatesFormPage from "./pages/admin/LanguageTemplatesFormPage";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage></LoginPage>,
    },
    {
        path: "/",
        element: <GuardComponent>
            <Layout>
                <HomePage></HomePage>
            </Layout>
        </GuardComponent>,
    },
    {
        path: "/new-project",
        element: <Layout><ProjectFormPage></ProjectFormPage></Layout>,
    },
    {
        path: "/:project",
        element: <ProjectLayout><ProjectSummaryPage></ProjectSummaryPage></ProjectLayout>,
    },
    {
        path: "/:project/scopes",
        element: <ProjectLayout><ProjectScopePage></ProjectScopePage></ProjectLayout>,
    },
    {
        path: "/:project/scopes/:scope",
        element: <ProjectLayout><ProjectScopeFormPage></ProjectScopeFormPage></ProjectLayout>,
    },
    {
        path: "/:project/versions",
        element: <ProjectLayout><ProjectVersionPage></ProjectVersionPage></ProjectLayout>
    },
    {
        path: "/admin/teams",
        element: <GuardComponent rolesToAccess={['ADMIN']}>
            <AdminLayout><TeamPage></TeamPage></AdminLayout>
        </GuardComponent>
    },
    {
        path: "/admin/teams/:id",
        element: <GuardComponent rolesToAccess={['ADMIN']}>
            <AdminLayout><TeamFormPage></TeamFormPage></AdminLayout>
        </GuardComponent>
    },
    {
        path: "/admin/person",
        element: <GuardComponent rolesToAccess={['ADMIN']}>
            <AdminLayout><PersonPage></PersonPage></AdminLayout>
        </GuardComponent>
    },
    {
        path: "/admin/person/:id",
        element: <GuardComponent rolesToAccess={['ADMIN']}>
            <AdminLayout><PersonFormPage></PersonFormPage></AdminLayout>
        </GuardComponent>
    },
    {
        path: "/admin/projects",
        element: <GuardComponent rolesToAccess={['ADMIN']}>
            <AdminLayout><ProjectPage></ProjectPage></AdminLayout>
        </GuardComponent>
    },
    {
        path: "/admin/templates",
        element: <GuardComponent rolesToAccess={['ADMIN']}>
            <AdminLayout><LanguageTemplatesPage></LanguageTemplatesPage></AdminLayout>
        </GuardComponent>
    },
    {
        path: "/admin/templates/:id",
        element: <GuardComponent rolesToAccess={['ADMIN']}>
            <AdminLayout><LanguageTemplatesFormPage></LanguageTemplatesFormPage></AdminLayout>
        </GuardComponent>
    },
    {
        path: "/manager/workflow",
        element: <GuardComponent rolesToAccess={['ADMIN', 'MANAGER']}>
            <ManagerLayout><WorkflowPage></WorkflowPage></ManagerLayout>
        </GuardComponent>
    },
    {
        path: "/manager/my-team",
        element: <GuardComponent rolesToAccess={['ADMIN', 'MANAGER']}>
            <ManagerLayout><MyTeamPage></MyTeamPage></ManagerLayout>
        </GuardComponent>
    },
    {
        path: "/manager/team/:id",
        element: <GuardComponent rolesToAccess={['ADMIN', 'MANAGER']}>
            <ManagerLayout><TeamManagerFormPage></TeamManagerFormPage></ManagerLayout>
        </GuardComponent>
    }
]);

export { router };

