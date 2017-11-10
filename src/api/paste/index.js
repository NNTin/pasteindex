import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Paste, { schema } from './model'

const router = new Router()
const { pasteid, order, name, category } = schema.tree

/**
 * @api {post} /pastes Create paste
 * @apiName CreatePaste
 * @apiGroup Paste
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam pasteid Paste's pasteid.
 * @apiParam order Paste's order.
 * @apiParam name Paste's name.
 * @apiParam category Paste's category.
 * @apiSuccess {Object} paste Paste's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Paste not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ pasteid, order, name, category }),
  create)

/**
 * @api {get} /pastes Retrieve pastes
 * @apiName RetrievePastes
 * @apiGroup Paste
 * @apiUse listParams
 * @apiSuccess {Object[]} pastes List of pastes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /pastes/:id Retrieve paste
 * @apiName RetrievePaste
 * @apiGroup Paste
 * @apiSuccess {Object} paste Paste's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Paste not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /pastes/:id Update paste
 * @apiName UpdatePaste
 * @apiGroup Paste
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam pasteid Paste's pasteid.
 * @apiParam order Paste's order.
 * @apiParam name Paste's name.
 * @apiParam category Paste's category.
 * @apiSuccess {Object} paste Paste's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Paste not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ pasteid, order, name, category }),
  update)

/**
 * @api {delete} /pastes/:id Delete paste
 * @apiName DeletePaste
 * @apiGroup Paste
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Paste not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
