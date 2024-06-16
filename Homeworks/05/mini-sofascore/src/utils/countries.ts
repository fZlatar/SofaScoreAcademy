/* cSpell:disable */

const countries = [
    { name: 'Afghanistan', short: 'af' },
    { name: 'Albania', short: 'al' },
    { name: 'Algeria', short: 'dz' },
    { name: 'Andorra', short: 'ad' },
    { name: 'Angola', short: 'ao' },
    { name: 'Argentina', short: 'ar' },
    { name: 'Armenia', short: 'am' },
    { name: 'Australia', short: 'au' },
    { name: 'Austria', short: 'at' },
    { name: 'Azerbaijan', short: 'az' },
    { name: 'Bahamas', short: 'bs' },
    { name: 'Bahrain', short: 'bh' },
    { name: 'Bangladesh', short: 'bd' },
    { name: 'Barbados', short: 'bb' },
    { name: 'Belarus', short: 'by' },
    { name: 'Belgium', short: 'be' },
    { name: 'Belize', short: 'bz' },
    { name: 'Benin', short: 'bj' },
    { name: 'Bhutan', short: 'bt' },
    { name: 'Bolivia', short: 'bo' },
    { name: 'Bosnia & Herzegovina', short: 'ba' },
    { name: 'Botswana', short: 'bw' },
    { name: 'Brazil', short: 'br' },
    { name: 'Brunei', short: 'bn' },
    { name: 'Bulgaria', short: 'bg' },
    { name: 'Burkina Faso', short: 'bf' },
    { name: 'Burundi', short: 'bi' },
    { name: 'Cabo Verde', short: 'cv' },
    { name: 'Cambodia', short: 'kh' },
    { name: 'Cameroon', short: 'cm' },
    { name: 'Canada', short: 'ca' },
    { name: 'Central African Republic', short: 'cf' },
    { name: 'Chad', short: 'td' },
    { name: 'Chile', short: 'cl' },
    { name: 'China', short: 'cn' },
    { name: 'Colombia', short: 'co' },
    { name: 'Comoros', short: 'km' },
    { name: 'Congo', short: 'cg' },
    { name: 'Costa Rica', short: 'cr' },
    { name: 'Croatia', short: 'hr' },
    { name: 'Cuba', short: 'cu' },
    { name: 'Cyprus', short: 'cy' },
    { name: 'Czech Republic', short: 'cz' },
    { name: 'Denmark', short: 'dk' },
    { name: 'Djibouti', short: 'dj' },
    { name: 'Dominica', short: 'dm' },
    { name: 'Dominican Republic', short: 'do' },
    { name: 'Ecuador', short: 'ec' },
    { name: 'Egypt', short: 'eg' },
    { name: 'El Salvador', short: 'sv' },
    { name: 'Equatorial Guinea', short: 'gq' },
    { name: 'Eritrea', short: 'er' },
    { name: 'Estonia', short: 'ee' },
    { name: 'Eswatini', short: 'sz' },
    { name: 'Ethiopia', short: 'et' },
    { name: 'Fiji', short: 'fj' },
    { name: 'Finland', short: 'fi' },
    { name: 'France', short: 'fr' },
    { name: 'Gabon', short: 'ga' },
    { name: 'Gambia', short: 'gm' },
    { name: 'Georgia', short: 'ge' },
    { name: 'Germany', short: 'de' },
    { name: 'Ghana', short: 'gh' },
    { name: 'Greece', short: 'gr' },
    { name: 'Grenada', short: 'gd' },
    { name: 'Guatemala', short: 'gt' },
    { name: 'Guinea', short: 'gn' },
    { name: 'Guinea-Bissau', short: 'gw' },
    { name: 'Guyana', short: 'gy' },
    { name: 'Haiti', short: 'ht' },
    { name: 'Honduras', short: 'hn' },
    { name: 'Hungary', short: 'hu' },
    { name: 'Iceland', short: 'is' },
    { name: 'India', short: 'in' },
    { name: 'Indonesia', short: 'id' },
    { name: 'Iran', short: 'ir' },
    { name: 'Iraq', short: 'iq' },
    { name: 'Ireland', short: 'ie' },
    { name: 'Israel', short: 'il' },
    { name: 'Italy', short: 'it' },
    { name: 'Jamaica', short: 'jm' },
    { name: 'Japan', short: 'jp' },
    { name: 'Jordan', short: 'jo' },
    { name: 'Kazakhstan', short: 'kz' },
    { name: 'Kenya', short: 'ke' },
    { name: 'Kiribati', short: 'ki' },
    { name: 'Korea, North', short: 'kp' },
    { name: 'Korea, South', short: 'kr' },
    { name: 'Kuwait', short: 'kw' },
    { name: 'Kyrgyzstan', short: 'kg' },
    { name: 'Laos', short: 'la' },
    { name: 'Latvia', short: 'lv' },
    { name: 'Lebanon', short: 'lb' },
    { name: 'Lesotho', short: 'ls' },
    { name: 'Liberia', short: 'lr' },
    { name: 'Libya', short: 'ly' },
    { name: 'Liechtenstein', short: 'li' },
    { name: 'Lithuania', short: 'lt' },
    { name: 'Luxembourg', short: 'lu' },
    { name: 'Madagascar', short: 'mg' },
    { name: 'Malawi', short: 'mw' },
    { name: 'Malaysia', short: 'my' },
    { name: 'Maldives', short: 'mv' },
    { name: 'Mali', short: 'ml' },
    { name: 'Malta', short: 'mt' },
    { name: 'Marshall Islands', short: 'mh' },
    { name: 'Mauritania', short: 'mr' },
    { name: 'Mauritius', short: 'mu' },
    { name: 'Mexico', short: 'mx' },
    { name: 'Micronesia', short: 'fm' },
    { name: 'Moldova', short: 'md' },
    { name: 'Monaco', short: 'mc' },
    { name: 'Mongolia', short: 'mn' },
    { name: 'Montenegro', short: 'me' },
    { name: 'Morocco', short: 'ma' },
    { name: 'Mozambique', short: 'mz' },
    { name: 'Myanmar', short: 'mm' },
    { name: 'Namibia', short: 'na' },
    { name: 'Nauru', short: 'nr' },
    { name: 'Nepal', short: 'np' },
    { name: 'Netherlands', short: 'nl' },
    { name: 'New Zealand', short: 'nz' },
    { name: 'Nicaragua', short: 'ni' },
    { name: 'Niger', short: 'ne' },
    { name: 'Nigeria', short: 'ng' },
    { name: 'North Macedonia', short: 'mk' },
    { name: 'Norway', short: 'no' },
    { name: 'Oman', short: 'om' },
    { name: 'Pakistan', short: 'pk' },
    { name: 'Palau', short: 'pw' },
    { name: 'Palestine', short: 'ps' },
    { name: 'Panama', short: 'pa' },
    { name: 'Papua New Guinea', short: 'pg' },
    { name: 'Paraguay', short: 'py' },
    { name: 'Peru', short: 'pe' },
    { name: 'Philippines', short: 'ph' },
    { name: 'Poland', short: 'pl' },
    { name: 'Portugal', short: 'pt' },
    { name: 'Qatar', short: 'qa' },
    { name: 'Romania', short: 'ro' },
    { name: 'Russia', short: 'ru' },
    { name: 'Rwanda', short: 'rw' },
    { name: 'Saint Kitts and Nevis', short: 'kn' },
    { name: 'Saint Lucia', short: 'lc' },
    { name: 'Saint Vincent and the Grenadines', short: 'vc' },
    { name: 'Samoa', short: 'ws' },
    { name: 'San Marino', short: 'sm' },
    { name: 'Sao Tome and Principe', short: 'st' },
    { name: 'Saudi Arabia', short: 'sa' },
    { name: 'Senegal', short: 'sn' },
    { name: 'Serbia', short: 'rs' },
    { name: 'Seychelles', short: 'sc' },
    { name: 'Sierra Leone', short: 'sl' },
    { name: 'Singapore', short: 'sg' },
    { name: 'Slovakia', short: 'sk' },
    { name: 'Slovenia', short: 'si' },
    { name: 'Solomon Islands', short: 'sb' },
    { name: 'Somalia', short: 'so' },
    { name: 'South Africa', short: 'za' },
    { name: 'South Sudan', short: 'ss' },
    { name: 'Spain', short: 'es' },
    { name: 'Sri Lanka', short: 'lk' },
    { name: 'Sudan', short: 'sd' },
    { name: 'Suriname', short: 'sr' },
    { name: 'Sweden', short: 'se' },
    { name: 'Switzerland', short: 'ch' },
    { name: 'Syria', short: 'sy' },
    { name: 'Taiwan', short: 'tw' },
    { name: 'Tajikistan', short: 'tj' },
    { name: 'Tanzania', short: 'tz' },
    { name: 'Thailand', short: 'th' },
    { name: 'Togo', short: 'tg' },
    { name: 'Tonga', short: 'to' },
    { name: 'Trinidad and Tobago', short: 'tt' },
    { name: 'Tunisia', short: 'tn' },
    { name: 'Turkey', short: 'tr' },
    { name: 'Turkmenistan', short: 'tm' },
    { name: 'Tuvalu', short: 'tv' },
    { name: 'Uganda', short: 'ug' },
    { name: 'Ukraine', short: 'ua' },
    { name: 'United Arab Emirates', short: 'ae' },
    { name: 'United Kingdom', short: 'gb' },
    { name: 'USA', short: 'us' },
    { name: 'Uruguay', short: 'uy' },
    { name: 'Uzbekistan', short: 'uz' },
    { name: 'Vanuatu', short: 'vu' },
    { name: 'Vatican City', short: 'va' },
    { name: 'Venezuela', short: 've' },
    { name: 'Vietnam', short: 'vn' },
    { name: 'Yemen', short: 'ye' },
    { name: 'Zambia', short: 'zm' },
    { name: 'Zimbabwe', short: 'zw' },
    { name: 'Kosovo', short: 'xk' },
    { name: 'Ivory Coast', short: 'ci' },
    { name: 'England', short: 'en' },
    { name: 'DR Congo', short: 'cd' },
]

export default countries
