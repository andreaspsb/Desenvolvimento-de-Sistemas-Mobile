import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TelaLista } from "./src/telas/TelaLista";
import { TelaMovimentos } from "./src/telas/TelaMovimentos";
import { TelaDetalhesMovimento } from "./src/telas/TelaDetalhesMovimento";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Rotas = {
  Lista: undefined;
  Movimentos: { nome: string, url: string };
  DetalhesMovimento: { nomeMovimento: string, urlMovimento: string, nomePokemon: string, urlPokemon: string };
};

const Pilha = createNativeStackNavigator<Rotas>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Pilha.Navigator screenOptions={{ headerShown: false }}>
          <Pilha.Screen name="Lista">
            {({ navigation }) => (
              <TelaLista
                aoSelecionarPokemon={(pokemon) =>
                  navigation.navigate("Movimentos", { nome: pokemon.name, url: pokemon.url })
                }
              />
            )}
          </Pilha.Screen>

          <Pilha.Screen name="Movimentos">
            {({ route, navigation }) => (
              <TelaMovimentos
                nomePokemon={route.params.nome}
                aoVoltar={() => navigation.goBack()}
                urlPokemon={route.params.url}
                aoSelecionarMovimento={(movimento) =>
                  navigation.navigate("DetalhesMovimento", {
                    nomeMovimento: movimento.name,
                    urlMovimento: movimento.url,
                    nomePokemon: route.params.nome,
                    urlPokemon: route.params.url,
                  })
                }
              />
            )}
          </Pilha.Screen>

          <Pilha.Screen name="DetalhesMovimento">
            {({ route, navigation }) => (
              <TelaDetalhesMovimento
                nomeMovimento={route.params.nomeMovimento}
                aoVoltar={() => navigation.goBack()}
                urlMovimento={route.params.urlMovimento}
                nomePokemon={route.params.nomePokemon}
                urlPokemon={route.params.urlPokemon}
              />
            )}
          </Pilha.Screen>
        </Pilha.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )

}