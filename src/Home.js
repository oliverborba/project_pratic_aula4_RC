import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native"

import Axios from 'axios';


const Home = () => {

    const [products, setProducts] = useState([]);

    const route = useRoute();

    useEffect(() => {
        Axios.get("http://10.0.2.2:3000/products").then((res) => {
            setProducts(res.data)
        }).catch((erro) => alert("Erro ao requisitar produto " + erro))
    }, [route.params?.res])

    const navigation = useNavigation();

    return (

        <View>

            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-around', marginBottom: 15 }} >
                <Text style={{ fontSize: 20 }}>Cadastro de Estoque</Text>

                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} >
                    <Text style={{ fontSize: 15, color: 'blue' }}>Cadastrar</Text>
                </TouchableOpacity>
            </View >

            <FlatList
                style={{ padding: 20 }}
                keyExtractor={(item, index) => item.id.toString()}
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Editar", { product: item })} style={{ flexDirection: "row", backgroundColor: "white", marginBottom: 5 }}>
                        <Image
                            source={{ uri: item.img ? item.img : null }}
                            style={{ width: 100, height: 100, margin: 10 }} />

                        <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                            <Text>Produto: {item.titulo}</Text>
                            <Text>Modelo: {item.modelo}</Text>
                            <Text>Categoria: {item.categoria}</Text>
                            <Text>Quantidade: {item.quantidade}</Text>
                        </View>
                    </TouchableOpacity>
                )} />
        </View>
    );
}

export default Home;