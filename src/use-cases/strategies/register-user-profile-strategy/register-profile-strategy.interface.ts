import { User } from "@prisma/client";

export interface RegisterProfileStrategy {
    execute(user: User, payLoad: unknown): Promise<unknown>
}