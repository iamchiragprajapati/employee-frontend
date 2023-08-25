import { AdminMockService } from "@mock/admin.mock.service";
import { AdminService } from "@services/admin.service";

export const mockServiceProvider = [
    { provide: AdminService, useClass: AdminMockService }
];