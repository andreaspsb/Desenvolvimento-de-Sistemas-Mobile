import 'package:material_ui/material_ui.dart';

import '../estilos/cores_tipo.dart';
import '../modelos/pokemon.dart';

class CartaoPokemon extends StatelessWidget {
  const CartaoPokemon({super.key, required this.pokemon});
  final Pokemon pokemon;

  @override
  Widget build(BuildContext context) => Container(
    constraints: const BoxConstraints(minHeight: 104),
    padding: const EdgeInsets.all(20),
    decoration: BoxDecoration(
      color: Colors.white,
      border: Border.all(color: const Color(0xFFE6DED2)),
      borderRadius: BorderRadius.circular(16),
    ),
    child: Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '#${pokemon.numero.toString().padLeft(3, '0')}',
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF88847C),
                ),
              ),
              const SizedBox(height: 4),
              Text(
                pokemon.nome,
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF1C1C1C),
                ),
              ),
              const SizedBox(height: 6),
              Text(
                pokemon.tipo,
                style: TextStyle(fontSize: 12, color: corDoTipo(pokemon.tipo)),
              ),
            ],
          ),
        ),
        Image.asset(
          'assets/pokemon/${pokemon.numero}.png',
          width: 64,
          height: 64,
          semanticLabel: 'Imagem de ${pokemon.nome}',
        ),
      ],
    ),
  );
}
