import { Decimal } from 'decimal.js';

export default class StatsFetcher {
  constructor(account, balance) {
    this.account = account;
    this.balance = balance;
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

    return Decimal(self_delegated_bandwidth.cpu_weight) +
      Decimal(self_delegated_bandwidth.net_weight);
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

    let totalBeingUnstaked = 0;

    if (refund_request) {
      totalBeingUnstaked = Decimal(refund_request.net_amount) +
                             Decimal(refund_request.cpu_amount);
    }

    return totalBeingUnstaked;
  }

  tokens() {
    return this.balance ? this.balance : { EOS: 0 };
  }

  totalTokens() {
    return this.totalStaked() +
      this.totalBeingUnstaked() +
      ((this.tokens().EOS) ? this.tokens().EOS : 0);
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
      cpuUsage = Math.max(0, (100 - Decimal((used / max) * 100))).toFixed(3);
    }

    if (net_limit) {
      const { max, used } = net_limit;
      netUsage = Math.max(0, (100 - Decimal((used / max) * 100))).toFixed(3);
    }
    let ramUsage;
    if (ram_quota && ram_usage) {
      ramUsage = Math.max(0, (100 - Decimal((ram_usage / ram_quota) * 100))).toFixed(3);
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

    return {
      cpuWeight: `${(Decimal(total_resources.cpu_weight) - Decimal(self_delegated_bandwidth.cpu_weight)).toFixed(4)} EOS`,
      netWeight: `${(Decimal(total_resources.net_weight) - Decimal(self_delegated_bandwidth.net_weight)).toFixed(4)} EOS`,
      totalStaked: this.totalStaked()
    };
  }
}

