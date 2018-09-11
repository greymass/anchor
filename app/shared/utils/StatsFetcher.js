import { Decimal } from 'decimal.js';

export default class StatsFetcher {
  constructor(account, balance, settings) {
    this.account = account;
    this.balance = balance;
    this.settings = settings;
  }

  fetchAll() {
    return {
      refundDate: this.refundDate(),
      tokens: this.tokens(),
      totalBeingUnstaked: this.totalBeingUnstaked(),
      totalStaked: this.totalStaked(),
      totalTokens: this.totalTokens()
    };
  }

  totalStaked() {
    const {
      self_delegated_bandwidth
    } = this.account;

    if (!self_delegated_bandwidth || !self_delegated_bandwidth.cpu_weight) return Decimal(0);

    const cpu_amount = Decimal(self_delegated_bandwidth.cpu_weight.split(' ')[0]);
    const net_amount = Decimal(self_delegated_bandwidth.net_weight.split(' ')[0]);

    return cpu_amount.plus(net_amount);
  }


  refundDate() {
    const {
      refund_request
    } = this.account;

    let refundDate = false;

    if (refund_request) {
      refundDate = new Date(`${refund_request.request_time}z`);
      refundDate.setHours(refundDate.getHours() + 72);
    }

    return refundDate;
  }

  totalBeingUnstaked() {
    const {
      refund_request
    } = this.account;

    let totalBeingUnstaked = Decimal(0);

    if (refund_request) {
      const netAmount = Decimal(refund_request.net_amount.split(' ')[0]);
      const cpuAmount = Decimal(refund_request.cpu_amount.split(' ')[0]);

      totalBeingUnstaked = netAmount.plus(cpuAmount);
    }

    return totalBeingUnstaked;
  }

  tokens() {
    return this.balance ? this.balance : { [this.settings.blockchain.prefix]: 0 };
  }

  totalTokens() {
    const totalStaked = this.totalStaked();
    const totalBeingUnstaked = this.totalBeingUnstaked();
    const totalTokens = this.tokens()[this.settings.blockchain.prefix] || new Decimal(0);

    return totalStaked.plus(totalBeingUnstaked).plus(totalTokens);
  }

  resourceUsage() {
    const {
      cpu_limit,
      net_limit,
      ram_quota,
      ram_usage
    } = this.account;

    let cpuUsage;
    let netUsage;
    if (cpu_limit) {
      const { max, used } = cpu_limit;
      cpuUsage = Math.min(100, (Decimal((used / max) * 100)));
    }

    if (net_limit) {
      const { max, used } = net_limit;
      netUsage = Math.min(100, (Decimal((used / max) * 100)));
    }
    let ramUsage;
    if (ram_quota && ram_usage) {
      ramUsage = Math.min(100, (Decimal((ram_usage / ram_quota) * 100)));
    }

    return {
      cpuUsage,
      netUsage,
      ramUsage
    };
  }

  delegatedStats() {
    const {
      total_resources,
      self_delegated_bandwidth
    } = this.account;

    const selfCpuAmount = Decimal(self_delegated_bandwidth.cpu_weight.split(' ')[0]);
    const selfNetAmount = Decimal(self_delegated_bandwidth.net_weight.split(' ')[0]);

    const totalCpuAmount = Decimal(total_resources.cpu_weight.split(' ')[0]);
    const totalNetAmount = Decimal(total_resources.net_weight.split(' ')[0]);

    return {
      cpuWeight: `${totalCpuAmount.minus(selfCpuAmount).toFixed(4)} ${this.settings.blockchain.prefix}`,
      netWeight: `${totalNetAmount.minus(selfNetAmount).toFixed(4)} ${this.settings.blockchain.prefix}`,
      totalStaked: this.totalStaked()
    };
  }
}
