## Flutter Cookbook

>## Link URL
- https://flutter.dev/docs/cookbook/

>### Http Request Tutorial
1. Add the **http** package
- open pubspec.yaml and add dependecy http
- can find the latest version of the [http package](https://pub.dev/packages/http#-installing-tab-)
- import the http package
    ```dart
    import 'package:http/http.dart' as http;
    ```

2. Make a network request
- use **http.get()** method, the method returns a **Future** that contains a **Response**
    - **Future** is a core Dart class for working with async operations.
    - The **http.Response** class contains the data received from a http call

3. Convert the response into a custom Dart object
- create Post class
- the class includes a factory constructor that creates a **Post** from JSON
- Convert the **http.Response** to a **Post**
    - convert the response body into a JSON Map with the **dart:convert** package.
    - if the server returns an 'OK' response, convert the JSOM Map into a **Post** using the **fromJson** factory method
    - if the server returns an unexpected response, throw an error

4. Fetch and display the data
- the **FutureBuilder** widget comes with Flutter and makes it easy to work with async data sources
    - future is want to work with (in this case, call the fetchPost())
    - builder function tells Flutter what to render, depending on the state of the Future: loading, success, or error

5. Moving the fetch call out of the build() method
- flutter calls the **build()** method every time it wants to change anything in the view.
    - if the fetch call is leaved in build() method, the API will unnecessary call and it will slow down app.
    - to solve it, pass it into a **StatelessWidget**
        - the parent widget is reponsible for calling the fetch method, storing its result, and then passing it to widget
        ```dart
        class MyApp extends StatelessWidget {
            final Future<Post> post;

            MyApp({Key key, this.post}): super(key: Key);
        }
        ```
    - if the widget is stateful, call the fetch method in either the **initState()** or **didChangeDependencies()** methods
        - **initState()** method is called exactly once and then never again
        - if want to have the option of reloading the API in response to an **InheritedWidget** changing, put the call into the **didChangeDependencies()** method
        ```dart
        class _MyAppState extends State<MyApp> {
            Futer<Post> post;

            @override
            void initState() {
                super.initState();
                post = fetchPost();
            }
        }
        ```