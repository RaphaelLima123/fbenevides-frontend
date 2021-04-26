import React from 'react'
import { InputCamp } from './components/InputCamp'
import { ProductBox } from './components/ProductsBox'
import { TopBar } from './components/TopBar'
import { DeleteCamp } from './components/DeleteCamp'
import { UpdateCamp } from './components/UpdateCamp'

const App: React.FC = () => {
  return (
    <div>
      <TopBar />
      <ProductBox />
      <InputCamp />
      <DeleteCamp />
      <UpdateCamp />
    </div>
  )
}

export default App
