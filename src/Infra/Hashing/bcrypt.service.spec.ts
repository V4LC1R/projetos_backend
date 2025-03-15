import { BcryptHash } from "./bcrypt.hash";

describe('Encript Services test', () => {
    const plainText = 'random-text-transform';
    const bcryptService = new BcryptHash();
    it('should be hashing text',async ()=> {
        const hashedText = await bcryptService.encript(plainText);
        expect(hashedText).not.toBe(plainText);
    })

    it('should be able to compare hashed text', async () => {
        const hashedText = await bcryptService.encript(plainText);
        const isMatch = await bcryptService.compare(plainText, hashedText);
        expect(isMatch).toBe(true);
    })
});