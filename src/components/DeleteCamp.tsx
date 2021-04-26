import React, { useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { ProductService } from '../services/ProductServices'
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

export const DeleteCamp: React.FC = () => {
  const classes = useStyles()
  const [id, setId] = React.useState<number | string>('')
  const [data, setData] = React.useState<any>([])

  useEffect(() => {
    async function getData() {
      const productServices = new ProductService()
      const data = await productServices.getProductList()
      const ids: any[] = []
      data.forEach((item: any) => {
        const idNumber = item.id
        ids.push(idNumber)
      })
      setData(ids)
    }

    getData()
  }, [])

  async function removeProduct() {
    if (id < 0) {
      return alert('É necessário um ID válido')
    }
    if (id === '') {
      return alert('O campo ID não pode ser nulo')
    }

    const existId = data.includes(id)
    console.log('AQUI É O ID', existId)
    if (!existId) {
      return alert('Digite um id válido')
    }

    await fetch(`http://localhost:3333/products/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
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
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => removeProduct()}
        >
          Remover
        </Button>
      </form>
    </div>
  )
}
