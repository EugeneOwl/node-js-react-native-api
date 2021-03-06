const { hash, compare } = require('bcrypt');

class PasswordService {

  private static readonly SALT_ROUNDS = 10;

  async encryptPassword(password: string): Promise<string> {
    try {
      return await hash(password, PasswordService.SALT_ROUNDS);
    } catch (error) {
      console.error(`Error when hashing password with bcrypt: `, error);
      throw error;
    }
  }

  async comparePassword(plainPassword: string, hash: string): Promise<boolean> {
    try {
      return await compare(plainPassword, hash);
    } catch (error) {
      console.error(`Error when comparing plain password and hash with bcrypt: `, error);
      throw error;
    }
  }
}

const passwordSerrvice = new PasswordService();

export { passwordSerrvice }
