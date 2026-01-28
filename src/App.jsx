import Currency from './components/Currency'
import currencyBG from './images/currencyBG.jpg'
function App() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${currencyBG})` }}>
      <Currency />
    </div>
  )
}

export default App
