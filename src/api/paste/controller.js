import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Paste } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Paste.create({ ...body, user })
    .then((paste) => paste.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Paste.find(query, select, cursor)
    .populate('user')
    .then((pastes) => pastes.map((paste) => paste.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Paste.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((paste) => paste ? paste.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Paste.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((paste) => paste ? _.merge(paste, body).save() : null)
    .then((paste) => paste ? paste.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Paste.findById(params.id)
    .then(notFound(res))
    .then((paste) => paste ? paste.remove() : null)
    .then(success(res, 204))
    .catch(next)
