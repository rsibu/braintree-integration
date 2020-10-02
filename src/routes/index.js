const bodyParser = require('body-parser');
const { Router } = require('express');
const router = Router();
const braintree = require('braintree');


const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'ggbpyy6kcthkhpq5',
    publicKey: '5p7yp2yc9chdwm24',
    privateKey: '26ee288268a0747ceee0048c256cfc88'
});


router.get('/', (req, res) => {
    res.render('index')
    gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: 'fake-paypal-one-time-nonce',
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
    });
    
});

router.get('/client-token', (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        res.send(response.clientToken);
    });
});

router.post('/checkout', (req, res) => {
    const nonceFromTheClient = req.body.payment_method_nonce;
})

module.exports = router;