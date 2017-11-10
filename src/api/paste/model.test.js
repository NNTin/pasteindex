import { Paste } from '.'
import { User } from '../user'

let user, paste

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  paste = await Paste.create({ user, id: 'test', order: 'test', name: 'test', category: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = paste.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(paste.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.id).toBe(paste.id)
    expect(view.order).toBe(paste.order)
    expect(view.name).toBe(paste.name)
    expect(view.category).toBe(paste.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = paste.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(paste.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.id).toBe(paste.id)
    expect(view.order).toBe(paste.order)
    expect(view.name).toBe(paste.name)
    expect(view.category).toBe(paste.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
