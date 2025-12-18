export class StringUtils {
  static randomUppercase(length: number): string {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    }

    return result;
  }

  static getRandomNumber(length: number): string {
    const digits = '0123456789';
    return Array.from({ length }, () => digits.charAt(Math.floor(Math.random() * digits.length))).join('');
  }
}
