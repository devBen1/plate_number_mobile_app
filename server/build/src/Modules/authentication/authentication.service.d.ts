export default class AppointmentService {
    private static queryHelper;
    constructor();
    static GetUserInfo(userData: any, attributes: Array<string>): Promise<any>;
    static UpdateUser(data: any, userUID: string): Promise<[affectedCount: number] | undefined>;
}
