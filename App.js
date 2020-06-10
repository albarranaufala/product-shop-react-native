import React, { useState, Profiler } from 'react'
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native'

function ProductForm(props) {
  const [name, onChangeName] = React.useState('');
  const [price, onChangePrice] = React.useState('');

  const addProduct = () => {
    if(name && price){
      props.handleAddProduct(name,price)
      onChangeName('')
      onChangePrice('')
    }
  }

  return (
    <View style={styles.productForm}>
      <TextInput
        style={styles.textInput}
        onChangeText={text => onChangeName(text)}
        value={name}
        placeholder='Produk baru'
      />
      <TextInput
        style={styles.textInput}
        onChangeText={text => onChangePrice(text)}
        value={price}
        placeholder='Harga Produk'
        keyboardType='numeric'
      />
      <Button onPress={addProduct} title='Tambah Produk'/>
    </View>
  )
}

function Product(props) {
  let buy = () => {
    props.handleBuy(props.index)
  }

  let reduce = () => {
    props.handleReduce(props.index)
  }

  let remove = () => {
    props.handleRemove(props.index)
  }

  return (
    <View style={{padding:16, marginBottom:8, borderRadius:4, borderColor:'grey', borderWidth:1}}>
      <Text>{props.name} - ${props.price}</Text>
      <Text style={{marginBottom:16}}>Qty: {props.qty}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button color='red' title='Hapus' onPress={remove}/>
        <View style={{flexDirection: 'row'}}>
          <Button title='-' onPress={reduce}/>
          <Button title='+' onPress={buy} />
        </View>
      </View>
    </View>
  )
}

function Total(props) {
  return (
    <View style={styles.total}>
      <Text>Total: ${props.total}</Text>
    </View>
  )
}



export default function App() {
  const [products, setProducts] = useState(
    [
      {
        name: 'Samsung',
        price: 120,
        qty: 1
      },
      {
        name: 'Apple',
        price: 150,
        qty: 1
      },
      {
        name: 'Xiaomi',
        price: 20,
        qty: 1
      },
    ]
  )

  const total = () => {
    let total = 0
    products.forEach((product, index) => {
      total += product.qty * product.price
    })
    return total
  }

  const buy = (index) => {
    setProducts(
      products.map((product, i) => {
        if (i == index) {
          product.qty += 1
          return product
        }
        else return product
      })
    )
  }
  const reduce = (index) => {
    setProducts(
      products.map((product, i) => {
        if (i == index) {
          product.qty = product.qty ? product.qty - 1 : product.qty
          return product
        }
        else return product
      })
    )
  }
  const remove = (index) => {
    setProducts(
      products.filter((product, i) => {
        if (i != index) {
          return product
        }
      })
    )
  }

  const addProduct = (name,price) => {
    setProducts(
      products.concat({
        name: name,
        price: price,
        qty: 1
      })
    )
  }

  const productsDom = products.map((product, index) => {
    return <Product key={index} index={index} name={product.name} price={product.price} handleBuy={buy} qty={product.qty} handleReduce={reduce} handleRemove={remove}></Product>
  })

  return (
    <View style={styles.container}>
      <ProductForm handleAddProduct={addProduct}/>
      <ScrollView>
        <View style={{padding:16, paddingBottom:8}}>
          {productsDom}
        </View>
      </ScrollView>
      <Total total={total()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 32,
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    padding:8, 
    borderRadius: 4,
    marginBottom:8,
  },
  total: {
    height:64,
    padding:16,
    justifyContent:'center',
    borderTopWidth:1, 
    borderTopColor: 'grey',
  },
  productForm: {
    borderBottomWidth:1, 
    borderBottomColor: 'grey', 
    padding:16,
  }
})