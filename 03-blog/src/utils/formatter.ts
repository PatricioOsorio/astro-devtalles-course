export class Formatter {
  static formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(date).toLocaleDateString('es-MX', options);
  }
}
