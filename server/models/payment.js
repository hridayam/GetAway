const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    id: String,
    user_id: String,
    amount: Number,
    amount_refunded: Number,
    application: null,
    application_fee: null,
    balance_transaction: String,
    captured: Boolean,
    created: Number,
    currency: String,
    customer: Object,
    description: String,
    destination: String,
    dispute: String,
    failure_code: String,
    failure_message: String,
    fraud_details: Object,
    invoice: String,
    livemode: Boolean,
    metadata: {
      order_id: Number
    },
    on_behalf_of: String,
    order: String,
    outcome: String,
    paid: Boolean,
    payment_intent: String,
    receipt_email: String,
    receipt_number: nuStringll,
    refunded: Boolean,
    refunds: {
      object: Array,
      data: Array,
      has_more: Boolean,
      total_count: Number,
      url: String
    },
    review: String,
    shipping: String,
    source: {
      id: String,
      object: String,
      address_city: String,
      address_country: String,
      address_line1: String,
      address_line1_check: String,
      address_line2: String,
      address_state: String,
      address_zip: String,
      address_zip_check: String,
      brand: String,
      country: String,
      customer: String,
      cvc_check: String,
      dynamic_last4: Number,
      exp_month: Number,
      exp_year: Number,
      fingerprint: String,
      funding: String,
      last4: Number,
      metadata: Object,
      name: String,
      tokenization_method: String
    },
    source_transfer: String,
    statement_descriptor: String,
    status: String,
    transfer_group: String
});

const Payment = mongoose.model('payment', PaymentSchema);

module.exports = Payment;