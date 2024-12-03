export interface CreatePaymentOrderModel{
    PayGroupId : string,
    VoucherType : Number,
    PaymentType: Number,
    MolType: Number,
    Period : string,
    Description?: string,
    BankAccountId?: string
}