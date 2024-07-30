export interface User {
    id?: number;
    username: string;
    role: string;
    // Note: Nous n'incluons pas le mot de passe ici pour des raisons de sécurité
  }