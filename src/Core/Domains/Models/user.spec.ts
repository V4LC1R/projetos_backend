import { UserModel } from './user.model'; // Adjust the path as necessary

describe('User Entity Tests', () => {
    let user: UserModel;

    beforeEach(() => {
        user = new UserModel('John Doe', 'john.doe@example.com', 'password', );
    });

    it('should create a user with the correct name and email', () => {
        expect(user.name).toBe('John Doe');
        expect(user.email).toBe('john.doe@example.com');
    });

    it('should update the user name', () => {
        user.name = 'Jane Doe';
        expect(user.name).toBe('Jane Doe');
    });

    it('should update the user email', () => {
        user.email = 'jane.doe@example.com';
        expect(user.email).toBe('jane.doe@example.com');
    });

});
