import { Meeting } from '..';

export type AbortInput = {
  /**
   * Returns an id of the meeting to abort.
   *
   * @returns {Promise<string>}
   */
  askIdToAbort(): Promise<string>;
};

export type AbortOutput = {
  /**
   * Returns a meeting from `id`.
   *
   * @param {string} id
   * @returns {Promise<Meeting>}
   */
  find(id: string): Promise<Meeting>;

  /**
   * Overwrites database with `meetings`.
   *
   * @param {...Meeting[]} meetings
   * @returns {Promise<void>}
   */
  update(...meetings: Meeting[]): Promise<void>;
};

export const AbortService = async (input: AbortInput, output: AbortOutput) => {
  const id = await input.askIdToAbort();
  const found = await output.find(id);
  output.update({ ...found, expired: true });
};
