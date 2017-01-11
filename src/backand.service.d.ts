export declare class BackandService {
    init(config: Object): void;
    constants: any;
    helpers: any;
    defaults: any;
    object: any;
    file: any;
    query: any;
    user: any;
    useAnonymousAuth(scb?: (response?: Response) => void): any;
    signin(username: string, password: string, scb?: (response?: Response) => void, ecb?: (error?: Response) => void): any;
    signup(email: string, password: string, confirmPassword: string, firstName: string, lastName: string, parameters?: any, scb?: (response?: Response) => void, ecb?: (error?: Response) => void): any;
    socialSignin(provider: string, scb?: (response?: Response) => void, ecb?: (error?: Response) => void): any;
    socialSigninWithToken(provider: string, token: string, scb?: (response?: Response) => void, ecb?: (error?: Response) => void): any;
    socialSignup(provider: string, email: string, scb?: (response?: Response) => void, ecb?: (error?: Response) => void): any;
    requestResetPassword(username: string, scb?: (response?: Response) => void, ecb?: (error?: Response) => void): any;
    resetPassword(newPassword: string, resetToken: string, scb?: (response?: Response) => void, ecb?: (error?: Response) => void): any;
    changePassword(oldPassword: string, newPassword: string, scb?: (response?: Response) => void, ecb?: (error?: Response) => void): any;
    signout(scb?: (response?: Response) => void): any;
    getSocialProviders(scb?: (response?: Response) => void): any;
    on(eventName: string, callback?: (response?: any) => void): void;
}
export declare class Response {
    status: number;
    statusText: string;
    headers: any;
    config: any;
    data: any;
}
