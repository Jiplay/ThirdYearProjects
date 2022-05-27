import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:redditech/main_page_request.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class SettingsPage extends StatefulWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  _SettingsPageState createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  User _user = User('', '',
      'https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png');
  Settings _settings = Settings(
    false,
    false,
    false,
    false,
    false,
    false,
  );
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Profile"),
        ),
        body: getBodyProfile());
  }

  getBodyProfile() {
    getUserInfo();
    return ListView(
      padding: const EdgeInsets.all(8),
      children: <Widget>[
        buildCardFromUser(),
        buildCardFromInfo("beta : "),
        buildCardFromInfo("threaded_messages : "),
        buildCardFromInfo("email_comment_reply : "),
        buildCardFromInfo("private_feeds : "),
        buildCardFromInfo("activity_relevant_ads : "),
        buildCardFromInfo("email_messages : "),
      ],
    );
  }

  Future getUserInfo() async {
    refreshMyAccessToken();
    final prefs = await SharedPreferences.getInstance();
    var accessToken = prefs.getString('accessToken');

    var url = 'https://oauth.reddit.com/api/v1/me';
    final response = await http.get(Uri.parse(url),
        headers: {HttpHeaders.authorizationHeader: 'Bearer $accessToken'});

    var urlbis = 'https://oauth.reddit.com/api/v1/me/prefs';
    final responsebis = await http.get(Uri.parse(urlbis),
        headers: {HttpHeaders.authorizationHeader: 'Bearer $accessToken'});

    if (mounted) {
      setState(() {
        _user = respToUser(response.body);
        _settings = respToSettings(responsebis.body);
      });
    }
  }

  Card buildCardFromUser() {
    return Card(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Text(_user.name),
          Text(_user.description),
          Image.network(
            _user.url,
            fit: BoxFit.fitWidth,
            width: double.infinity,
          )
        ],
      ),
    );
  }

  Card buildCardFromInfo(index) {
    return Card(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          ListTile(
            title: Text(index + _settings.beta.toString()),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              TextButton(
                child: const Text('Set TRUE'),
                onPressed: () {},
              ),
              const SizedBox(width: 6),
              TextButton(
                child: const Text('Set FALSE'),
                onPressed: () {},
              ),
              const SizedBox(width: 6),
            ],
          ),
        ],
      ),
    );
  }
}

Settings respToSettings(String body) {
  json.encode(body);
  Map<String, dynamic> jsonData = json.decode(body) as Map<String, dynamic>;

  try {
    return Settings(
        jsonData["beta"],
        jsonData["threaded_messages"],
        jsonData["email_comment_reply"],
        jsonData["private_feeds"],
        jsonData["activity_relevant_ads"],
        jsonData["email_messages"]);
  } catch (e) {
    return Settings(false, false, false, false, false, false);
  }
}

User respToUser(String body) {
  json.encode(body);
  Map<String, dynamic> jsonData = json.decode(body) as Map<String, dynamic>;

  try {
    String name = jsonData["name"];
    String descrpt = jsonData["subreddit"]["public_description"];
    String url = jsonData["snoovatar_img"];

    return User(name, descrpt, url);
  } catch (e) {
    return User('N/A', 'N/A', 'N/A');
  }
}

class User {
  String name;
  String description;
  String url;

  User(this.name, this.description, this.url);
}

class Settings {
  bool beta;
  bool threadedMessages;
  bool emailCommentReply;
  bool privateFeeds;
  bool activityRelevntAds;
  bool emailMessages;

  Settings(this.beta, this.threadedMessages, this.emailCommentReply,
      this.privateFeeds, this.activityRelevntAds, this.emailMessages);
}
