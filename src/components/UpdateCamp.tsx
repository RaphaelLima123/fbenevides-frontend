import React, { useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { ProductService } from '../services/ProductServices'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '30ch'
      }
    },
    inputDiv: {
      marginTop: 25,
      justifyContent: 'center'
    },
    button: {
      width: '35ch',
      height: '7ch'
    }
  })
)

export const UpdateCamp: React.FC = () => {
  const classes = useStyles()
  const [id, setId] = React.useState<number | string>('')
  const [name, setName] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [price, setPrice] = React.useState<number | string>('')
  const [quantity, setQuantity] = React.useState<number | string>('')

  const [data, setData] = React.useState<any>([])
  const [rowsInfo, setRowsInfo] = React.useState<any>([])

  useEffect(() => {
    async function getData() {
      const productServices = new ProductService()
      const data = await productServices.getProductList()
      setRowsInfo(data)

      const ids: any[] = []

      data.forEach((item: any) => {
        const idNumber = item.id
        ids.push(idNumber)
      })
      setData(ids)
    }

    getData()
  }, [])

  async function updateProduct() {
    if (id < 0) {
      return alert('É necessário um ID válido')
    }
    if (id === '') {
      return alert('O campo ID não pode ser nulo')
    }

    const existId = data.includes(id)

    if (!existId) {
      return alert('Digite um id válido')
    }

    const findRow = rowsInfo.find((row: any) => row.id === id)
    console.log('QUAL QUE É O MEU PRODUTO', findRow)

    function validateFields() {
      let newName = findRow.name
      let newDescription = findRow.description
      let newPrice = findRow.price
      let newQuantity = findRow.quantity

      if (name !== '') {
        newName = name
      }
      if (description !== '') {
        newDescription = description
      }
      if (price !== '') {
        newPrice = price
      }
      if (quantity !== '') {
        newQuantity = quantity
      }

      const parsePrice = parseFloat(newPrice)
      const parseQuantity = parseInt(newQuantity)

      const product = {
        name: newName,
        description: newDescription,
        price: parsePrice,
        quantity: parseQuantity
      }
      return product
    }

    const product = validateFields()

    await fetch(`http://localhost:3333/products/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })

    window.location.reload()
  }

  return (
    <div className={classes.inputDiv}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Id"
          variant="outlined"
          type="number"
          value={id}
          onChange={event => {
            const { value } = event.target
            const parse = parseInt(value)
            setId(parse)
          }}
        />
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          value={name}
          onChange={event => {
            const { value } = event.target
            setName(value)
          }}
        />
        <TextField
          id="outlined-basic"
          label="Descrição"
          variant="outlined"
          value={description}
          onChange={event => {
            const { value } = event.target
            setDescription(value)
          }}
        />
        <TextField
          id="outlined-basic"
          label="Preço"
          variant="outlined"
          type="number"
          value={price}
          onChange={event => {
            const { value } = event.target
            const parse = parseFloat(value)
            setPrice(parse)
          }}
        />
        <TextField
          id="outlined-basic"
          label="Quantidade"
          variant="outlined"
          type="number"
          value={quantity}
          onChange={event => {
            const { value } = event.target
            const parse = parseInt(value)
            setQuantity(parse)
          }}
        />
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => updateProduct()}
        >
          Alterar
        </Button>
      </form>
    </div>
  )
}
