import 'package:redditech/parser.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

void refreshMyAccessToken() async {
  final prefs = await SharedPreferences.getInstance();
  var now = DateTime.now();
  String url = 'https://www.reddit.com/api/v1/access_token';
  var encoded = utf8.encode('t3HAngn-vTJdVm5L6fmCeA:'); // client ID
  String encodedTwice = base64.encode(encoded);
  var later = prefs.getString('dateRefreshNeeded');
  var timeToRenew = DateTime.parse(later!); // '!' means later != null

  if (now.isAfter(timeToRenew) == true) {
    // has to be true
    var refreshToken = prefs.getString('refreshToken');
    final response = await http.post(Uri.parse(url), headers: {
      HttpHeaders.authorizationHeader:
          'Basic $encodedTwice'
    }, body: {
      'grant_type': 'refresh_token',
      'refresh_token': refreshToken,
    });

    accessTokenParser(response.body.toString());
    var newDateLimit = DateTime.now().add(const Duration(minutes: 50));
    prefs.setString('dateRefreshNeeded', newDateLimit.toString());
  }
}
