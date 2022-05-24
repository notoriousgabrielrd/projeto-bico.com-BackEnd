import request from "supertest";
import { Express } from "express";
import { IUserCreate } from "../../src/interfaces/user";
import { UserRequests } from "./userRequests";
import { IJobsCreate } from "../../src/interfaces/jobs/index";
import { app } from "../../src/app";

let token: string;

const userRequests = new UserRequests(app);

const JobData: IJobsCreate = {
  title: "Me ajuda de novo",
  description: "agora",
  cep: "1234567",
  deliveryDate: "2024-07-21",
  categoryId: 2,
};

export class JobRequests {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  async createJob(userData: IUserCreate) {
    const { body } = await userRequests.signIn(userData);
    token = body.token;
    const response = await request(this.app)
      .post("/job")
      .send(JobData)
      .set("Authorization", `Bearer ${token}`);

    return response;
  }
}