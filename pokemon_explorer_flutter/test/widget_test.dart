import 'package:material_ui/material_ui.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pokemon_explorer_flutter/main.dart';

void main() {
  testWidgets('filtra Pokémon pelo nome e permite limpar a busca', (
    tester,
  ) async {
    await tester.pumpWidget(const MainApp());
    expect(find.text('Pikachu'), findsOneWidget);
    expect(find.text('Charmander'), findsOneWidget);
    await tester.enterText(find.byType(TextField), 'pik');
    await tester.pump();
    expect(find.text('Pikachu'), findsOneWidget);
    expect(find.text('Charmander'), findsNothing);
    await tester.tap(find.byTooltip('Limpar busca'));
    await tester.pump();
    expect(find.text('Charmander'), findsOneWidget);
  });
  testWidgets('busca pelo número e apresenta estado sem resultados', (
    tester,
  ) async {
    await tester.pumpWidget(const MainApp());
    await tester.enterText(find.byType(TextField), '#004');
    await tester.pump();
    expect(find.text('Charmander'), findsOneWidget);
    expect(find.text('Pikachu'), findsNothing);
    await tester.enterText(find.byType(TextField), 'xyz123');
    await tester.pump();
    expect(find.text('Nenhum Pokémon encontrado'), findsOneWidget);
  });
  testWidgets('usa cores distintas e legíveis para os tipos', (tester) async {
    await tester.pumpWidget(const MainApp());
    final eletrico = tester.widget<Text>(find.text('Elétrico')).style!.color!;
    final fogo = tester.widget<Text>(find.text('Fogo')).style!.color!;
    await tester.enterText(find.byType(TextField), '#007');
    await tester.pump();
    final agua = tester.widget<Text>(find.text('Água')).style!.color!;
    expect({eletrico, fogo, agua}.length, 3);
    for (final cor in [eletrico, fogo, agua]) {
      expect(
        (1.0 + 0.05) / (cor.computeLuminance() + 0.05),
        greaterThanOrEqualTo(4.5),
      );
    }
  });
}
