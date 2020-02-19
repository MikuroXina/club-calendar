export class Duration {
  readonly from: Date;
  readonly to: Date;

  constructor(from: Date, to: Date) {
    if (from.getTime() > to.getTime()) {
      throw '`from` must be before `to`';
    }
    this.from = from;
    this.to = to;
  }
}