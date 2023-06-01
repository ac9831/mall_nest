import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { User } from './User';
import { UserCreatedEvent } from './UserCreatedEvent';

@Injectable()
export class UserFactory {
  constructor(private eventBus: EventBus) {}

  create(
    name: string,
    email: string,
    signupVerifyToken: string,
    password: string,
  ): User {
    const user = new User(name, email, password, signupVerifyToken);

    this.eventBus.publish(new UserCreatedEvent(email, signupVerifyToken));

    return user;
  }
}
