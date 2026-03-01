const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
    try {
        const numOrders = await Order.countDocuments();
        const numProducts = await Product.countDocuments();
        const numUsers = await User.countDocuments();
        const totalSales = await Order.aggregate([
            { $match: { isPaid: true } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } },
        ]);

        const salesData = await Order.aggregate([
            { $match: { isPaid: true } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$paidAt' } },
                    total: { $sum: '$totalPrice' },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.json({
            numOrders,
            numProducts,
            numUsers,
            totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
            salesData,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
