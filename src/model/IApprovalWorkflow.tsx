import IProject from "./IProject";
import IWorkflowStep from "./IWorkflowStep";

export default interface IApprovalWorkflow {
    id: number;
    project: IProject;
    status: string;
    createdAt?: Date;
    steps: IWorkflowStep[]
}