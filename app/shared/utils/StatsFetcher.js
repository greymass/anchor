
class StatsFetcher {
  constructor(account, balance){
    this.account = account;
    this.account = balance;
  }

  totalStaked() {
    const {
      self_delegated_bandwidth
    } = this.account;

    parseFloat(self_delegated_bandwidth.cpu_weight) + parseFloat(self_delegated_bandwidth.net_weight)
  }

  refundDate() {
    const {
      refund_request
    } = this.account;

    let refundDate = false;

    if (refund_request) {
      totalBeingUnstaked = parseFloat(refund_request.net_amount) + parseFloat(refund_request.cpu_amount)
      refundDate = new Date(`${refund_request.request_time}z`);
      refundDate.setHours(refundDate.getHours() + 72);
    }

    refundDate
  }


    const {
      self_delegated_bandwidth,
      refund_request
    } = account;
    const totalStaked = ;
    const tokens = (balances && balances[settings.account]) ? balances[settings.account] : { EOS: 0 };
    let refundDate = false;
    let totalBeingUnstaked = 0;
    if (refund_request) {
      totalBeingUnstaked = parseFloat(refund_request.net_amount) + parseFloat(refund_request.cpu_amount)
      refundDate = new Date(`${refund_request.request_time}z`);
      refundDate.setHours(refundDate.getHours() + 72);
    }
    const totalTokens = totalStaked + totalBeingUnstaked + ((tokens.EOS) ? tokens.EOS : 0);
}

