import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  UserCreatedEvent,
  UserCreatedEvent,
} from 'src/domain/UserCreatedEvent';

@EventsHandler(UserCreatedEvent)
export class UserEventsHandler implements IEventHandler<UserCreatedEvent> {
  constructor();
}
