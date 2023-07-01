import { observable, WritableObservable } from 'micro-observables';

/**
 * Service storing the state of the current mail template.
 */
export default class MailBuilderService {
  private readonly emailBody: WritableObservable<any>;

  private readonly currentEmailSubject: WritableObservable<any>;

  constructor() {
    this.emailBody = observable<any>({});
    this.currentEmailSubject = observable<any>({});
  }

  initEmail() {
    this.emailBody.set({});
    this.currentEmailSubject.set({});
  }

  loadEmail() {
    this.emailBody.set({});
    this.currentEmailSubject.set({});
    throw new Error('Not implemented');
  }
}
