export interface UserInterface {
    jwt: string;
    user: {
        blocked: boolean
        company: string;
        confirmed: boolean;
        createdAt: string;
        email: string;
        id: string;
        name: string;
        provider: string;
        surname: string;
        updatedAt: string;
        username: string;
    }
}
