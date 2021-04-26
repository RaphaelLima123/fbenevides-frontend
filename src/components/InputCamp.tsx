import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

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

export const InputCamp: React.FC = () => {
  const classes = useStyles()
  const [name, setName] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [price, setPrice] = React.useState<number | string>('')
  const [quantity, setQuantity] = React.useState<number | string>('')

  async function addProduct() {
    if (name === '' || description === '' || price === '' || quantity === '') {
      return alert('Preencha todos os campos primeiramente!')
    }
    if (price < 0) {
      return alert('O preço não pode ser negativo!')
    }
    if (quantity < 0) {
      return alert('O preço não pode ser negativo!')
    }
    const product = {
      name,
      description,
      price,
      quantity
    }

    await fetch('http://localhost:3333/products', {
      method: 'POST',
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
          onClick={() => addProduct()}
        >
          Adicionar
        </Button>
      </form>
    </div>
  )
}
