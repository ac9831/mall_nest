export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private signupVerifyToken: string,
  ) {}
}
