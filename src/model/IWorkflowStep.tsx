export default interface IWorkflowStep {
    id: number;
    workflowId: number;
    approverId: number;
    stepOrder: number;
    status: string;
    createdAt?: Date;
}
