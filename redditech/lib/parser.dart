import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

Future<String> accessTokenParser(String str) async {
  int a = str.indexOf(':');
  int b = str.indexOf(',');

  String dest = str.substring(a + 3, b - 1);

  final prefs = await SharedPreferences.getInstance();
  prefs.setString('accessToken', dest);
  prefs.setString('filter', 'best');

  return dest;
}

Future<String> refreshTokenParser(String str) async {
  int a = str.indexOf('refresh_token');
  String dest = str.substring(a + 17, a + 60);

  final prefs = await SharedPreferences.getInstance();
  prefs.setString('refreshToken', dest);

  return dest;
}

String codeParser(String str) {
  if (str.contains('code') == true) {
    int a = str.lastIndexOf('=');
    return str.substring(a + 1, str.length - 2);
  } else {
    return 'null';
  }
}

Future<String> checkRefreshToken() async {
  final prefs = await SharedPreferences.getInstance();

  return prefs.getString('refresh_token') ?? 'null';
}

String getAfter(String resp) {
  json.encode(resp);
  Map<String, dynamic> jsonData = json.decode(resp) as Map<String, dynamic>;

  return jsonData["data"]["after"];
}

Post parseSubredditFromJsonResponse(String resp, int cmp) {
  json.encode(resp);
  Map<String, dynamic> jsonData = json.decode(resp) as Map<String, dynamic>;

  String subreddit = jsonData["data"]["children"][cmp]["data"]["subreddit"];
  String title = jsonData["data"]["children"][cmp]["data"]["title"];
  int ups = jsonData["data"]["children"][cmp]["data"]["ups"];
  String author = jsonData["data"]["children"][cmp]["data"]["author"];
  String url = jsonData["data"]["children"][cmp]["data"]["url"];

  bool isImage = isImageinUrl(url);
  if (isImage == false) url = '';

  try {
    String urlVideo = jsonData["data"]["children"][cmp]["data"]["secure_media"]
        ["reddit_video"]["scrubber_media_url"];
    return Post(title, author, url, subreddit, ups, isImage, urlVideo);
  } catch (e) {}

  return Post(title, author, url, subreddit, ups, isImage, '');
}

bool isImageinUrl(String url) {
  if (url.contains('.png') == true || url.contains('.jpg') == true) return true;
  return false;
}

class Post {
  String title;
  String author;
  String url;
  String subreddit;
  String urlVideo;
  int ups;
  bool isImage;

  Post(this.title, this.author, this.url, this.subreddit, this.ups,
      this.isImage, this.urlVideo);
}

Future<http.Response> getTrueToken(String string) async {
  final prefs = await SharedPreferences.getInstance();
  String code = codeParser(string);
  var url = 'https://www.reddit.com/api/v1/access_token';

  var encoded = utf8.encode('t3HAngn-vTJdVm5L6fmCeA:');
  String encodedTwice = base64.encode(encoded);

  final response = await http.post(Uri.parse(url), headers: {
    HttpHeaders.authorizationHeader: 'Basic $encodedTwice'
  }, body: {
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': 'http://localhost:8080',
  });

  refreshTokenParser(response.body.toString());
  accessTokenParser(response.body.toString());

  var later = DateTime.now().add(const Duration(minutes: 50));
  prefs.setString('dateRefreshNeeded', later.toString());

  return response;
}
