import 'package:flutter/material.dart';
import 'package:redditech/webview_auth.dart';
import 'package:redditech/main_page.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Buttons extends StatelessWidget {
  const Buttons({Key? key}) : super(key: key);

  Future<bool> alreadyLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();

    final refreshToken = prefs.getString('refreshToken') ?? 'null';
    if (refreshToken == 'null') {
      return false;
    } else {
      return true;
    }
  }

  void deleteToken() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove('refreshToken');
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          TextButton(
            style: TextButton.styleFrom(
              textStyle: const TextStyle(fontSize: 20),
            ),
            onPressed: () {
              alreadyLoggedIn().then((value) {
                if (value) {
                  deleteToken();
                }
              });
            },
            child: const Text('Log out'),
          ),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: Stack(
              children: <Widget>[
                Positioned.fill(
                  child: Container(
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        colors: <Color>[
                          Color(0xFFFF8A65),
                          Color(0xFFFF7043),
                          Color(0xFFFF5722),
                        ],
                      ),
                    ),
                  ),
                ),
                TextButton(
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.all(16.0),
                    primary: Colors.white,
                    textStyle: const TextStyle(fontSize: 20),
                  ),
                  onPressed: () {
                    alreadyLoggedIn().then((value) {
                      if (value) {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) {
                            return const MyMainPage();
                          }),
                        );
                      } else {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) {
                            return WebViewExample();
                          }),
                        );
                      }
                    });
                  },
                  child: const Text('Browse Redditech'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
