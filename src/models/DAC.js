import Entity from './Entity';
import StatusUtils from '../utils/StatusUtils';
import Status from './Status';

/**
 * The DApp DAC model
 */
class DAC extends Entity {

  constructor(data = {}) {
    super(data);

    const {
      communityUrl = '',
      status = DAC.PENDING,
      delegateAddress = '',
      requiredConfirmations = ''
    } = data;

    this._communityUrl = communityUrl;
    this._status = status;
    this._delegateAddress = delegateAddress;
    this._requiredConfirmations = requiredConfirmations;
    this._commitTime = data.commitTime;
    this._delegateId = delegateAddress;

  }

  static get PENDING() {
    return StatusUtils.build('Pending', true);
  }

  static get ACTIVE() {
    return StatusUtils.build('Active');
  }

  static get CANCELLED() {
    return StatusUtils.build('Cancelled');
  }

  static get type() {
    return 'dac';
  }

  get type() {
    return DAC.type;
  }

  get isActive() {
    return this.status.name === DAC.ACTIVE.name;
  }

  get isPending() {
    return this.status.name === DAC.PENDING.name;
  }

  get communityUrl() {
    return this._communityUrl;
  }

  set communityUrl(value) {
    this.checkType(value, ['string'], 'communityUrl');
    this._communityUrl = value;
  }


  get delegateAddress() {
    return this._delegateAddress;
  }

  get delegateId() {
    return this._delegateId;
  }

  set delegateId(value) {
    this.checkType(value, ['number', 'string'], 'delegateId');
    this._delegateId = value;
  }

  get commitTime() {
    return this._commitTime;
  }

  set commitTime(value) {
    this.checkType(value, ['number'], 'commitTime');
    this._commitTime = value;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this.checkInstanceOf(value, Status, 'status');
    this._status = value;
  }

  /**
   * Determina si la entidad recibe fondos o no.
   */
  get receiveFunds() {
    return this.isActive;
  }
}

export default DAC;
