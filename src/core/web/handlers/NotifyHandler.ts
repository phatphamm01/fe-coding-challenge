import { toast } from 'react-toastify';

import { Handler } from './Handler';

export class NotifyHandler {
  handler: Handler;

  constructor(handler: Handler) {
    this.handler = handler;
  }

  notify = (
    type: 'success' | 'info' | 'error' | 'warning',
    message: string
  ) => {
    toast[type](message);
  };
}
