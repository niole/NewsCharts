"use strict";
/*global React*/

var React = require('react');
var Charts = require('./App.jsx');

//module.exports = CountryTextProcessor;

var CountryTextProcessor = React.createClass({
    propTypes: {
      countryDict: React.PropTypes.object
    },
    getInitialState: function() {
      console.log('GETINITIAL STATE COUNTRIES');
      var countries = "Aruba." +
        "Antigua." +
        "Barbuda." +
        "United Arab Emirates." +
        "Afghanistan." +
        "Algeria." +
        "Azerbaijan." +
        "Albania." +
        "Armenia." +
        "Andorra." +
        "Angola." +
        "Samoa." +
        "Argentina." +
        "Australia." +
        "Azore and Cartier Islands." +
        "Austria." +
        "Anguilla." +
        "ax ≈land Islands." +
        "Antarctica." +
        "Bahrain." +
        "Barbados." +
        "Botswana." +
        "Bermuda." +
        "Belgium." +
        "Bahamas." +
        "Bangladesh." +
        "Belize." +
        "Bosnia and Herzegovina." +
        "Bolivia." +
        "Saint Barthelemy." +
        "Myanmar." +
        "Benin." +
        "Belarus." +
        "Solomon Islands." +
        "Navassa Island." +
        "Brazil." +
        "Bassas da India." +
        "Bhutan." +
        "Bulgaria." +
        "Bouvet Island." +
        "Brunei." +
        "Burundi." +
        "Canada." +
        "Cambodia." +
        "Chad." +
        "Sri Lanka." +
        "Congo." +
        "China." +
        "Chile." +
        "Cayman Islands." +
        "Cocos Islands." +
        "Keeling Islands." +
        "Cameroon." +
        "Comoros." +
        "Colombia." +
        "Mariana Islands." +
        "Northern Mariana Islands." +
        "Coral Sea Islands." +
        "Costa Rica." +
        "Central African Republic." +
        "Cuba." +
        "Cape Verde." +
        "Cook Islands." +
        "Cyprus." +
        "Denmark." +
        "Djibouti." +
        "Dominica." +
        "Dominican Republic." +
        "Dhekelia Sovereign Base Area." +
        "Ecuador." +
        "Egypt." +
        "Ireland." +
        "Equatorial Guinea." +
        "Estonia." +
        "Eritrea." +
        "El Salvador." +
        "Ethiopia." +
        "Europa Island." +
        "Czech Republic." +
        "French Guiana." +
        "Finland." +
        "Fiji." +
        "Falkland Islands (Islas Malvinas)." +
        "Micronesia, Federated States of." +
        "Faroe Islands." +
        "French Polynesia." +
        "France." +
        "French Southern and Antarctic Lands." +
        "Gambia, The." +
        "Gabon." +
        "Georgia." +
        "Ghana." +
        "Gibraltar." +
        "Grenada." +
        "Guernsey." +
        "Greenland." +
        "Germany." +
        "Glorioso Islands." +
        "Guadeloupe." +
        "Guam." +
        "Greece." +
        "Guatemala." +
        "Guinea." +
        "Guyana." +
        "Gaza Strip." +
        "Haiti." +
        "Hong Kong." +
        "Heard Island and McDonald Islands." +
        "Honduras." +
        "Croatia." +
        "Hungary." +
        "Iceland." +
        "Indonesia." +
        "Isle of Man." +
        "India." +
        "British Indian Ocean Territory." +
        "Clipperton Island." +
        "Iran." +
        "Israel." +
        "Italy." +
        "Cote d'Ivoire." +
        "Iraq." +
        "Japan." +
        "Jersey." +
        "Jamaica." +
        "Jan Mayen." +
        "Jordan." +
        "Juan de Nova Island." +
        "Kenya." +
        "Kyrgyzstan." +
        "North Korea." +
        "Kiribati." +
        "South Korea." +
        "Christmas Island." +
        "Kuwait." +
        "Kosovo." +
        "Kazakhstan." +
        "Laos." +
        "Lebanon." +
        "Latvia." +
        "Lithuania." +
        "Liberia." +
        "Slovakia." +
        "Liechtenstein." +
        "Lesotho." +
        "Luxembourg." +
        "Libyan Arab." +
        "Madagascar." +
        "Martinique." +
        "Macau." +
        "Moldova." +
        "Mayotte." +
        "Mongolia." +
        "Montserrat." +
        "Malawi." +
        "Montenegro." +
        "Macedonia." +
        "Mali." +
        "Monaco." +
        "Morocco." +
        "Mauritius." +
        "Mauritania." +
        "Malta." +
        "Oman." +
        "Maldives." +
        "Mexico." +
        "Malaysia." +
        "Mozambique." +
        "New Caledonia." +
        "Niue." +
        "Norfolk Island." +
        "Niger." +
        "Vanuatu." +
        "Nigeria." +
        "Netherlands." +
        "No Man's Land." +
        "Norway." +
        "Nepal." +
        "Nauru." +
        "Suriname." +
        "Bonaire, Sint Eustatius and Saba." +
        "Nicaragua." +
        "New Zealand." +
        "Paraguay." +
        "Pitcairn Islands." +
        "Peru." +
        "Paracel Islands." +
        "Spratly Islands." +
        "Pakistan." +
        "Poland." +
        "Panama." +
        "Portugal." +
        "Papua New Guinea." +
        "Palau." +
        "Guinea-Bissau." +
        "Qatar." +
        "Reunion." +
        "Serbia." +
        "Marshall Islands." +
        "Saint Martin." +
        "Romania." +
        "Philippines." +
        "Puerto Rico." +
        "Russia." +
        "Rwanda." +
        "Saudi Arabia." +
        "Saint Pierre and Miquelon." +
        "Saint Kitts and Nevis." +
        "Seychelles." +
        "South Africa." +
        "Senegal." +
        "Saint Helena." +
        "Slovenia." +
        "Sierra Leone." +
        "San Marino." +
        "Singapore." +
        "Somalia." +
        "Spain." +
        "South Sudan." +
        "Saint Lucia." +
        "Sudan." +
        "Svalbard." +
        "Sweden." +
        "South Georgia and the Islands." +
        "Sint Maarten." +
        "Syrian Arab Republic." +
        "Switzerland." +
        "Trinidad." +
        "Tobago." +
        "Tromelin Island." +
        "Thailand." +
        "Tajikistan." +
        "Turks and Caicos Islands." +
        "Tokelau." +
        "Tonga." +
        "Togo." +
        "Sao Tome and Principe." +
        "Tunisia." +
        "East Timor." +
        "Turkey." +
        "Tuvalu." +
        "Taiwan." +
        "Turkmenistan." +
        "Tanzania." +
        "Curacao." +
        "Uganda." +
        "United Kingdom." +
        "Ukraine." +
        "United States." +
        "Burkina Faso." +
        "Uruguay." +
        "Uzbekistan." +
        "Saint Vincent and the Grenadines." +
        "Venezuela." +
        "British Virgin Islands." +
        "Vietnam." +
        "Virgin Islands." +
        "Holy See." +
        "Vatican City." +
        "Namibia." +
        "State of Palestine." +
        "Wallis and Futuna." +
        "Western Sahara." +
        "Samoa." +
        "Swaziland." +
        "Serbia and Montenegro." +
        "Yemen." +
        "Zambia." +
        "Zimbabwe.";

      var countryArray = countries.split(".");
      var countryDict = {};

      countryArray.forEach( function(country) {
          if ( country.slice(0,3) in countryDict ) {
            countryDict[ country.slice(0,3) ].push( country );

          } else {
            countryDict[ country.slice(0,3) ] = [ country ];

          }
      });

      return { "countryDict": countryDict };
    },
    render: function() {

      return (
        <div>
          <Charts countryDict={this.state.countryDict}/>
        </div>
      );
    }
});

var countries = React.render( <CountryTextProcessor/>, $('#container')[0]);

module.exports = countries;
