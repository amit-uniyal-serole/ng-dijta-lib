export class AvatarUtils {
    static getRandomColor(): string {
        var letters: string = '0123456789ABCDEF';
        var color: string = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    static  getInitials = (string: string) => {
          let names = string.split(' '),
              initials = names[0].substring(0, 1).toUpperCase();
          if (names.length > 1) {
              initials += names[names.length - 1].substring(0, 1).toUpperCase();
          }
          return initials;
      };
}