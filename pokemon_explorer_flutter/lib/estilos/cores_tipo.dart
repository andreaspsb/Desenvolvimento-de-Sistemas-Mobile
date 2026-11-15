import 'package:material_ui/material_ui.dart';

Color corDoTipo(String tipo) => switch (tipo) {
  'Elétrico' => const Color(0xFF996000),
  'Fogo' => const Color(0xFFA13217),
  'Água' => const Color(0xFF175A91),
  _ => const Color(0xFF555555),
};
