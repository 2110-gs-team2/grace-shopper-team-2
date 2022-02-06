const random = require("lodash/random");

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateString = (len) => {
  let result = "";
  for (let i = 0; i < len; i++)
    result += characters.charAt(random(0, characters.length - 1));
  return result;
};

const users = [
  {
    email: "dcraigmile0@wordpress.org",
    firstName: "Dodi",
    lastName: "Craigmile",
    addressLine1: "3656 Meadow Valley Street",
  },
  {
    email: "gperfili1@alibaba.com",
    firstName: "Georgie",
    lastName: "Perfili",
    addressLine1: "6200 Commercial Drive",
  },
  {
    email: "faylen2@fda.gov",
    firstName: "Faye",
    lastName: "Aylen",
    addressLine1: "7 Rusk Point",
  },
  {
    email: "pdensey3@shutterfly.com",
    firstName: "Pascale",
    lastName: "Densey",
    addressLine1: "5 Prentice Drive",
  },
  {
    email: "jspilstead4@senate.gov",
    firstName: "Jervis",
    lastName: "Spilstead",
    addressLine1: "31 Dottie Street",
  },
  {
    email: "nbiaggiotti5@clickbank.net",
    firstName: "Neysa",
    lastName: "Biaggiotti",
    addressLine1: "77265 Hagan Point",
  },
  {
    email: "oslott6@123-reg.co.uk",
    firstName: "Orsola",
    lastName: "Slott",
    addressLine1: "3 Doe Crossing Terrace",
  },
  {
    email: "bfall7@huffingtonpost.com",
    firstName: "Bernelle",
    lastName: "Fall",
    addressLine1: "91 Boyd Center",
  },
  {
    email: "aturbard8@theatlantic.com",
    firstName: "Annamarie",
    lastName: "Turbard",
    addressLine1: "5118 Mcbride Drive",
  },
  {
    email: "gwyllie9@discovery.com",
    firstName: "Glynis",
    lastName: "Wyllie",
    addressLine1: "5916 New Castle Crossing",
  },
  {
    email: "vmatticcia@engadget.com",
    firstName: "Vinny",
    lastName: "MattiCCI",
    addressLine1: "95 Hanson Drive",
  },
  {
    email: "jburdounb@sohu.com",
    firstName: "Jocelyne",
    lastName: "Burdoun",
    addressLine1: "0296 Macpherson Avenue",
  },
  {
    email: "ttyasc@ow.ly",
    firstName: "Tobit",
    lastName: "Tyas",
    addressLine1: "543 Blackbird Park",
  },
  {
    email: "aomandd@mapy.cz",
    firstName: "Alexia",
    lastName: "Omand",
    addressLine1: "1 Petterle Terrace",
  },
  {
    email: "ftwiste@loc.gov",
    firstName: "Felizio",
    lastName: "Twist",
    addressLine1: "57 Manufacturers Terrace",
  },
  {
    email: "cadcocksf@google.ru",
    firstName: "Constantia",
    lastName: "Adcocks",
    addressLine1: "7 Emmet Way",
  },
  {
    email: "kcoulingg@npr.org",
    firstName: "Kriste",
    lastName: "Couling",
    addressLine1: "6 Summer Ridge Park",
  },
  {
    email: "hbellissh@umn.edu",
    firstName: "Helaine",
    lastName: "Belliss",
    addressLine1: "6522 Banding Alley",
  },
  {
    email: "cmacshanei@com.com",
    firstName: "Cherey",
    lastName: "MacShane",
    addressLine1: "6079 Clemons Court",
  },
  {
    email: "tjoretj@nytimes.com",
    firstName: "Tymothy",
    lastName: "Joret",
    addressLine1: "1293 Maryland Point",
  },
];

const cities = [
  "Chesapeake",
  "Chicago",
  "Chula Vista",
  "Bakersfield",
  "Baltimore",
  "Barnstable",
  "Independence",
  "Indianapolis",
  "Inglewood",
  "Irvine",
  "Irving",
  "Jackson",
  "Jacksonville",
  "New York",
  "Newark",
  "Newburgh",
  "Newport News",
  "Norfolk",
  "Normal",
  "Norman",
  "North Charleston",
];

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "AS",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "CM",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "TT",
  "UT",
  "VT",
  "VA",
  "VI",
  "WA",
  "WV",
  "WI",
  "WY",
];

const roles = ["ADMIN", "DEVELOPER", "CUSTOMER"];

users.forEach((u) => {
  u.city = cities[random(0, cities.length - 1)];
  u.state = states[random(0, states.length - 1)];
  u.role = roles[random(0, roles.length - 1)];
  u.password = generateString(10);
});

module.exports = users;
