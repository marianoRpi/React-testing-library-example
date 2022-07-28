import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Fetch from '../src/fetch'

const server = setupServer(
  rest.get('/chuckSays', (_req, res, ctx) => {
    return res(
      ctx.json({
        value: "When Chuck Norris throws exceptions, it's across the room.",
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays what Chuck Norris has to say', async () => {
  render(<Fetch url='/chuckSays' />)

  fireEvent.click(screen.getByText('Click me!'))

  await waitFor(() => screen.getByTestId('chuck'))

  expect(screen.getByTestId('chuck')).toHaveTextContent(
    "When Chuck Norris throws exceptions, it's across the room."
  )
  expect(screen.getByRole('button')).toBeDisabled()
})

test('handles server error', async () => {
  server.use(
    rest.get('/chuckSays', (_req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<Fetch url='/chuckSays' />)

  fireEvent.click(screen.getByText('Click me!'))

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
  expect(screen.getByRole('button')).not.toBeDisabled()
})
