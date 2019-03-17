const jwt = require('jsonwebtoken');

class JwtTokenService {

  private readonly JWT_SECRET = process.env['SPP_LAB_WORK_3_JWT_SECRET'];
  private readonly JWT_ALGORITHM = 'HS256';
  private readonly JWT_EXPIRATION_TIME = 60 * 60;

  createToken(): string {
    return jwt.sign(
      {},
      this.JWT_SECRET,
      {
        expiresIn: this.JWT_EXPIRATION_TIME,
        algorithm: this.JWT_ALGORITHM
      }
    );
  }

  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, this.JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const jwtTokenService = new JwtTokenService();

export { jwtTokenService }
