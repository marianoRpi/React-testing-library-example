import React, { useState, useReducer } from 'react'
import axios from 'axios'

const initialState = {
  error: null,
  chuckSays: null,
}

function greetingReducer(state, action) {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        chuckSays: action.chuckSays,
      }
    }
    case 'ERROR': {
      return {
        error: action.error,
        chuckSays: null,
      }
    }
    default: {
      return state
    }
  }
}

export default function Fetch({ url }) {
  const [{ error, chuckSays }, dispatch] = useReducer(
    greetingReducer,
    initialState
  )
  const [buttonClicked, setButtonClicked] = useState(false)

  const fetchGreeting = async url =>
    axios
      .get(url)
      .then(response => {
        const chuckSays = response.data.value
        dispatch({ type: 'SUCCESS', chuckSays })
        setButtonClicked(true)
      })
      .catch(error => {
        dispatch({ type: 'ERROR', error })
      })

  const buttonText = buttonClicked ? 'Chuck says...' : 'Click me!'

  return (
    <div>
      <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
        {buttonText}
      </button>
      {chuckSays && <h1>{chuckSays}</h1>}
      {error && <p role='alert'>Oops, failed to fetch!</p>}
    </div>
  )
}
