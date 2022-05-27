import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:redditech/main_page_request.dart';
import 'package:redditech/parser.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  final myController = TextEditingController();
  List<Subreddit> _list = [];
  bool displayBody = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Container(
        width: double.infinity,
        height: 40,
        decoration: BoxDecoration(
            color: Colors.white, borderRadius: BorderRadius.circular(5)),
        child: Center(
          child: TextField(
            controller: myController,
            decoration: InputDecoration(
                prefixIcon: IconButton(
                  icon: Icon(Icons.search),
                  onPressed: () {
                    setState(() {
                      if (myController.text != '') {
                        requestSearch(myController.text);
                        displayBody = true;
                      }
                    });
                  },
                ),
                suffixIcon: IconButton(
                  icon: Icon(Icons.clear),
                  onPressed: () {
                    myController.text = '';
                  },
                ),
                hintText: 'Search...',
                hintStyle: TextStyle(
                  color: Colors.grey,
                  fontSize: 18,
                  fontStyle: FontStyle.italic,
                ),
                border: InputBorder.none),
          ),
        ),
      )),
      body: getSearchBody(),
    );
  }

  void requestSearch(String text) async {
    refreshMyAccessToken();
    final prefs = await SharedPreferences.getInstance();
    var url = 'https://oauth.reddit.com//api/search_subreddits';
    var accessToken = prefs.getString('accessToken');
    text = text.replaceAll(' ', '');

    final resp = await http.post(Uri.parse(url), headers: {
      HttpHeaders.authorizationHeader: 'Bearer $accessToken'
    }, body: {
      'exact': 'false',
      'include_over_18': 'false',
      'include_unadvertisable': 'true',
      'query': text,
    });

    setState(() {
      _list =
          List.generate(5, (index) => createSubredditList(resp.body, index));
    });
  }

  Widget getSearchBody() {
    if (displayBody == true) {
      try {
        return ListView(
          padding: const EdgeInsets.all(8),
          children: <Widget>[
            getCardFromResp(_list[0]),
            getCardFromResp(_list[1]),
            getCardFromResp(_list[2]),
            getCardFromResp(_list[3]),
            getCardFromResp(_list[4]),
          ],
        );
      } catch (e) {
        return Container();
      }
    } else {
      return Container();
    }
  }
}

Widget displayImage(Subreddit post) {
  if (post.url != '') {
    return Image.network(
      post.url,
      fit: BoxFit.fitWidth,
      width: double.infinity,
    );
  }
  return Container();
}

Color fromHex(String hexString) {
  final buffer = StringBuffer();
  if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');
  buffer.write(hexString.replaceFirst('#', ''));
  return Color(int.parse(buffer.toString(), radix: 16));
}

Card getCardFromResp(Subreddit sub) {
  return Card(
    color: fromHex(sub.color),
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        ListTile(
          leading: const Icon(Icons.album),
          title: Text(sub.name),
          subtitle: Text(sub.subs.toString() + ' members'),
        ),
        displayImage(sub),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: <Widget>[
            TextButton(
              child: const Text('SUBSCRIBE'),
              onPressed: () {
                subUnsubtoSubreddit(true, sub.name);
              },
            ),
            const SizedBox(width: 6),
            TextButton(
              child: const Text('UNSUBSCRIBE'),
              onPressed: () {
                subUnsubtoSubreddit(false, sub.name);
              },
            ),
            const SizedBox(width: 6),
          ],
        ),
      ],
    ),
  );
}

void subUnsubtoSubreddit(bool state, String name) async {
  refreshMyAccessToken();
  final prefs = await SharedPreferences.getInstance();
  var accessToken = prefs.getString('accessToken');
  var url = 'https://oauth.reddit.com/api/subscribe';

  if (state == true) {
    final _ = await http.post(Uri.parse(url), headers: {
      HttpHeaders.authorizationHeader: 'Bearer $accessToken'
    }, body: {
      'action': 'sub',
      'skip_initial_defaults': '1',
      'action_source': 'o',
      'sr_name': name,
    });
  } else {
    final _ = await http.post(Uri.parse(url), headers: {
      HttpHeaders.authorizationHeader: 'Bearer $accessToken'
    }, body: {
      'action': 'unsub',
      'action_source': 'o',
      'sr_name': name,
    });
  }
}

Subreddit createSubredditList(String resp, int index) {
  json.encode(resp);
  Map<String, dynamic> jsonData = json.decode(resp) as Map<String, dynamic>;
  try {
    String name = jsonData["subreddits"][index]["name"];
    String url = jsonData["subreddits"][index]["icon_img"];
    int subs = jsonData["subreddits"][index]["subscriber_count"];
    String color = '';

    bool isImage = isImageinUrl(url);
    if (isImage == false) url = '';

    if ((index + 1) % 2 == 0) {
      color = '#ffdda1';
    } else {
      color = '#feefd2';
    }

    return Subreddit(name, url, subs, color);
  } catch (e) {
    return Subreddit('', '', 0, '');
  }
}

class Subreddit {
  String name;
  String url;
  int subs;
  String color;

  Subreddit(this.name, this.url, this.subs, this.color);
}
