import './App.css'
import Octo from './octo.png'
import Logo from './logo.png'
import Fetch from './fetch'

function App() {
  return (
    <div className='App'>
      <h2>Testing with react-testing-library</h2>
      <div className='ilustration'>
        <img src={Logo} alt='react' />
        <span className='plus'>+</span>
        <img src={Octo} alt='octopus' />
      </div>
      <Fetch url='https://api.chucknorris.io/jokes/random' />
    </div>
  )
}

export default App
