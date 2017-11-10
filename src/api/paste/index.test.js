import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Paste } from '.'

const app = () => express(routes)

let userSession, anotherSession, adminSession, paste

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  paste = await Paste.create({ user })
})

test('POST /pastes 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, id: 'test', order: 'test', name: 'test', category: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual('test')
  expect(body.order).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.category).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /pastes 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /pastes 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /pastes/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${paste.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(paste.id)
})

test('GET /pastes/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /pastes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${paste.id}`)
    .send({ access_token: userSession, id: 'test', order: 'test', name: 'test', category: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(paste.id)
  expect(body.id).toEqual('test')
  expect(body.order).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.category).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /pastes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${paste.id}`)
    .send({ access_token: anotherSession, id: 'test', order: 'test', name: 'test', category: 'test' })
  expect(status).toBe(401)
})

test('PUT /pastes/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${paste.id}`)
  expect(status).toBe(401)
})

test('PUT /pastes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, id: 'test', order: 'test', name: 'test', category: 'test' })
  expect(status).toBe(404)
})

test('DELETE /pastes/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${paste.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /pastes/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`/${paste.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /pastes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${paste.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /pastes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${paste.id}`)
  expect(status).toBe(401)
})

test('DELETE /pastes/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
