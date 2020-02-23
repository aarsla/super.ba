exports.getSources = async (req, reply) => {
  return {
    results: [
      {
        title: '24sata info',
        url: 'http://24sata.info',
        logo: 'http://24sata.info/themes/tpl_4018/img/logo_24si.png'
      },
      {
        title: 'Al Jazeera Balkans',
        url: 'http://balkans.aljazeera.net/',
        logo: 'http://balkans.aljazeera.net/sites/default/themes/custom/ajbalkans/logo.png'
      }, {
        title: 'Avaz',
        url: 'http://www.avaz.ba/',
        logo: 'https://lh6.ggpht.com/tr_PgvnVcQMnGOHx0ZiUf80vnGNMZXCJPGsKF2zOW2eyAFpQ1vGtaEiBDVVPxs51I_c=w170'
      }, {
        title: 'CIN',
        url: 'https://www.cin.ba',
        logo: 'https://www.cin.ba/wp-content/uploads/2016/09/logocin-300x246.jpg'
      }, {
        title: 'Klix',
        url: 'https://klix.ba/',
        logo: 'https://www.klix.ba/images/logo.png'
      }, {
        title: 'N1 Info',
        url: 'http://ba.n1info.com/',
        logo: 'http://ba.n1info.com/Images/n1-logo2.png'
      }, {
        title: 'Radio Sarajevo',
        url: 'http://radiosarajevo.ba',
        logo: 'http://www.radiosarajevo.ba//build/img/logo-s.png'
      }
    ]
  }
}
