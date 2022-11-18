export interface FindUserByEmailPort {
    findUserByEmail(email: string): Promise<any>;
}
