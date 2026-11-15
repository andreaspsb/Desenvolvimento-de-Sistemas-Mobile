import 'package:material_ui/material_ui.dart';

import '../componentes/cartao_pokemon.dart';
import '../dados/pokemons_exemplo.dart';

class TelaLista extends StatefulWidget {
  const TelaLista({super.key});

  @override
  State<TelaLista> createState() => _TelaListaState();
}

class _TelaListaState extends State<TelaLista> {
  final controladorBusca = TextEditingController();

  @override
  void dispose() {
    controladorBusca.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final busca = controladorBusca.text.trim().toLowerCase();
    final buscaNumerica = busca.replaceFirst(RegExp(r'^#'), '');
    final numero = int.tryParse(buscaNumerica);
    final resultados = pokemons
        .where(
          (pokemon) =>
              pokemon.nome.toLowerCase().contains(busca) ||
              (numero != null && pokemon.numero == numero),
        )
        .toList();

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(24, 32, 24, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'POKÉMON EXPLORER',
                style: TextStyle(fontSize: 12, color: Color(0xFF88847C)),
              ),
              const SizedBox(height: 16),
              const Text(
                'Pokédex',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF1C1C1C),
                ),
              ),
              const SizedBox(height: 24),
              TextField(
                controller: controladorBusca,
                onChanged: (_) => setState(() {}),
                decoration: InputDecoration(
                  hintText: 'Buscar por nome ou número',
                  filled: true,
                  fillColor: Colors.white,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 16,
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16),
                    borderSide: const BorderSide(color: Color(0xFFE6DED2)),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16),
                    borderSide: const BorderSide(color: Color(0xFF996000)),
                  ),
                  suffixIcon: controladorBusca.text.isEmpty
                      ? null
                      : IconButton(
                          tooltip: 'Limpar busca',
                          onPressed: () => setState(controladorBusca.clear),
                          icon: const Icon(Icons.close),
                        ),
                ),
              ),
              const SizedBox(height: 24),
              Expanded(
                child: resultados.isEmpty
                    ? const Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              'Nenhum Pokémon encontrado',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            SizedBox(height: 12),
                            Text(
                              'Tente outro nome ou número',
                              textAlign: TextAlign.center,
                              style: TextStyle(color: Color(0xFF88847C)),
                            ),
                          ],
                        ),
                      )
                    : ListView.separated(
                        itemCount: resultados.length,
                        separatorBuilder: (_, _) => const SizedBox(height: 24),
                        itemBuilder: (context, index) =>
                            CartaoPokemon(pokemon: resultados[index]),
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
