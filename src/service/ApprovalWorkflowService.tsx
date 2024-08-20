import { AxiosResponse } from "axios";
import IApprovalWorkflow from "../model/IApprovalWorkflow";
import HttpService from "./HttpService";

export default class WorkflowService {
    private static readonly URI = '/v1/workflow/approval';

    public static async getApprovalWorkflows(): Promise<AxiosResponse<IApprovalWorkflow[]>> {
        return HttpService.get<IApprovalWorkflow[]>(this.URI);
    }
}