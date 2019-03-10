const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Order} = require('./../models/order');

beforeEach((done) => {
    Order.deleteMany({}).then(() => done());
});

describe('POST /orders', () => {
    it('should create a new order', (done) => {
        let title = 'Test order title';
        request(app)
            .post('/orders')
            .send({title})
            .expect(200)
            .expect((res) => {
                expect(res.body.title).toBe(title);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Order.find().then((orders) => {
                    expect(orders.length).toBe(1);
                    expect(orders[0].title).toBe(title);
                    done();
                }).catch((err) => done(err));
            });
    });


    it('should not create a new order with empty data', (done) => {
        request(app)
            .post('/orders')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Order.find().then((orders) => {
                    expect(orders.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    });

});