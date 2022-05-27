import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';

import 'package:redditech/parser.dart';
import 'package:redditech/search_page.dart';
import 'package:redditech/settings_page.dart';
import 'main_page_request.dart';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class MyMainPage extends StatefulWidget {
  const MyMainPage({Key? key}) : super(key: key);

  @override
  State<MyMainPage> createState() => _MyMainPageState();
}

class _MyMainPageState extends State<MyMainPage> {
  bool _hasMore = true;
  int _pageNumber = 1;
  bool _error = false;
  bool _loading = true;
  String _after = '';
  final int _defaultPhotosPerPageCount = 25;
  List<Post> _posts = [];
  final int _nextPageThreshold = 5;

  Icon customIcon = const Icon(Icons.search);
  Widget customSearchBar = const Text('Search for subreddit');

  @override
  void initState() {
    super.initState();
    _hasMore = true;
    _pageNumber = 1;
    _error = false;
    _loading = true;
    _posts = [];
    getBest();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Search for subreddit'),
          actions: [
            IconButton(
                onPressed: () => Navigator.of(context)
                    .push(MaterialPageRoute(builder: (_) => SearchPage())),
                icon: const Icon(Icons.search))
          ],
        ),
        body: getBody(),
        floatingActionButton: SpeedDial(
          icon: Icons.add,
          activeIcon: Icons.close,
          spacing: 3,
          spaceBetweenChildren: 4,
          children: [
            SpeedDialChild(
              child: const Icon(Icons.fireplace),
              backgroundColor: Colors.red,
              foregroundColor: Colors.white,
              label: 'Hot',
              onTap: () => setHot(),
            ),
            SpeedDialChild(
              child: const Icon(Icons.star),
              backgroundColor: Colors.deepOrange,
              foregroundColor: Colors.white,
              label: 'Best',
              onTap: () => setBest(),
            ),
            SpeedDialChild(
              child: const Icon(Icons.compare_arrows_sharp),
              backgroundColor: Colors.indigo,
              foregroundColor: Colors.white,
              label: 'New',
              visible: true,
              onTap: () => setNew(),
              onLongPress: () => setNew(),
            ),
            SpeedDialChild(
              child: const Icon(Icons.accessibility),
              backgroundColor: Colors.green,
              foregroundColor: Colors.white,
              label: 'Profile & Settings',
              onTap: () => Navigator.of(context)
                  .push(MaterialPageRoute(builder: (_) => SettingsPage())),
            ),
          ],
        ));
  }

  Widget getBody() {
    if (_posts.isEmpty) {
      if (_loading) {
        return Center(
            child: Padding(
          padding: const EdgeInsets.all(8),
          child: CircularProgressIndicator(),
        ));
      } else if (_error) {
        return Center(
          child: InkWell(
            onTap: () => setState(
              () {
                _loading = true;
                _error = false;
                getBest();
              },
            ),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Text("Error while loading posts, tap to try agin"),
            ),
          ),
        );
      }
    } else {
      return ListView.builder(
        itemCount: _posts.length + (_hasMore ? 1 : 0),
        itemBuilder: (context, index) {
          if (index == _posts.length - _nextPageThreshold) {
            getBest();
          }
          if (index == _posts.length) {
            if (_error) {
              return Center(
                child: InkWell(
                  onTap: () => setState(
                    () {
                      _loading = true;
                      _error = false;
                      getBest();
                    },
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Text("Error while loading post, tap to try again"),
                  ),
                ),
              );
            } else {
              return Center(
                child: Padding(
                  padding: const EdgeInsets.all(8),
                  child: CircularProgressIndicator(),
                ),
              );
            }
          }
          final Post post = _posts[index];
          return Card(
            elevation: 1,
            child: Column(
              children: <Widget>[
                Text(post.subreddit + ' from ' + post.author),
                displayImage(post),
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Text(
                    post.title,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      );
    }
    return Container();
  }

  Future<void> getBest() async {
    refreshMyAccessToken();
    final prefs = await SharedPreferences.getInstance();
    String? filter = prefs.getString('filter');

    var url = 'https://oauth.reddit.com/$filter?after=$_after';
    var accessToken = prefs.getString('accessToken');

    final response = await http.get(Uri.parse(url),
        headers: {HttpHeaders.authorizationHeader: 'Bearer $accessToken'});

    List<Post> posts = List.generate(
        25, (index) => parseSubredditFromJsonResponse(response.body, index));
    _after = getAfter(response.body);

    if (_pageNumber == 1) {
      setState(() {
        _posts = posts;
        _pageNumber = _pageNumber + 1;
        _loading = false;
      });
    } else {
      setState(() {
        _hasMore = posts.length == _defaultPhotosPerPageCount;
        _posts.addAll(posts);
        _pageNumber = _pageNumber + 1;
        _loading = false;
      });
    }
  }

  void setHot() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('filter', 'hot');
  }

  void setNew() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('filter', 'new');
  }

  void setBest() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('filter', 'best');
  }

  Widget displayImage(Post post) {
    if (post.isImage == true) {
      return Image.network(
        post.url,
        fit: BoxFit.fitWidth,
        width: double.infinity,
      );
    }
    return Container();
  }
}
