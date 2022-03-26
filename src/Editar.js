import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, Button, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from "react-native-image-picker"

import { useNavigation, useRoute } from "@react-navigation/native";


import Axios from "axios";

const Editar = () => {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [modelo, setModelo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [img, setImg] = useState('');
  const [id, setId] = useState('');


  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {

    const product = route.params.product;

    setTitulo(product.titulo);
    setCategoria(product.categoria);
    setModelo(product.modelo);
    setQuantidade(product.quantidade.toString());
    setImg(product.img);
    setId(product.id);
  }, [])

  const saveProduct = () => {

    if (titulo.trim() === "") {
      alert("Titulo não pode estar vazio")
    } else {
      Axios.patch("http://10.0.2.2:3000/products/" + id, {
        titulo,
        categoria,
        modelo,
        quantidade,
        img
      }).then((res) => {
        alert("Salvo com sucesso!")
        navigation.navigate("Home", { res })
      }).catch(() => alert("Erro ao salvar"))
    }
  }

  const deleteProduct = () => {
    Axios.delete("http://10.0.2.2:3000/products/" + id).then((res) => {
      alert("Deletado com sucesso!")
      navigation.navigate("Home", { res })
    }).catch(() => alert("Erro ao Deletar"))
  }


  useEffect(() => { }, []);

  return (

    <View style={{ padding: 20, alignItems: "center" }}>
      <Image source={{ uri: img ? img : null }} style={{ width: 100, height: 100, borderRadius: 50, borderColor: "#5a5a5a", borderWidth: 2 }} />
      <TouchableOpacity onPress={() => ImagePicker.launchImageLibrary({}, (res) => setImg(res.uri))}>
        <Text>Carregar Imagem</Text>
      </TouchableOpacity>


      <TextInput
        value={titulo}
        onChangeText={(txt) => setTitulo(txt)}
        placeholder="Titulo"
        style={{ fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', height: 50, borderRadius: 7 }}
        placeholderTextColor="#5a5a5a" />

      <TextInput value={categoria} onChangeText={(txt) => setCategoria(txt)} placeholder="Categoria" style={{ fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', height: 50, borderRadius: 7 }}
        placeholderTextColor="#5a5a5a" />
      <TextInput value={modelo} onChangeText={(txt) => setModelo(txt)} placeholder="Modelo" style={{ fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', height: 50, borderRadius: 7 }}
        placeholderTextColor="#5a5a5a" />
      <TextInput value={quantidade} onChangeText={(txt) => setQuantidade(txt)} placeholder="Quantidade" style={{ fontSize: 16, marginTop: 50, marginBottom: 50, borderWidth: 1, width: '100%', height: 50, borderRadius: 7 }}
        placeholderTextColor="#5a5a5a" />

      <Button title="Cadastrar" onPress={saveProduct} />
      <Button title="Deletar" onPress={deleteProduct} />
    </View >
  )
}

export default Editar;