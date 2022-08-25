const chai = require('chai')
const chaiHTTP = require('chai-http')

const app = require('../app')
const User = require('../models/user')

chai.should()
chai.use(chaiHTTP)

describe('users', function () {

    // scenario
    beforeEach(function (done) {
        const user = new User({
            email: 'nanda@gmail.com',
            password: '12345',
            name: 'Fernanda',
            address: 'Makasar'
        })
        user.save(function (err) {
            done()
        })
    })

    afterEach(function (done) {
        User.deleteOne({
            email: "nanda@gmail.com"
        }, function (err) {
            done()
        })
    })

    it('seharusnya mendapatkan semua daftar user dengan metode GET', function (done) {
        chai.request(app).get('/users').end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            res.body.data[res.body.data.length - 1].should.have.property('_id');
            res.body.data[res.body.data.length - 1].should.have.property('email');
            res.body.data[res.body.data.length - 1].should.have.property('name');
            res.body.data[res.body.data.length - 1].should.have.property('address');
            res.body.data[res.body.data.length - 1].should.have.property('todos');
            res.body.data[res.body.data.length - 1].todos.should.be.a('array');
            res.body.data[res.body.data.length - 1].email.should.equal('nanda@gmail.com');
            res.body.data[res.body.data.length - 1].name.should.equal('Fernanda');
            res.body.data[res.body.data.length - 1].address.should.equal('Makasar');
            done();
        })
    })

    it('seharusnya menambahkan satu user dengan metode POST', function (done) {
        chai.request(app).post('/users').send({
            email: 'himawan@gmail.com',
            password: '123456',
            name: 'Himawan S',
            address: 'Cianjur'
        }).end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('_id');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('name');
            res.body.data.should.have.property('address');
            res.body.data.should.have.property('todos');
            res.body.data.todos.should.be.a('array');
            res.body.data.email.should.equal('himawan@gmail.com');
            res.body.data.name.should.equal('Himawan S');
            res.body.data.address.should.equal('Cianjur');
            done();
        })
    })

    it('seharusnya merubah satu user dengan metode PUT/:id', function (done) {
        chai.request(app).get('/users').end(function (err, res) {
            chai.request(app).put(`/users/${res.body.data[res.body.data.length - 2]._id}`).send({
                name: 'Himawan Super',
                address: 'Kota Cianjur'
            }).end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('_id');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('address');
                res.body.data.should.have.property('todos');
                res.body.data.todos.should.be.a('array');
                res.body.data.email.should.equal('himawan@gmail.com');
                res.body.data.name.should.equal('Himawan Super');
                res.body.data.address.should.equal('Kota Cianjur');
                done();
            })
        })
    })

    it('seharusnya menghapus satu user dengan metode DELETE/:id', function (done) {
        chai.request(app).get('/users').end(function (err, res) {
            chai.request(app).delete(`/users/${res.body.data[res.body.data.length - 2]._id}`).end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('_id');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('address');
                res.body.data.should.have.property('todos');
                res.body.data.todos.should.be.a('array');
                res.body.data.email.should.equal('himawan@gmail.com');
                res.body.data.name.should.equal('Himawan Super');
                res.body.data.address.should.equal('Kota Cianjur');
                done();
            })
        })
    })

})