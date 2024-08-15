import {
  APPROVED_PROP,
  CLOSED_PROP,
  DRAFT_PROP,
  HAND_SHAKE_ACCEPTED_PROP,
  HAND_SHAKE_OFFERED_PROP,
  HAND_SHAKE_DECLINED_PROP,
  PRE_PANEL_PROP,
  IN_PANEL_PROP,
  SUBMITTED_PROP,
} from '../../Constants/BidData';
import { bidClassesFromCurrentStatus, shouldShowAlert, getActionPermissions } from './BidHelpers';
import bidListObject from '../../__mocks__/bidListObject';

// Test that the result of each status prop is defined
describe('bidClassesFromCurrentStatus function', () => {
  const statusProps = [
    APPROVED_PROP,
    CLOSED_PROP,
    DRAFT_PROP,
    HAND_SHAKE_ACCEPTED_PROP,
    HAND_SHAKE_OFFERED_PROP,
    HAND_SHAKE_DECLINED_PROP,
    PRE_PANEL_PROP,
    IN_PANEL_PROP,
    SUBMITTED_PROP,
  ];
  statusProps.forEach((status) => {
    it(`is defined when status equals "${status}"`, () => {
      const result = bidClassesFromCurrentStatus({ ...bidListObject.results[0], status });
      expect(result).toBeDefined();
    });
  });

  it('is defined if no object is provided as a parameter', () => {
    const result = bidClassesFromCurrentStatus();
    expect(result).toBeDefined();
  });

  it('is false when an invalid status is provided', () => {
    const result = bidClassesFromCurrentStatus({ ...bidListObject.results[0], status: 'fake status' });
    expect(result).toBe(false);
  });
});

describe('shouldShowAlert function', () => {
  it('returns true for a valid status', () => {
    const result = shouldShowAlert({ status: HAND_SHAKE_OFFERED_PROP });
    expect(result).toBe(true);
  });

  it('returns true for an invalid status but when is_paneling_today === true', () => {
    const result = shouldShowAlert({ status: HAND_SHAKE_OFFERED_PROP, is_paneling_today: true });
    expect(result).toBe(true);
  });

  it('returns false for an invalid status', () => {
    const result = shouldShowAlert({ status: SUBMITTED_PROP });
    expect(result).toBe(false);
  });
});

describe('getActionPermissions function', () => {
  it('returns defined for different statuses', () => {
    expect(getActionPermissions(DRAFT_PROP)).toBeDefined();
    expect(getActionPermissions(SUBMITTED_PROP)).toBeDefined();
    expect(getActionPermissions(HAND_SHAKE_OFFERED_PROP)).toBeDefined();
    expect(getActionPermissions(HAND_SHAKE_ACCEPTED_PROP)).toBeDefined();
    expect(getActionPermissions(PRE_PANEL_PROP)).toBeDefined();
  });

  it('returns the correct permissions for an invalid status', () => {
    const permissions = getActionPermissions('fake_status');
    expect(permissions.showDelete).toBe(false);
    expect(permissions.disableDelete).toBe(false);
    expect(permissions.showWithdraw).toBe(true);
    expect(permissions.disableWithdraw).toBe(true);
  });
});
