import 'package:material_ui/material_ui.dart';

import 'telas/tela_lista.dart';

void main() => runApp(const MainApp());

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) => MaterialApp(
    debugShowCheckedModeBanner: false,
    title: 'Pokémon Explorer',
    theme: ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFFFCB42)),
      scaffoldBackgroundColor: const Color(0xFFF5F2EA),
      useMaterial3: true,
    ),
    home: const TelaLista(),
  );
}
