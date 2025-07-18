import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  price: Number,
  drink: String,
  sauce: String,
  extra: String,
});

const orderSchema = new mongoose.Schema({
  userName: String,
  userPhone: String,
  address: String,
  paymentMethod: String,
  items: [itemSchema],
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
