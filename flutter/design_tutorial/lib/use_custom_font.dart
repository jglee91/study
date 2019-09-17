import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Custom Fonts',
      // Set Raleway as the default app font.
      theme: ThemeData(fontFamily: 'Raleway'),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Custom Fonts')),
      body: Center(
        child: Column(
          children: <Widget>[
            Text('Default Font Sample'),
            Text(
              'Roboto Mono Sample',
              style: TextStyle(fontFamily: 'RobotoMono'),
            ),
          ],
        ),
      ),
    );
  }
}
