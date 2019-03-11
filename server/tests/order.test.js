const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Order} = require('../models/order');

const orders = [{
    _id: new ObjectID(),
    title: 'First test order',
    active: false
}, {
    _id: new ObjectID(),
    title: 'Second test order',
    active: true
}];

beforeEach((done) => {
    Order.deleteMany({}).then(() => {
        return Order.insertMany(orders);
    }).then(() => done());
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

                Order.find({title}).then((orders) => {
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
                    expect(orders.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            });
    });
});


describe('GET /orders', () => {
    it('should get all orders', (done) => {
        request(app)
            .get('/orders')
            .expect(200)
            .expect(res => {
                expect(res.body.orders.length).toBe(2);
            })
            .end(done);
    });
});


describe('GET /orders/:id', () => {
    it('should get a single order by Id', (done) => {
        request(app)
            .get(`/orders/${orders[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.order.title).toBe(orders[0].title);
            })
            .end(done);
    });
    
    it('should not get a single order by wrong Id', (done) => {
        let wrongId = new ObjectID();
        request(app)
            .get(`/orders/${wrongId.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should not get a single order by invalid Id', (done) => {
        request(app)
            .get('/orders/12345')
            .expect(400)
            .end(done);
    });
});


describe('DELETE /orders/:id', () => {
    let id = orders[0]._id.toHexString();
    it('should delete a single order by Id', (done) => {
        request(app)
        .delete(`/orders/${id}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.order.title).toBe(orders[0].title);
        })
        .end((err, res) => {
            if(err) {
                return done(err)
            }
            Order.findById(id).then((order) => {
                expect(order).toBeFalsy(); 
                done();
            }).catch((err) => done(err));
        });
    });

    it('should not delete a single order by wrong Id', (done) => {
        let wrongId = new ObjectID();
        request(app)
            .delete(`/orders/${wrongId.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should not delete a single order by invalid Id', (done) => {
        request(app)
            .delete('/orders/12345')
            .expect(400)
            .end(done);
    });
});


describe('PATCH /orders/:id', () => {
    let id = orders[0]._id.toHexString();
    let title = "Updated order";
    let active = true;

    it('should update a single order by Id', (done) => {
        request(app)
        .patch(`/orders/${id}`)
        .send({title, active})
        .expect(200)
        .expect((res) => {
            expect(res.body.order.title).toBe(title);
            expect(res.body.order.active).toBe(active);
        })
        .end((err, res) => {
            if(err) {
                return done(err)
            }
            Order.findById(id).then((order) => {
                expect(order.title).toBe(title);
                expect(order.active).toBe(active);                    
                done();
            }).catch((err) => done(err));
        });
    });        
});