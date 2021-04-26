import React, { useEffect } from 'react'
import {
  DataGrid,
  GridColDef,
  GridCellClassParams
} from '@material-ui/data-grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { ProductService } from '../services/ProductServices'

interface IProduct {
  id: number
  name: string
  price: number
  description: string
  quantity: number
  situation: string
}

const useStyles = makeStyles({
  root: {
    '& .super-app.ok': {
      backgroundColor: '#00a000',
      color: '#fff',
      fontWeight: '600'
    },
    '& .super-app.alert': {
      backgroundColor: '#ffff00',
      color: '#000',
      fontWeight: '600'
    },
    '& .super-app.critical': {
      backgroundColor: '#ff0000',
      color: '#fff',
      fontWeight: '600'
    }
  }
})

export const ProductBox: React.FC = () => {
  const classes = useStyles()

  const [data, setData] = React.useState<IProduct[]>([])

  useEffect(() => {
    function currentState(quantity: number) {
      if (quantity <= 20) {
        const situation = { situation: 'Crítico' }
        return situation
      }
      if (quantity <= 50 && quantity >= 21) {
        const situation = { situation: 'Alerta' }
        return situation
      }
      if (quantity >= 50) {
        const situation = { situation: 'Ok' }
        return situation
      }
    }

    async function getList() {
      const request = new ProductService()
      const products = await request.getProductList()

      products.forEach((product: any) => {
        const { quantity } = product
        const result = currentState(quantity)
        Object.assign(product, result)
      })

      setData(products)
    }
    getList()
  }, [])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', type: 'number', width: 70 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'description', headerName: 'Descrição', width: 400 },
    { field: 'price', headerName: 'Preço', type: 'number', width: 130 },
    { field: 'quantity', headerName: 'Quantidade', type: 'number', width: 130 },
    {
      field: 'situation',
      headerName: 'Situação',
      type: 'number',
      width: 130,
      cellClassName: (params: GridCellClassParams) =>
        clsx('super-app', {
          alert: params.value === 'Alerta',
          critical: params.value === 'Crítico',
          ok: params.value === 'Ok'
        })
    }
  ]
  const rows = data

  return (
    <div
      style={{ height: 400, width: '100%', marginTop: 75 }}
      className={classes.root}
    >
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  )
}
