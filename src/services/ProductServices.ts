class ProductService {
  async getProductList(): Promise<any> {
    const req = await fetch('http://localhost:3333/products')
    const data = req.json()
    console.log('AQUI É O DATA', data)
    return data
  }
}

export { ProductService }
