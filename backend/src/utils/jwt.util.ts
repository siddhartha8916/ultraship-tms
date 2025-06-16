import { Configuration } from '@/config/environment.js';
import jwt, { JwtPayload } from 'jsonwebtoken';

class JWTAuthenticator {
  sign(payload: JwtPayload): string {
    try {
      // Sign the payload with the secret key
      const token = jwt.sign(payload, Configuration.JWT_SECRET, {
        expiresIn: '1h',
      });
      return token;
    } catch (error) {
      throw new Error('Error signing the JWT: ' + error);
    }
  }

  decode(token: string): JwtPayload | null {
    try {
      // Decode the token (this does not verify the signature)
      const decoded = jwt.decode(token) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new Error('Error decoding the JWT: ' + error);
    }
  }

  verify(token: string): JwtPayload | null {
    try {
      // Verify the token with the secret key
      const decoded = jwt.verify(token, Configuration.JWT_SECRET) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new Error('Error verifying the JWT: ' + error);
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decode(token);
      if (!decoded || !decoded.exp) {
        throw new Error('Token does not have an expiration date.');
      }
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decoded.exp < currentTime;
    } catch (error) {
      throw new Error('Error checking token expiration: ' + error);
    }
  }
}

// Instantiate the JWTAuthenticator class
const jwtAuthenticator = new JWTAuthenticator();
export default jwtAuthenticator;
