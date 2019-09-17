import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(home: TabBarDemo()));

class TabBarDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      // The number of tabes / content sections to display.
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Tabs Demo'),
          bottom: TabBar(
            tabs: [
              Tab(icon: Icon(Icons.directions_car)),
              Tab(icon: Icon(Icons.directions_transit)),
              Tab(icon: Icon(Icons.directions_bike)),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            Icon(Icons.directions_car),
            Icon(Icons.directions_transit),
            Icon(Icons.directions_bike),
          ],
        ),
      ),
    );
  }
}
