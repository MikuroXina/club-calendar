import hash from 'object-hash';

export type Duration = [Date, Date];

export type MeetingKind = 'Regular' | 'Others';

export class Meeting {
  public readonly _id: string;
  kind: MeetingKind;
  name: string;
  date: Date;
  expired: boolean;

  public constructor(name: string, date: Date, kind: MeetingKind) {
    this._id = hash({ name, date, kind });
    this.name = name;
    this.date = date;
    this.kind = kind;
    this.expired = false;
  }
}

export class DateString {
  public readonly str: string;

  constructor(date: Date) {
    this.str = date.toString();
  }

  static from(str: any) {
    if (typeof str !== 'string' || Date.parse(str) == NaN) {
      throw 'str cannot be converted to Date';
    }
    return new DateString(new Date(str));
  }

  toDate() {
    return new Date(this.str);
  }

  static to(obj: any): DateString {
    if (!this.ableTo(obj)) {
      throw 'obj cannot convert to DateString';
    }
    const str = new DateString(new Date(obj));
    return str;
  }

  static ableTo(obj: any): boolean {
    return typeof obj === 'string' && Date.parse(obj) != NaN;
  }

  toFormValueString() {
    return this.toDate()
      .toISOString()
      .slice(0, 10);
  }
}

export const validateKind = (str: any): str is MeetingKind =>
  str === 'Regular' || str === 'Others';

export * from './exp/other-meeting';
export * from './exp/regular-meeting';

export * from './op/abort';
export * from './op/create';
export * from './op/fetch';
export * from './op/update';

export * from './skin/express';
export * from './skin/on-memory';
export * from './skin/real';

export const testDatas: Meeting[] = [
  {
    _id: 'xxxx',
    kind: 'Others',
    name: 'エイプリルフール',
    date: new Date('2020-04-01'),
    expired: false,
  },
  {
    _id: 'yyyy',
    kind: 'Others',
    name: 'こどもの日',
    date: new Date('2020-05-05'),
    expired: false,
  },
  {
    _id: 'zzzz',
    kind: 'Regular',
    name: '第一回定例会',
    date: new Date('2020-04-06'),
    expired: false,
  },
];
